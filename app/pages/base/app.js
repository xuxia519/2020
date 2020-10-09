
import React, { Component } from 'react'
// import { bindActionCreators } from 'redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'
import { hashHistory } from 'react-router'
import { withRouter } from 'react-router-dom'
import { message, LocaleProvider, Button } from 'antd'
import { validateTickit/* , parseQueryString */ } from '@configs/common'
import { loginByKey } from '@apis/common'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import '@styles/base.less'

import Header from './app/header'
import LeftNav from './app/leftNav'
import TopNav from './app/topNav'
import Breadcrumb  from './app/breadcrumb'
import TagsView  from './app/TagsView'

import { addTag } from "@actions/tagsView";
// import TabList from './app/tabList'
// import SocketComponent from './socket'

class App extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props)
    this.state = {
      menuStyle: false, // 左侧导航菜单是否mini模式
      leftNav: [], // 左侧菜单列表
      topMenuReskey: 'platformManage', // 默认管理平台
      gMenuList: [], // 当前用户菜单列表
      idRenderChild: false, // 是否加载子组件
      isHideNav: false, // 是否隐藏左侧菜单
      isIframe: false, // 是否隐藏头部
      current: ''
    }
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.init()
  }

  componentWillReceiveProps(nextProps) {
    const { pathname } = nextProps.location;
    console.log(pathname,'pathname')
    if (pathname === '/index') {
      this.setState({
        isHideNav: false,
        current: pathname
      })
    } else {
      this.setState({
        isHideNav: true,
        current: pathname
      })
    }
  }

  init() {
    // antd的message组件 的全局配置
    message.config({
      duration: 3,
    })
    // 初始化左侧菜单是mini模式还是正常模式
    if (sessionStorage.getItem('menuStyle') === 'false') {
      this.setState({
        menuStyle: false,
      })
    }
    console.log(sessionStorage.getItem('menuStyle'))
    console.log(sessionStorage.getItem('menuStyle') === 'true')
    if (sessionStorage.getItem('menuStyle') === 'true') {
      this.setState({
        menuStyle: true,
      })
    }
    const { query, pathname } = this.props.location
    if (query.ticket) { // 如果是url路径带ticket的话，那么在当前页面做登录的初始化
      validateTickit(this.props.location, (res) => {
        this.setState({
          idRenderChild: true,
        })
      })
    } else if (query.key) {
      // const params = parseQueryString(window.location.href)
      loginByKey({ }, (res) => {
        sessionStorage.setItem('key', query.key)
        this.setState({
          idRenderChild: true,
        })
      })
    } else {
      this.setState({ gMenuList: JSON.parse(sessionStorage.getItem('gMenuList')) })
      this.getMenuId(JSON.parse(sessionStorage.getItem('gMenuList')), this.props.location.pathname.replace('/', ''))
      // 初始化比较当前的顶级菜单属于哪个
      const { topMenuReskey } = this.state
      if (topMenuReskey !== sessionStorage.getItem('topMenuReskey')) {
        this.setState({ topMenuReskey: sessionStorage.getItem('topMenuReskey') })
      }
      this.setState({
        idRenderChild: true,
        // menuStyle: false,
      })
    }

    if (query.mode === 'iframe' || query.key) {
      this.setState({
        isIframe: true,
      })
    } else {
      this.setState({
        isIframe: false,
      })
    }
    if (pathname === '/index') {
      this.setState({
        isHideNav: false,
        current: pathname
      })
    } else {
      this.setState({
        isHideNav: true,
        current: pathname
      })
    }
  }

  // 获取菜单id
  getMenuId = (nav, pathname) => {
    this.topMenuReskeyFlag = '' // 顶级菜单分类
    this.topMenuReskeyChild = [] // 顶级菜单的孩子，也就是当前要显示在左侧页面的菜单
    this.flag = false // 用来保存顶级菜单的标志
    if (nav && nav.length > 0) {
      this.compare(nav, pathname)
    }
  }

  // 比较方法
  compare(children, pathname) {
    children.map((item) => {
      if (item.resKey.indexOf('platform') > -1) {
        if (!this.flag && (sessionStorage.getItem('topMenuReskey') !== 'set$')) {
          this.topMenuReskeyFlag = item.resKey
          this.topMenuReskeyChild = item.children
        }
      }
      // eslint-disable-next-line
      const _resKey = `${item.resKey.replace(/[\$\.\?\+\^\[\]\(\)\{\}\|\\\/]/g, '\\$&').replace(/\*\*/g, '[\\w|\\W]+').replace(/\*/g, '[^\\/]+')}$`
      if (new RegExp(_resKey).test(pathname)) {
        this.flag = true
        sessionStorage.setItem('menuId', item.id)
        // debugger
        sessionStorage.setItem('topMenuReskey', this.topMenuReskeyFlag)
        this.setState({ /* menuId: item.id,  */topMenuReskey: this.topMenuReskeyFlag })
        return null
      } else if (item.children) {
        this.compare(item.children, pathname)
      }
      return null
    })
  }

  // 左侧是否mini
  changeMenuStyle = (val) => {
    this.setState({
      menuStyle: val,
    }, () => {
      sessionStorage.setItem('menuStyle', val)
    })
  }

  // 顶级菜单点击事件的切换
  topMenuClick = (item, index) => {
    if (!item.children) {
      message.info('顶级菜单至少要有一个下级菜单')
      return
    }
    // sessionStorage.setItem('leftNav', JSON.stringify(item.children))
    // this.setState({ leftNav: item.children })
    sessionStorage.setItem('topMenuReskey', item.resKey)
    this.setState({ topMenuReskey: item.resKey })
    // if (index === 3) {
    //   this.set = true
    // } else {
    //   this.set = false
    // }

    if (item.resKey === 'controlCenter') {
      let hasIndex = false
      item.children.map((i) => {
        if (i.resKey === 'screen$/default') {
          hasIndex = true
        }
      })
      if (hasIndex) {
        hashHistory.push(item.children[0].resKey)
      } else {
        hashHistory.push('mission$/my$')
      }
    } else if (item.children[0] && item.children[0] && item.children[0].children && item.children[0].children[0]) {
      hashHistory.push(item.children[0].children[0].resKey)
    } else {
      hashHistory.push(item.children[0].resKey)
    }
  }

  handleClick = () => {
    // this.props.dispatch(addTag({resKey: '/userManage'}))
  }

  render() {
    const { location, children } = this.props
    const {
      gMenuList, idRenderChild, isIframe, topMenuReskey, leftNav, menuStyle, isHideNav
    } = this.state
    return (
      <LocaleProvider locale={zhCN}>
        <div id="container">
          {
            /* 注释socket
            <SocketComponent />
            */
          }
          {
            idRenderChild && !isIframe ? <Header
              gMenuList={gMenuList}
              topMenuClick={this.topMenuClick}
              topMenuReskey={this.state.topMenuReskey}
            /> : null
          }
          {
            idRenderChild ?
            <TopNav /> : null
          }
          
          <div className={isIframe ? 'boxed isIframe' : 'boxed'}>
            <div className={menuStyle ? 'boxed boxed-mini' : 'boxed'}>
              <div id="content-container" className={isHideNav ? "content-container" : "content-container1"}>
              {/* <div><Button onClick={this.handleClick}>111111</Button></div> */}
                {/* {
                  isHideNav ?
                  <Breadcrumb current={this.state.current}/> : null
                } */}
                {
                  isHideNav ?
                  <TagsView history={this.props.router}/> : null
                }
                <div id="page-content">
                  {idRenderChild ? children : null}
                </div>
              </div>
            </div>
            {
              isHideNav ?
                <LeftNav
                  location={location}
                  leftNavMode={this.changeMenuStyle}
                  menuStyle={menuStyle}
                  leftNav={leftNav}
                  topMenuReskey={topMenuReskey}
                /> : null
            }
          </div>
        </div>
      </LocaleProvider>
    )
  }
}

export default App