import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hashHistory/* , Link  */ } from 'react-router'
import { Menu, Icon } from 'antd';


@connect((state, props) => ({
  config: state.config,
}))
export default class TopNav extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      selectedKeys: ['']
    }
  }

  componentDidMount() {
    // const { } = location
    console.log(location)
  }


  _handleClick = (e) => {
    hashHistory.push(`/${e.key}`)
    this.setState({
      selectedKeys: [`${e.key}`]
    })
  }

  render() {
    console.log(this.state.selectedKeys,'top')
    const leftNav = JSON.parse(sessionStorage.getItem('leftNav'))
    return (
      <div className="topNav">
        <div className="topNav-cotainer">
          <Menu mode="horizontal" selectedKeys={this.state.selectedKeys}>
            <Menu.Item key="index" onClick={this._handleClick}>
              首页
            </Menu.Item>
            {
              leftNav.length > 0 ?
              <Menu.Item key="userManage" onClick={this._handleClick}>
                供应商工作台
              </Menu.Item>
              :
              null
            }
          </Menu>
        </div>
      </div>
    )
  }
}
