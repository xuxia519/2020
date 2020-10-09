import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Layout, message, Row, Select, Form, Col, Input, Table, Icon, Modal, Tree } from 'antd';
import { fetchPermissionsListByParam, fetchResourceList, editPermissions, addPermissions, deletePowers } from '@actions/system'

import '@styles/set.less'

const FormItem = Form.Item;
const { Content } = Layout

@Form.create({})
class powerManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      permissionList: [],
      editModal: false,
      permissions: [],
      treeData: [],
      resourceIds: [],
      halfCheckedKeys: [],
      description: '',
      name: '',
      type: '',
      pagination: {
        current: 1,
        pageSize: 10,
      },
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
        title: '权限名称',
        dataIndex: 'name',
        key: 'name',
        width: '15%',
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        width: '25%',
      },
      {
        title: '操作',
        key: 'operate',
        render: (text, record, index) =>(
          <div>
            <span>
              <a onClick={() => this.editRole(record)}>修改</a>
              <span className="ant-divider" />
            </span>
            <span>
              <a onClick={() => this.handleDelete(record)}>删除</a>
            </span>
          </div>
        )
      },
    ];
    return configArr;
  }

  componentDidMount() {
    this.setState({
      loading: true
    })
    this.getPermissions({page:'0', size: '10'});
    this.getResource();
  }

  getPermissions = (params) => {
    this.props.fetchPermissionsListByParam({...params}).then(res=>{
      this.setState({
        permissionList: res.data.content,
        pagination: {
          current: res.data.pageable.pageNumber + 1,
          pageSize: res.data.pageable.pageSize,
          total: res.data.totalElements,
        },
        loading: false
      })
    });
  }

  handleTableChange = (pagination) => {
    console.log(pagination)
    const { current, pageSize } = pagination;
    this.getPermissions({
      page: current-1, size: pageSize
    });
  };

  getResource = () => {
    this.props.fetchResourceList().then(res=>{
      this.setState({
        treeData: res.data
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
        this.props.fetchPermissionsListByParam({values, pageNumber:'0', pageSize: '10'}).then(res=>{
          this.setState({
            permissionList: res.data.content,
            loading: false
          })
        })
      }

    })
  };

  addRole = () => {
    this.setState({
      editModal: true,
      type: 'add',
      resourceIds: [],
      name: '',
      description: ''
    })
  }

  handleAdd = () => {
    const { resourceIds, description, name, halfCheckedKeys } = this.state;
    this.props.addPermissions({
      description,
      name,
      resourceIds: resourceIds.concat(halfCheckedKeys)
    }).then(res=> {
      if (res.status == '201') {
        message.success('新增成功');
        this.setState({
          editRoleModal: false
        })
        location.reload();
      }
    })
  }

  editRole = (record) => {
    const { description, name, resources } = record;
    const resourcesId = [];
    resources.forEach(item=>{
      resourcesId.push(item.id)
    })
    this.setState({
      editModal: true,
      record,
      description,
      name,
      resourceIds: resourcesId
    })
  }

  handleEdit = () => {
    const { record, description, name, resourceIds, halfCheckedKeys } = this.state;
    this.props.editPermissions({
      'id': record.id,
      description,
      name,
      resourceIds: resourceIds.concat(halfCheckedKeys)
    }).then(res=> {
      if (res.status == '200') {
        message.success('修改成功');
        this.setState({
          editRoleModal: false
        })
        location.reload();
      }
    })
  }

  handleOk = () => {
    this.setState({
      editModal: false
    })
  }

  onCheck = (checkedKeys,event) => {
    const { halfCheckedKeys } = event;
    this.setState({
      resourceIds: checkedKeys,
      halfCheckedKeys
    })
  };

  changeName = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  changeDescription = (e) => {
    this.setState({
      description: e.target.value
    })
  }

  handleDelete = (record) => {
    Modal.confirm({
      title: "删除角色",
      content: "确定要删除角色吗?",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        this.deletePowers(record.id)
      },
    });
  }

  deletePowers = (id) => {
    this.props.deletePowers(id).then(res=>{
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
    const { selectedRowKeys, permissionList, editModal, treeData, resourceIds, description, name, type, pagination } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div className="page page-scrollfix page-usermanage">
        <Layout>
          <Layout className="page-body">
            <Content>
              <Row>
                <div className="page-header">
                  <div className="layout-between">
                    <Form className="flexrow" onSubmit={this.handleSearch}>
                      <Col span={6}>
                        <FormItem label="权限名称">
                          {getFieldDecorator('name')(<Input
                            allowClear={true}
                            className="input-base-width"
                            size="default"
                            placeholder="请输入"
                          />)}
                        </FormItem>
                      </Col>
                      <Col span={6}><Button size="small" htmlType="submit">查询</Button></Col>
                    </Form>
                  </div>
                </div>
              </Row>
              <Row style={{ marginBottom: '10px' }}><Col span={1}><Button size="small" type="primary" onClick={this.addRole}>新增</Button></Col></Row>
              <div className="page-content table-flex table-scrollfix">
                <Table
                  bordered
                  rowKey="id"
                  columns={this.renderColumn()}
                  dataSource={permissionList}
                  pagination={{...pagination, showSizeChanger: true}}
                  onChange={this.handleTableChange}
                  // rowSelection={rowSelection}
                />
              </div>
            </Content>
            <Modal
              title={type == 'add' ? '新增权限' : '修改权限'}
              visible={editModal}
              onCancel={this.handleOk}
              footer={null}
            >
              <div>
                <Row style={{ marginBottom: '20px'}}>
                  <Col span={6}>权限名称</Col>
                  <Col span={12}><Input value={name} allowClear={true} onChange={this.changeName}/></Col>
                </Row>
                <Row style={{ marginBottom: '20px'}}>
                  <Col span={6}>描述</Col>
                  <Col span={12}><Input value={description} allowClear={true} onChange={this.changeDescription} /></Col>
                </Row>
                <Row style={{ marginBottom: '20px'}}>
                  <Col span={6}>资源</Col>
                  <Col span={12}>
                    <Tree
                      checkable
                      // checkStrictly={false}
                      onCheck={this.onCheck}
                      treeData={treeData}
                      checkedKeys={resourceIds}
                    />
                  </Col>
                </Row>
                <Row style={{ textAlign: 'center'}}>
                  <Button size="small" type="primary" onClick={type == 'add' ? this.handleAdd : this.handleEdit}>修改</Button>
                  <Button size="small" onClick={this.handleOk}>取消</Button>
                </Row>
              </div>
            </Modal>
          </Layout>
        </Layout>
      </div>
    )
  }
}
export default connect((state) => state.system, { fetchPermissionsListByParam, fetchResourceList, editPermissions, addPermissions, deletePowers })(powerManage)