import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Layout, message, Row, Select, Form, Col, Input, Table, DatePicker, Modal, Tree } from 'antd';

import '@styles/set.less'
import { fetchInboundRecord } from '@actions/pavo'
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Content } = Layout

@Form.create({})
class transferManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
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
        title: '编号',
        dataIndex: 'name',
        key: 'name',
        width: '10%',
      },
      {
        title: '入库类型',
        dataIndex: 'description',
        key: 'description',
        width: '10%',
      },
      {
        title: '接收节点',
        dataIndex: 'description',
        key: 'operate',
        width: '10%',
      },
      {
        title: '状态',
        dataIndex: 'description',
        key: 'operate',
        width: '10%',
      },
      {
        title: '操作员',
        dataIndex: 'description',
        key: 'operate',
        width: '10%',
      },
      {
        title: '计划日期',
        dataIndex: 'description',
        key: 'operate',
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: () => {
          return (
            <div>
              <span>
                <a onClick={() => this.handleAdd1(record)}>库位编辑</a>
                <span className="ant-divider" />
              </span>
              <span>
                <a onClick={() => this.handleDelete(record)}>删除</a>
              </span>
            </div>
          );
        }
      }
    ];
    return configArr;
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.props.fetchInboundRecord({pageNumber:'0', pageSize: '10'}).then(res=>{
      this.setState({
        list: res.data.content,
        loading: false
      })
    });
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.setState({
      loading: true
    })
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.fetchInboundRecord({...values, pageNumber:'0', pageSize: '10'}).then(res=>{
          this.setState({
            list: res.data.content,
            loading: false
          })
        });
      }
    })
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { list } = this.state;
    const formItemLayout = {
      labelCol: { span: 9 },
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
                      <Col span={6}>
                        <FormItem label="入库类型" {...formItemLayout}>
                          {getFieldDecorator('type', {
                              rules: [
                                {
                                  required: false,
                                  message: "请输入",
                                },
                              ],
                              initialValue: '',
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
                      <Col span={6}>
                        <FormItem label="入库计划编号" {...formItemLayout}>
                          {getFieldDecorator('code', {
                            rules: [
                              {
                                required: false,
                                message: "请输入",
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
                      <Col span={6}>
                        <FormItem label="接收节点" {...formItemLayout}>
                          {getFieldDecorator('warehouse', {
                            rules: [
                              {
                                required: false,
                                message: "请输入",
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
                      <Col span={6}>
                        <FormItem label="状态" {...formItemLayout}>
                          {getFieldDecorator('status', {
                            rules: [
                              {
                                required: false,
                                message: "请输入",
                              },
                            ],
                            initialValue: "",
                            })(
                              <Select style={{ width: '150px'}} allowClear={true}>
                                <Option key='1' value='1'>已执行</Option>
                                <Option key='0' value='0'>未执行</Option>
                              </Select>
                            )}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={6}>
                        <FormItem label="操作员" {...formItemLayout}>
                          {getFieldDecorator('operator', {
                            rules: [
                              {
                                required: false,
                                message: "请输入",
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
                      <Col span={6}>
                        <FormItem label="计划日期" {...formItemLayout}>
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
                      <Col span={6}><FormItem><Button size="small" htmlType="submit">查询</Button></FormItem></Col>
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
export default connect((state) => state.warehouseManage, { fetchInboundRecord })(transferManage)