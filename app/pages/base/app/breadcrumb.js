import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hashHistory/* , Link  */ } from 'react-router'
// import { routerActions } from 'react-router-redux'
import { Menu, Spin, Breadcrumb } from 'antd'
// import { updateTabList } from '@actions/tabList'
import { clearGformCache2 } from '@actions/common'

const { SubMenu } = Menu

@connect((state, props) => ({
  config: state.config,
}))
export default class breadcrumb extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      current: ''
    }
    this.routers = [
      {
        id: 11,
        resName: '用户管理',
        resKey: '/userManage',
      },
      {
        id: 12,
        resName: '角色管理',
        resKey: '/roleManage',
      },
      {
        id: 13,
        resName: '权限管理',
        resKey: '/permissionManage',
      },
      {
        id: 14,
        resName: '客户信息',
        resKey: '/customerInfo',
      },
      {
        id: 15,
        resName: '供应商信息',
        resKey: '/vendorInfo',
      },
      {
        id: 16,
        resName: '物料信息',
        resKey: '/materielInfo',
      },
      {
        id: 17,
        resName: '节点信息',
        resKey: '/warehouseInfo',
      },
      {
        id: 19,
        resName: '用户信息',
        resKey: '/userInfo',
      },
      {
        id: 806,
        resName: '移库管理',
        resKey: '/transferManage',
      },
      {
        id: 802,
        resName: '入库管理',
        resKey: '/inboundManage',
      },
      {
        id: 808,
        resName: '清洗管理',
        resKey: '/washManage',
      },
      {
        id: 804,
        resName: '出库管理',
        resKey: '/outboundManage',
      },
      {
        id: 810,
        resName: '打包管理',
        resKey: '/packManage',
      },
      {
        id: 812,
        resName: '拆包管理',
        resKey: '/unpackManage',
      },
      {
        id: 814,
        resName: '库存查询',
        resKey: '/stockCheck',
      },
      {
        id: 801,
        resName: '标签管理',
        resKey: '/labelManage',
      },
    ]
  }

  componentDidMount() {
    let { current } = this.props;
    current = current.indexOf('/') > -1 ? current : `/${current}`
    const res = this.routers.filter(item=>{
      return item.resKey == current
    });
    this.setState({
      current: res[0].resName
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.current !== this.props.current) {
      const { current } = nextProps;
      const res = this.routers.filter(item=>item.resKey === current);
      this.setState({
        current: res[0].resName
      })
    }
  }

  render() {
    return (
      <div className='bread-crumb'>
        <Breadcrumb>
          <Breadcrumb.Item>基本信息</Breadcrumb.Item>
          <Breadcrumb.Item>{this.state.current}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }
}
