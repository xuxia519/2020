import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Button, Form, Input, message, Layout, Row, Col, Table, Modal } from 'antd';

import { fetchCpnsById, fetchCpnsByPage, addCpn, editCpnsById, deleteCpnsById } from '@actions/apus'

const FormItem = Form.Item;
const { Content } = Layout;
const { TextArea } = Input;

@Form.create({})

class dtoDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      type: 'add',
      code: '',
      list: [],
      editModal: false,
      record: {}
    };
  }

  renderColumn() {
    return [
      {
        title: "序号",
        width: '5%',
        render: (text, record, index) => `${index + 1}`
      },
      {
        title: '客户物料编号',
        dataIndex: 'code',
        key: 'code',
        width: '10%',
      },
      {
        title: '主机厂物料编号',
        dataIndex: 'aliasCode',
        key: 'aliasCode',
        width: '10%',
      },
      {
        title: '客户物料名称',
        dataIndex: 'name',
        key: 'name',
        width: '10%',
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        width: '10%'
      },
      {
        title: '操作',
        key: 'operate',
        width: '10%',
        render: (text, record) => {
          return <span>
            <a onClick={() => this.handleEdit(record)}>修改</a>|
            <a onClick={() => this.handleDelete(record)}>删除</a>
          </span>
        }
      }
    ];
  }

  componentDidMount() {
    this.props.form.setFieldsValue({ key: '' });
    this.setState({
      loading: true
    })
    const info = JSON.parse(sessionStorage.getItem('dtoInfo'));
    const { id } = info;
    this.props.fetchCpnsByPage({customerId: id, pageNumber:'0', pageSize: '10'}).then(res=>{
      this.setState({
        list: res.data.content,
        loading: false
      })
    })
  }

  handleOk = () => {
    this.setState({
      editModal: false
    })
  }

  handleAdd = () => {
    this.setState({
      editModal: true
    })
  }

  changeCode = (e) => {
    this.setState({
      code: e.target.value
    })
  }

  footer() {
    const { type } = this.state;
    return (
      <div>
        <Button type="primary" onClick={type === 'add' ? this.handleSubmit : this.edit}>
          确定
        </Button>
        <Button onClick={this.handleOk}>取消</Button>
      </div>
    );
  }

  renderForm = () => {
    const { getFieldDecorator } = this.props.form;
    const { record } = this.state;
    const { code, aliasCode, name, remark } = record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 17 },
    };
    return (
      <div>
        <Form
            layout="horizontal"
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            <FormItem {...formItemLayout} label="客户物料编号" hasFeedback>
              {getFieldDecorator('code', {
                rules: [{ required: false, message: '请输入' }],
                initialValue: code,
              })(<Input placeholder="请输入" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="主机厂物料编号" hasFeedback>
              {getFieldDecorator('aliasCode', {
                rules: [
                  { required: false, message: '请输入' },
                ],
                initialValue: aliasCode,
              })(<Input placeholder="请输入" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="物料名称" hasFeedback>
              {getFieldDecorator('name', {
                rules: [{ required: false, message: '' }],
                initialValue: name,
              })(<Input placeholder="请输入" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="备注" hasFeedback>
              {getFieldDecorator('remark', {
                rules: [
                  { required: false, message: '' },
                ],
                initialValue: remark,
              })(
                <TextArea />
              )}
            </FormItem>
          </Form>
      </div>
    )
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.setState({
      loading: true
    })
    const { code } = this.state;
    this.props.fetchCpnsByPage({code, pageNumber:'0', pageSize: '10'}).then(res=>{
      this.setState({
        list: res.data.content,
        loading: false
      })
    })
  }

  handleSubmit = (e) => {
    const info = JSON.parse(sessionStorage.getItem('dtoInfo'));
    const { id } = info;
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      this.props.addCpn({customerId: id,...values}).then(res=>{
        if (res.status == 201) {
          message.success('新增成功');
          this.setState({
            editRoleModal: false
          })
          location.reload();
        }
      })
    });
  }

  handleEdit = (record) => {
    this.setState({
      record,
      type: 'edit',
      editModal: true
    })
  }

  edit = (e) => {
    const { record } = this.state;
    const { id } = record;
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      this.props.editCpnsById({id,...values}).then(res=>{
        if (res.status == 200) {
          message.success('修改成功');
          this.setState({
            editRoleModal: false
          })
          location.reload();
        }
      })
    });
  }

  handleDelete = (record) => {
    Modal.confirm({
      title: "删除物料",
      content: "确定要删除物料吗?",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        this.deleteCpns(record.id)
      },
    });
  }

  deleteCpns = (id) => {
    const info = JSON.parse(sessionStorage.getItem('dtoInfo'));
    const { id: dtoId } = info;
    this.props.deleteCpnsById({dtoId,id}).then(res=>{
      if (res.status == 200) {
        message.success('删除成功！')
      } else {
        message.error('删除失败！')
      }
      location.reload();
    })
  }

  render() {
    const { loading, type, editModal, list } = this.state;
    return (
      <div className="page page-scrollfix page-usermanage">
        <Layout>
          <Layout className="page-body">
            <Content>
              <div className="page-header">
                <div className="layout-between">
                  <Form style={{ width: '100%' }}>
                    <Row style={{ marginTop: '10px' }}>
                      <Col span={8}>
                        <label style={{ marginRight: '10px'}}>客户物料编号:</label>
                        <Input
                          allowClear={true}
                          className="input-base-width"
                          size="default"
                          placeholder="请输入"
                          onChange={this.changeCode}
                        />
                      </Col>
                    </Row>
                    <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
                      <Col span={2}><Button size="small" onClick={this.handleSearch}>查询</Button></Col>
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
                  dataSource={list}
                />
              </div>
            </Content>
            <Modal
              title={type === 'add' ? '新增物料' : '修改物料'}
              width={600}
              visible={editModal}
              onOk={this.handleOk}
              onCancel={this.handleOk}
              footer={this.footer()}
            >
              {this.renderForm()}
            </Modal>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default connect((state) => state.system, { fetchCpnsById, fetchCpnsByPage, addCpn, editCpnsById, deleteCpnsById })(dtoDetail)
