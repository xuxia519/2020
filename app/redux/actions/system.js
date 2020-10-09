import * as types from "../action-types";
import { fetchUser, fetchRole,  editUser, editRole, deleteUser, fetchPermissions, fetchRoleByParam, fetchPermissionsByParam, fetchResource, fetchResourceByParam, deletePermission, addRole, editPermission, addPermission, deletePower, addUser, editUserInfo, fetchDepartment, deleteUserRole } from '@apis/system';

import { resolve, reject } from "core-js/fn/promise";

export const fetchUserList = (params) => (dispatch) => {
  const { page, size, values = {} } = params;
  const { code = '', roleIds = [], name = '', ...reset } = values;
  return new Promise((resolve, reject) => {
    fetchUser({page, size, code, roleIds: roleIds, name, ...reset})
      .then((response) => {
        dispatch(setUserList(response.data));
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const fetchRoleList = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetchRole()
      .then((response) => {
        dispatch(setRoleList(response.data));
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const fetchRoleListByParam = (params) => (dispatch) => {
  const { page, size, values = {}  } = params;
  const { name = '', permissionIds = [] } = values;
  return new Promise((resolve, reject) => {
    fetchRoleByParam({page, size, name, permissionIds})
      .then((response) => {
        // dispatch(setRoleList(response.data));
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const fetchPermissionsList = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetchPermissions()
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const fetchPermissionsListByParam = (params) => (dispatch) => {
  const { page, size, values = {} } = params;
  const { name = '' } = values;
  return new Promise((resolve, reject) => {
    fetchPermissionsByParam({page, size, name})
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const fetchResourceList = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetchResource()
      .then((response) => {
        dispatch(setRoleList(response.data));
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const fetchResourceListByParam = (params) => (dispatch) => {
  const { pageNumber, pageSize, values = {}  } = params;
  const { name = '' } = values;
  return new Promise((resolve, reject) => {
    fetchResourceByParam({pageNumber, pageSize, name})
      .then((response) => {
        // dispatch(setRoleList(response.data));
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const editUserRole = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    editUser(params)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//修改角色的权限
export const editRoles = (params) => (dispatch) => {
  const { id, description, name, permissionIds } = params;
  console.log(params)
  return new Promise((resolve, reject) => {
    editRole({ id, description, name, permissionIds })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 新增用户
export const addUsers = (params) => (dispatch) => {
  const { values } = params;
  return new Promise((resolve, reject)=>{
    addUser({...values}).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}

// 修改用户基本信息
export const editUsersInfo = (params) => (dispatch) => {
  const { values, id } = params;
  return new Promise((resolve, reject)=>{
    editUserInfo({...values, id}).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}

// 添加角色
export const addRoles = (params) => (dispatch) => {
  const { description, name, permissionIds } = params;
  console.log(params)
  return new Promise((resolve, reject) => {
    addRole({ description, name, permissionIds })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 添加权限
export const addPermissions = (params) => (dispatch) => {
  const { description, name, resourceIds } = params;
  console.log(params)
  return new Promise((resolve, reject) => {
    addPermission({ description, name, resourceIds })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteUsers = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    deleteUser(params)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 删除用户关联的角色
export const deleteUserRoles = (params) => (dispatch) => {
  const { roleIds} = params;
  return new Promise((resolve, reject) => {
    deleteUserRole(params)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 删除角色
export const deletePermissions = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    deletePermission(params)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 删除权限
export const deletePowers = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    deletePower(params)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//修改权限资源
export const editPermissions = (params) => (dispatch) => {
  const { id, description, name, resourceIds } = params;
  return new Promise((resolve, reject) => {
    editPermission({ id, description, name, resourceIds })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 查询部门
export const fetchDepartments = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetchDepartment()
      .then((response) => {
        dispatch(setRoleList(response.data));
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const setUserList = (data) => {
  return {
    type: types.FETCH_USER_LIST,
    data,
  };
};

export const setRoleList = (data) => {
  return {
    type: types.FETCH_ROLE_LIST,
    data,
  };
};
