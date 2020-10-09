import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Button, Form, Input, message, Layout, Row, Col, Table, Icon, Select, Modal, Tag } from 'antd';
import { fetchUserList, fetchRoleList, editUserRole, deleteUserRoles } from '@actions/system'

const { Option } = Select;
const FormItem = Form.Item;
const { Content } = Layout;

@Form.create({})
class userManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uservisible: false,
      editRoleModal: false,
      userinfo: {},
      update: false,
      userlist: [],
      rolelist: [],
      record: {},
      loading: false,
      checkedList: [],
      pagination: {
        current: 1,
        pageSize: 10,
      },
    };
    this.options = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' },
    ];
  }

  renderColumn() {
    return [
      {
        title: "序号",
        width: '8%',
        render: (text, record, index) => `${index + 1}`
      },
      {
        title: '用户编号',
        dataIndex: 'code',
        key: 'code',
        width: '15%',
        render: (text, record, index) => {
          return (
            <span onClick={()=>this.clickUser(record)} style={{ color: '#4da9ec', cursor: 'pointer'}}>{record.code}</span>
          )
        }
      },
      {
        title: '用户名称',
        dataIndex: 'name',
        key: 'name',
        width: '15%',
      },
      {
        title: '角色',
        dataIndex: 'roleList',
        key: 'roleList',
        width: '25%',
        render: (text, record, index) => {
          return (
            <div>
              {
                record.roleList.map(item=>{
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
                <a onClick={() => this.handleDeleteUser(record)}>删除角色</a>
                <span className="ant-divider" />
              </span>
              <span>
                {/* <a>复制</a> */}
              </span>
            </div>
          );
        },
      },
    ];
  }

  componentDidMount() {
    this.props.form.setFieldsValue({ key: '' });
    this.setState({
      loading: true
    })
    this.getUser({page:'0', size: '10'});
    this.getRole();
  }

  getUser = (params) => {
    this.props.fetchUserList({...params}).then(res=>{
      console.log(params)
      this.setState({
        userlist: res.data.content,
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
    this.getUser({
      page: current-1, size: pageSize
    });
  };

  getRole = () => {
    this.props.fetchRoleList().then(res=>{
      this.setState({
        rolelist: res.data
      })
    });
  }

  clickUser = (record) => {
    this.setState({
      uservisible: true,
      userinfo: record
    })
  }

  editRole = (record) => {
    const roleSelectId = [];
    record.roleList.map(item=>{
      roleSelectId.push(item.id.toString())
    })
    this.setState({
      editRoleModal: true,
      record,
      roleSelectId
    })
  }

  pageNumberChange = e => {
    const { value } = e.target;
    this.setState({
      pageNumber: value
    })
  }

  pageSizeChange = value => {
    this.setState({
      pageSize: value
    })
  }

  handleOk = () => {
    this.setState({
      uservisible: false,
      editRoleModal: false
    })
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.setState({
      loading: true
    })
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.fetchUserList({values, pageNumber:'0', pageSize: '10'}).then(res=>{
          this.setState({
            userlist: res.data.content,
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

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  }

  onCheckboxChange = (value,option) => {
    this.setState({
      roleSelectId: value
    })
  }

  handleRoleChange = (value) => {
    console.log(value)
  }

  handleEdit = () => {
    const { record, roleSelectId } = this.state;
    this.props.editUserRole({
      'id': record.id,
      "roleIds": roleSelectId
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

  handleDeleteUser = (record) => {
    Modal.confirm({
      title: "删除用户",
      content: "确定要删除用户吗?",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        this.deleteUserRoles(record.id)
      },
    });
  }

  deleteUserRoles = (id) => {
    this.props.deleteUserRoles({roleIds: [''], id}).then(res=>{
      if (res.data == 200) {
        message.success('删除成功！')
      } else {
        message.error('删除失败！')
      }
      location.reload();
    })
  }

  render() {
    const { loading, selectedRowKeys, uservisible, userinfo, userlist, rolelist, editRoleModal, roleSelectId, pagination } = this.state;
    const children  = [];
    rolelist.forEach(item => {
      children.push(<Option key={item.id}>{item.name}</Option>);
    })
    const { page = {} } = this.props;
    const { pageNumber, pageSize, totalPages, totalElements } = page;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const { getFieldDecorator } = this.props.form;
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
                        <FormItem label="用户编号">
                          {getFieldDecorator('code', {
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
                      <Col span={6}>
                        <FormItem label="角色">
                          {getFieldDecorator('roleIds', {
                              rules: [
                                {
                                  required: false,
                                  message: "请输入",
                                },
                              ],
                              initialValue: [],
                            })(
                            <Select style={{ width: '150px'}} placeholder="请选择" allowClear={true} onChange={this.handleRoleChange}>
                              {
                                rolelist.map(item=>{
                                  return <Option key={item.id}>{item.description}</Option>
                                })
                              }
                            </Select>
                            )}
                        </FormItem>
                      </Col>
                      <Col span={6}>
                        <FormItem label="用户名">
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
                      <Col span={6}><FormItem><Button size="small" htmlType="submit">查询</Button></FormItem></Col>
                    </Form>
                  </div>
                </div>
              </Row>
              {/* <Row><Col span={1}><Button size="small">导出</Button></Col></Row> */}
              <div className="page-content table-flex table-scrollfix">
                <Table
                  bordered
                  rowKey="id"
                  columns={this.renderColumn()}
                  dataSource={userlist}
                  pagination={{...pagination, showSizeChanger: true}}
                  onChange={this.handleTableChange}
                  // rowSelection={rowSelection}
                />
              </div>
            </Content>
            <Modal
              title="用户信息"
              visible={uservisible}
              onOk={this.handleOk}
              onCancel={this.handleOk}
              footer={null}
            >
              <div>
                <p>用户名：{userinfo.name}</p>
                <p>用户编号：{userinfo.code}</p>
                <p>手机号：{userinfo.phone}</p>
                <p>真实姓名：{userinfo.realName}</p>
                <p>QQ：{userinfo.qq}</p>
                <p>email：{userinfo.email}</p>
              </div>
            </Modal>
            <Modal
              title="修改用户角色"
              visible={editRoleModal}
              onOk={this.handleEdit}
              onCancel={this.handleOk}
            >
              <div>
                <Select
                  allowClear={true}
                  mode="multiple"
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="Please select"
                  value={roleSelectId}
                  onChange={this.onCheckboxChange}
                >
                  {children}
                </Select>
              </div>
            </Modal>
          </Layout>
        </Spin>
      </div>
    );
  }
}

export default connect((state) => state.system, { fetchUserList, fetchRoleList, editUserRole, deleteUserRoles })(
  userManage
);
