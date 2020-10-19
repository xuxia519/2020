import React, { Component } from 'react';
import { Button, Form, Input, Modal, message, Row, Col, Select, Table, AutoComplete } from 'antd';
import { connect } from 'react-redux';
import { fetchDevicesByCodes, addBOMS } from '@actions/pavo';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

@Form.create()

class addDtoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      number: '',
      deviceId:'',
      code: '',
      options: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.columns = [
      {
        title: 'id',
        dataIndex: 'deviceId',
        key: 'deviceId',
        width: '10%',
      },
      {
        title: '编号',
        dataIndex: 'code',
        key: 'code',
        width: '10%',
      },
      {
        title: '数量',
        dataIndex: 'number',
        key: 'number',
        width: '10%',
      },
      {
        title: '操作',
        key: 'operate',
        width: '10%',
        render: (text, record) => {
          return <span>
            <a onClick={()=>this.handleDelete(record)}>删除</a>
          </span>
        }
      }
    ]
  }

  componentDidMount() {
    this.props.form.setFieldsValue({ key: '' });
    
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      delete values.deviceId;
      delete values.number;
      const { list } = this.state;
      this.props.addBOMS({...values, numberDevices: list}).then(res=>{
        message.success('新增成功');
        location.reload();
      })
    });
  }

  handleAdd = () => {
    const { deviceId, number, code } = this.state;
    this.setState({
      list: [...this.state.list,{deviceId, number, code}]
    }, () => {
      this.setState({
        deviceId: '',
        number: ''
      })
    })
  }

  onCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  }

  handleDelete = (record) => {
    const { list } = this.state;
    this.setState({
      list: list.filter(item=>item.code !== record.code)
    })
  }

  changeNumber = (e) => {
    this.setState({
      number: e.target.value
    })
  }

  onSelect = (value, option) => {
    this.setState({
      deviceId: value,
      code: option.props.children
    })
  };

  onSearch = (searchText) => {
    this.props.fetchDevicesByCodes(searchText).then(res=>{
      this.setState({
        options: res.data
      })
      console.log(res)
    })
  }

  footer() {
    return (
      <div style={{textAlign: 'center', marginTop: '10px'}}>
        <Button type="primary" htmlType="submit">
          确定
        </Button>
        <Button onClick={this.onCancel}>取消</Button>
      </div>
    );
  }

  render() {
    const { visible } = this.props;
    const { list, options } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 14 },
    };
    const children = options.map(item=><Option key={item.id}>{item.code}</Option>)
    return (
      <Modal
        width={1000}
        visible={visible}
        title='新增BOM'
        onCancel={this.onCancel}
        footer={null}
        className="modal-header modal-body"
      >
        <div className="modalcontent">
          <Form
            layout="horizontal"
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            <div>
              <Row>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="BOM编号" hasFeedback>
                    {getFieldDecorator('code', {
                      rules: [{ required: true, message: '请输入' }],
                      initialValue: '',
                    })(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="BOM名称" hasFeedback>
                    {getFieldDecorator('name', {
                      rules: [
                        { required: true, message: '请输入' },
                      ],
                      initialValue: '',
                    })(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="重量" hasFeedback>
                    {getFieldDecorator('weight', {
                      rules: [{ required: true, message: '请输入' }],
                      initialValue: '',
                    })(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="长" hasFeedback>
                    {getFieldDecorator('length', {
                      rules: [{ required: true, message: '请输入' }],
                      initialValue: '',
                    })(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="宽" hasFeedback>
                    {getFieldDecorator('width', {
                      rules: [{ required: true, message: '请输入' }],
                      initialValue: '',
                    })(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="高" hasFeedback>
                    {getFieldDecorator('height', {
                      rules: [{ required: true, message: '请输入' }],
                      initialValue: '',
                    })(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="备注" hasFeedback>
                    {getFieldDecorator('remark', {
                      rules: [{ required: false, message: '请输入' }],
                      initialValue: '',
                    })(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="物料编号">
                    {getFieldDecorator('deviceId', {
                      rules: [{ required: false, message: '请输入' }],
                      initialValue: '',
                    })(
                      <AutoComplete
                        allowClear={true}
                        style={{
                          width: 160,
                        }}
                        onSelect={this.onSelect}
                        onSearch={this.onSearch}
                        placeholder="请输入"
                      >
                        {children}
                      </AutoComplete>
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="数量">
                    {getFieldDecorator('number', {
                      rules: [{ required: false, message: '请输入' }],
                      initialValue: '',
                    })(<Input placeholder="请输入" onChange={(e)=>this.changeNumber(e)} />)}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <Button type="primary" onClick={this.handleAdd}>添加</Button>
                </Col>
              </Row>
            </div>
            <Table 
            columns={this.columns}
            dataSource={list}
            pagination={false}
          />
          {this.footer()}
          </Form>
          
        </div>
      </Modal>
    );
  }
}

export default connect((state) => state.system, { fetchDevicesByCodes, addBOMS })(addDtoModal)
