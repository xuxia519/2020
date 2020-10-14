
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, message, Select, Modal, Row, Col } from 'antd';
import { fetchProvinces, addWarehous } from '@actions/baseInfo';


const FormItem = Form.Item
const { Option } = Select;
const { TextArea } = Input;

@Form.create({})
class addWarehouse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      provinces: [],
      cities: [],
      areas: [],
    }
   
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.form.resetFields()
    this.getProvince();
  }

  getProvince = () => {
    this.props.fetchProvinces({type:'PROVINCE'}).then(res=>{
      this.setState({
        provinces: res.data
      })
      console.log(res)
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      delete values.province;
      delete values.city;
      console.log(values)
      this.props.addWarehous({...values}).then(res=>{
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

  handleProvinceChange = value => {
    console.log(value)
    this.props.fetchProvinces({parentId: value}).then(res=>{
      this.setState({
        cities: res.data
      })
    })
  };

  onSecondCityChange = value => {
    console.log(value)
    this.props.fetchProvinces({parentId: value}).then(res=>{
      this.setState({
        areas: res.data
      })
    })
  };

  onAreaChange = value => {
    // this.setState({
    //   secondCity: value,
    // });
  };

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
    const { code, name, type, contact, phone, email, remark, districtDetail } = record;
    const { provinces, cities, areas } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 15 },
    };
    return (
      <Modal
        visible={visible}
        width={600}
        title="新建节点"
        onCancel={onCancel}
        footer={this.footer()}
      >
        <div className="modalcontent">
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="节点编号">
                  {getFieldDecorator('code', {
                    initialValue: code,
                    rules: [{ required: false, message: '请输入' }],
                  })(<Input allowClear={true} placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="节点名称">
                  {getFieldDecorator('name', {
                    initialValue: name,
                    rules: [{ required: false, message: '请输入' }],
                  })(
                    <Input placeholder="请输入" />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="节点类型">
                  {getFieldDecorator('type', {
                    initialValue: type,
                    rules: [{ required: false, message: '请输入' }],
                  })(
                    <Select placeholder="请选择" style={{ width: '130px' }} allowClear={true}>
                      <Option value="OWNER">携赁仓库</Option>
                      <Option value="OWNER_ASSIST">携赁外协仓库</Option>
                      <Option value="CUSTOMER_START">客户始发端仓库</Option>
                      <Option value="CUSTOMER_RECOVERY">客户回收端仓库</Option>
                      <Option value="VIRTUAL">虚拟仓库</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>       
            </Row>
            <Row>
              <Col span={9}>
                <FormItem label="仓库地址" className="province">
                  {getFieldDecorator('province', {
                    initialValue: '',
                    rules: [{ required: false, message: '请输入' }],
                  })(
                    <Select
                      allowClear={true}
                      style={{ width: 120 }}
                      onChange={this.handleProvinceChange}
                      placeholder="请选择省"
                    >
                      {provinces.map(province => (
                        <Option key={province.id}>{province.name}</Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={7}>
                <FormItem className="city">
                  {getFieldDecorator('city', {
                    initialValue: '',
                    rules: [{ required: false, message: '请输入' }],
                  })(
                    <Select
                      allowClear={true}
                      style={{ width: 120, marginLeft: '10px' }}
                      onChange={this.onSecondCityChange}
                      placeholder="请选择市"
                    >
                      {cities.map(city => (
                        <Option key={city.id}>{city.name}</Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={7}>
                <FormItem className="district">
                  {getFieldDecorator('districtId', {
                      initialValue: '',
                      rules: [{ required: false, message: '请输入' }],
                    })(
                      <Select
                        allowClear={true}
                        style={{ width: 120, marginLeft: '10px' }}
                        onChange={this.onAreaChange}
                        placeholder="请选择地区"
                      >
                        {areas.map(area => (
                          <Option key={area.id}>{area.name}</Option>
                        ))}
                      </Select>
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout}>
                  {getFieldDecorator('districtDetail', {
                    initialValue: districtDetail,
                    rules: [{ required: false, message: '请输入' }],
                  })(
                    <Input placeholder="请输入" />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="联系人">
                  {getFieldDecorator('contact', {
                    initialValue: contact,
                    rules: [{ required: false, message: '请输入' }],
                  })(
                    <Input placeholder="请输入" />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="联系电话">
                  {getFieldDecorator('phone', {
                    initialValue: phone,
                    rules: [{ required: false, message: '请输入' }],
                  })(
                    <Input placeholder="请输入" />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="电子邮箱">
                  {getFieldDecorator('email', {
                    initialValue: email,
                    rules: [{ required: false, message: '请输入' }],
                  })(
                    <Input placeholder="请输入" />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="备注">
                  {getFieldDecorator('remark', {
                    initialValue: remark,
                    rules: [{ required: false, message: '请输入' }],
                  })(
                    <TextArea />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    )
  }
}
export default connect((state) => state.warehouse, { fetchProvinces, addWarehous })(addWarehouse)