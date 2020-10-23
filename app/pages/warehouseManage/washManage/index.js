import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Layout, message, Row, Select, Form, Col, Input, Table, DatePicker, Modal, AutoComplete, Slider } from 'antd';

import '@styles/set.less'
import { fetchWashRecord, fetchWarehousesAlls, fetchDevicesByCodes } from '@actions/pavo'
import AddModal from './modal/addModal';
import moment from 'moment';
const { Option } = Select;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Content } = Layout

@Form.create({})
class washManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      list: [],
      visible: false,
      warehouseList: [],
      options: [],
      warehouseAreas : []
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
        title: '仓库',
        dataIndex: 'code',
        key: 'code',
        width: '15%',
      },
      
      {
        title: 'HU',
        key: 'name',
        render: (text, record) => {
          return (
            <span>{record.warehouseArea.name}</span>
          )
        }
      },
      {
        title: '操作时间',
        dataIndex: 'type',
        key: 'type',
        width: '15%',
      },
      {
        title: '料号',
        key: 'wcode',
        render: (text, record) => {
          return (
            <span>{record.warehouseArea.code}</span>
          )
        }
      },
      {
        title: '操作员',
        dataIndex: 'createTime',
        key: 'createTime',
        width: '15%',
      },
      {
        title: '数量',
        dataIndex: 'createTime',
        key: 'createTime',
        width: '15%',
      },
      {
        title: '操作',
        dataIndex: 'createTime',
        key: 'createTime',
        width: '15%',
      },
    ];
    return configArr;
  }

  componentDidMount() {
    this.getData();
    this.fetchWarehousesAlls();
    this.setState({
      loading: true
    })
  }

  getData = () => {
    this.props.fetchWashRecord({pageNumber:'0', pageSize: '10'}).then(res=>{
      this.setState({
        list: res.data.content,
        loading: false
      })
    });
  }

  fetchWarehousesAlls = () => {
    this.props.fetchWarehousesAlls().then(res=>{
      this.setState({
        warehouseList: res.data
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
        console.log(values.date.length)
        const startTime = moment(values.date[0]).format('YYYY-MM-DD HH:mm:ss');
        const endTime = moment(values.date[1]).format('YYYY-MM-DD HH:mm:ss');
        const params = values;
        if (values.date.length > 0) {
          params.startTime = startTime;
          params.endTime = endTime;
        } else {
          params.startTime = '';
          params.endTime = '';
        }
        delete values.date;
        this.props.fetchWashRecord({...params, pageNumber:'0', pageSize: '10'}).then(res=>{
          this.setState({
            list: res.data.content,
            loading: false
          })
        });
      }
    })
  };

  changeWarehouse = (value) => {
    const { warehouseList } = this.state;
    const warehouse = warehouseList.filter(item=>{
      return item.id == value
    })
    this.setState({
      warehouseAreas: warehouse[0].warehouseAreas
    })
  }

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
    const { list, warehouseList, options, warehouseAreas } = this.state;
    const formItemLayout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 15 },
    };
    const children = options.map(item=><Option key={item.id}>{item.code}</Option>)
    return (
      <div className="page page-scrollfix page-usermanage">
        <Layout>
          <Layout className="page-body">
            <Content>
              <div className="page-header">
                <div className="layout-between">
                  <Form style={{ width: '100%' }} onSubmit={this.handleSearch}>
                    <Row>
                      <Col span={8}>
                        <FormItem label="仓库" {...formItemLayout}>
                          {getFieldDecorator('type', {
                              rules: [
                                {
                                  required: false,
                                  message: "请选择",
                                },
                              ],
                            })(
                              <Select allowClear={true} placeholder="请选择">
                                {
                                  warehouseList.map(item=>{
                                    return <Option key={item.id}>{item.name}</Option>
                                  })
                                }
                              </Select>
                            )}
                        </FormItem>
                      </Col>
                      <Col span={8}>
                        <FormItem label="料号" {...formItemLayout}>
                          {getFieldDecorator('status', {
                            rules: [
                              {
                                required: false,
                                message: "请输入",
                              },
                            ],
                            initialValue: "",
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
                      <Col span={8}>
                        <FormItem {...formItemLayout} name="warehouse" label="节点">
                          {getFieldDecorator('warehouse', {
                            initialValue: "",
                            rules: [{ required: false, message: '请选择' }],
                          })(
                            <Select allowClear={true} placeholder="请选择" onChange={this.changeWarehouse}>
                              {
                                warehouseList.map(item=>{
                                  return <Option key={item.id}>{item.name}</Option>
                                })
                              }
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                      <Col span={8}>
                        <FormItem {...formItemLayout} name="warehouseAreaCode" label="库位">
                          {getFieldDecorator('warehouseAreaCode', {
                            initialValue: "",
                            rules: [{ required: false, message: '请选择' }],
                          })(
                            <Select allowClear={true} placeholder="请选择">
                              {
                                warehouseAreas.map(item=>{
                                  return <Option key={item.code}>{item.code}-{item.name}</Option>
                                })
                              }
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <FormItem label="日期" {...formItemLayout}>
                          {getFieldDecorator('date', {
                            rules: [
                              {
                                required: false,
                                message: "请输入",
                              },
                            ],
                            initialValue: "",
                            })(
                             <RangePicker showTime allowClear={true}/>
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
            />
          </Layout>
        </Layout>
      </div>
    )
  }
}
export default connect((state) => state.warehouseManage, { fetchWashRecord, fetchWarehousesAlls, fetchDevicesByCodes })(washManage)