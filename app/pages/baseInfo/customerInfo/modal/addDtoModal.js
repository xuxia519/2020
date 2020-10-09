import React, { Component } from 'react';
import { Button, Form, Input, Modal, message } from 'antd';
import { connect } from 'react-redux';
import { addCpn } from '@actions/baseInfo'

const FormItem = Form.Item;
const { TextArea } = Input;

@Form.create()

class addDtoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.form.setFieldsValue({code: '', aliasCode: '', name: '', remark:''});
  }

  handleSubmit(e) {
    const { id } = this.props;
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
    this.props.addCpn({id,...values}).then(res=>{
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

  onCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  }

  footer() {
    return (
      <div>
        <Button type="primary" onClick={this.handleSubmit}>
          确定
        </Button>
        <Button onClick={this.onCancel}>取消</Button>
      </div>
    );
  }

  render() {
    const { visible } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 17 },
    };
    return (
      <Modal
        visible={visible}
        title='新增物料'
        onCancel={this.onCancel}
        footer={this.footer()}
        className="modal-header modal-body"
      >
        <div className="modalcontent">
          <Form
            layout="horizontal"
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            <FormItem {...formItemLayout} label="客户物料编号" hasFeedback>
              {getFieldDecorator('code', {
                rules: [{ required: false, message: '请输入' }],
                initialValue: '',
              })(<Input placeholder="请输入" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="主机厂物料编号" hasFeedback>
              {getFieldDecorator('aliasCode', {
                rules: [
                  { required: false, message: '请输入' },
                ],
                initialValue: ``,
              })(<Input placeholder="请输入" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="物料名称" hasFeedback>
              {getFieldDecorator('name', {
                rules: [{ required: false, message: '' }],
                initialValue: ``,
              })(<Input placeholder="请输入" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="备注" hasFeedback>
              {getFieldDecorator('remark', {
                rules: [
                  { required: false, message: '' },
                ],
                initialValue: ``,
              })(
                <TextArea />
              )}
            </FormItem>
          </Form>
        </div>
      </Modal>
    );
  }
}

export default connect((state) => state.system, { addCpn })(addDtoModal)
