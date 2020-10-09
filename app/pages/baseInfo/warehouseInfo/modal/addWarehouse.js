
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, message, Select, Modal, Row, Col } from 'antd';
import { fetchProvinces, addWarehous } from '@actions/baseInfo';


const FormItem = Form.Item
const { Option } = Select

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
      console.log(values)
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
    const { visible, onCancel, userList = [] } = this.props;
    const { provinces, cities, areas } = this.state;
    console.log(userList)
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
                    initialValue: '',
                    rules: [{ required: false, message: '请输入' }],
                  })(<Input allowClear={true} placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="节点名称">
                  {getFieldDecorator('head', {
                    // initialValue: '',
                    rules: [{ required: false, message: '请输入' }],
                  })(
                    <Select allowClear={true} placeholder="请选择" defaultValue="">
                      {
                        userList.map(item=>{
                          return <Option key={item.id}>{item.realName}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="节点类型">
                  {getFieldDecorator('name', {
                    initialValue: '',
                    rules: [{ required: false, message: '请输入' }],
                  })(<Input allowClear={true} placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col span={20}>
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
                <FormItem {...formItemLayout} label="所属主体">
                  {getFieldDecorator('phone', {
                    initialValue: '',
                    rules: [{ required: false, message: '请输入' }],
                  })(<Input allowClear={true} placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="仓库类型">
                  {getFieldDecorator('type', {
                    // initialValue: '',
                    rules: [{ required: false, message: '请选择' }],
                  })(
                    <Select placeholder="请选择" style={{ width: '180px' }} allowClear={true}>
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
          </Form>
        </div>
      </Modal>
    )
  }
}
export default connect((state) => state.warehouse, { fetchProvinces, addWarehous })(addWarehouse)