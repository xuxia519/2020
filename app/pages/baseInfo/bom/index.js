import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Button, Form, Input, message, Layout, Row, Col, Table, Select, Modal, } from 'antd';
import AddModal from './modal/addModal';

import { fetchBOMS, deleteDevices } from '@actions/pavo'

const { Option } = Select;
const FormItem = Form.Item;
const { Content } = Layout;
const { fetchBtns } = require('@configs/common');

@Form.create({})
class BOM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editModal: false,
      BOMList: [],
    };
  }

  renderColumn() {
    const columns= [
      {
        title: "序号",
        width: '8%',
        render: (text, record, index) => `${index + 1}`
      },
      {
        title: 'BOM编号',
        dataIndex: 'code',
        key: 'code',
        width: '10%',
      },
      {
        title: 'BOM描述',
        dataIndex: 'abbreviation',
        key: 'abbreviation',
        width: '10%',
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        width: '10%',
      },
      {
        title: '操作',
        key: 'operate',
        width: '20%',
        render: (text, record) => {
          return <span>
            <a onClick={() => this.handleEdit(record)}>修改</a>|
            <a onClick={() => this.handleDelete(record)}>删除</a>
          </span>
        }
      }
    ]
    return columns;
  }

  componentDidMount() {
    this.props.form.setFieldsValue({ key: '' });
    this.setState({
      loading: true
    })
    this.fetchBOM();
  }

  fetchBOM = () => {
    this.props.fetchBOMS().then(res=>{
      this.setState({
        BOMList: res.data.content,
        loading: false
      })
    });
  }

  handleSearch = (e) => {
    e.preventDefault();
    const { type } = this.state;
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      this.props.fetchBOM({...values, type, pageNumber:'0', pageSize: '10'}).then(res=>{
        this.setState({
          deviceList: res.data.content,
          loading: false
        })
      });
    })
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
      handleType: 'edit',
    })
  }

  handleDelete = (record) => {
    Modal.confirm({
      title: "删除BOM",
      content: "确定要删除BOM吗?",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        this.deleteBOM(record.deviceId)
      },
    });
  }

  deleteBOM = (id) => {
    this.props.deleteDevices(id).then(res=>{
      if (res.status == 200) {
        message.success('删除成功！')
      } else {
        message.error('删除失败！')
      }
      location.reload();
    })
  }

  render() {
    const { loading, BOMList, editModal, record, handleType } = this.state;
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
                        <FormItem {...formItemLayout} label="BOM编号">
                          {getFieldDecorator('code', {
                            rules: [{ required: false, message: '请输入' }],
                            initialValue: '',
                          })(<Input placeholder="请输入"  allowClear={true}/>)}
                        </FormItem>
                      </Col>
                      <Col span={6}>
                        <FormItem {...formItemLayout} label="BOM描述">
                          {getFieldDecorator('owner', {
                            rules: [{ required: false, message: '请输入' }],
                            initialValue: '',
                          })(<Input placeholder="请输入"  allowClear={true}/>)}
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
                  dataSource={BOMList}
                />
              </div>
            </Content>
            <AddModal 
              visible={editModal}
              onCancel={this.handleOk}
              record={record}
              handleType={handleType}
            />
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default connect((state) => state.system, { fetchBOMS, deleteDevices })(BOM)
