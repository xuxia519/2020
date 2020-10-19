import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Button, Form, Input, message, Layout, Row, Col, Table, Select, Modal, Radio, DatePicker } from 'antd';
const { TextArea } = Input;
import { fetchUserList, addUsers, editUsersInfo, fetchDepartments, deleteUsers } from '@actions/system';

import moment from 'moment';

const { Option } = Select;
const FormItem = Form.Item;
const { Content } = Layout;

@Form.create({})
class userInfo extends Component {
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
        width: 50,
        render: (text, record, index) => `${index + 1}`
      },
      {
        title: '用户编号',
        dataIndex: 'code',
        key: 'code',
        width: 100,
      },
      {
        title: '用户类型',
        dataIndex: 'userType',
        key: 'userType',
        render: (text, record) => (
          <div>
            {
              record.userType.remark
            }
          </div>
        )
      },
      {
        title: '用户姓名',
        dataIndex: 'name',
        key: 'name',
        
      },
      {
        title: '电子邮箱',
        dataIndex: 'email',
        key: 'email',
        width: 150,
      },
      {
        title: '所属公司',
        dataIndex: 'userType',
        key: 'userType',
        render: (text, record) => (
          <div>
            {
              record.userType.remark
            }
          </div>
        )
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '所属部门',
        dataIndex: 'phone',
        key: 'phone',
        render: (text, record) => (
          <div>
            {
              record.department.name
            }
          </div>
        )
      },
      {
        title: '备注信息',
        dataIndex: 'remark',
        key: 'remark',
      },
      {
        title: '操作',
        key: 'operate',
        render: (text, record) => {
          return <span>
            <a onClick={() => this.handleEdit(record)}>修改</a>|
            <a onClick={() => this.handleDelete(record)}>删除</a>
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
    }).then(error=>{
      console.log(error,11111)
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

  handleDelete = (record) => {
    Modal.confirm({
      title: "删除",
      content: "确定要删除用户角色吗?",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        this.deleteUsers(record.id)
      },
    });
  }

  deleteUsers = (id) => {
    this.props.deleteUsers(id).then(res=>{
      console.log(res)
      if (res.status == 200) {
        message.success('删除成功！')
      } else {
        message.error('删除失败！')
      }
      location.reload();
    })
  }

  renderForm = () => {
    const { getFieldDecorator } = this.props.form;
    const { record, departments, type } = this.state;
    const { birthday, code, email, name, phone, realName, sex, userType = {}, department = {}, password } = record;
    
    const { id = '' } = department;
    let { id: userTypeId } = userType;
    
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
                        required: true,
                        message: "请输入",
                      },
                    ],
                    initialValue: userTypeId,
                  })(
                    <Select allowClear={true} style={{ width: '150px' }}>
                      <Option value={1}>携赁用户</Option>
                      <Option value={2}>客户</Option>
                      <Option value={3}>供应商</Option>
                    </Select>
                  )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="真是姓名">
                {getFieldDecorator('realName', {
                      rules: [
                      {
                        required: true,
                        message: "请输入",
                      },
                    ],
                    initialValue: realName,
                  })(
                    <Input
                      allowClear={true}
                      className="input-base-width"
                      size="default"
                      placeholder="请输入"
                    />
                  )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="性别">
                {getFieldDecorator('sex', {
                      rules: [
                      {
                        required: true,
                        message: "请输入",
                      },
                    ],
                    initialValue: sex || 'MALE',
                  })(
                    <Radio.Group onChange={this.onChange}>
                      <Radio value='MALE'>男</Radio>
                      <Radio value='FEMALE'>女</Radio>
                    </Radio.Group>
                  )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="生日">
                {getFieldDecorator('birthday', {
                      rules: [
                      {
                        required: true,
                        message: "请选择",
                      },
                    ],
                    initialValue: moment(birthday),
                  })(
                    <DatePicker />
                  )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="密码">
                {getFieldDecorator('password', {
                      rules: [
                      {
                        required: true,
                        message: "请选择",
                      },
                    ],
                    initialValue: password,
                  })(
                    <Input
                      allowClear={true}
                      className="input-base-width"
                      size="default"
                      placeholder="请输入"
                    />
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
                        required: true,
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
              <FormItem label="所属公司">
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
              <FormItem label="所属部门">
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
              <FormItem label="备注">
                {getFieldDecorator('remark', {
                      rules: [
                      {
                        required: false,
                        message: "请输入",
                      },
                    ],
                    initialValue: phone,
                  },)(<TextArea
                  allowClear={true}
                  placeholder="请输入"
                  rows={4}
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
              <div className="page-content table-flex table-scrollfix">
                <Table
                  bordered
                  rowKey="id"
                  columns={this.renderColumn()}
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

export default connect((state) => state.system, { fetchUserList, addUsers, editUsersInfo, fetchDepartments, deleteUsers })(userInfo)
