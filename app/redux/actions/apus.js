import * as types from "../action-types";
import { fetchProvince, fetchCustomer, fetchAllCustomer, addCustomer, editCustomer, fetchCpns, fetchCpns2, addCpns, editCpns, deleteCpns, fetchVendor, fetchAllVendor, addVendor, editVendor, deleteVendor, deleteCustomer } from '@apis/apus';

// 省
export const fetchProvinces = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetchProvince({...params}).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}

// 客户信息
export const fetchCustomers = (params) => (dispatch) => {
  const { values, pageNumber, pageSize } = params;
  return new Promise((resolve, reject) => {
    fetchCustomer({...values, pageNumber, pageSize}).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}
//所有客户
export const fetchAllCustomers = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetchAllCustomer().then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}

// 新增客户
export const addCustomers = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    addCustomer({...params}).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}

// 修改客户信息
export const editCustomers = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    editCustomer(params).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}
// 删除客户

export const deleteCustomers = (params) => (dispatch) => {
  console.log(params)
  return new Promise((resolve, reject) => {
    deleteCustomer(params).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}
//查询物料
export const fetchCpnsById = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetchCpns(params).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}
//分页查询物料
export const fetchCpnsByPage = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetchCpns2({...params}).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}
//新增物料
export const addCpn = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    addCpns(params).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}
//修改物料
export const editCpnsById = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    editCpns(params).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}
//删除物料
export const deleteCpnsById = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    deleteCpns({...params}).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}

// 供应商
// 查询
export const fetchVendors = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetchVendor({...params}).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}
// 查询所有
export const fetchAllVendors = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetchAllVendor().then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}
//新增供应商
export const addVendors = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    addVendor(params).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}
//修改供应商
export const editVendors = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    editVendor(params).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}
// 删除供应商
export const deleteVendors = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    deleteVendor(params).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}