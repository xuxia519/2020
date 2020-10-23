import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Layout, message, Row, Select, Form, Col, Input, Table, DatePicker, Modal, AutoComplete, Slider } from 'antd';

import '@styles/set.less'
import { fetchUnPackRecord, fetchWarehousesAlls } from '@actions/pavo'
import AddModal from './modal/addModal';
import moment from 'moment';
const { Option } = Select;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Content } = Layout

@Form.create({})
class unpackManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      list: [],
      visible: false,
      warehouseList: [],
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
        title: 'HU',
        key: 'name',
        render: (text, record) => {
          return (
            <span>{record.warehouseArea.name}</span>
          )
        }
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
    this.props.fetchUnPackRecord({pageNumber:'0', pageSize: '10'}).then(res=>{
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
        this.props.fetchUnPackRecord({...values, pageNumber:'0', pageSize: '10'}).then(res=>{
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

  onCancel = () => {
    this.setState({
      visible: false,
    })
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
    const { list, warehouseList, warehouseAreas } = this.state;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 15 },
    };
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
                        <FormItem {...formItemLayout} name="warehouseAreaId" label="库位">
                          {getFieldDecorator('warehouseAreaId', {
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
                      <Col span={6}><FormItem><Button size="small" htmlType="submit">查询</Button><Button size="small" type="primary" onClick={this.handleAdd}>拆包</Button></FormItem></Col>
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
          </Layout>
        </Layout>
      </div>
    )
  }
}
export default connect((state) => state.warehouseManage, { fetchUnPackRecord, fetchWarehousesAlls })(unpackManage)