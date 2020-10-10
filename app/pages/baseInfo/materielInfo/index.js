import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Button, Form, Input, message, Layout, Row, Col, Table, Select, Modal, Radio, DatePicker, Tag } from 'antd';
import moment from 'moment';
import AddModal from './modal/addModal';

import { fetchDeviceTypes, fetchDevice } from '@actions/pavo'

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
      deviceTypeList: [],
      deviceList: [],
      type: 1,
      name: '',
      code: '',
      owner: '',
      isCirculation: '',
      record: {},
      handleType: 'add'
    };
  }

  renderColumn() {
    const { type } = this.state;
    const column1 = [
      {
        title: "序号",
        width: '8%',
        render: (text, record, index) => `${index + 1}`
      },
      {
        title: '物料编号',
        dataIndex: 'code',
        key: 'code',
        width: '10%',
      },
      {
        title: '物料简称',
        dataIndex: 'abbreviation',
        key: 'abbreviation',
        width: '10%',
      },
      {
        title: '物料全称',
        dataIndex: 'name',
        key: 'name',
        width: '10%',
      },
      {
        title: '颜色',
        dataIndex: 'color',
        key: 'color',
        width: '10%',
      },
      {
        title: '重量',
        dataIndex: 'weight',
        key: 'weight',
        width: '10%',
      },
      {
        title: '单位',
        dataIndex: 'unit',
        key: 'unit',
        width: '10%',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        width: '10%',
      },
      {
        title: '材质',
        dataIndex: 'materialQuality',
        key: 'materialQuality',
        width: '10%',
      },
      {
        title: '归属',
        dataIndex: 'owner',
        key: 'owner',
        width: '10%',
      },
      {
        title: '是否循环包装',
        dataIndex: 'isCirculation',
        key: 'isCirculation',
        width: '10%',
        render: (text, record) => (
          <span>{record.isCirculation == 'true' ? '可循环' : '一次性'}</span>
        )
      },
    ]
    
    const column2 = [
      {
        title: '外长',
        dataIndex: 'foldLength',
        key: 'foldLength',
        width: '10%'
      },
      {
        title: '外宽',
        dataIndex: 'foldWidth',
        key: 'foldWidth',
        width: '10%',
      },
      {
        title: '外高',
        dataIndex: 'foldHeight',
        key: 'foldHeight',
        width: '10%',
      },
      {
        title: '内长',
        dataIndex: 'insideLength',
        key: 'insideLength',
        width: '10%'
      },
      {
        title: '内宽',
        dataIndex: 'insideWidth',
        key: 'insideWidth',
        width: '10%',
      },
      {
        title: '内高',
        dataIndex: 'insideHeight',
        key: 'insideHeight',
        width: '10%',
      },
      {
        title: '箱子折叠长',
        dataIndex: 'foldLength',
        key: 'foldLength',
        width: '10%'
      },
      {
        title: '箱子折叠宽',
        dataIndex: 'foldWidth',
        key: 'foldWidth',
        width: '10%',
      },
      {
        title: '箱子折叠高',
        dataIndex: 'foldHeight',
        key: 'foldHeight',
        width: '10%',
      },
      {
        title: '套叠扣减高度',
        dataIndex: 'deduct',
        key: 'deduct',
        width: '10%',
      },
    ]
    const column3 = [
      {
        title: '备注',
        dataIndex: '',
        key: '',
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
    ]
    return column1.concat(column2,column3)
  }

  componentDidMount() {
    this.props.form.setFieldsValue({ key: '' });
    this.setState({
      loading: true
    })
    this.fetchDeviceTypes();
    this.fetchDevice();
  }

  fetchDevice = () => {
    const { type } = this.state;
    this.props.fetchDevice({type, pageNumber:'0', pageSize: '10'}).then(res=>{
      this.setState({
        deviceList: res.data.content,
        loading: false
      })
    });
  }

  handleSearch = () => {
    const { type } = this.state;
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      console.log(values)
      this.props.fetchDevice({...values, type, pageNumber:'0', pageSize: '10'}).then(res=>{
        this.setState({
          deviceList: res.data.content,
          loading: false
        })
      });
    })
  }

  fetchDeviceTypes = () => {
    this.props.fetchDeviceTypes().then(res=>{
      this.setState({
        deviceTypeList: res.data,
        loading: false
      })
    });
  }

  handleAdd = () => {
    this.setState({
      editModal: true,
      handleType: 'add'
    })
  }

  handleOk = () => {
    this.setState({
      editModal: false,
    })
  }

  handleEdit = (record) => {
    this.setState({
      editModal: true,
      record,
      handleType: 'edit'
    })
  }

  changeType = (val) => {
    this.setState({
      type: val
    })
  }

  render() {
    const { loading, deviceList, editModal, type, deviceTypeList, record, handleType } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 14 },
    };
    return (
      <div className="page page-scrollfix page-usermanage">
        <Layout>
          <Layout className="page-body">
            <Content>
              <div className="page-header">
                <div className="layout-between">
                  <Form style={{ width: '100%' }} onSubmit={this.handleSearch}>
                    <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
                      <Col span={6}>
                        <FormItem {...formItemLayout} label="物料编号">
                          {getFieldDecorator('code', {
                            rules: [{ required: false, message: '请输入' }],
                            initialValue: '',
                          })(<Input placeholder="请输入"  allowClear={true}/>)}
                        </FormItem>
                      </Col>
                      <Col span={6}>
                        <FormItem {...formItemLayout} label="物料归属">
                          {getFieldDecorator('owner', {
                            rules: [{ required: false, message: '请输入' }],
                            initialValue: '',
                          })(<Input placeholder="请输入"  allowClear={true}/>)}
                        </FormItem>
                      </Col>
                      <Col span={6}>
                        <FormItem {...formItemLayout} label="物料名称">
                          {getFieldDecorator('name', {
                            rules: [{ required: false, message: '请输入' }],
                            initialValue: '',
                          })(<Input placeholder="请输入" allowClear={true}/>)}
                        </FormItem>
                      </Col>
                      <Col span={6}>
                        <FormItem {...formItemLayout} label="物料类型">
                          {getFieldDecorator('type', {
                            rules: [{ required: false, message: '请输入' }],
                            initialValue: 1,
                          })(
                            <Select style={{ width: '150px'}} placeholder="请选择" allowClear={true} defaultValue={type} onChange={this.changeType}>
                              {
                                deviceTypeList.map(item=>{
                                  return <Option key={item.id} value={item.id}>{item.name}</Option>
                                })
                              }
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={6}>
                        <FormItem {...formItemLayout} label="是否循环">
                          {getFieldDecorator('isCirculation', {
                            rules: [{ required: false, message: '请输入' }],
                            initialValue: '',
                          })(
                            <Select style={{ width: '150px'}} placeholder="请选择" allowClear={true}>
                              <Option key={1} value={true}>可循环</Option>
                              <Option key={2} value={false}>一次性</Option>
                            </Select>
                          )}
                        </FormItem>
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
                  dataSource={deviceList}
                />
              </div>
            </Content>
            <AddModal 
              visible={editModal}
              onCancel={this.handleOk}
              deviceTypeList={deviceTypeList}
              record={record}
              handleType={handleType}
            />
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default connect((state) => state.system, { fetchDeviceTypes, fetchDevice })(materielInfo)
