import React from 'react'
import { Router, Route, IndexRoute, hashHistory/* , Redirect */ } from 'react-router'
import { isLogin } from '@configs/common'
import { set } from '@config'

import * as base from '@pages/base' // 基础
import * as sysSet from '@pages/system' // 系统管理
import * as warehouseManage from '@pages/warehouseManage' // 仓库管理
import * as baseInfo from '@pages/baseInfo' // 基本信息
import * as menu from '@pages/menu' // 菜单

export default () => (
  <Router history={hashHistory}>
    <Route path="/" component={base.app} onEnter={isLogin}>
      <IndexRoute component={base.example} />
      <Route path="/index" component={base.home} />
      {/* <Route path="/socketReceive" component={base.socketReceive} /> */}
      {/** *菜单 开始 */}
      <Route path="/echarts" component={menu.echarts} />
      <Route path="/editor" component={menu.editor} />
      {/** *菜单 结束 */}
      {/** *系统管理 开始 */}
      <Route path={`/userManage`} component={sysSet.userManage} />
      <Route path={`/roleManage`} component={sysSet.roleManage} />
      <Route path={`/permissionManage`} component={sysSet.powerManage} />
      {/** *系统管理 结束 */}
      {/** *仓库管理 开始 */}
      <Route path={`/inboundManage`} component={warehouseManage.inboundManage} />
      <Route path={`/outboundManage`} component={warehouseManage.outboundManage} />
      <Route path={`/transferManage`} component={warehouseManage.transferManage} />
      <Route path={`/washManage`} component={warehouseManage.washManage} />
      <Route path={`/packManage`} component={warehouseManage.packManage} />
      <Route path={`/unpackManage`} component={warehouseManage.unpackManage} />
      <Route path={`/stockCheck`} component={warehouseManage.stockCheck} />
      <Route path={`/labelManage`} component={warehouseManage.labelManage} />
      {/** *仓库管理 结束 */}
      {/** 基本信息 开始 */}
      <Route path={`/customerInfo`} component={baseInfo.customerInfo} />
      <Route path={`/customerInfo/dtoDetail`} component={baseInfo.dtoDetail} />
      <Route path={`/vendorInfo`} component={baseInfo.vendorInfo} />
      <Route path={`/materielInfo`} component={baseInfo.materielInfo} />
      <Route path={`/warehouseInfo`} component={baseInfo.warehouseInfo} />
      <Route path={`/userInfo`} component={baseInfo.userInfo} />
      <Route path={`/BOMInfo`} component={baseInfo.BOMInfo} />
      {/** *基本信息 结束 */}
    </Route>
    {/* <Route path="/desk$/index" component={base.example} /> */}
    <Route path="/login" component={base.login} />
    <Route path="*" component={base.notfound} />
  </Router>
)
