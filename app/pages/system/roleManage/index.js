import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Button, Form, Input, Layout, Icon, message, Row, Col, Table, Select, Modal, Tag } from 'antd';
import { fetchRoleList, fetchPermissionsList, editRoles, fetchRoleListByParam, deletePermissions, addRoles } from '@actions/system'

const FormItem = Form.Item;
const { Content } = Layout;
const { Option } = Select;

@Form.create({})

class roleManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rolelist: [],
      loading: false,
      record: {},
      editRoleModal: false,
      permissions: [],
      checkedValues: [],
      permissionsSelectId: [],
      description: '',
      name: '',
      permissionslist: [],
      type: '',
      pagination: {
        current: 1,
        pageSize: 10,
      },
    };
  }
  renderColumn() {
    return [
      {
        title: "序号",
        width: '8%',
        render: (text, record, index) => `${index + 1}`
      },
      {
        title: '角色名',
        dataIndex: 'name',
        key: 'name',
        width: '25%',
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        width: '25%',
      },
      {
        title: '权限',
        dataIndex: 'permissions',
        key: 'permissions',
        width: '25%',
        render: (text, record, index) => {
          return (
            <div>
              {
                record.permissions.map(item=>{
                  return <Tag color="processing" key={item.id}>{item.name}</Tag>
                })
              }
            </div>
          )
        }
      },
      {
        title: '操作',
        key: 'operate',
        render: (text, record, index) => {
          return (
            <div>
              <span>
                <a onClick={() => this.editRole(record)}>修改</a>
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
    this.getRole({page:'0', size: '10'});
    this.getPermissions();
  }

  getRole = (params) => {
    this.props.fetchRoleListByParam({...params}).then(res=>{
      this.setState({
        rolelist: res.data.content,
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
    this.getRole({
      page: current-1, size: pageSize
    });
  };

  getPermissions = () => {
    this.props.fetchPermissionsList().then(res=>{
      const permissions = [];
      res.data.body.forEach(item => {
        permissions.push({
          value: item.id,
          label: item.name
        })
      })
      this.setState({
        permissionslist: res.data.body,
        permissions
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
        this.props.fetchRoleListByParam({values, pageNumber:'0', pageSize: '10'}).then(res=>{
          this.setState({
            rolelist: res.data.content,
            loading: false
          })
        })
      }

    })
  };

  addRole = () => {
    this.setState({
      editRoleModal: true,
      type: 'add',
      permissionsSelectId: [],
      name: '',
      description: ''
    })
  }

  handleAdd = () => {
    const { permissionsSelectId, description, name } = this.state;
    this.props.addRoles({
      description,
      name,
      permissionIds: permissionsSelectId
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
    const permissionsSelectId = [];
    record && record.permissions && record.permissions.map(item=>{
      permissionsSelectId.push(item.id.toString())
    })
    this.setState({
      editRoleModal: true,
      type: 'edit',
      record,
      permissionsSelectId,
      name: record.name,
      description: record.description
    })
  }

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

  onCheckboxChange = (checkedValues) => {
    this.setState({
      permissionsSelectId: checkedValues
    })
  }

  handleEdit = () => {
    const { record, permissionsSelectId, description, name } = this.state;
    const { id } = record;
    this.props.editRoles({
      id,
      description,
      name,
      permissionIds: permissionsSelectId
    }).then(res=> {
      if (res.status == '200') {
        message.success('修改成功');
        this.setState({
          editRoleModal: false
        }, () => {
          location.reload();
        })
      }
    })
  }

  handleOk = () => {
    this.setState({
      editRoleModal: false
    })
  }

  handleDelete = (record) => {
    Modal.confirm({
      title: "删除角色",
      content: "确定要删除角色吗?",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        this.deletePermission(record.id)
      },
    });
  }

  deletePermission = (id) => {
    this.props.deletePermissions(id).then(res=>{
      if (res.data === true) {
        message.success('删除成功！')
      } else {
        message.error('删除失败！')
      }
      location.reload();
    })
  }

  handlePermissionChange = (value) => {
    console.log(value)
  }

  render() {
    const { rolelist, loading, selectedRowKeys, editRoleModal, permissionsSelectId, name, description, permissionslist, type, pagination } = this.state;
    const { getFieldDecorator } = this.props.form;
    const children  = [];
    permissionslist.forEach(item => {
      children.push(<Option key={item.id}>{item.name}</Option>);
    })
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div className="page page-scrollfix page-usermanage">
        <Spin spinning={loading}>
          <Layout className="page-body">
            <Content>
              <Row>
                <div className="page-header">
                  <div className="layout-between">
                    <Form className="flexrow" onSubmit={this.handleSearch}>
                      <Col span={6}>
                        <FormItem label="角色名">
                          {getFieldDecorator('name')(<Input
                            allowClear={true}
                            className="input-base-width"
                            size="default"
                            placeholder="请输入"
                          />)}
                        </FormItem>
                      </Col>
                      <Col span={6}>
                        <FormItem label="权限">
                          {getFieldDecorator('permissionIds',{
                              rules: [
                                {
                                  required: false,
                                  message: "请输入",
                                },
                              ],
                              initialValue: [],
                            })(
                            <Select style={{ width: '150px'}} placeholder="请选择" allowClear={true} onChange={this.handlePermissionChange}>
                              {
                                permissionslist.map(item=>{
                                  return <Option key={item.id}>{item.description}</Option>
                                })
                              }
                            </Select>
                          )}
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
                  dataSource={rolelist}
                  pagination={{...pagination, showSizeChanger: true}}
                  onChange={this.handleTableChange}
                  // rowSelection={rowSelection}
                />
              </div>
            </Content>
            <Modal
              title={type == 'add' ? '新增角色' : '修改角色'}
              visible={editRoleModal}
              onCancel={this.handleOk}
              footer={null}
            >
              <div>
                <Row style={{ marginBottom: '20px'}}>
                 <Col span={4}>角色名称</Col>
                 <Col span={8}>
                  <Input className="input-base-width" allowClear={true} value={name} size="default" onChange={this.changeName}/>
                 </Col>
                </Row>
                <Row style={{ marginBottom: '20px'}}>
                 <Col span={4}>描述</Col>
                 <Col span={8}>
                  <Input
                    allowClear={true}
                    className="input-base-width"
                    size="default"
                    value={description}
                    onChange={this.changeDescription}
                  />
                 </Col>
                </Row>
                <Row style={{ marginBottom: '20px'}}>
                 <Col span={4}>权限</Col>
                 <Col span={12}>
                  <div>
                    <Select
                      mode="multiple"
                      allowClear={true}
                      allowClear
                      style={{ width: '100%' }}
                      placeholder="Please select"
                      value={permissionsSelectId}
                      onChange={this.onCheckboxChange}
                    >
                      {children}
                    </Select>
                  </div>
                 </Col>
                </Row>
                <Row style={{ textAlign: 'center'}}>
                  <Button size="small" type="primary" onClick={type == 'add' ? this.handleAdd : this.handleEdit}>修改</Button>
                  <Button size="small" onClick={this.handleOk}>取消</Button>
                </Row>
              </div>
            </Modal>
          </Layout>
        </Spin>
      </div>
    );
  }
}
export default connect((state) => state.system, { fetchRoleList, fetchPermissionsList, editRoles, fetchRoleListByParam, deletePermissions, addRoles })(roleManage)