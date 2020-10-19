import React, { Component } from 'react';
import { Button, Form, Input } from 'antd';
import { connect } from 'react-redux';
import { regExpConfig } from '@reg';
import Drawer from '@components/draw/draw';

const FormItem = Form.Item;


// @connect((state, props) => ({
//   config: state.config
// }))
@Form.create()

export default class Pop extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.form.resetFields();
  }

  componentDidMount() {}

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      values.resType = 3;
      if (this.props.state === 'edit') {
        values.id = this.props.buttonEditData.id;
      }
      this.props.handleAdd(values);
    });
  }

  footer() {
    const { onCancel } = this.props;
    return (
      <div>
        <Button type="primary" onClick={this.handleSubmit}>
          确定
        </Button>
        <Button onClick={onCancel}>取消</Button>
      </div>
    );
  }

  render() {
    const { visible, onCancel, title, buttonEditData } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 17 },
    };
    return (
      <Drawer
        visible={visible}
        title={title}
        onCancel={onCancel}
        footer={this.footer()}
        className="modal-header modal-body"
      >
        <div className="modalcontent">
          <Form
            layout="horizontal"
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            <FormItem {...formItemLayout} label="新增按钮名称" hasFeedback>
              {getFieldDecorator('resName', {
                rules: [{ required: true, message: '请输入按钮名称' }],
                initialValue: buttonEditData.resName || '',
              })(<Input placeholder="请输入按钮名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="排序数字" hasFeedback>
              {getFieldDecorator('sort', {
                rules: [
                  { required: true, message: '请输入排序数字' },
                  { pattern: regExpConfig.num, message: '请输入数字' },
                ],
                initialValue: `${buttonEditData.sort || '0'}`,
              })(<Input placeholder="请输入菜单的排序数字" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="关键字" hasFeedback>
              {getFieldDecorator('resKey', {
                rules: [{ required: true, message: '请输入关键字' }],
                initialValue: `${buttonEditData.resKey || ''}`,
              })(<Input placeholder="请输入关键字" />)}
            </FormItem>
          </Form>
        </div>
      </Drawer>
    );
  }
}
