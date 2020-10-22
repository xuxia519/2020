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
      loading: false
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
        dataIndex: 'text',
        key: 'text',
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
            {/* <a onClick={() => this.handleDelete(record)}>删除</a> */}
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
    this.props.fetchBOMS({pageNumber:'0', pageSize: '10'}).then(res=>{
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
      this.props.fetchBOMS({...values, type, pageNumber:'0', pageSize: '10'}).then(res=>{
        this.setState({
          BOMList: res.data.content,
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

  expandedRowRender = (record) => {
    console.log(record,1111)
    const columns = [
      { title: '编号', dataIndex: 'code', key: 'code', render: (text, record) => {
        return <span>
          {record.device.code}
        </span>
      } },
      { title: '名称', dataIndex: 'name', key: 'name', render: (text, record) => {
        return <span>
          {record.device.deviceType.name}
        </span>
      } },
      { title: '数量', dataIndex: 'number', key: 'number', render: (text, record) => {
        return <span>
          {record.number}
        </span>
      } },
    ];
    return <Table columns={columns} dataSource={record.baleDevices} pagination={false} />;
  };

  render() {
    const { loading, BOMList, editModal, record, handleType } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 14 },
    };
    
    return (
      <div className="page page-scrollfix page-usermanage">
        <Spin spinning={loading}>
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
                  className="components-table-demo-nested"
                  bordered
                  rowKey="id"
                  columns={this.renderColumn()}
                  dataSource={BOMList}
                  expandedRowRender={this.expandedRowRender}
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
        </Spin>
      </div>
    );
  }
}

export default connect((state) => state.system, { fetchBOMS, deleteDevices })(BOM)
