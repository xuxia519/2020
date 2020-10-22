import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Button, Form, Input, message, Layout, Row, Col, Table, Select, Modal, AutoComplete } from 'antd';
import AddDtoModal from './modal/addDtoModal';

import { editCustomers, fetchCustomers, addCustomers, fetchAllCustomers, fetchProvinces, deleteCustomers } from '@actions/apus'

const { Option } = AutoComplete;
const FormItem = Form.Item;
const { Content } = Layout;
const { fetchBtns } = require('@configs/common');

@Form.create({})
class customerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      editModal: false,
      editModal2: false,
      customerslist: [],
      allcustomerslist: [],
      type: '',
      record: {},
      departments: [],
      name: '', 
      code: '', 
      phone: '',
      options: [],
      parentId: '',
      provinces: [],
      cities: [],
      areas: [],
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
        title: '客户编号',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: '客户简称',
        dataIndex: 'abbreviation',
        key: 'abbreviation',
      },
      {
        title: '客户全称',
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
        width: 100,
        render: (text, record) => {
          return <span>{record.parent ? record.parent.name : ''}</span>
        }
      },
      {
        title: '客户地址',
        dataIndex: 'contactAddress',
        key: 'contactAddress',
        width: 100,
        render: (text, record) => {
          return <span>{record.district ? record.district.name : ''}</span>
        }
      },
      {
        title: '联系电话',
        dataIndex: 'phone',
        key: 'phone',
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
        title: '客户物料',
        key: '',
        render: (record) => {
          return <span>
            <a onClick={() => this.handleAdd2(record)}>物料详情</a>
          </span>
        }
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
    this.getCustomers();
    this.getAllCustomers();
    this.getProvince();
  }

  getProvince = () => {
    this.props.fetchProvinces({type:'PROVINCE'}).then(res=>{
      this.setState({
        provinces: res.data
      })
      console.log(res)
    })
  }

  handleProvinceChange = value => {
    console.log(value)
    this.props.fetchProvinces({parentId: value}).then(res=>{
      this.setState({
        cities: res.data,
      })
    })
  };

  onSecondCityChange = value => {
    console.log(value)
    this.props.fetchProvinces({parentId: value}).then(res=>{
      this.setState({
        areas: res.data
      })
    })
  };

  onAreaChange = value => {
    // this.setState({
    //   secondCity: value,
    // });
  };


  getCustomers = () => {
    this.props.fetchCustomers({pageNumber:'0', pageSize: '10'}).then(res=>{
      this.setState({
        customerslist: res.data.content,
        loading: false
      })
    });
  }

  getAllCustomers = () => {
    this.props.fetchAllCustomers().then(res=>{
      this.setState({
        allcustomerslist: res.data,
        loading: false
      })
    });
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
    this.props.fetchCustomers({values, pageNumber:'0', pageSize: '10'}).then(res=>{
      this.setState({
        customerslist: res.data.content,
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

  handleAdd2 = (record) => {
    sessionStorage.setItem('dtoInfo', JSON.stringify(record))
    this.props.router.push('/customerInfo/dtoDetail')
  }

  addCustomers = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { parentId = '' } = this.state;
        delete values.parentName;
        delete values.province;
        delete values.city;
        this.props.addCustomers({...values, parentId}).then(res=>{
          console.log(11111, res)
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
      record,
      parentId: record.parent ? record.parent.parentId : ''
    })
    this.props.form.setFieldsValue({
      parentName: record.parent ? record.parent.name : ''
    })
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  }

  handleOk = () => {
    this.setState({
      editModal: false,
      editModal2: false
    })
  }

  editCustomers = () => {
    const { record } = this.state;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { parentId } = this.state;
        delete values.parentName;
        this.props.editCustomers({id: record.id, ...values, parentId}).then(res=>{
          if (res.status == '200') {
            message.success('修改成功');
            this.setState({
              editModal: false
            })
            location.reload();
          }
        })
      }
    })
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

  handleDelete = (record) => {
    Modal.confirm({
      title: "删除客户商",
      content: "确定要删除客户吗?",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        this.deleteCustomers(record.id)
      },
    });
  }

  deleteCustomers = (id) => {
    this.props.deleteCustomers(id).then(res=>{
      if (res.status == 200) {
        message.success('删除成功！')
      } else {
        message.error('删除失败！')
      }
      location.reload();
    })
  }


  onSelect = (data) => {
    this.setState({
      parentId: data
    })
  };

  onSearch = (searchText) => {
    const { allcustomerslist } = this.state;
    let options = [];
    options = allcustomerslist.filter(item=>{
      return item.name.indexOf(searchText) > -1
    })
    this.setState({
      options
    })
  }

  renderForm = () => {
    const { getFieldDecorator } = this.props.form;
    const { record, type, options, provinces, cities, areas  } = this.state;
    const { code, abbreviation, name, contact, email, phone, contactAddress, bankName, dutyParagraph, account, remark } = record;

    const children = options.map(item=><Option key={item.id}>{item.name}</Option>)

    return (
      <div>
        <Form style={{ width: '100%' }} onSubmit={type === 'add' ? this.addCustomers : this.editCustomers}>
          <Row>
            <Col span={12}>
              <FormItem label="客户编号">
                {getFieldDecorator('code', {
                      rules: [
                      {
                        required: true,
                        message: "客户编号不能为空",
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
              <FormItem label="客户简称">
                {getFieldDecorator('abbreviation', {
                      rules: [
                      {
                        required: false,
                      },
                    ],
                    initialValue: abbreviation,
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
              <FormItem label="客户全称">
                {getFieldDecorator('name', {
                      rules: [
                      {
                        required: false,
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
              <FormItem label="联系人">
                {getFieldDecorator('contact', {
                      rules: [
                      {
                        required: false,
                      },
                    ],
                    initialValue: contact,
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
              <FormItem label="所属集团">
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
            <Col span={9}>
              <FormItem label="客户地址" className="province">
                {getFieldDecorator('province', {
                  initialValue: '',
                  rules: [{ required: false, message: '请输入' }],
                })(
                  <Select
                    allowClear={true}
                    style={{ width: 120 }}
                    onChange={this.handleProvinceChange}
                    placeholder="请选择省"
                  >
                    {provinces.map(province => (
                      <Option key={province.id}>{province.name}</Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem className="city">
                {getFieldDecorator('city', {
                  initialValue: '',
                  rules: [{ required: false, message: '请输入' }],
                })(
                  <Select
                    allowClear={true}
                    style={{ width: 120, marginLeft: '10px' }}
                    onChange={this.onSecondCityChange}
                    placeholder="请选择市"
                  >
                    {cities.map(city => (
                      <Option key={city.id}>{city.name}</Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem className="district">
                {getFieldDecorator('districtId', {
                    initialValue: '',
                    rules: [{ required: false, message: '请输入' }],
                  })(
                    <Select
                      allowClear={true}
                      style={{ width: 120, marginLeft: '10px' }}
                      onChange={this.onAreaChange}
                      placeholder="请选择地区"
                    >
                      {areas.map(area => (
                        <Option key={area.id}>{area.name}</Option>
                      ))}
                    </Select>
                  )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="联系电话">
                {getFieldDecorator('phone', {
                      rules: [
                      {
                        required: false,
                      },
                    ],
                    initialValue: phone,
                  })(<Input
                  allowClear={true}
                  className="input-base-width"
                  size="default"
                  placeholder="请输入"
                />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="开户行">
                {getFieldDecorator('bankName', {
                      rules: [
                      {
                        required: false,
                      },
                    ],
                    initialValue: bankName,
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
              <FormItem label="税号">
                {getFieldDecorator('dutyParagraph', {
                      rules: [
                      {
                        required: false,
                      },
                    ],
                    initialValue: dutyParagraph,
                  })(<Input
                  allowClear={true}
                  className="input-base-width"
                  size="default"
                  placeholder="请输入"
                />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="电子邮箱">
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
              <FormItem label="账号">
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
                  className="input-base-width"
                  size="default"
                  placeholder="请输入"
                />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="备注信息">
                {getFieldDecorator('remark', {
                      rules: [
                      {
                        required: false,
                        message: "请输入",
                      },
                    ],
                    initialValue: remark,
                  },)(<Input
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
    const { loading, selectedRowKeys, customerslist, editModal, type, editModal2, record } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div className="page page-scrollfix page-usermanage">
        <Spin spinning={loading}>
          <Layout className="page-body">
            <Content>
              <div className="page-header">
                <div className="layout-between">
                  <Form style={{ width: '100%' }} onSubmit={this.handleSearch}>
                    <Row style={{ marginTop: '10px' }}>
                      <Col span={8}>
                        <label style={{ marginRight: '10px'}}>客户编号:</label>
                        <Input
                          allowClear={true}
                          className="input-base-width"
                          size="default"
                          placeholder="请输入"
                          onChange={this.changeCode}
                        />
                      </Col>
                      <Col span={8}>
                        <label style={{ marginRight: '10px'}}>客户名称:</label>
                        <Input
                          allowClear={true}
                          className="input-base-width"
                          size="default"
                          placeholder="请输入"
                          onChange={this.changeName}
                        />
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
                  dataSource={customerslist}
                  scroll={{ x: 1200 }}
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
            <AddDtoModal 
              visible={editModal2}
              onCancel={this.handleOk}
              id={record.id}
            />
          </Layout>
        </Spin>
      </div>
    );
  }
}

export default connect((state) => state.system, { editCustomers, fetchCustomers, addCustomers, fetchAllCustomers, fetchProvinces, deleteCustomers })(customerInfo)
