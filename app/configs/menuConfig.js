/**
 * icon:菜单项图标
 * roles:标明当前菜单项在何种角色下可以显示，如果不写此选项，表示该菜单项完全公开，在任何角色下都显示
 */
const menuList = [
  {
    resName: "首页",
    resKey: "index",
  },
  {
    resName: "系统信息",
    resKey: "systemManage",
    children: [
      {
        resName: "用户管理",
        resKey: "userManage",
      },
      {
        resName: "权限管理",
        resKey: "permissionManage",
      },
      {
        resName: "角色管理",
        resKey: "roleManage",
      }
    ],
  },
  {
    resName: "基本信息",
    resKey: "baseInfo",
    children: [
      {
        resName: "客户信息",
        resKey: "customerInfo",
      },
      {
        resName: "供应商信息",
        resKey: "vendorInfo",
      },
      {
        resName: "物料信息",
        resKey: "materielInfo",
      },
      {
        resName: "节点信息",
        resKey: "warehouseInfo",
      },
      {
        resName: "用户信息",
        resKey: "userInfo",
      }
    ],
  },
  {
    resName: "仓库管理",
    resKey: "warehouseManage",
    children: [
      {
        resName: "入库管理",
        resKey: "inboundManage",
      },
      {
        resName: "出库管理",
        resKey: "outboundManage",
      }
    ],
  }
];
export default menuList;
