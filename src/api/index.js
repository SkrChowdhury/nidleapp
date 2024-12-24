import AsyncStorage from '@react-native-async-storage/async-storage';
import Request from './Request';
import jwt_decode from 'jwt-decode';

export function login(payload) {
  return new Promise((resolve, reject) => {
    Request.post(`auth/login`, payload)
      .then(response => {
        resolve(response.data.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function getEndPoint(path) {
  return Request.getEndPoint() + path;
}

export async function getToken() {
  return new Promise(async (resolve, reject) => {
    const _token = await AsyncStorage.getItem('token');
    _token ? resolve(_token) : null;
  });
}

export async function getUser() {
  return new Promise(async (resolve, reject) => {
    const _token = await AsyncStorage.getItem('token');
    _token ? resolve(jwt_decode(_token)) : reject('No token found');
  });
}

export async function orgTree() {
  return new Promise((resolve, reject) => {
    Request.get(`api/org:loggedUserOrgtree`)
      .then(response => {
        resolve(response.data.data);
        console.log(response.data.data);
      })
      .catch(error => {
        reject('Error api/org:loggedUserOrgtree: ', error);
      });
  });
}

export async function getDeviceList() {
  return new Promise(async (resolve, reject) => {
    await Request.get(`api/v2/device`)
      .then(response => {
        resolve(response.data.data);
      })
      .catch(error => {
        reject('Error DeviceList: ', error);
      });
  });
}

//http://192.168.11.16:8080/nidle4aDev/api/v1/employees
export async function getEmployees() {
  return new Promise(async (resolve, reject) => {
    await Request.get(`api/v1/employees`)
      .then(response => {
        resolve(response.data.data.content);
      })
      .catch(error => {
        reject('Error Employees: ', error);
      });
  });
}
//http://192.168.11.16:8080/nidle4aDev/api/v1/customers
export async function getBuyers() {
  return new Promise(async (resolve, reject) => {
    await Request.get(`api/v1/customers`)
      .then(response => {
        resolve(response.data.data.content);
      })
      .catch(error => {
        reject('Error Customers: ', error);
      });
  });
}

//http://192.168.11.16:8080/nidle4aDev/api/v1/styles
export async function getStyles() {
  return new Promise(async (resolve, reject) => {
    await Request.get(`api/v1/styles`)
      .then(response => {
        resolve(response.data.data.content);
      })
      .catch(error => {
        reject('Error Styles: ', error);
      });
  });
}


//http://192.168.10.53:8081/api/v1/lineLayouts/styleAndIdAndCustomerWise?lineId=602&customerId=19&styleId=85
export async function getLineLayout(lineId, customerId,styleId) {
  // console.log("getLineOut'", currentDateAndTime)

  return new Promise(async (resolve, reject) => {
    await Request.get(
      `api/v1/lineLayoutItem/styleAndIdAndCustomerWise?lineId=${lineId}&customerId=${customerId}&styleId=${styleId}`,
    )
      .then(response => {
        resolve(response.data.data.content);
      })
      .catch(error => {
        reject('Error in getLineOut: ', error);
      });
  });
}
//http://192.168.10.53:8081/api/v1/getWorkStationAndOperation?layoutItemId=2664
export async function getWorkStation(layoutItemId) {
  // console.log("getLineOut'", currentDateAndTime)

  return new Promise(async (resolve, reject) => {
    await Request.get(
      `api/v1/lineLayoutItem/getWorkStationAndOperation?layoutItemId=${layoutItemId}`,
    )
      .then(response => {
        resolve(response.data.data.content);
      })
      .catch(error => {
        reject('Error in getWorkStation: ', error);
      });
  });
}


//http://192.168.11.16:8080/nidle4a/api/v1/orderEntities
export async function getOrderEntities() {
  return new Promise(async (resolve, reject) => {
    await Request.get(`api/v1/orderEntities`)
      .then(response => {
        resolve(response.data.data.content);
      })
      .catch(error => {
        reject('Error Order Entities: ', error);
      });
  });
}

//http://192.168.11.16:8080/nidle4a/api/v1/defects
export async function getDefects() {
  return new Promise(async (resolve, reject) => {
    await Request.get(`api/v1/defects`)
      .then(response => {
        resolve(response.data.data.content);
      })
      .catch(error => {
        reject('Error Defects: ', error);
      });
  });
}

//http://192.168.11.16:8080/nidle4aDev/api/v1/getStylesByBuyer/24281
export async function getStyleByBuyers(buyerId) {
  return new Promise(async (resolve, reject) => {
    await Request.get(`api/v1/styles/getStylesByBuyer/${buyerId}`)
      .then(response => {
        resolve(response.data.data.content);
      })
      .catch(error => {
        reject('Error Employees: ', error);
      });
  });
}

//http://192.168.11.16:8080/nidle4aDev/api/v1/styles/278801
export async function getOperationsByStyle(styleId) {
  return new Promise(async (resolve, reject) => {
    await Request.get(`api/v1/styles/${styleId}`)
      .then(response => {
        resolve(response.data.data.content);
      })
      .catch(error => {
        reject('Error OperationsByStyle: ', error);
      });
  });
}

//http://192.168.11.16:8080/nidle4aDev/api/v1/items/getItemOperationBreakDown/278635
export async function getOperationsByItem(itemId) {
  return new Promise(async (resolve, reject) => {
    await Request.get(`api/v1/items/getItemOperationBreakDown/${itemId}`)
      .then(response => {
        resolve(response.data.data.content);
      })
      .catch(error => {
        reject('Error OperationsByItem: ', error);
      });
  });
}

//http://192.168.11.16:8080/nidle4aDev/api/v1/device/1212439
export async function deviceUpdate(payLoad) {
  console.log(`api/v2/device/${payLoad.id}`)
  return new Promise(async (resolve, reject) => {
    await Request.put(`api/v2/device/${payLoad.id}`, payLoad)
      .then(response => {
        resolve(response.data.data.content);
      })
      .catch(error => {
        reject('Error in Device update: ', error);
      });
  });
}

//http://192.168.11.16:8080/nidle4aDev/api/v1/tlsForm
export function postTLS(payLoad) {
  return new Promise((resolve, reject) => {
    Request.post(`api/v1/tlsForm`, payLoad)
      .then(response => {
        resolve(response.data.data);
      })
      .catch(error => {
        reject('Error in TLS post: ', error);
      });
  });
}

//http://192.168.11.16:8080/nidle4aDev/api/v1/tlsForm
export async function getTLS() {
  return new Promise(async (resolve, reject) => {
    await Request.get(`api/v1/tlsForm`)
      .then(response => {
        resolve(response.data.data);
      })
      .catch(error => {
        reject('Error in TLS get list: ', error);
      });
  });
}

//http://192.168.11.16:8080/nidle4aDev/api/users/modules
export async function getModules() {
  return new Promise(async (resolve, reject) => {
    await Request.get(`api/users/modules`)
      .then(response => {
        resolve(response.data.data);
      })
      .catch(error => {
        reject('Error in module list: ', error);
      });
  });
}

//http://192.168.11.16:8080/nidle4aDev/api/v1/productions/ProductionDashBoardQcPass?currentDateAndTime=2022-12-29T11:34:08&orgId=952
export async function getProductionDashBoardQcPass(currentDateAndTime, orgId) {
  // console.log("getProductionDashBoardQcPass'", currentDateAndTime)

  return new Promise(async (resolve, reject) => {
    await Request.get(
      `api/v1/productions/ProductionDashBoardQcPass?currentDateAndTime=${currentDateAndTime}&orgId=${orgId}`,
    )
      .then(response => {
        resolve(response.data.data.content);
      })
      .catch(error => {
        reject('Error in getProductionDashBoardQcPass: ', error);
      });
  });
}

//http://192.168.11.16:8080/nidle4aDev/api/v1/productions/getProductivityEfficiency?startDate=2022-12-28T00:00:00&endDate=2022-12-28T11:35:08&orgId=952

// home/getEfficiencyByDate?startDate=2023-8-1T00:00:00&endDate=2023-08-31T15:22:05

export async function getProductivityEfficiency(startDate, endDate, orgId) {
  return new Promise(async (resolve, reject) => {
    await Request.get(
      `api/v1/productions/getProductivityEfficiency?startDate=${startDate}&endDate=${endDate}&orgId=${orgId}`,
    )
      .then(response => {
        resolve(response.data.data.content);
      })
      .catch(error => {
        reject('Error in getProductivityEfficiency: ', error);
      });
  });
}

//http://192.168.11.16:8080/nidle4aDev/api/v1/productions/getTodaysHourWiseProductionEfficiencyBar?currentDateAndTime=2022-12-29T11:34:08&orgId=952
export async function getTodaysHourWiseProductionEfficiencyBar(
  currentDateAndTime,
  orgId,
) {
  return new Promise(async (resolve, reject) => {
    await Request.get(
      `api/v1/productions/getTodaysHourWiseProductionEfficiencyBar?currentDateAndTime=${currentDateAndTime}&orgId=${orgId}`,
    )
      .then(response => {
        resolve(response.data.data.content);
      })
      .catch(error => {
        reject('Error in getTodaysHourWiseProductionEfficiencyBar: ', error);
      });
  });
}

//http://192.168.11.16:8080/nidle4a/api/v1/qualityDefects/getTopQualityDefects?startDate=2022-12-29T00:00:00&endDate=2022-12-29T18:09:28&orgId=2852
export async function getTopDefects(startDate, endDate, orgId) {
  return new Promise(async (resolve, reject) => {
    await Request.get(
      `api/v1/qualityDefects/getTopQualityDefects?startDate=${startDate}&endDate=${endDate}&orgId=${orgId}`,
    )
      .then(response => {
        resolve(response.data.data.content);
      })
      .catch(error => {
        reject('Error in getTopQualityDefects: ', error);
      });
  });
}

//http://192.168.11.16:8080/nidle4a/api/v1/productions/getFloorDashboard?startDate=2022-12-29T00:00:00
export async function getFloorData(startDate) {
  return new Promise(async (resolve, reject) => {
    await Request.get(
      `api/v1/productions/getFloorDashboard?startDate=${startDate}`,
    )
      .then(response => {
        resolve(response.data.data.content);
      })
      .catch(error => {
        reject('Error in getFloorDashboard: ', error);
      });
  });
}

//http://192.168.24.70:8080/nidle4a/api/v1/productions/getProductionReportQcPass?startDate=2023-1-29%2008:00:00&endDate=2023-1-29%2018:15:58&orgId=952
export async function getProductionReportQcPass(startDate, endDate, orgId) {
  console.log(startDate, endDate + orgId);
  return new Promise(async (resolve, reject) => {
    await Request.get(
      `api/v1/productions/getProductionReportQcPass?startDate=${startDate}&endDate=${endDate}&orgId=${orgId}`,
    )
      .then(response => {
        resolve(response.data.data.content);
      })
      .catch(error => {
        reject('Error in getProductionReportQcPass: ', error);
      });
  });
}
