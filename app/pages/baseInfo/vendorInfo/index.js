import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Button, Form, Input, message, Layout, Row, Col, Table, Icon, Select, Modal, AutoComplete } from 'antd';

import { fetchVendors, getAllVendors, fetchAllVendors, addVendors, deleteVendors, editVendors } from '@actions/apus'

const { Option } = Select;
const FormItem = Form.Item;
const { Content } = Layout;
const { TextArea } = Input;
const { fetchBtns } = require('@configs/common');

@Form.create({})
class vendorInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editModal: false,
      vendorlist: [],
      allVendorslist: [],
      type1: '',
      record: {},
      type: '', 
      code: '', 
      phone: '',
      parentId: ''
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
        title: '供应商编号',
        dataIndex: 'code',
        key: 'code',
        width: 100,
      },
      {
        title: '供应商类型',
        dataIndex: 'type',
        key: 'type',
        render: (text, record) => {
          return (
            <span>{record.type == 'TRANSPORT' ? '运输供应商' : record.type == 'MATERIEL' ? '物料供应商' : '其他'}</span>
          )
        }
      },
      {
        title: '供应商简称',
        dataIndex: 'abbreviation',
        key: 'abbreviation',
      },
      {
        title: '供应商全称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '联系人',
        dataIndex: 'contact',
        key: 'contact',
      },
      {
        title: '所属集团',
        dataIndex: 'parentId',
        key: 'parentId',
        render: (text, record) => {
          return <span>{record.parent ? record.parent.name : ''}</span>
        }
      },
      {
        title: '供应商地址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '联系电话',
        dataIndex: 'phone',
        key: 'phone',
        width: 100
      },
      {
        title: '开户行',
        dataIndex: 'bankName',
        key: 'bankName',
      },
      {
        title: '税号',
        dataIndex: 'dutyParagraph',
        key: 'dutyParagraph',
      },
      {
        title: '电子邮箱',
        dataIndex: 'email',
        key: 'email',
        width: 130
      },
      {
        title: '账号',
        dataIndex: 'account',
        key: 'account',
      },
      {
        title: '备注信息',
        dataIndex: 'remark',
        key: 'remark',
        width: 100,
      },
      {
        title: '操作',
        key: 'operate',
        fixed: 'right',
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
    this.getVendors();
    this.getAllVendors();
  }

  getVendors = () => {
    this.props.fetchVendors({pageNumber:'0', pageSize: '10'}).then(res=>{
      this.setState({
        vendorlist: res.data.content,
        loading: false
      })
    });
  }

  getAllVendors = () => {
    this.props.fetchAllVendors().then(res=>{
      this.setState({
        allVendorslist: res.data,
        loading: false
      })
    });
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.setState({
      loading: true
    })
    const { code, type, phone } = this.state;
    const values = {
      code,
      type,
      phone
    }
    this.props.fetchVendors({...values, pageNumber:'0', pageSize: '10'}).then(res=>{
      this.setState({
        vendorlist: res.data.content,
        loading: false
      })
    })
  }

  handleAdd = () => {
    this.setState({
      editModal: true,
      type1: 'add',
      record: {}
    })
  }

  addUsers = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.addVendors({...values}).then(res=>{
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
      type1: 'edit',
      record
    })
  }

  handleDelete = (record) => {
    Modal.confirm({
      title: "删除供应商",
      content: "确定要删除供应商吗?",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        this.deleteVendors(record.id)
      },
    });
  }

  deleteVendors = (id) => {
    this.props.deleteVendors(id).then(res=>{
      if (res.status == 200) {
        message.success('删除成功！')
      } else {
        message.error('删除失败！')
      }
      location.reload();
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
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { parentId } = this.state;
        delete values.parentName;
        this.props.editVendors({id: record.id, ...values, parentId}).then(res=>{
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

  changeVendor = (val) => {
    this.setState({
      type: val
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

  onSelect = (data) => {
    this.setState({
      parentId: data
    })
  };

  onSearch = (searchText) => {
    const { allVendorslist } = this.state;
    let options = [];
    options = allVendorslist.filter(item=>{
      return item.name.indexOf(searchText) > -1
    })
    this.setState({
      options
    })
  }

  renderForm = () => {
    const { getFieldDecorator } = this.props.form;
    const { record, type1, options } = this.state;
    const { code, type, abbreviation, name, contact, address, phone, bankName, dutyParagraph, email, account, remark } = record;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
    };
    const children = options && options.map(item=><Option key={item.id}>{item.name}</Option>)
    return (
      <div>
        <Form style={{ width: '100%' }} onSubmit={type1 === 'add' ? this.addUsers : this.editUser}>
          <Row>
            <Col span={12}>
              <FormItem {...formItemLayout} label="供应商编号">
                {getFieldDecorator('code', {
                      rules: [
                      {
                        required: true,
                        message: "供应商编号不能为空",
                      },
                    ],
                    initialValue: code,
                  })(<Input
                  allowClear={true}
                  size="default"
                  placeholder="请输入"
                />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="供应商类型">
                {getFieldDecorator('type', {
                      rules: [
                      {
                        required: false,
                        message: "",
                      },
                    ],
                    initialValue: type,
                  })(
                    <Select style={{ width: '150px'}} allowClear={true}>
                      <Option value="MATERIEL">物料供应商</Option>
                      <Option value="TRANSPORT">运输供应商</Option>
                      <Option value="OTHER">其他</Option>
                    </Select>
                  )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem {...formItemLayout} label="供应商简称">
                {getFieldDecorator('abbreviation', {
                      rules: [
                      {
                        required: false,
                        message: "",
                      },
                    ],
                    initialValue: abbreviation,
                  })(<Input
                  allowClear={true}
                  size="default"
                  placeholder="请输入"
                />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="供应商全称">
                {getFieldDecorator('name', {
                      rules: [
                      {
                        required: false,
                        message: "",
                      },
                    ],
                    initialValue: name,
                  })(<Input
                  allowClear={true}
                  size="default"
                  placeholder="请输入"
                />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem {...formItemLayout} label="联系人">
                {getFieldDecorator('contact', {
                      rules: [
                      {
                        required: false,
                        message: "",
                      },
                    ],
                    initialValue: contact,
                  })(<Input
                  allowClear={true}
                  size="default"
                  placeholder="请输入"
                />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="所属集团">
                {getFieldDecorator('parentName', {
                      rules: [
                      {
                        required: false,
                      },
                    ],
                    initialValue: '',
                  })(
                    <AutoComplete
                      allowClear={true}
                      style={{
                        width: 160,
                      }}
                      onSelect={this.onSelect}
                      onSearch={this.onSearch}
                      placeholder="请输入"
                    >
                      {children}
                    </AutoComplete>
                  )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem {...formItemLayout} label="供应商地址">
                {getFieldDecorator('address', {
                      rules: [
                      {
                        required: false,
                        message: "",
                      },
                    ],
                    initialValue: address,
                  })(<Input
                  allowClear={true}
                  size="default"
                  placeholder="请输入"
                />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="联系电话">
                {getFieldDecorator('phone', {
                      rules: [
                      {
                        required: false,
                        message: "",
                      },
                    ],
                    initialValue: phone,
                  })(<Input
                  allowClear={true}
                  size="default"
                  placeholder="请输入"
                />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem {...formItemLayout} label="开户行">
                {getFieldDecorator('bankName', {
                      rules: [
                      {
                        required: false,
                        message: "",
                      },
                    ],
                    initialValue: bankName,
                  })(<Input
                  allowClear={true}
                  size="default"
                  placeholder="请输入"
                />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="税号">
                {getFieldDecorator('dutyParagraph', {
                      rules: [
                      {
                        required: false,
                        message: "",
                      },
                    ],
                    initialValue: dutyParagraph,
                  })(<Input
                  allowClear={true}
                  size="default"
                  placeholder="请输入"
                />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem {...formItemLayout} label="电子邮箱">
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
                  size="default"
                  placeholder="请输入"
                />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="账号">
                {getFieldDecorator('account', {
                      rules: [
                      {
                        required: false,
                        message: "请输入",
                      },
                    ],
                    initialValue: account,
                  },)(<Input
                  allowClear={true}
                  size="default"
                  placeholder="请输入"
                />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem {...formItemLayout} label="备注信息">
                {getFieldDecorator('remark', {
                      rules: [
                      {
                        required: false,
                        message: "请输入",
                      },
                    ],
                    initialValue: remark,
                  },)(<TextArea
                  allowClear={true}
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
    const { loading, editModal, type1, vendorlist } = this.state;
    return (
      <div className="page page-scrollfix page-usermanage">
        <Layout>
          <Layout className="page-body">
            <Content>
              <div className="page-header">
                <div className="layout-between">
                  <Form style={{ width: '100%' }}>
                    <Row style={{ marginTop: '10px' }}>
                      <Col span={8}>
                        <label style={{ marginRight: '10px'}}>供应商编号:</label>
                        <Input
                          allowClear={true}
                          className="input-base-width"
                          size="default"
                          placeholder="请输入"
                          onChange={this.changeCode}
                        />
                      </Col>
                      <Col span={8}>
                        <label style={{ marginRight: '10px'}}>供应商类型:</label>
                        <Select style={{ width: '150px'}} onChange={this.changeVendor} allowClear={true}>
                          <Option value="MATERIEL">物料供应商</Option>
                          <Option value="TRANSPORT">运输供应商</Option>
                          <Option value="OTHER">其他</Option>
                        </Select>
                      </Col>
                      <Col span={8}>
                        <label style={{ marginRight: '10px'}}>联系电话:</label>
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
                      <Col span={2}><Button size="small" onClick={this.handleSearch}>查询</Button></Col>
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
                  dataSource={vendorlist}
                  scroll={{ x: 1200 }}
                />
              </div>
            </Content>
            <Modal
              title={type1 === 'add' ? '新增用户' : '修改用户'}
              width={700}
              visible={editModal}
              onOk={this.handleEdit}
              onCancel={this.handleOk}
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

export default connect((state) => state.system, { fetchVendors, getAllVendors, fetchAllVendors, addVendors, deleteVendors, editVendors })(vendorInfo)
