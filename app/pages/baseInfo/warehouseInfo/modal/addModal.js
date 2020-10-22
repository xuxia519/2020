
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, message, Modal, Row, Col, Table } from 'antd';
import { addWarehouseArea, fetchWarehouseArea } from '@actions/pavo';


const FormItem = Form.Item

@Form.create({})
class addModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      list:[]
    }
    this.columns = [
      {
        title: '编号',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
    ]
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.form.resetFields();
    this.getData();
  }

  getData = () => {
    this.props.fetchWarehouseArea({page:'0', size: '10'}).then(res=>{
      this.setState({
        list: res.data.content
      })
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      console.log(values)
      this.props.addWarehouseArea({...values}).then(res=>{
        if (res.status == '201') {
          message.success('新增成功');
          this.getData();
        } else {
          message.error('新增失败');
        }
      }).catch(error=>{
        console.log(error)
      })
    })
  }

  footer() {
    return (
      <div>
        <Button type="primary" onClick={this.handleSubmit}>确定</Button>
        <Button onClick={this.props.onCancel}>取消</Button>
      </div>
    )
  }

  render() {
    const { visible, onCancel, record = {} } = this.props;
    const { code, name } = record;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 15 },
    };
    return (
      <Modal
        visible={visible}
        width={600}
        title="新建"
        onCancel={onCancel}
        footer={this.footer()}
      >
        <div className="modalcontent">
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="编号">
                  {getFieldDecorator('code', {
                    initialValue: code,
                    rules: [{ required: false, message: '请输入' }],
                  })(<Input allowClear={true} placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="名称">
                  {getFieldDecorator('name', {
                    initialValue: name,
                    rules: [{ required: false, message: '请输入' }],
                  })(
                    <Input placeholder="请输入" />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
          <Table 
            columns={this.columns}
            dataSource={this.state.list}
          />
        </div>
      </Modal>
    )
  }
}
export default connect((state) => state.warehouse, { addWarehouseArea, fetchWarehouseArea })(addModal)