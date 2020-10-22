
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, message, Select, Modal, Row, Col, Table } from 'antd';
import { addInboundRecord } from '@actions/pavo';


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
      warehouseId: ''
    }

    this.columns = [
      {
        title: '编号',
        dataIndex: 'deviceId',
        key: 'deviceId',
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
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      console.log(values)
      const { list, warehouseId } = this.state;
      const { code, type, remark, operator } = values;
      const params = {
        code, type, remark, operator,
        warehouseAreaId: warehouseId,
        numberDevices: list
      }
      this.props.addInboundRecord({...params}).then(res=>{
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
    const { deviceId, number } = this.props.form.getFieldsValue()
    this.setState({
      list: [...this.state.list,{deviceId, number}]
    }, () => {
      this.props.form.setFieldsValue({
        deviceId: '',
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
    console.log(value)
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const date = new Date().getDate();
    const hour = new Date().getHours();
    const m = new Date().getMinutes();
    const s = new Date().getSeconds();
    const { warehouseList } = this.props;
    const warehouse = warehouseList.filter(item=>{
      return item.id == value
    })
    console.log(warehouse.inboundWarehouseArea,warehouseList)
    this.props.form.setFieldsValue({
      code: `RT${value}${year}${month}${date}${hour}${m}${s}`
    })
    this.setState({
      warehouseId: warehouse[0].inboundWarehouseArea.id
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
    const { visible, onCancel, record = {}, warehouseList } = this.props;
    const { list } = this.state;
    const { code, name, type, remark, operator } = record;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 15 },
    };
    return (
      <Modal
        visible={visible}
        width={800}
        title="新增入库单"
        onCancel={onCancel}
        footer={this.footer()}
      >
        <div className="modalcontent">
          <Form onSubmit={this.handleSubmit} onValuesChange={this.onValuesChange}>
            <Row>
              <Col span={8}>
                <FormItem {...formItemLayout} name="type" label="入库类型">
                  {getFieldDecorator('type', {
                    initialValue: "OTHER",
                    rules: [{ required: true, message: '请输入' }],
                  })(
                    <Select allowClear={true} placeholder="请选择">
                      <Option key="OTHER" value="OTHER">其他入库</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="入库节点" name="warehouseAreaId" {...formItemLayout}>
                  {getFieldDecorator('warehouseAreaId', {
                    rules: [
                      {
                        required: true,
                        message: "请选择",
                      },
                    ],
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
              <Col span={8}>
                <FormItem {...formItemLayout} name="code" label="入库单号">
                  {getFieldDecorator('code', {
                    initialValue: code,
                    rules: [{ required: false, message: '请输入' }],
                  })(
                    <Input disabled />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem {...formItemLayout} name="operator" label="操作员">
                  {getFieldDecorator('operator', {
                    initialValue: operator,
                    rules: [{ required: false, message: '请输入' }],
                  })(
                    <Input placeholder="请输入" />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} name="remark" label="备注">
                  {getFieldDecorator('remark', {
                    initialValue: remark,
                    rules: [{ required: false, message: '请输入' }],
                  })(
                    <TextArea />
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
                <FormItem {...formItemLayout} name="number" label="数量">
                  {getFieldDecorator('number', {
                    rules: [{ required: false, message: '请输入' }],
                    initialValue: '',
                  })(<Input placeholder="请输入" onChange={(e)=>this.changeNumber(e)} />)}
                </FormItem>
              </Col>
              <Col span={5} style={{ textAlign: 'center'}}>
                <Button type="primary" onClick={this.handleAdd}>添加</Button>
              </Col>
            </Row>
            <Table 
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
export default connect((state) => state.warehouse, { addInboundRecord })(addModal)