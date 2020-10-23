
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, message, Select, Modal, Row, Col, Table } from 'antd';
import { addInboundRecord, getCodes, addCodeDevice } from '@actions/pavo';


const FormItem = Form.Item
const { TextArea } = Input;
const { Option } = Select;

@Form.create({})
class addModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      provinces: [],
      cities: [],
      areas: [],
      number: '',
      list: [],
      warehouseId: '',
      userCode: '',
      warehouseAreas: [],
      code:''
    }

    this.columns = [
      {
        title: '编号',
        dataIndex: 'deviceId',
        key: 'deviceId',
        width: '10%',
      },
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
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
   
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.form.resetFields()
    const userinfo = JSON.parse(sessionStorage.getItem('userinfo'));
    this.setState({
      userCode: userinfo.userCode
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      console.log(values)
      const { list } = this.state;
      const { code, printNumber, remark, operator, warehouseAreaCode } = values;
      const params = {
        codes: code, num: printNumber, remark, operator,
        warehouseAreaId: warehouseAreaCode,
        codeNumberDevices: list
      }
      this.props.addCodeDevice({...params}).then(res=>{
        if (res.status == '201') {
          message.success('新增成功');
          this.setState({
            editRoleModal: false
          })
        } else {
          message.error('新增失败');
        }
        location.reload();
      }).catch(error=>{
        console.log(error)
      })
    })
  }

  handleAdd = () => {
    console.log(this.props.form.getFieldsValue())
    const { deviceId, name, number } = this.props.form.getFieldsValue()
    this.setState({
      list: [...this.state.list,{deviceId, name, number}]
    }, () => {
      this.props.form.setFieldsValue({
        deviceId: '',
        name: '',
        number: ''
      })
    })
  }

  handleDelete = (record) => {
    const { list } = this.state;
    this.setState({
      list: list.filter(item=>item.deviceId !== record.deviceId)
    })
  }

  onValuesChange = (props, changedValues, allValues) => {
    console.log(111)
    console.log(changedValues, allValues)
  }

  changeNumber = (e) => {
    this.setState({
      number: e.target.value
    })
  }

  changeWarehouse = (value) => {
    const { warehouseList } = this.props;
    const warehouse = warehouseList.filter(item=>{
      return item.id == value
    })
    this.setState({
      warehouseAreas: warehouse[0].warehouseAreas
    })
  }
  handleBlur = () => {
    const values = this.props.form.getFieldsValue();
    console.log(values)
    const { userCode, warehouse, warehouseAreaCode, printNumber } = values;
    const params = {
      userCode, warehouseAreaCode, printNumber
    }
    if (warehouse == '') {
      message.error('请选择节点');
      return
    } else if (warehouseAreaCode == '') {
      message.error('请选择库位');
      return
    } else {
      this.props.getCodes(params).then(res=>{
        this.setState({
          code: res.data
        })
      })
    }
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
    const { visible, onCancel, warehouseList } = this.props;
    const { list, userCode, warehouseAreas, code } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 15 },
    };
    const formItemLayout1 = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 },
    };
    return (
      <Modal
        visible={visible}
        width={800}
        title="新增"
        onCancel={onCancel}
        footer={this.footer()}
      >
        <div className="modalcontent">
          <Form onSubmit={this.handleSubmit} onValuesChange={this.onValuesChange}>
            <Row>
              <Col span={6}>
                <FormItem label="工号" name="userCode" {...formItemLayout}>
                  {getFieldDecorator('userCode', {
                    initialValue: userCode,
                    rules: [
                      {
                        required: true,
                        message: "请选择",
                      },
                    ],
                    })(
                      <Input />
                    )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem {...formItemLayout} name="warehouse" label="节点">
                  {getFieldDecorator('warehouse', {
                    initialValue: "",
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Select allowClear={true} placeholder="请选择" onChange={this.changeWarehouse}>
                      {
                        warehouseList.map(item=>{
                          return <Option key={item.id}>{item.name}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem {...formItemLayout} name="warehouseAreaCode" label="库位">
                  {getFieldDecorator('warehouseAreaCode', {
                    initialValue: "",
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Select allowClear={true} placeholder="请选择">
                      {
                        warehouseAreas.map(item=>{
                          return <Option key={item.code}>{item.code}-{item.name}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <FormItem {...formItemLayout} name="printNumber" label="数量">
                  {getFieldDecorator('printNumber', {
                    initialValue: "",
                    rules: [{ required: true, message: '请输入' }],
                  })(
                    <Input onBlur={this.handleBlur} />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout1} name="code" label="编号">
                  {getFieldDecorator('code', {
                    initialValue: code,
                    rules: [{ required: false, message: '请输入' }],
                  })(
                    <TextArea style={{ width: '300px', minHeight: '50px'}} />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={7}>
                <FormItem {...formItemLayout} name="deviceId" label="物料编号">
                  {getFieldDecorator('deviceId', {
                    rules: [{ required: false, message: '请输入' }],
                    initialValue: '',
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={7}>
                <FormItem {...formItemLayout} name="name" label="物料名称">
                  {getFieldDecorator('name', {
                    rules: [{ required: false, message: '请输入' }],
                    initialValue: '',
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={7}>
                <FormItem {...formItemLayout} name="number" label="数量">
                  {getFieldDecorator('number', {
                    rules: [{ required: false, message: '请输入' }],
                    initialValue: '',
                  })(<Input placeholder="请输入" onChange={(e)=>this.changeNumber(e)} />)}
                </FormItem>
              </Col>
              <Col span={3} style={{ textAlign: 'center'}}>
                <Button type="primary" onClick={this.handleAdd}>添加</Button>
              </Col>
            </Row>
            <Table
              bordered
              columns={this.columns}
              dataSource={list}
              pagination={false}
            />
          </Form>
        </div>
      </Modal>
    )
  }
}
export default connect((state) => state.warehouse, { addInboundRecord, getCodes, addCodeDevice })(addModal)