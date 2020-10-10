import React, { Component } from 'react';
import { Button, Form, Input, Modal, message, Row, Col, Select, Radio } from 'antd';
import { connect } from 'react-redux';
import { addDevice, editDevice } from '@actions/pavo';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

@Form.create()

class addDtoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 1
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.form.setFieldsValue({code: '', aliasCode: '', name: '', remark:''});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      console.log(values)
      const { type } = values;
      delete values.type;
      // values.type = 'A';
    this.props.addDevice({id: type,...values}).then(res=>{
      if (res.status == '201') {
        message.success('新增成功');
        this.setState({
          editRoleModal: false
        })
        location.reload();
      }
    })
    });
  }

  handleEdit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      const { deviceId } = this.props.record;
      delete values.type;
      // values.type = 'A';
      this.props.editDevice({id: deviceId,...values}).then(res=>{
        if (res.status == '201') {
          message.success('修改成功');
          this.setState({
            editRoleModal: false
          })
          // location.reload();
        }
      })
    });
  }

  onCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  }

  changeType = (val) => {
    this.setState({
      type: val
    })
  }

  onChange1 = (val) => {
    console.log(val)
  }

  footer() {
    const { handleType } = this.props;
    return (
      <div>
        <Button type="primary" onClick={handleType === 'add' ? this.handleSubmit : this.handleEdit}>
          确定
        </Button>
        <Button onClick={this.onCancel}>取消</Button>
      </div>
    );
  }

  render() {
    const { visible, deviceTypeList, record, handleType } = this.props;
    const { code, abbreviation, name, outsideLength, outsideWidth, outsideHeight, insideLength, insideWidth, insideHeight, foldLength, foldWidth, foldHeight, weight, materialQuality, color, maxLoad, deduct, unit, isCirculation, price, owner, remark  } = record;
    const { getFieldDecorator } = this.props.form;
    const { type } = this.state;
    const formItemLayout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 14 },
    };
    return (
      <Modal
        width={1000}
        visible={visible}
        title={handleType === 'add' ? '新增物料' : '修改物料'}
        onCancel={this.onCancel}
        footer={this.footer()}
        className="modal-header modal-body"
      >
        <div className="modalcontent">
          <Form
            layout="horizontal"
            autoComplete="off"
          >
            <Row>
              <Col span={8}>
                <FormItem {...formItemLayout} label="物料编号" hasFeedback>
                  {getFieldDecorator('code', {
                    rules: [{ required: false, message: '请输入' }],
                    initialValue: code,
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="物料简称" hasFeedback>
                  {getFieldDecorator('abbreviation', {
                    rules: [
                      { required: false, message: '请输入' },
                    ],
                    initialValue: abbreviation,
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="物料全称" hasFeedback>
                  {getFieldDecorator('name', {
                    rules: [{ required: false, message: '请输入' }],
                    initialValue: name,
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="是否循环">
                  {getFieldDecorator('isCirculation', {
                    rules: [{ required: false, message: '' }],
                    initialValue: isCirculation,
                  })(
                    <Radio.Group onChange={this.onChange1}>
                      <Radio value={true}>可循环</Radio>
                      <Radio value={false}>一次性</Radio>
                    </Radio.Group>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="物料类型" hasFeedback>
                  {getFieldDecorator('type', {
                    rules: [{ required: true, message: '请选择物料类型' }],
                    initialValue: ``,
                  })(
                    <Select style={{ width: '180px'}} placeholder="请选择" allowClear={true} onChange={this.changeType}>
                      {
                        deviceTypeList.map(item=>{
                          return <Option key={item.id} value={item.id}>{item.name}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="物料归属" hasFeedback>
                  {getFieldDecorator('owner', {
                    rules: [{ required: false, message: '' }],
                    initialValue: owner,
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="价格" hasFeedback>
                  {getFieldDecorator('price', {
                    rules: [{ required: false, message: '' }],
                    initialValue: price,
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="颜色" hasFeedback>
                  {getFieldDecorator('color', {
                    rules: [{ required: false, message: '' }],
                    initialValue: color,
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="外长(mm)" hasFeedback>
                  {getFieldDecorator('outsideLength', {
                    rules: [{ required: false, message: '' }],
                    initialValue: outsideLength,
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="外宽(mm)" hasFeedback>
                  {getFieldDecorator('outsideWidth', {
                    rules: [{ required: false, message: '' }],
                    initialValue: outsideWidth,
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="外高(mm)" hasFeedback>
                  {getFieldDecorator('outsideHeight', {
                    rules: [{ required: false, message: '' }],
                    initialValue: outsideHeight,
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="重量(kg)" hasFeedback>
                  {getFieldDecorator('weight', {
                    rules: [{ required: false, message: '' }],
                    initialValue: weight,
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="承重(kg)" hasFeedback>
                  {getFieldDecorator('maxLoad', {
                    rules: [{ required: false, message: '' }],
                    initialValue: maxLoad,
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="材质" hasFeedback>
                  {getFieldDecorator('materialQuality', {
                    rules: [{ required: false, message: '' }],
                    initialValue: materialQuality,
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
              {type == 1 || type == 5 ? <Col span={8}>
                <FormItem {...formItemLayout} label="内长(mm)" hasFeedback>
                  {getFieldDecorator('insideLength', {
                    rules: [{ required: false, message: '' }],
                    initialValue: insideLength,
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col> : null}
              {type == 1 || type == 5 ? <Col span={8}>
                <FormItem {...formItemLayout} label="内宽(mm)" hasFeedback>
                  {getFieldDecorator('insideWidth', {
                    rules: [{ required: false, message: '' }],
                    initialValue: insideWidth,
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col> : null}
              {type == 1 || type == 5 ? <Col span={8}>
                <FormItem {...formItemLayout} label="内高(mm)" hasFeedback>
                  {getFieldDecorator('insideHeight', {
                    rules: [{ required: false, message: '' }],
                    initialValue: insideHeight,
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col> : null}
              {type == 1 || type == 5 ? <Col span={8}>
                <FormItem {...formItemLayout} label="折叠后长(mm)" hasFeedback>
                  {getFieldDecorator('foldLength', {
                    rules: [{ required: false, message: '' }],
                    initialValue: foldLength,
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col> : null}
              {type == 1 || type == 5 ? <Col span={8}>
                <FormItem {...formItemLayout} label="折叠后宽(mm)" hasFeedback>
                  {getFieldDecorator('foldWidth', {
                    rules: [{ required: false, message: '' }],
                    initialValue: foldWidth,
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col> : null}
              {type == 1 || type == 5 ? <Col span={8}>
                <FormItem {...formItemLayout} label="折叠后高(mm)" hasFeedback>
                  {getFieldDecorator('foldHeight', {
                    rules: [{ required: false, message: '' }],
                    initialValue: foldHeight,
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col> : null}
              {type == 1 || type == 3 || type == 4 || type == 5 ? <Col span={8}>
                <FormItem {...formItemLayout} label="套叠扣减高度" hasFeedback>
                  {getFieldDecorator('deduct', {
                    rules: [{ required: false, message: '' }],
                    initialValue: deduct,
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col> : null}
              {type == 2 ? <Col span={8}>
                <FormItem {...formItemLayout} label="撑开运输体积(m³)" hasFeedback>
                  {getFieldDecorator('name17', {
                    rules: [{ required: false, message: '' }],
                    initialValue: `1`,
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col> : null}
              {type == 2 ? <Col span={8}>
                <FormItem {...formItemLayout} label="折叠运输体积(m³)" hasFeedback>
                  {getFieldDecorator('name18', {
                    rules: [{ required: false, message: '' }],
                    initialValue: `1`,
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col> : null}
              <Col span={8}>
                <FormItem {...formItemLayout} label="单位" hasFeedback>
                  {getFieldDecorator('unit', {
                    rules: [{ required: false, message: '' }],
                    initialValue: unit,
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
              {type == 2 || type == 7 || type == 8 ? <Col span={8}>
                <FormItem {...formItemLayout} label="装件数量" hasFeedback>
                  {getFieldDecorator('name19', {
                    rules: [{ required: false, message: '' }],
                    initialValue: `1`,
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col> : null}
              {type == 7 || type == 8 ? <Col span={8}>
                <FormItem {...formItemLayout} label="列" hasFeedback>
                  {getFieldDecorator('name20', {
                    rules: [{ required: false, message: '' }],
                    initialValue: `1`,
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col> : null}
              {type == 7 || type == 8 ? <Col span={8}>
                <FormItem {...formItemLayout} label="层" hasFeedback>
                  {getFieldDecorator('name21', {
                    rules: [{ required: false, message: '' }],
                    initialValue: `1`,
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col> : null}
              <Col span={8}>
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
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    );
  }
}

export default connect((state) => state.system, { addDevice, editDevice })(addDtoModal)
