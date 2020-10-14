import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Button, Form, Input, message, Layout, Row, Col, Table, Select, Tag, Modal } from 'antd';
import { fetchWarehouse, fetchUsers, deleteWarehouses } from '@actions/baseInfo';
import AddWarehouse from './modal/addWarehouse';

const { Option } = Select;
const FormItem = Form.Item;
const { Content } = Layout;

@Form.create({})
class warehouseInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warehouseList: [],
      visible: false,
      pagination: {
        current: 1,
        pageSize: 10,
      },
      userList: [],
      record: {}
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
        title: '节点编号',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: '节点名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '节点类型',
        dataIndex: 'type',
        key: 'type',
        render: (text, record) => {
          const type = {
            'OWNER':'携赁仓库',
            'OWNER_ASSIST':'携赁外协仓库',
            'CUSTOMER_START':'客户始发端仓库',
            'CUSTOMER_RECOVERY':'客户回收端仓库',
            'VIRTUAL':'虚拟仓库',
            'OTHER':'其他'
          }
          return (
            <span>{type[record.type]}</span>
          )
        }
      },
      {
        title: '节点地址',
        dataIndex: 'districtDetail',
        key: 'districtDetail',
      },
      {
        title: '节点备注',
        dataIndex: 'remark',
        key: 'remark',
      },
      {
        title: '联系人',
        dataIndex: 'head',
        key: 'head',
      },
      {
        title: '联系电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '电子邮箱',
        dataIndex: 'email',
        key: 'email',
        width: 100,
      },
      {
        title: '操作',
        key: 'operate',
        render: (text, record, index) => {
          return (
            <div>
              <span>
                <a onClick={() => this.editRole(record)}>库位编辑</a>
                <span className="ant-divider" />
              </span>
              <span>
                <a onClick={() => this.handleDelete(record)}>删除</a>
              </span>
            </div>
          );
        },
      },
    ];
  }

  componentDidMount() {
    this.setState({
      loading: true
    })
    this.getWarehouse({page:'0', size: '10'});
    this.getUser();
  }

  getWarehouse = (params) => {
    this.props.fetchWarehouse({...params}).then(res=>{
     this.setState({
       warehouseList: res.data.content,
       pagination: {
        current: res.data.pageable.pageNumber + 1,
        pageSize: res.data.pageable.pageSize,
        total: res.data.totalElements,
      },
      loading: false
     })
    });
  }

  getUser = () => {
    this.props.fetchUsers().then(res=>{
      this.setState({
        userList: res.data
      })
    })
  }

  handleTableChange = (pagination) => {
    console.log(pagination)
    const { current, pageSize } = pagination;
    this.getWarehouse({
      page: current-1, size: pageSize
    });
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.setState({
      loading: true
    })
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.fetchWarehouse({...values, page:'0', size: '10'}).then(res=>{
          this.setState({
            warehouseList: res.data.content,
            pagination: {
              current: res.data.pageable.pageNumber + 1,
              pageSize: res.data.pageable.pageSize,
              total: res.data.totalElements,
            },
            loading: false
          })
        })
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
      visible: false
    })
  }

  handleDelete = (record) => {
    Modal.confirm({
      title: "删除节点",
      content: "确定要删除节点吗?",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        this.deleteWarehouses(record.id)
      },
    });
  }

  deleteWarehouses = (id) => {
    this.props.deleteWarehouses(id).then(res=>{
      if (res.data === true) {
        message.success('删除成功！')
      } else {
        message.error('删除失败！')
      }
      location.reload();
    })
  }

  render() {
    const { pagination } = this.state;
    const { loading, warehouseList, visible, record } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="page page-scrollfix page-usermanage">
        <Layout>
          <Layout className="page-body">
            <Content>
              <Row>
                <div className="page-header">
                  <div className="layout-between">
                    <Form className="flexrow">
                      <Col span={6}>
                        <FormItem label="节点编码">
                          {getFieldDecorator('code', {
                            initialValue: '',
                            rules: [{ required: false, message: '请输入' }],
                          })(<Input
                            allowClear={true}
                            className="input-base-width"
                            size="default"
                            placeholder="请输入"
                          />)}
                        </FormItem>
                      </Col>
                      <Col span={6}>
                        <FormItem label="节点名称">
                          {getFieldDecorator('name', {
                            initialValue: '',
                            rules: [{ required: false, message: '请输入' }],
                          })(<Input
                            allowClear={true}
                            className="input-base-width"
                            size="default"
                            placeholder="请输入"
                          />)}
                        </FormItem>
                      </Col>
                      <Col span={6}>
                        <FormItem label="节点类型">
                          {getFieldDecorator('type', {
                            rules: [{ required: false, message: '请选择' }],
                          })(
                          <Select placeholder="请选择" style={{ width: '180px' }} allowClear={true}>
                            <Option value="OWNER">携赁仓库</Option>
                            <Option value="OWNER_ASSIST">携赁外协仓库</Option>
                            <Option value="CUSTOMER_START">客户始发端仓库</Option>
                            <Option value="CUSTOMER_RECOVERY">客户回收端仓库</Option>
                            <Option value="VIRTUAL">虚拟仓库</Option>
                          </Select>)}
                        </FormItem>
                      </Col>
                      <Col span={6}><Button size="small" onClick={this.handleSearch}>查询</Button></Col>
                    </Form>
                  </div>
                </div>
              </Row>
              <Row style={{ marginBottom: '10px' }}>
                <Col span={1}><Button size="small" type="primary" onClick={this.handleAdd}>新增</Button></Col>
              </Row>
              <div className="page-content table-flex table-scrollfix">
                <Table
                  bordered
                  rowKey="id"
                  columns={this.renderColumn()}
                  dataSource={warehouseList}
                  pagination={{...pagination, showSizeChanger: true}}
                  onChange={this.handleTableChange}
                />
              </div>
            </Content>
            <AddWarehouse
              visible={visible}
              onCancel={this.onCancel}
              record={record}
            />
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default connect((state) => state.warehouse, { fetchWarehouse, fetchUsers, deleteWarehouses })(warehouseInfo)
