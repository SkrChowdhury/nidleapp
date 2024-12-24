import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const GlobalContext = React.createContext();

const GlobalProvider = ({children}) => {
  // useEffect(() => { }, [contextValue]);
  const [contextValue, setValue] = useState({
    user: '',
    userInfo: '',
    orgTree: '',
    deviceList: [],
    modules: [],
  });

  const [header, setHeaderValue] = useState('');
  const [token, setTokenValue] = useState('');
  const [employees, setEmployeeList] = useState([]);
  const [selectedEmployee, setEmployee] = useState();
  const [buyers, setBuyersList] = useState([]);
  const [orderEntities, setOrderEntitiesList] = useState([]);
  const [defects, setDefectsList] = useState([]);
  const [selectedLine, setLine] = useState('');
  const [orgTree, setOrgTreeList] = useState('');
  const [operationsByStyleId, setOperationsByStyleIdList] = useState([]);
  const [worker, setWorkerList] = useState([]);
  const [clickedItemId, setClickedItem] = useState();
  const [selectedBuyerStyle, setSelectedBuyerStyleList] = useState({});
  const [operationList, setOperationListItems] = useState([]);
  const [selectedWorkers, setSelectedWorkersList] = useState([]);

  const setToken = async token => {
    token ? await AsyncStorage.setItem('token', token) : '';
    setTokenValue(token);
  };

  const setUser = data => {
    setValue({...contextValue, user: data});
  };

  const setClickedItemId = data => {
    setClickedItem(data);
  };

  const setSelectedWorkers = data => {
    setSelectedWorkersList(data);
  };

  const setUserInfo = data => {
    setValue({...contextValue, userInfo: data});
  };

  const setOrgTree = data => {
    setOrgTreeList(data);
  };

  const setHeader = data => {
    setHeaderValue(data);
  };

  const setSelectedLine = data => {
    setLine(data);
  };

  const setOperationList = data => {
    setOperationListItems(data);
  };

  const setSelectedBuyerStyle = data => {
    setSelectedBuyerStyleList(data);
  };

  const setDeviceList = data => {
    setValue({...contextValue, deviceList: data});
  };

  const setEmployees = data => {
    setEmployeeList(data);
  };

  const setSelectedEmployee = data => {
    setEmployee(data);
  };

  const setBuyers = data => {
    setBuyersList(data);
  };

  const setOrderEntities = data => {
    setOrderEntitiesList(data);
  };

  const setOrderStyles = data => {
    setStylesList(data);
  };

  const setDefects = data => {
    setDefectsList(data);
  };

  const setWorker = data => {
    setWorkerList(data);
  };

  const setOperationsByStyleId = data => {
    setOperationsByStyleIdList(data);
  };

  const setModules = data => {
    setValue({...contextValue, modules: data});
  };

  return (
    <GlobalContext.Provider
      value={{
        contextValue,
        setToken,
        employees,
        defects,
        selectedEmployee,
        setSelectedEmployee,
        buyers,
        orderEntities,
        token,
        setUser,
        setUserInfo,
        setOrgTree,
        orgTree,
        header,
        setHeader,
        setDeviceList,
        setBuyers,
        setDefects,
        setEmployees,
        setModules,
        setOrderEntities,
        setSelectedLine,
        selectedLine,
        setOperationsByStyleId,
        operationsByStyleId,
        worker,
        setWorker,
        setClickedItemId,
        clickedItemId,
        selectedBuyerStyle,
        setSelectedBuyerStyle,
        setOperationList,
        operationList,
        selectedWorkers,
        setSelectedWorkers,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export {GlobalContext, GlobalProvider};
