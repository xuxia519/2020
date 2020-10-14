import * as types from "../action-types";
import { fetchWarehouses, fetchProvince, addWarehouses, deleteWarehouse, fetchDeviceType, addDevices, fetchDevices, editDevices, deleteDevice, fetchBOM } from '@apis/pavo';
import { resolve, reject } from "core-js/fn/promise";

export const fetchWarehouse = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetchWarehouses({...params})
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

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

// 添加仓库
export const addWarehous = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    addWarehouses({...params}).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}

// 删除仓库
export const deleteWarehouses = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    deleteWarehouse(params).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}

// 查询物料类型
export const fetchDeviceTypes = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetchDeviceType()
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//添加设备
export const addDevice = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    addDevices({...params}).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}
//查询设备
export const fetchDevice = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetchDevices({...params}).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}
//修改设备
export const editDevice = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    editDevices({...params}).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}

// 删除设备
export const deleteDevices = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    deleteDevice(params).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}
// BOM
export const fetchBOMS = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetchBOM().then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}