import * as types from "../action-types";
import { fetchWarehouses, fetchWarehousesAll, fetchProvince, addWarehouses, deleteWarehouse, fetchDeviceType, addDevices, fetchDevices, editDevices, deleteDevice, fetchBOM, fetchDevicesByCode, addBOM, addWarehouseAreas, fetchWarehouseAreas, fetchInboundRecords, addInboundRecords, deleteInboundRecords, fetchOutboundRecords, addOutboundRecords } from '@apis/pavo';
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

export const fetchWarehousesAlls = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetchWarehousesAll(params)
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
export const addBOMS = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    addBOM({...params}).then((response) => {
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
//
export const fetchDevicesByCodes = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetchDevicesByCode(params).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}

//新增
export const addWarehouseArea = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    addWarehouseAreas({...params}).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}
//查询
export const fetchWarehouseArea = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetchWarehouseAreas({...params}).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}
// 入库
// 查询
export const fetchInboundRecord = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetchInboundRecords({...params}).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}
// 新增
export const addInboundRecord = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    addInboundRecords({...params}).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}
// 删除
export const deleteInboundRecord = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    deleteInboundRecords(params).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}
// 出库
// 查询
export const fetchOutboundRecord = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetchOutboundRecords({...params}).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}
// 
export const addOutboundRecord = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    addOutboundRecords({...params}).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}