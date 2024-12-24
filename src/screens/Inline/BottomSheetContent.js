import {PanningProvider, Picker} from 'react-native-ui-lib';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {
  deviceUpdate,
  getBuyers,
  getEmployees,
  getLineLayout,
  getStyleByBuyers,
  getWorkStation,
} from '../../api';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {GlobalContext} from '../../context/GlobalProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from '../../common/RModal';
import {RNToasty} from 'react-native-toasty';
import Swiper from 'react-native-swiper';
import TreeSelect from 'react-native-tree-select';

export default function BottomSheetContent(props) {
  const [data, setData] = useState({
    line: 'Choose',
    operator: 'Choose',
    buyer: 'Choose',
    style: 'Choose',
    operation: 'Choose',
    triggerVolt: 0,
    mode: 0,
    allowance: 0,
    stitchAllowance: 0,
    lineLayout: {},
    workStation: {},
    deviceWiseOperationDtoList:
      props.selectedDevice?.deviceWiseOperationDtoList || [],
    deviceWiseOperationCheckDelay: 0,
    deviceWiseOperationTimeAllowance: 0,
    deviceWiseOperationStitchAllowance: 0,
  });

  const [errors, setErrors] = useState({
    triggerVolt: '',
    allowance: '',
    stitchAllowance: '',
  });
  const [deviceWiseOperationErrors, setdeviceWiseOperationErrors] = useState({
    checkDelay: '',
    allowance: '',
    stitchAllowance: '',
  });
  const [currentSwiperIndex, setCurrentSwiperIndex] = useState(0);

  const [operators, setOperator] = useState([]);
  const [buyers, setBuyer] = useState([]);
  const [lineLayoutList, setLineLayoutList] = useState([]);
  const [workStationList, setWorkStationList] = useState([]);
  const [stylesList, setStyles] = useState([]);

  const {orgTree} = useContext(GlobalContext);
  const [isModal, setModal] = useState(false);
  const [selectedLine, setLine] = useState('');
  const [isButtonActive, setButtonActive] = useState(true);

  const modeList = [
    {id: 0, name: 'Button'},
    {id: 1, name: 'Trimming'},
    {id: 2, name: 'Motor'},
    {id: 3, name: 'Synchronizer'},
  ];

  function onLeafClicked(e) {
    setData({...data, line: e.item.id});
    setLine(e);
    setModal(false);
  }

  async function getEmployeesList() {
    await getEmployees()
      .then(response => {
        setOperator(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async function getBuyersList() {
    getBuyers()
      .then(response => {
        setBuyer(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async function buyerOnChangeHandler(buyerId) {
    getStyleByBuyers(buyerId)
      .then(response => {
        setStyles(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async function styleOnChangeHandler(lineId, buyerId, styleId) {
    getLineLayout(lineId, buyerId, styleId)
      .then(response => {
        setLineLayoutList(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async function lineLayoutChangeHandler(linelayoutId) {
    getWorkStation(linelayoutId)
      .then(response => {
        setWorkStationList(response.listOfWorkStations);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    setErrors({
      triggerVolt: '',
      allowance: '',
      stitchAllowance: '',
    });
    setdeviceWiseOperationErrors({
      checkDelay: '',
      allowance: '',
      stitchAllowance: '',
    });
    getEmployeesList();
    getBuyersList();
    onEditMode();
  }, [props.selectedDevice]);

  useEffect(() => {
    checkValidity();
  }, [data]);

  function onEditMode() {
    console.log('Edit mode', props.selectedDevice);
    setData({
      ...data,
      buyer: props?.selectedDevice?.buyer,
      operator: props?.selectedDevice?.employee,
      line: props?.selectedDevice?.organization?.id,
      style: props?.selectedDevice?.style,
      triggerVolt: props?.selectedDevice?.triggerVoltage || 0,
      mode: props?.selectedDevice?.mode,
      allowance: props?.selectedDevice?.allowance || 0,
      stitchAllowance: props?.selectedDevice?.stitchAllowance || 0,
      lineLayout: props?.selectedDevice?.layoutItem,
      deviceWiseOperationDtoList:
        props.selectedDevice?.deviceWiseOperationDtoList || [],
    });
    setLine({item: props?.selectedDevice?.organization});
  }
  function updateHandler() {
    let payLoad = {
      id: props.selectedDevice.id,
      macId: props.selectedDevice.macId,
      createdAt: props.selectedDevice.createdAt,
      accessKey: props.selectedDevice.accessKey,
      status: 1,
      state: 0,
      mode: data.mode,
      triggerVoltage: Number(data.triggerVolt),
      allowance: data.allowance
        ? data.allowance
        : props?.selectedDevice?.allowance,
      stitchAllowance: Number(data.stitchAllowance),
      checkDelay: props.selectedDevice.checkDelay,
      isLogging: props.selectedDevice.isLogging,
      deviceId: props.selectedDevice.deviceId,
      minIdleTime: props.selectedDevice.minIdleTime,
      lastStartUpCall: props.selectedDevice.lastStartUpCall,
      lastStateUpdate: props.selectedDevice.lastStateUpdate,
      lastInfoUpdate: props.selectedDevice.lastInfoUpdate,
      organization: data?.line
        ? {id: data?.line}
        : props?.selectedDevice?.organization,
      buyer: data?.buyer,
      style: data?.style
        ? {
            id: data?.style?.id,
            name: data?.style?.name,
          }
        : {},
      employee: data?.operator,
      version: props.selectedDevice.version,
      layoutItem: data?.lineLayout?.id
        ? {
            id: data?.lineLayout?.id,
            orderQuantity: data?.lineLayout?.orderQuantity,
            planQuantity: data?.lineLayout?.planQuantity,
            planTarget: data?.lineLayout?.planTarget,
            availableMp: data?.lineLayout?.availableMp,
            layoutNo: data?.lineLayout?.layoutNo,
            estimateEfficiency: data?.lineLayout?.estimateEfficiency,
            allowance: data?.lineLayout?.allowance,
            startDate: data?.lineLayout?.startDate,
            endDate: data?.lineLayout?.endDate,
            status: data?.lineLayout?.status,
            totalSmv: data?.lineLayout?.totalSmv,
            usedManpower: data?.lineLayout?.usedManpower,
            potentialOutput: data?.lineLayout?.potentialOutput,
            maxOutput: props?.selectedDevice?.layoutItem?.maxOutput || 0,
            avgWorkLoad: data?.lineLayout?.avgWorkLoad,
            name: data?.lineLayout?.name,
            noOfWorkStation: data?.lineLayout?.noOfWorkStation,
          }
        : {},
      deviceWiseOperationDtoList: data?.deviceWiseOperationDtoList
        ? data?.deviceWiseOperationDtoList
        : props.selectedDevice?.deviceWiseOperationDtoList,
      workStationName: data?.workStation?.workStationName
        ? data?.workStation?.workStationName
        : '',
      workStationNo: data?.workStation?.workStationNo
        ? data?.workStation?.workStationNo
        : 0,
    };

    console.log('Update payload', payLoad);

    deviceUpdate(payLoad)
      .then(response => {
        props.bottomSheetRef.current?.close();
        RNToasty.Success({
          title: 'Device update successfully !',
          fontFamily: 'Lato-Regular',
          position: 'bottom',
        });
      })
      .catch(error => {
        console.log(error);
        RNToasty.Error({
          title: 'Something went wrong !',
          fontFamily: 'Lato-Regular',
          position: 'bottom',
        });
      });
  }

  function checkValidity() {
    const isTriggerVoltValid = data.triggerVolt >= 0 && data.triggerVolt <= 40;
    const isAllowanceValid = data.allowance >= 0.01 && data.allowance <= 1;
    const isStitchAllowanceValid =
      data.stitchAllowance >= 0 && data.stitchAllowance <= 50;

    const isDeviceWiseOperationCheckDelayValid =
      data.deviceWiseOperationCheckDelay >= 0 &&
      data.deviceWiseOperationCheckDelay <= 10000;
    const isDeviceWiseOperationTimeAllowanceValid =
      data.deviceWiseOperationTimeAllowance >= 0 &&
      data.deviceWiseOperationTimeAllowance <= 1;
    const isDeviceWiseOperationStitchAllowanceValid =
      data.deviceWiseOperationStitchAllowance >= 0 &&
      data.deviceWiseOperationStitchAllowance <= 50;
    if (
      isAllowanceValid &&
      isStitchAllowanceValid &&
      data.buyer &&
      data.line &&
      data.operator &&
      data.style &&
      isTriggerVoltValid &&
      data.mode && 
      isDeviceWiseOperationCheckDelayValid &&
      isDeviceWiseOperationTimeAllowanceValid &&
      isDeviceWiseOperationStitchAllowanceValid
    ) {
      setButtonActive(false);
    } else {
      setButtonActive(true);
    }
  }

  const handleInputChange = (field, value) => {
    // Convert the input value to a float for numeric validation
    const numericValue = value;
    let error = '';

    // Validate based on the field
    switch (field) {
      case 'triggerVolt':
        if (numericValue < 0 || numericValue > 40) {
          error = 'Trigger voltage must be between 0 and 40';
        }
        break;
      case 'allowance':
        if (numericValue < 0.01 || numericValue > 1) {
          error = 'Time allowance must be between 0.01 and 1';
        }
        break;
      case 'stitchAllowance':
        if (numericValue < 0 || numericValue > 50) {
          error = 'Stitch allowance must be between 0 and 50';
        }
        break;
      default:
        break;
    }

    // Update the state for the specific field and error message
    setData({...data, [field]: numericValue});
    setErrors({...errors, [field]: error});
  };
  const handleDeviceWiseOperationInputChange = (field, value) => {
    const numericValue = parseFloat(value);
    let error = '';

    switch (field) {
      case 'checkDelay':
        if (numericValue < 0 || numericValue > 10000) {
          error = 'Check Delay must be between 0 and 10000';
       
        }
        break;
      case 'allowance':
        if (numericValue < 0.01 || numericValue > 1) {
          error = 'Time allowance must be between 0.01 and 1';
        
        }
        break;
      case 'stitchAllowance':
        if (numericValue < 0 || numericValue > 50) {
          error = 'Stitch allowance must be between 0 and 50';
      
        }
        break;
      default:
        break;
    }

    const updatedList = data.deviceWiseOperationDtoList.map((item, index) => {
      if (index === currentSwiperIndex) {
        return {...item, [field]: numericValue};
      }
      return item;
    });

    setData({...data, deviceWiseOperationDtoList: updatedList});
    setdeviceWiseOperationErrors({
      ...deviceWiseOperationErrors,
      [field]: error,
    });
  };

  return (
    <ScrollView>
      <View style={styles.content}>
        <Text style={{fontFamily: 'Lato-Bold'}}>
          Update Device Info{' '}
          <Text style={{color: 'red', fontFamily: 'Lato-Bold'}}>
            [{props?.selectedDevice?.deviceId}]
          </Text>
        </Text>

        <View style={{marginTop: 10}}>
          <Text style={styles.label}>Line</Text>
          <View
            style={{
              borderColor: '#C0C0C0',
              borderWidth: 1,
              paddingTop: 7,
              height: 35,
              paddingHorizontal: 10,
              borderRadius: 20,
              marginTop: 3,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text>{selectedLine?.item?.name}</Text>
            <TouchableOpacity onPress={() => setModal(true)}>
              <Text style={{fontFamily: 'Lato-Bold'}}>
                {selectedLine?.item?.name ? 'Update' : 'Select'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{marginTop: 10, width: '48%'}}>
            <Text style={styles.label}>Buyers</Text>
            <View
              style={{
                borderColor: '#C0C0C0',
                borderWidth: 1,
                paddingTop: 5,
                height: 35,
                paddingHorizontal: 10,
                borderRadius: 20,
                marginTop: 3,
              }}>
              <Picker
                showSearch={true}
                migrate
                migrateTextField
                // value={line}
                onChange={value => {
                  setData({
                    ...data,
                    buyer: buyers.filter(item => item.id === value)[0],
                  });
                  buyerOnChangeHandler(value);
                }}
                label={data?.buyer?.name}
                placeholder={
                  <Text>
                    <MaterialCommunityIcons
                      name="chevron-down"
                      size={20}
                      color="#000"
                    />
                  </Text>
                }
                fieldType={Picker.fieldTypes.settings}
                direction={PanningProvider.Directions.DOWN}>
                {buyers.map((item, key) => {
                  return (
                    <Picker.Item
                      key={key}
                      label={item.name.toUpperCase()}
                      value={item.id}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>

          <View style={{marginTop: 10, width: '48%'}}>
            <Text style={styles.label}>Styles</Text>
            <View
              style={{
                borderColor: '#C0C0C0',
                borderWidth: 1,
                paddingTop: 5,
                height: 35,
                paddingHorizontal: 10,
                borderRadius: 20,
                marginTop: 3,
              }}>
              <Picker
                showSearch={true}
                migrate
                migrateTextField
                // value={line}
                onChange={value => {
                  setData({
                    ...data,
                    style: stylesList.filter(item => item.id === value)[0],
                  });
                  styleOnChangeHandler(
                    data?.line
                      ? data?.line
                      : props?.selectedDevice?.organization?.id,
                    data?.buyer?.id
                      ? data?.buyer?.id
                      : props?.selectedDevice?.buyer?.id,
                    value ?? props?.selectedDevice?.style?.id,
                  );
                }}
                label={data?.style?.name}
                placeholder={
                  <Text>
                    <MaterialCommunityIcons
                      name="chevron-down"
                      size={20}
                      color="#000"
                    />
                  </Text>
                }
                fieldType={Picker.fieldTypes.settings}
                direction={PanningProvider.Directions.DOWN}>
                {stylesList.map((item, key) => {
                  return (
                    <Picker.Item key={key} label={item?.name} value={item.id} />
                  );
                })}
              </Picker>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{marginTop: 10, width: '48%'}}>
            <Text style={styles.label}>Line Layout</Text>
            <View
              style={{
                borderColor: '#C0C0C0',
                borderWidth: 1,
                paddingTop: 5,
                height: 35,
                paddingHorizontal: 10,
                borderRadius: 20,
                marginTop: 3,
              }}>
              <Picker
                showSearch={true}
                migrate
                migrateTextField
                onChange={value => {
                  let lineLayoutData = {
                    ...data,
                    lineLayout: lineLayoutList.find(item => item.id === value),
                  };
                  setData(lineLayoutData);
                  lineLayoutChangeHandler(value);
                }}
                label={
                  data.lineLayout?.name ??
                  props?.selectedDevice?.layoutItem?.name
                }
                placeholder={
                  <Text>
                    <MaterialCommunityIcons
                      name="chevron-down"
                      size={20}
                      color="#000"
                    />
                  </Text>
                }
                fieldType={Picker.fieldTypes.settings}
                direction={PanningProvider.Directions.DOWN}>
                {lineLayoutList?.map((item, key) => {
                  return (
                    <Picker.Item
                      key={key}
                      label={item.name.toUpperCase()}
                      value={item.id}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>

          <View style={{marginTop: 10, width: '48%'}}>
            <Text style={styles.label}>Work Station</Text>
            <View
              style={{
                borderColor: '#C0C0C0',
                borderWidth: 1,
                paddingTop: 5,
                height: 35,
                paddingHorizontal: 10,
                borderRadius: 20,
                marginTop: 3,
              }}>
              <Picker
                showSearch={true}
                migrate
                migrateTextField
                // value={line}
                onChange={value => {
                  setData({
                    ...data,
                    workStation: workStationList.filter(
                      item => item.workStationNo === value,
                    )[0],
                  });
                  // workStationChangeHandler();
                }}
                label={
                  data?.workStation?.workStationName ??
                  props?.selectedDevice?.workStationName
                }
                placeholder={
                  <Text>
                    <MaterialCommunityIcons
                      name="chevron-down"
                      size={20}
                      color="#000"
                    />
                  </Text>
                }
                fieldType={Picker.fieldTypes.settings}
                direction={PanningProvider.Directions.DOWN}>
                {workStationList.map((item, key) => {
                  return (
                    <Picker.Item
                      key={key}
                      label={item?.workStationName}
                      value={item.workStationNo}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
        </View>

        <View style={{marginTop: 10}}>
          <Text style={styles.label}>Operator</Text>
          <View
            style={{
              borderColor: '#C0C0C0',
              borderWidth: 1,
              paddingTop: 5,
              height: 35,
              paddingHorizontal: 10,
              borderRadius: 20,
              marginTop: 3,
            }}>
            <Picker
              showSearch={true}
              migrate
              migrateTextField
              // value={line}
              onChange={value =>
                setData({
                  ...data,
                  operator: operators.filter(i => i.id === value)[0],
                })
              }
              label={data?.operator?.name}
              placeholder={
                <Text>
                  <MaterialCommunityIcons
                    name="chevron-down"
                    size={20}
                    color="#000"
                  />
                </Text>
              }
              fieldType={Picker.fieldTypes.settings}
              direction={PanningProvider.Directions.DOWN}>
              {operators.map((item, key) => {
                return (
                  <Picker.Item key={key} label={item.name} value={item.id} />
                );
              })}
            </Picker>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={{marginTop: 10, width: '31%', marginRight: 8}}>
            <Text style={styles.label}>Trigger Voltage</Text>
            <TextInput
              defaultValue={String(data.triggerVolt)}
              keyboardType="numeric"
              onChangeText={text => handleInputChange('triggerVolt', text)}
              style={{
                marginTop: 5,
                borderColor: '#C0C0C0',
                borderWidth: 1,
                paddingHorizontal: 10,
                height: 35,
                paddingVertical: 4,
                borderRadius: 20,
                color: '#000',
              }}
              placeholder=" Enter trigger voltage"
            />
            <Text style={{color: 'red', fontSize: 10}}>
              {errors.triggerVolt}
            </Text>
          </View>

          <View style={{marginTop: 10, width: '31%', marginRight: 8}}>
            <Text style={styles.label}>Time Allowance</Text>
            <TextInput
              defaultValue={String(data.allowance)}
              keyboardType="numeric"
              onChangeText={text => handleInputChange('allowance', text)}
              style={{
                marginTop: 5,
                borderColor: '#C0C0C0',
                borderWidth: 1,
                paddingHorizontal: 10,
                height: 35,
                paddingVertical: 4,
                borderRadius: 20,
                color: '#000',
              }}
              placeholder="Enter time allowance"
            />
            <Text style={{color: 'red', fontSize: 10}}>{errors.allowance}</Text>
          </View>

          <View style={{marginTop: 10, width: '31%', right: 0}}>
            <Text style={styles.label}>Stitch Allowance</Text>
            <TextInput
              defaultValue={String(data.stitchAllowance)}
              keyboardType="numeric"
              onChangeText={text => handleInputChange('stitchAllowance', text)}
              style={{
                marginTop: 5,
                borderColor: '#C0C0C0',
                borderWidth: 1,
                paddingHorizontal: 10,
                height: 35,
                paddingVertical: 4,
                borderRadius: 20,
                color: '#000',
              }}
              placeholder="Enter stitch allowance"
            />
            <Text style={{color: 'red', fontSize: 10}}>
              {errors.stitchAllowance}
            </Text>
          </View>
        </View>

        <View>
          <Text style={styles.label}>Mode</Text>
          <View
            style={{
              borderColor: '#C0C0C0',
              borderWidth: 1,
              paddingTop: 5,
              height: 35,
              paddingHorizontal: 10,
              borderRadius: 20,
              marginTop: 3,
            }}>
            <Picker
              showSearch={true}
              migrate
              migrateTextField
              // value={line}
              onChange={value => setData({...data, mode: value})}
              label={modeList.filter(mode => mode.id === data.mode)[0]?.name}
              placeholder={
                <Text>
                  <MaterialCommunityIcons
                    name="chevron-down"
                    size={20}
                    color="#000"
                  />
                </Text>
              }
              fieldType={Picker.fieldTypes.settings}
              direction={PanningProvider.Directions.DOWN}>
              {modeList.map((item, key) => {
                return (
                  <Picker.Item key={key} label={item.name} value={item.id} />
                );
              })}
            </Picker>
          </View>
        </View>
        {props.selectedDevice?.deviceWiseOperationDtoList?.length > 0 ||
        data.deviceWiseOperationDtoList?.length > 0 ? (
          <Swiper
            onIndexChanged={index => setCurrentSwiperIndex(index)}
            style={{height: 180}}
            showsButtons={true}
            horizontal={true}>
            {props?.selectedDevice?.deviceWiseOperationDtoList.map(
              (item, i) => {
                return (
                  <View
                    style={{
                      backgroundColor: 'rgba(240, 240, 240, 1)',
                      marginTop: 15,
                      borderRadius: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'rgba(255, 85, 85, 1)',
                          marginRight: 10,
                        }}>
                        [{i + 1}/
                        {props?.selectedDevice?.deviceWiseOperationDtoList
                          ?.length > 0
                          ? props?.selectedDevice?.deviceWiseOperationDtoList
                              ?.length
                          : 0}
                        ]
                      </Text>
                      <Text style={{fontSize: 16}}>
                        {item?.groupName?.length > 0
                          ? item?.groupName
                          : 'Operation Name Not Found'}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 5,
                        marginBottom: 10,
                      }}>
                      <View
                        style={{marginTop: 10, width: '25%', marginRight: 8}}>
                        <Text
                          style={{
                            fontFamily: 'Lato-Regular',
                            color: '#F84646',
                            fontSize: 12,
                          }}>
                          Check Delay
                        </Text>
                        <TextInput
                          // defaultValue={data.deviceWiseOperationCheckDelay}
                          keyboardType="numeric"
                          onChangeText={text =>
                            {handleDeviceWiseOperationInputChange(
                              'checkDelay',
                              text,
                            )
                            setData({...data, deviceWiseOperationCheckDelay: parseFloat(text)});}
                          }
                          style={{
                            marginTop: 5,
                            borderColor: '#C0C0C0',
                            borderWidth: 1,
                            paddingHorizontal: 10,
                            height: 35,
                            paddingVertical: 4,
                            borderRadius: 20,
                            color: '#000',
                          }}
                          placeholder={item.checkDelay + ''}
                        />
                        <Text style={{color: 'red', fontSize: 10}}>
                          {deviceWiseOperationErrors.checkDelay}
                        </Text>
                      </View>

                      <View
                        style={{marginTop: 10, width: '25%', marginRight: 8}}>
                        <Text
                          style={{
                            fontFamily: 'Lato-Regular',
                            color: '#F84646',
                            fontSize: 12,
                          }}>
                          Time Allowance
                        </Text>
                        <TextInput
                          // defaultValue={String(
                          //   data.deviceWiseOperationTimeAllowance,
                          // )}
                          keyboardType="numeric"
                          onChangeText={text =>
                            {handleDeviceWiseOperationInputChange(
                              'allowance',
                              text,
                            )
                            setData({...data, deviceWiseOperationTimeAllowance: parseFloat(text)});
                          }
                          }
                          style={{
                            marginTop: 5,
                            borderColor: '#C0C0C0',
                            borderWidth: 1,
                            paddingHorizontal: 10,
                            height: 35,
                            paddingVertical: 4,
                            borderRadius: 20,
                            color: '#000',
                          }}
                          placeholder={item.allowance + ''}
                        />
                        <Text style={{color: 'red', fontSize: 10}}>
                          {deviceWiseOperationErrors.allowance}
                        </Text>
                      </View>

                      <View style={{marginTop: 10, width: '25%', right: 0}}>
                        <Text
                          style={{
                            fontFamily: 'Lato-Regular',
                            color: '#F84646',
                            fontSize: 12,
                          }}>
                          Stitch Allowance
                        </Text>
                        <TextInput
                          // defaultValue={String(
                          //   data.deviceWiseOperationStitchAllowance,
                          // )}
                          keyboardType="numeric"
                          onChangeText={text =>
                            {handleDeviceWiseOperationInputChange(
                              'stitchAllowance',
                              text,
                            )
                            setData({...data, deviceWiseOperationStitchAllowance: parseFloat(text)})
                          }
                          }
                          style={{
                            marginTop: 5,
                            borderColor: '#C0C0C0',
                            borderWidth: 1,
                            paddingHorizontal: 10,
                            height: 35,
                            paddingVertical: 4,
                            borderRadius: 20,
                            color: '#000',
                          }}
                          placeholder={item.stitchAllowance + ''}
                        />
                        <Text style={{color: 'red', fontSize: 10}}>
                          {deviceWiseOperationErrors.stitchAllowance}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              },
            )}
          </Swiper>
        ) : null}

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 5,
          }}>
          <TouchableOpacity
            disabled={isButtonActive}
            onPress={() => updateHandler()}>
            <Text
              style={{
                fontSize: 20,
                backgroundColor: !isButtonActive ? '#4C4C4C' : '#b2bec3',
                color: '#fff',
                fontFamily: 'Lato-Regular',
                borderRadius: 40,
                paddingVertical: 18,
                paddingHorizontal: 30,
              }}>
              SAVE
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          width="90%"
          isVisible={isModal}
          showHide={() => setModal(!isModal)}
          title="Select Line"
          content={
            <View style={{height: 400}}>
              <TreeSelect
                data={orgTree}
                isShowTreeId={false}
                //    isOpen={true}
                selectType="single"
                itemStyle={{
                  fontSize: 14,
                  color: '#4d4d4d',
                  fontFamily: 'Lato-Regular',
                }}
                selectedItemStyle={{
                  fontSize: 14,
                  color: '#000',
                  fontFamily: 'Lato-Bold',
                }}
                // onClick={(e)=> setOpen(true)}
                onClickLeaf={e => onLeafClicked(e)}
                treeNodeStyle={{
                  openIcon: (
                    <AntDesign
                      size={10}
                      color="#000"
                      style={{marginRight: 2}}
                      name="caretdown"
                    />
                  ),
                  closeIcon: (
                    <AntDesign
                      size={10}
                      color="#000"
                      style={{marginRight: 2}}
                      name="caretright"
                    />
                  ),
                }}
              />
            </View>
          }
          closeButton={true}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
  },
  label: {
    fontFamily: 'Lato-Regular',
    color: '#F84646',
  },
});
