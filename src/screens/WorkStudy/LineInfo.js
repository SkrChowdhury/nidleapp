import {
  BackHandler,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {getOperationsByItem, getStyles} from '../../api';

import {BG_COLOR} from '../../common/style';
import {Calendar} from 'react-native-calendars';
import {Data} from 'victory-core';
import EmployeeCard from './EmployeeCard';
import EmployeeSelectionBottomSheet from '../TrafficLightSystem/EmployeeSelectionBottomSheet';
import {GlobalContext} from '../../context/GlobalProvider';
import Icon from 'react-native-vector-icons/dist/Feather';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import PopOverMenu from '../../common/PopOverMenu';
import StyleSelectionBottomSheet from './StyleSelectionBottomSheet';
import {TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Utils from '../../common/Utils';
import {useFocusEffect} from '@react-navigation/native';

let width = Dimensions.get('screen').width;
let height = Dimensions.get('screen').height;

const LineInfo = props => {
  const {selectedLine, selectedBuyerStyle, setSelectedBuyerStyle} =
    useContext(GlobalContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    dateString: new Date().toLocaleDateString(),
  });
  const [bottomSheet, setBottomSheet] = useState('style');
  const [popOver, setPopOverVisible] = useState(false);
  const [swipedItem, setSwipedItem] = useState();
  const [selectedItemByStyle, setSelectedItemByStyle] = useState([]);
  const [styleList, setAllItems] = useState([]);
  const [operationCollection, setOperationCollection] = useState([]);

  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['1%', '1%', '87%'], []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleSnapPress = useCallback(index => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  // renders
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={1}
        appearsOnIndex={2}
      />
    ),
    [],
  );

  async function getStylesList() {
    await getStyles()
      .then(response => {
        let styleMap = response.map(style => {
          return {styleId: style.id, item: style.item};
        });
        setAllItems(styleMap);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async function getOperationsByStyleList() {
    const item = styleList.filter(
      style => style.styleId === selectedBuyerStyle?.styleId,
    );
    await getOperationsByItem(item.length > 0 ? item[0].item : 0)
      .then(response => {
        if (response.length >= 0) {
          setOperationCollection(
            response.map(item => {
              return {
                name: item.operation.name,
                id: item.operation.id,
                workers: [],
              };
            }),
          );
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  useFocusEffect(
    React.useCallback(() => {
      bottomSheetRef.current?.close();
    }, []),
  );

  function handleStyleSelectionBottomSheet(param) {
    setBottomSheet(param);
    bottomSheetRef.current?.expand();
  }

  function Backdrop() {
    return <View></View>;
  }

  function bottomSheetSwitcher() {}

  function dateHandler(date) {
    setSelectedDate(date);
    setModalVisible(false);
  }

  async function setBottomSheetScreen(param) {
    return new Promise((resolve, reject) => {
      resolve(setBottomSheet(param));
    }).catch(error => {
      console.log(error);
      reject(error);
    });
  }

  async function handleBuyerBottomSheet(param) {
    await setBottomSheetScreen(param).then(() => {
      bottomSheetRef.current?.expand();
    });
  }

  useEffect(() => {
    getOperationsByStyleList();
    getStylesList();
  }, [selectedBuyerStyle]);

  // const employees = [
  //   {
  //     name: 'Md. Arifur Rahman',
  //     statusColor: '#44bd32',
  //     image: require('../../assets/male.png'),
  //     time: '0.1094'
  //   },
  //   {
  //     name: 'Abdullah Al Noman',
  //     statusColor: '#f9ca24',
  //     image: require('../../assets/male.png'),
  //     time: '0.1394'

  //   },
  //   {
  //     name: 'Razia Begum',
  //     statusColor: 'red',
  //     image: require('../../assets/female.png'),
  //     time: '0.34596'
  //   },
  // ];

  // const workProcess = [
  //   {
  //     processName: 'NK CHAP & SLV CLOSE TACK & T/C',
  //     id: 1,
  //     workers: employees,
  //   },
  //   {
  //     processName: 'HOOD MARK & MATCH WITH BODY',
  //     id: 2,
  //     workers: employees,
  //   },
  //   {
  //     processName: 'NK RIB MAKE & CUT & FOLD',
  //     id: 3,
  //     workers: employees,
  //   },
  //   {
  //     processName: 'BODY SET FOR SIDE & STKR RMV',
  //     id: 3,
  //     workers: employees,
  //   },
  // ];

  const menu = [
    {name: 'Line 1', id: 2333},
    {name: 'Line 3', id: 2433},
    {name: 'Line 4', id: 2383},
    {name: 'Line 5', id: 2336},
    {name: 'Line 7', id: 2338},
    {name: 'Line 8', id: 2339},
    {name: 'Line 9', id: 2399},
    {name: 'Line 96', id: 2993},
  ];

  function DatePicker({visible, onDateSelected}) {
    return (
      <Modal visible={visible} transparent={true} animationType="fade">
        <View style={styles.overlay}>
          <Calendar
            style={{padding: 20, borderRadius: 16}}
            theme={{
              arrowColor: '#4C4C4C',
              dayTextColor: '#4C4C4C',
              selectedDayTextColor: '#FFF',
              selectedDayBackgroundColor: '#4C4C4C',
            }}
            // minDate={new Date().toString()}

            onDayPress={day => {
              dateHandler(day);
            }}
          />
        </View>
      </Modal>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: width * 0.05,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <PopOverMenu
              callBack={response => console.log('CallBack', response)}
              onBackgroundPress={() => setPopOverVisible(false)}
              setPopOverVisible={() => setPopOverVisible(!popOver)}
              backdropColor="#10244552"
              borderRadius={6}
              itemList={menu}
              visible={popOver}
              color="#fff"
            />
          </View>
          <View style={{paddingVertical: 2}}>
            <Text style={styles.lineLabel}>
              {' '}
              {selectedLine ? selectedLine.item.parentName : ''}
            </Text>
            <Text style={styles.lineLabel2}>
              {selectedLine ? selectedLine.item.name : 'No line selected'}
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            disabled={selectedBuyerStyle.styleName ? false : true}
            onPress={() => {}}>
            <Text
              style={
                selectedBuyerStyle.styleName
                  ? styles.saveButton
                  : styles.saveButtonDisabled
              }>
              {' '}
              <Ionicons name="ios-checkmark-done-outline" size={14} /> SAVE
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          backgroundColor: BG_COLOR,
          justifyContent: 'space-between',
        }}>
        <View style={{width: width * 0.35}}>
          <View>
            <Text style={styles.text}>Buyer</Text>
            <Text
              style={{
                color: '#4C4C4C',
                fontSize: width * 0.036,
                marginTop: height * 0.004,
                marginBottom: height * 0.015,
                fontFamily: 'Lato-Regular',
              }}>
              {selectedBuyerStyle.customerName
                ? selectedBuyerStyle.customerName
                : ''}{' '}
            </Text>
          </View>
          <View>
            <Text style={styles.text}>Order</Text>
            <Text
              style={{
                color: '#4C4C4C',
                fontSize: width * 0.036,
                marginTop: height * 0.004,
                marginBottom: height * 0.015,
                fontFamily: 'Lato-Regular',
              }}>
              {selectedBuyerStyle.orderName ? selectedBuyerStyle.orderName : ''}
            </Text>
          </View>

          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.text}>Styles</Text>
              <TouchableOpacity
                style={styles.styleButton}
                onPress={() => {
                  handleBuyerBottomSheet('style');
                }}>
                <Icon name="plus" size={16} color="#FFF" />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: '#4C4C4C',
                fontSize: width * 0.036,
                marginTop: height * 0.004,
                fontFamily: 'Lato-Regular',
              }}>
              {selectedBuyerStyle.styleName ? selectedBuyerStyle.styleName : ''}
            </Text>
          </View>
        </View>
        {selectedBuyerStyle.customerId ? (
          <View style={{flexDirection: 'row'}}>
            <View style={styles.borderStyle} />
            <View>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.layoutStartStyle}>
                  <Text style={styles.layoutStartText}>
                    {selectedDate?.dateString}
                  </Text>
                  <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Icon name="calendar" size={18} color="#B9B9B9" />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={styles.layoutStartText2}>99</Text>
                </View>
              </View>
              <View>
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor="#B9B9B9"
                  placeholder="Line Target/Hr"
                />
              </View>
              <View>
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor="#B9B9B9"
                  placeholder="Current line Production"
                />
              </View>
            </View>
          </View>
        ) : null}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'column',
          marginTop: 16,
          // paddingBottom: 100,
          // marginBottom: height * 0.053,
        }}>
        {operationCollection.map((wp, index) => (
          <View
            key={index + 11}
            style={{flexDirection: 'column', marginTop: 8, flex: 1}}>
            <View
              style={{
                backgroundColor: '#616161',
                borderRadius: 18,
                flexDirection: 'row',
                padding: width * 0.03,
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 2,
              }}>
              <Text
                style={{
                  color: BG_COLOR,
                  fontFamily: 'Lato-Regular',
                  fontSize: width * 0.035,
                  width: width * 0.4,
                }}>
                {wp.name}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    backgroundColor: '#717171',
                    width: width * 0.1,
                    height: height * 0.05,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    marginRight: width * 0.03,
                  }}>
                  <Text
                    style={{
                      color: '#FFF',
                      fontFamily: 'Lato-Bold',
                      fontSize: width * 0.035,
                    }}>
                    99
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#FFF',
                    width: width * 0.11,
                    height: height * 0.05,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    marginRight: width * 0.02,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Text
                    style={{
                      color: '#4C4C4C',
                      fontFamily: 'Lato-Bold',
                      fontSize: width * 0.035,
                    }}>
                    99
                  </Text>
                  <Text style={{color: '#B3B3B3'}}>%</Text>
                </View>

                <TouchableOpacity
                  onPress={() => handleBuyerBottomSheet('employee')}>
                  <View
                    style={{
                      backgroundColor: '#00C51F',
                      width: width * 0.15,
                      height: height * 0.05,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                    }}>
                    <Icon name="plus" size={20} color="#FFF" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {wp.workers.length > 0 ? (
              wp.workers.map((emp, index) => (
                <EmployeeCard employee={emp} key={index} />
              ))
            ) : (
              <Text
                style={{color: '#B3B3B3', alignSelf: 'center', marginTop: 2}}>
                No Operator Found !
              </Text>
            )}
          </View>
        ))}
      </ScrollView>
      <DatePicker
        visible={modalVisible}
        onDateSelected={() => setModalVisible(false)}
      />
      <BottomSheet
        enablePanDownToClose={true}
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}>
        {bottomSheet === 'style' ? (
          <StyleSelectionBottomSheet
            navigation={props.navigation}
            bottomSheetRef={bottomSheetRef}
            setSelectedBuyerStyle={setSelectedBuyerStyle}
            setSelectedItemByStyle={setSelectedItemByStyle}
          />
        ) : (
          <EmployeeSelectionBottomSheet
            module="ws"
            navigation={props.navigation}
            bottomSheetRef={bottomSheetRef}
          />
        )}
      </BottomSheet>
    </View>
  );
};

export default LineInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    padding: 20,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: width * 0.033,
    color: '#F84646',
    // marginTop: height * 0.01,
    // width: width * 0.2,
    fontFamily: 'Lato-Regular',
  },
  styleButton: {
    backgroundColor: '#00C51F',
    borderRadius: 8,
    width: width * 0.07,
    height: height * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  saveButtonDisabled: {
    fontFamily: 'Lato-Bold',
    backgroundColor: '#a1a9bf',
    color: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 16,
  },
  borderStyle: {
    backgroundColor: '#F84646',
    width: width * 0.0027,
    height: height * 0.14,
    marginTop: height * 0.02,
  },
  layoutStartStyle: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    height: height * 0.05,
    borderColor: '#9A9A9A',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: width * 0.35,
    marginLeft: width * 0.04,
  },
  layoutStartText: {
    fontSize: width * 0.03,
    alignSelf: 'center',
    margin: 5,
    color: '#9A9A9A',
  },
  layoutStartText2: {
    backgroundColor: '#4C4C4C',
    color: '#FFF',
    fontFamily: 'Lato-Regular',
    fontSize: width * 0.04,
    padding: width * 0.024,
    borderRadius: 10,
    marginLeft: width * 0.01,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    width: width * 0.45,
    height: height * 0.05,
    marginLeft: width * 0.04,
    marginTop: height * 0.01,
    borderColor: '#9A9A9A',
    fontSize: width * 0.03,
    alignSelf: 'center',
    margin: 5,
    color: '#9A9A9A',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
    backgroundColor: 'rgba(100, 100, 100, 0.6)',
  },
  saveButton: {
    fontFamily: 'Lato-Bold',
    backgroundColor: '#353b48',
    color: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 16,
  },
  lineLabel: {
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    paddingHorizontal: 5,
  },
  lineLabel2: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    paddingHorizontal: 5,
    color: '#e74c3c',
  },
});
