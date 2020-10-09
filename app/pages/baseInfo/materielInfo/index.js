import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Button, Form, Input, message, Layout, Row, Col, Table, Icon, Select, Modal, Radio, DatePicker, Tag } from 'antd';
import moment from 'moment';

import { fetchUserList, addUsers, editUsersInfo, fetchDepartments } from '@actions/system'

const { Option } = Select;
const FormItem = Form.Item;
const { Content } = Layout;
const { fetchBtns } = require('@configs/common');

@Form.create({})
class materielInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editModal: false,
      userlist: [],
      type: '',
      record: {},
      departments: [],
      name: '', 
      code: '', 
      phone: ''
    };
  }

  renderColumn() {
    return [
      {
        title: "序号",
        width: '8%',
        render: (text, record, index) => `${index + 1}`
      },
      {
        title: '用户编号',
        dataIndex: 'code',
        key: 'code',
        width: '10%',
      },
      {
        title: '用户名',
        dataIndex: 'name',
        key: 'name',
        width: '10%',
      },
      {
        title: '部门',
        dataIndex: 'department',
        key: 'department',
        width: '10%',
        render: (text, record) => (
          <div>
            {
              record.department.name
            }
          </div>
        )
      },
      {
        title: '职位',
        dataIndex: 'position',
        key: 'position',
        width: '10%'
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        width: '10%',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
        width: '10%',
      },
      {
        title: '操作',
        key: 'operate',
        width: '10%',
        render: (text, record) => {
          return <span>
            <a onClick={() => this.handleEdit(record)}>修改</a>
          </span>
        }
      }
    ];
  }

  componentDidMount() {
    this.props.form.setFieldsValue({ key: '' });
    this.setState({
      loading: true
    })
    this.getUser();
    this.getDepartments();
  }

  getUser = () => {
    this.props.fetchUserList({pageNumber:'0', pageSize: '10'}).then(res=>{
      this.setState({
        userlist: res.data.content,
        loading: false
      })
    });
  }

  getDepartments = () => {
    this.props.fetchDepartments().then(res=>{
      this.setState({
        departments: res.data
      })
    })
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.setState({
      loading: true
    })
    const { name, code, phone } = this.state;
    const values = {
      name,
      code,
      phone
    }
    this.props.fetchUserList({values, pageNumber:'0', pageSize: '10'}).then(res=>{
      this.setState({
        userlist: res.data.content,
        loading: false
      })
    })
  }

  handleAdd = () => {
    this.setState({
      editModal: true,
      type: 'add',
      record: {}
    })
  }

  addUsers = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.addUsers({values}).then(res=>{
          if (res.status == '201') {
            message.success('新增成功');
            this.setState({
              editRoleModal: false
            })
            location.reload();
          }
        })
      }
    })
  }

  handleEdit = (record) => {
    this.setState({
      editModal: true,
      type: 'edit',
      record
    })
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  }

  handleOk = () => {
    this.setState({
      editModal: false
    })
  }

  editUser = () => {
    const { record } = this.state;
    console.log(record)
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.editUsersInfo({id: record.id, values}).then(res=>{
          if (res.status == '200') {
            message.success('修改成功');
            this.setState({
              editRoleModal: false
            })
            location.reload();
          }
        })
      }
    })
  }

  onChange = (date, dateString) => {
    console.log(date, dateString);
  }

  changeCode = (e) => {
    this.setState({
      code: e.target.value
    })
  }

  changeName = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  changePhone = (e) => {
    this.setState({
      phone: e.target.value
    })
  }

  changeDepartment = (value) => {
    console.log(value)
  }

  renderForm = () => {
    const { getFieldDecorator } = this.props.form;
    const { record, departments, type } = this.state;
    const { birthday, code, email, name, phone, realName, sex, userTypeId, department = {}} = record;
    const { id = '' } = department;
    console.log(id)

    return (
      <div>
        <Form style={{ width: '100%' }} onSubmit={type === 'add' ? this.addUsers : this.editUser}>
          <Row>
            <Col span={12}>
              <FormItem label="用户编号">
                {getFieldDecorator('code', {
                      rules: [
                      {
                        required: true,
                        message: "用户编号不能为空",
                      },
                    ],
                    initialValue: code,
                  })(<Input
                  allowClear={true}
                  className="input-base-width"
                  size="default"
                  placeholder="请输入"
                />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="用户类型">
                {getFieldDecorator('userTypeId', {
                      rules: [
                      {
                        required: false,
                        message: "请输入",
                      },
                    ],
                    initialValue: userTypeId,
                  })(
                    <Select allowClear={true}>
                      <Option value="1">携赁用户</Option>
                      <Option value="2">客户</Option>
                      <Option value="3">供应商</Option>
                    </Select>
                  )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="用户名">
                {getFieldDecorator('name', {
                      rules: [
                      {
                        required: false,
                        message: "请输入",
                      },
                    ],
                    initialValue: name,
                  })(<Input
                  allowClear={true}
                  className="input-base-width"
                  size="default"
                  placeholder="请输入"
                />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="邮箱">
                {getFieldDecorator('email', {
                      rules: [
                      {
                        required: false,
                        message: "请输入",
                      },
                    ],
                    initialValue: email,
                  })(<Input
                  allowClear={true}
                  className="input-base-width"
                  size="default"
                  placeholder="请输入"
                />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="部门">
                {getFieldDecorator('departmentId', {
                      rules: [
                      {
                        required: false,
                        message: "请输入",
                      },
                    ],
                    initialValue: id,
                  })(
                  <Select style={{ width: '150px'}} value={id} placeholder="请选择" allowClear={true} onChange={this.changeDepartment}>
                    {
                      departments.map(item=>{
                        return <Option key={item.id} value={item.id}>{item.name}</Option>
                      })
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="电话">
                {getFieldDecorator('phone', {
                      rules: [
                      {
                        required: false,
                        message: "请输入",
                      },
                    ],
                    initialValue: phone,
                  },)(<Input
                  allowClear={true}
                  className="input-base-width"
                  size="default"
                  placeholder="请输入"
                />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="性别">
                {getFieldDecorator('sex', {
                      rules: [
                      {
                        required: false,
                        message: "请输入",
                      },
                    ],
                    initialValue: sex,
                  })(<Radio.Group onChange={this.onSexChange}>
                    <Radio value='MALE'>男</Radio>
                    <Radio value='FEMALE'>女</Radio>
                  </Radio.Group>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="出生日">
                {getFieldDecorator('birthday',{
                      rules: [
                      {
                        required: false,
                        message: "请输入",
                      },
                    ],
                    initialValue: moment(birthday),
                  })(<DatePicker onChange={this.onChange} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="密码">
                {getFieldDecorator('password',{
                      rules: [
                      {
                        required: true,
                        message: "密码不能为空",
                      },
                    ],
                    initialValue: "",
                  })(<Input
                  allowClear={true}
                  className="input-base-width"
                  size="default"
                  placeholder="请输入"
                />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="真实姓名">
                {getFieldDecorator('realName',{
                      rules: [
                      {
                        required: false,
                        message: "请输入",
                      },
                    ],
                    initialValue: realName,
                  })(<Input
                  allowClear={true}
                  className="input-base-width"
                  size="default"
                  placeholder="请输入"
                />)}
              </FormItem>
            </Col>
          </Row>
          <Row style={{ textAlign:'center' }}>
            <FormItem><Button size="small" type="primary" htmlType="submit">确定</Button>
            <Button size="small" onClick={this.handleOk}>取消</Button></FormItem>
          </Row>
        </Form>
      </div>
    )
  }

  render() {
    const { loading, selectedRowKeys, userlist, editModal, type } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div className="page page-scrollfix page-usermanage">
        <Layout>
          <Layout className="page-body">
            <Content>
              <div className="page-header">
                <div className="layout-between">
                  <Form style={{ width: '100%' }} onSubmit={this.handleSearch}>
                    <Row style={{ marginTop: '10px' }}>
                      <Col span={8}>
                        <label style={{ marginRight: '10px'}}>用户编号</label>
                        <Input
                          allowClear={true}
                          className="input-base-width"
                          size="default"
                          placeholder="请输入"
                          onChange={this.changeCode}
                        />
                      </Col>
                      <Col span={8}>
                        <label style={{ marginRight: '10px'}}>用户名</label>
                        <Input
                          allowClear={true}
                          className="input-base-width"
                          size="default"
                          placeholder="请输入"
                          onChange={this.changeName}
                        />
                      </Col>
                      <Col span={8}>
                        <label style={{ marginRight: '10px'}}>电话</label>
                        <Input
                          allowClear={true}
                          className="input-base-width"
                          size="default"
                          placeholder="请输入"
                          onChange={this.changePhone}
                        />
                      </Col>
                    </Row>
                    <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
                      <Col span={2}><Button size="small" htmlType="submit">查询</Button></Col>
                      <Col span={2}><Button size="small" type="primary" onClick={this.handleAdd}>新增</Button></Col>
                    </Row>
                  </Form>
                </div>
              </div>
              {/* <Row><Col span={1}><Button size="small">导出</Button></Col></Row> */}
              <div className="page-content table-flex table-scrollfix">
                <Table
                  bordered
                  rowKey="id"
                  columns={this.renderColumn()}
                  // rowSelection={rowSelection}
                  dataSource={userlist}
                />
              </div>
            </Content>
            <Modal
              title={type === 'add' ? '新增用户' : '修改用户'}
              width={600}
              visible={editModal}
              onOk={this.handleEdit}
              onCancel={this.handleOk}
              className="userInfoModal"
              footer={null}
            >
              {this.renderForm()}
            </Modal>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default connect((state) => state.system, { fetchUserList, addUsers, editUsersInfo, fetchDepartments })(materielInfo)
