import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Layout, message, Row, Select, Form, Col, Input, Table, Icon, Modal, Tree } from 'antd';

import '@styles/set.less'

const FormItem = Form.Item;
const { Content } = Layout

@Form.create({})
class inboundManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
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
        title: '出发地',
        dataIndex: 'name',
        key: 'name',
        width: '15%',
      },
      {
        title: '接受地',
        dataIndex: 'description',
        key: 'description',
        width: '15%',
      },
      {
        title: '出发日期',
        dataIndex: 'description',
        key: 'operate',
        width: '15%',
      },
      {
        title: '接收日期',
        dataIndex: 'description',
        key: 'operate',
        width: '15%',
      },
      {
        title: '是否BOM炸开',
        dataIndex: 'description',
        key: 'operate',
        width: '15%',
      },
      {
        title: '计划单号',
        dataIndex: 'description',
        key: 'operate',
      },
    ];
    return configArr;
  }

  componentDidMount() {
    
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.setState({
      loading: true
    })
    this.props.form.validateFields((err, values) => {
      if (!err) {
        
      }
    })
  };

  render() {
    const { getFieldDecorator } = this.props.form;
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
                        <FormItem label="出发地">
                          {getFieldDecorator('address', {
                            rules: [
                              {
                                required: false,
                                message: "请输入",
                              },
                            ],
                            initialValue: "",
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
                      <Col span={8}>
                        <FormItem label="入库类型">
                          {getFieldDecorator('type', {
                              rules: [
                                {
                                  required: false,
                                  message: "请输入",
                                },
                              ],
                              initialValue: [],
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
                      <Col span={8}>
                        <FormItem label="入库单号">
                          {getFieldDecorator('name', {
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
                    </Row>
                    <Row>
                      <Col span={8}>
                        <FormItem label="接受地">
                          {getFieldDecorator('name', {
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
                      <Col span={8}>
                        <FormItem label="料号">
                          {getFieldDecorator('name', {
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
                      <Col span={8}>
                        <FormItem label="">
                          {getFieldDecorator('name', {
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
                    </Row>
                    <Row>
                      <Col span={16}>
                        <FormItem label="出发日期">
                          {getFieldDecorator('name', {
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
                      <Col span={8}>
                        <FormItem label="计划单号">
                          {getFieldDecorator('name', {
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
                    </Row>
                    <Row>
                      <Col span={16}>
                        <FormItem label="接收日期">
                          {getFieldDecorator('name', {
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
                      <Col span={8}>
                        <FormItem label="运单号">
                          {getFieldDecorator('name', {
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
                  // rowSelection={rowSelection}
                  // dataSource={userlist}
                />
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}
export default connect((state) => state.warehouseManage, { })(inboundManage)