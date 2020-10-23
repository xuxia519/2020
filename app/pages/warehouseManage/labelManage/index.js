import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Layout, message, Row, Select, Form, Col, Input, Table, DatePicker, Modal, AutoComplete, Slider, Spin } from 'antd';

import '@styles/set.less';
import { fetchWarehousesAlls, fetchCodeDevice } from '@actions/pavo';
import { fetchUsers } from '@actions/baseInfo';
import AddModal from './modal/addModal';
import moment from 'moment';
const { Option } = Select;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Content } = Layout

@Form.create({})
class labelManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      visible: false,
      warehouseList: [],
      options: [],
      users: []
    };
  }

  renderColumn() {
    const configArr = [
      {
        title: "序号",
        width: '8%',
        render: (text, record, index) => `${index + 1}`
      },
      {
        title: '节点',
        dataIndex: 'warehouseArea',
        key: 'warehouseArea',
        render: (text, record) => {
          return (
            <span>{record.warehouseArea.name}</span>
          )
        }
      },
      
      {
        title: '工号',
        dataIndex: 'operatorCode',
        key: 'operatorCode',
      },
      {
        title: '编号',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: '打印人',
        dataIndex: 'operator',
        key: 'operator',
      },
      {
        title: '打印时间',
        dataIndex: 'printTime',
        key: 'printTime',
      },
      {
        title: '质量标记',
        dataIndex: 'qualityLabel',
        key: 'qualityLabel',
      },
      {
        title: '检验',
        dataIndex: 'test',
        key: 'test',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
      },
      {
        title: '操作',
        dataIndex: 'operator',
        key: 'operator',
      },
    ];
    return configArr;
  }

  componentDidMount() {
    this.getData();
    this.fetchWarehousesAlls();
    this.getAllUser();
  }

  getData = () => {
    this.props.fetchCodeDevice({pageNumber:'0', pageSize: '10'}).then(res=>{
      this.setState({
        list: res.data.content,
        loading: false
      })
    });
  }

  fetchWarehousesAlls = () => {
    this.props.fetchWarehousesAlls().then(res=>{
      this.setState({
        warehouseList: res.data,
        loading: false
      })
    })
  }

  getAllUser = () => {
    this.props.fetchUsers().then(res=>{
      this.setState({
        users: res.data
      })
    })
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.setState({
      loading: true
    })
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.fetchCodeDevice({...values, pageNumber:'0', pageSize: '10'}).then(res=>{
          this.setState({
            list: res.data.content,
            loading: false
          })
        });
      }
    })
  };

  handleAdd = () => {
    this.setState({
      visible: true
    })
  }

  onCancel = () => {
    this.setState({
      visible: false,
    })
  }

  onSelect = (value, option) => {
    // this.setState({
    //   deviceId: value,
    //   code: option.props.children
    // })
  };

  onSearch = (searchText) => {
    this.props.fetchDevicesByCodes(searchText).then(res=>{
      this.setState({
        options: res.data
      })
    })
  }

  handleEdit = (record) => {

  }

  handleDelete = (record) => {
    Modal.confirm({
      title: "删除节点",
      content: "确定要删除节点吗?",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        this.deleteInboundRecord(record.id)
      },
    });
  }

  deleteInboundRecord = (id) => {
    this.props.deleteInboundRecord(id).then(res=>{
      if (res.data === true) {
        message.success('删除成功！')
      } else {
        message.error('删除失败！')
      }
      location.reload();
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { list, warehouseList, options, loading, users } = this.state;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    };
    const children = options.map(item=><Option key={item.id}>111</Option>)
    return (
      <div className="page page-scrollfix page-usermanage">
        <Spin spinning={loading}>
          <Layout className="page-body">
            <Content>
              <div className="page-header">
                <div className="layout-between">
                  <Form style={{ width: '100%' }} onSubmit={this.handleSearch}>
                    <Row>
                    <Col span={8}>
                        <FormItem label="编号" {...formItemLayout}>
                          {getFieldDecorator('code', {
                            rules: [
                              {
                                required: false,
                                message: "请输入",
                              },
                            ],
                            })(
                              <Input placeholder="请输入编号" allowClear={true} autoComplete="off"/>
                            )}
                        </FormItem>
                      </Col>
                      <Col span={8}>
                        <FormItem label="工号" {...formItemLayout}>
                          {getFieldDecorator('operatorCode', {
                            rules: [
                              {
                                required: false,
                                message: "请输入",
                              },
                            ],
                            })(
                              <Select allowClear={true} placeholder="请选择">
                                {
                                  users.map(item=>{
                                    return <Option key={item.id}>{item.code}</Option>
                                  })
                                }
                              </Select>
                            )}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={6}><FormItem><Button size="small" htmlType="submit">查询</Button><Button size="small" type="primary" onClick={this.handleAdd}>新增</Button></FormItem></Col>
                    </Row>
                  </Form>
                </div>
              </div>
              <div className="page-content table-flex table-scrollfix">
                <Table
                  bordered
                  rowKey="id"
                  columns={this.renderColumn()}
                  dataSource={list}
                />
              </div>
            </Content>
            <AddModal 
              visible={this.state.visible}
              onCancel={this.onCancel}
              options={options}
              warehouseList={warehouseList}
              users={users}
            />
          </Layout>
        </Spin>
      </div>
    )
  }
}
export default connect((state) => state.warehouseManage, { fetchWarehousesAlls, fetchCodeDevice, fetchUsers })(labelManage)