
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hashHistory/* , Link */ } from 'react-router'
import { Spin, Form, Icon, Input, Button, Row, Col, message } from 'antd'
import { regExpConfig } from '@reg'
import { brandName } from '@config'
import { clearGformCache2, login } from '@actions/common'
import { /* login,  */staff, menu } from '@apis/common'
import Logo from '@components/logo/logo'
import md5 from 'md5'
import QueuiAnim from 'rc-queue-anim'

// import '@styles/base.less'
import '@styles/login.less'

const FormItem = Form.Item


class Login extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props)
    this.state = {
      loading: false,
      isCertificates: false,
      show: true,
    }
  }

  componentDidMount() {
    console.log(this.props)
    // this.props.dispatch(clearGformCache2({}))
    this.props.form.setFieldsValue({ userName: 'xpz', password: '123' })
  }

  // #region 收缩业务代码功能

  handleSubmit(e, isCertificates) {
    e.preventDefault()
    if (isCertificates) {
      message.warning('证书登录功能未开通')
      return
    }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const query = this.props.form.getFieldsValue()
        this.setState({ loading: true })
        const { userName, password } = values;
        this.props.login(userName, password).then(res=>{
          console.log('login',res)
          sessionStorage.setItem('token', res.data.access_token)
          const nav = res.data.resources || []
          sessionStorage.setItem('leftNav', JSON.stringify(nav))
          sessionStorage.setItem('userinfo', JSON.stringify(res.data))
          console.log(nav[0])
          if (nav.length > 0) {
            hashHistory.push(nav[0].children[0].resKey)
          } else {
            hashHistory.push('/index')
          }
          // hashHistory.push('/index')
        })
        /* if (process.env.NODE_ENV === 'production') {
          values.password = values.password
        } else {
          values.password = md5(values.password)
        } */
        // values.password = md5(values.password)
        // this.props.dispatch(login({method: 'post',values}, (res) => {
          // sessionStorage.setItem('token', res.data.access_token)
          // sessionStorage.setItem('ticket', res.data.ticket)
          // const nav = res.data.resources || []
          // sessionStorage.setItem('leftNav', JSON.stringify(nav))
          // sessionStorage.setItem('userinfo', JSON.stringify(res.data))
          // hashHistory.push('/index')
          // menu({}, (response) => {
          //   const nav = response.data.list || []
          //   if (nav && nav[0]) {
          //     sessionStorage.setItem('gMenuList', JSON.stringify(nav))
          //     sessionStorage.setItem('topMenuReskey', nav[0].resKey)
          //     sessionStorage.setItem('leftNav', JSON.stringify(nav))

          //     staff({ usercode: query.username }, (resp) => {
          //       sessionStorage.setItem('userinfo', JSON.stringify(resp.data))
          //       hashHistory.push('/index')
          //     }, (r) => {
          //       message.warning(r.msg)
          //       this.setState({
          //         loading: false,
          //       })
          //     })
          //   }
          // }, (r) => {
            // message.warning(r.msg)
        //     this.setState({
        //       loading: false,
        //     })
        //   })
        // }, (res) => {
        //   message.warning(res.data.msg)
        //   this.setState({
        //     loading: false,
        //   })
        // }))
      }
    })
  }

  // #endregion

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login-container">
        <div className="flexcolumn">
          <div className="login-main">
            <QueuiAnim delay={300} type="bottom" key="row">
              {
                this.state.show ? [
                  <Row key="row0">
                    <Col span={8} />
                    <Col span={8}>
                      <Spin spinning={this.state.loading}>
                        <Form onSubmit={e => this.handleSubmit(e, this.state.isCertificates)}>
                          {!this.state.isCertificates ?
                            (<div>
                              <FormItem hasFeedback>
                                {getFieldDecorator('userName', {
                                  rules: [
                                    // {
                                    //   required: true, min: 4, max: 10, message: '用户名为4-10个字符',
                                    // },
                                    // { pattern: regExpConfig.policeNo, message: '账号4-10位数字或字母组成' },
                                  ],
                                })(<Input addonBefore={<Icon type="user" />} placeholder="请输入用户名" type="text" />)}
                              </FormItem>
                              <FormItem hasFeedback>
                                {getFieldDecorator('password', {
                                  rules: [
                                    // {
                                    //   required: true, min: 6, max: 16, message: '密码为6-16个字符',
                                    // },
                                    // { pattern: regExpConfig.pwd, message: '密码由6-16位数字或者字母组成' },
                                  ],
                                })(<Input addonBefore={<Icon type="lock" />} placeholder="请输入密码" type="password" />)}
                              </FormItem>
                              <FormItem>
                                <Button type="primary" htmlType="submit" className="cert-btn">登录</Button>
                              </FormItem>
                            </div>) :
                            <FormItem>
                              <Button type="primary" htmlType="submit">证书登录</Button>
                            </FormItem>
                          }
                        </Form>
                      </Spin>
                    </Col>
                    <Col span={8} />
                  </Row>,
                ] : null
              }
            </QueuiAnim>
          </div>
        </div>
      </div>
    )
  }
}

const WrapLogin = Form.create()(Login);

export default connect((state) => state.user, { login })(
  WrapLogin
);
