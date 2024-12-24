import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
  useContext,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Image,
  Dimensions,
} from 'react-native';
import {BG_COLOR} from '../../common/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import EmployeeCard from './EmployeeCard';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import BuyerSelectionBottomSheet from './BuyerSelectionBottomSheet';
import EmployeeSelectionBottomSheet from './EmployeeSelectionBottomSheet';
import PopOverMenu from '../../common/PopOverMenu';
import {FlatList} from 'react-native-gesture-handler';
import Modal from '../../common/RModal';
import SecondaryButton from '../../common/SecondaryButton';
import DeleteButton from '../../common/DeleteButton';
import {GlobalContext} from '../../context/GlobalProvider';
import {getOperationsByItem, getStyles, postTLS} from '../../api';
import {useFocusEffect} from '@react-navigation/native';
import {RNToasty} from 'react-native-toasty';
let width = Dimensions.get('screen').width;
let height = Dimensions.get('screen').height;
export default function TrafficLightSystem(props) {
  const {
    selectedLine,
    setClickedItemId,
    clickedItemId,
    worker,
    token,
    setHeader,
    selectedBuyerStyle,
    setSelectedBuyerStyle,
    operationList,
    setOperationList,
    setSelectedEmployee,
    selectedWorkers,
    setSelectedWorkers,
    setSelectedLine,
  } = useContext(GlobalContext);

  const [count, setCount] = useState(0);

  // ref
  const bottomSheetRef = useRef(null);
  var backState = 0;
  // variables
  const snapPoints = useMemo(() => ['1%', '1%', '87%'], []);
  // callbacks
  const handleSheetChanges = useCallback(index => {
    backState = index;
  }, []);

  const handleSnapPress = useCallback(index => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  const [bottomSheet, setBottomSheet] = useState('');
  const [popOver, setPopOverVisible] = useState(false);
  const [bottomSheetState, setBottomSheetState] = useState(0);
  const [swipedItem, setSwipedItem] = useState();
  const [selectedItemByStyle, setSelectedItemByStyle] = useState([]);
  const [styleList, setAllItems] = useState([]);

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

  useFocusEffect(() => {
    setHeader('Traffic Light System');
  });

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
          setOperationList(
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

  // function addWorkers() {
  //     if (worker?.id) {
  //         if (selectedWorkers.filter(wr => wr.id === worker.id).length === 0) {
  //             worker.indexId = clickedItemId
  //             selectedWorkers.push(worker)
  //             setSelectedWorkers(selectedWorkers)
  //             operationList[clickedItemId].workers = [...selectedWorkers]
  //         }
  //     }
  // }

  function addWorkers() {
    if (
      worker?.id &&
      selectedBuyerStyle.customerId === worker.customerId &&
      selectedBuyerStyle.styleId === worker.styleId
    ) {
      let existingWorker = selectedWorkers.find(wr => wr.id === worker.id);
      if (existingWorker) {
        // Check if the defects have changed
        if (existingWorker.defects !== worker.defects) {
          // Update the existing worker's defects
          existingWorker.defects = worker.defects;

          // Find the index of the existing worker in selectedWorkers array
          let existingWorkerIndex = selectedWorkers.indexOf(existingWorker);

          // Replace the existing worker in selectedWorkers with the updated worker
          selectedWorkers.splice(existingWorkerIndex, 1, existingWorker);
          setSelectedWorkers(selectedWorkers);
          operationList[clickedItemId].workers = [...selectedWorkers];
        }
      } else {
        worker.indexId = clickedItemId;
        selectedWorkers.push(worker);
        setSelectedWorkers(selectedWorkers);
        operationList[clickedItemId].workers = [...selectedWorkers];
      }
    }
  }

  useEffect(() => {
    setSelectedWorkers([]);
    operationList[clickedItemId]?.workers === [];
  }, [selectedBuyerStyle]);

  useFocusEffect(
    React.useCallback(() => {
      addWorkers();
    }, [props.route.params]),
  );

  useEffect(() => {
    addWorkers();
    // console.log(count)
    // console.log('empl',worker.name)
    // console.log('operationList', JSON.stringify(operationList))
    setCount(count + 1);
  }, [worker, operationList, props.navigation.route, token]);

  useEffect(() => {
    getOperationsByStyleList();
    getStylesList();
    const backAction = () => {
      if (backState > 0) {
        bottomSheetRef.current.close();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [selectedBuyerStyle, bottomSheetRef]);

  const handleDelete = (wsKey, empKey) => {
    // handle delete here
    const newOperationList = [...operationList];
    newOperationList[swipedItem.wsKey].workers.splice(swipedItem.empKey, 1);
    setOperationList(newOperationList);
    setSwipedItem({});
  };

  const handleSwipeOpen = useCallback(() => {
    setIsSwipeOpen(true);
  }, []);

  const handleSwipeClose = useCallback(() => {
    setIsSwipeOpen(false);
  }, []);

  const [deleteSuccess, setDeleteSuccess] = useState();

  function saveTLSInfo() {
    let payLoad = {
      selectedLine: 'selectedLine',
      customerId: 3453,
      customerName: 'CP',
      styleId: 45464,
      styleName: '154New',
      orderId: 343465,
      orderName: 'Order 8',
      operationId: 565787,
      operationName: 'XYZ',
      employees: worker,
    };

    postTLS(payLoad)
      .then(async response => {
        RNToasty.Success({
          title: 'TLS Posted successfully !',
          fontFamily: 'Lato-Regular',
          position: 'bottom',
        });

        console.log('response', response);
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

  function SuccessModal(props) {
    return (
      <View>
        <Image
          style={styles.DeleteModalLogo}
          source={require('../../assets/confirm-delete.png')}
        />
        <View style={styles.horizontalLine}></View>
        <Text style={styles.deleteModalText}>
          Are you sure to delete this operator?
        </Text>
        <View
          style={{
            width: width * 0.61,
            alignSelf: 'center',
            marginBottom: height * 0.04,
          }}>
          <DeleteButton
            onPress={() => {
              handleDelete(swipedItem.wsKey, swipedItem.empKey);
              props.showHide();
            }}
            title="DELETE"
          />
          <SecondaryButton onPress={() => props.showHide()} title="CANCEL" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <PopOverMenu
              callBack={response => setSelectedLine(response)}
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
            onPress={() => {
              saveTLSInfo();
            }}>
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
      <View style={styles.headerCard}>
        <Text style={styles.cardTextLable}>Buyer</Text>
        <Text style={styles.cardTextLable1}>
          {selectedBuyerStyle.customerName}
        </Text>
        <Text style={styles.cardTextLable1}>{` `}</Text>

        <View style={{flexDirection: 'row'}}>
          <Text style={styles.cardTextLable2}>Styles </Text>
          <TouchableOpacity onPress={() => handleBuyerBottomSheet('style')}>
            <Text style={styles?.cardRefreshButton}>
              <EvilIcons name="refresh" color="#fff" size={20} />
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.cardTextLable3}>
          {selectedBuyerStyle?.styleName}
        </Text>
      </View>

      <View style={{flex: 1}}>
        <FlatList
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
          data={operationList}
          renderItem={({item: ws, index: wsKey}) => (
            <View key={wsKey + 20} style={styles.processCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  backgroundColor: '#616161',
                  padding: 10,
                  borderRadius: 16,
                }}>
                <View style={{justifyContent: 'space-around', width: '70%'}}>
                  <Text
                    style={{
                      textAlignVertical: 'center',
                      fontFamily: 'Lato-Regular',
                      fontSize: 14,
                      color: '#fff',
                      width: '70%',
                    }}>
                    {ws?.name ? ws.name.toUpperCase() : ''}
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      handleBuyerBottomSheet('buyer');
                      setClickedItemId(wsKey);
                    }}>
                    <Text
                      style={{
                        paddingHorizontal: 15,
                        paddingVertical: 8,
                        backgroundColor: '#44bd32',
                        borderRadius: 8,
                      }}>
                      <Ionicons name="md-add" color="#fff" size={25} />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <FlatList
                ListEmptyComponent={
                  <Text
                    style={{
                      color: '#B3B3B3',
                      alignSelf: 'center',
                      marginTop: 4,
                    }}>
                    No Operator Found !
                  </Text>
                }
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true}
                data={ws?.workers.filter(worker => worker.indexId === wsKey)}
                renderItem={({item: emp, index: empKey}) => (
                  <TouchableOpacity
                    key={empKey - 10}
                    onLongPress={() => {
                      setDeleteSuccess(!deleteSuccess);
                      setSwipedItem({wsKey, empKey});
                    }}
                    onPress={() => {
                      props.navigation.navigate('TLSStack');
                      setSelectedEmployee(emp);
                    }}>
                    <EmployeeCard
                      employee={emp}
                      wsKey={wsKey}
                      empKey={empKey}
                      // swipedItem={swipedItem}
                    />
                  </TouchableOpacity>
                )}
                keyExtractor={item => item?.id}
              />
            </View>
          )}
          keyExtractor={item => item?.processId}
        />
      </View>
      <BottomSheet
        enablePanDownToClose={true}
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}>
        {bottomSheet === 'style' ? (
          <BuyerSelectionBottomSheet
            navigation={props.navigation}
            bottomSheetRef={bottomSheetRef}
            setSelectedBuyerStyle={setSelectedBuyerStyle}
            selectedBuyerStyle={selectedBuyerStyle}
            selectedItemByStyle={selectedItemByStyle}
            styeList={styleList}
            setSelectedItemByStyle={setSelectedItemByStyle}
          />
        ) : (
          <EmployeeSelectionBottomSheet
            module="ts"
            navigation={props.navigation}
            bottomSheetRef={bottomSheetRef}
          />
        )}
      </BottomSheet>
      <Modal
        width="90%"
        isVisible={deleteSuccess}
        showHide={() => setDeleteSuccess(!deleteSuccess)}
        content={
          <SuccessModal showHide={() => setDeleteSuccess(!deleteSuccess)} />
        }
        closeButton={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: BG_COLOR,
  },
  saveButton: {
    fontFamily: 'Lato-Bold',
    backgroundColor: '#353b48',
    color: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 16,
  },
  saveButtonDisabled: {
    fontFamily: 'Lato-Bold',
    backgroundColor: '#a1a9bf',
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
  headerCard: {
    flexDirection: 'column',
    backgroundColor: '#ecf0f1',
    width: '100%',
    minHeight: '10%',
    marginTop: 15,
    borderRadius: 10,
    padding: 8,
    marginBottom: 10,
  },
  cardTextLable: {
    fontFamily: 'Lato-Regular',
    color: '#e74c3c',
  },
  cardTextLable1: {
    fontFamily: 'Lato-Regular',
    color: '#2d3436',
  },
  cardTextLable2: {
    fontFamily: 'Lato-Regular',
    color: '#e74c3c',
    textAlignVertical: 'center',
  },
  cardTextLable3: {
    fontFamily: 'Lato-Regular',
    color: '#2d3436',
  },
  cardRefreshButton: {
    backgroundColor: '#4cd137',
    borderRadius: 6,
    padding: 6,
    justifyContent: 'center',
  },
  processCard: {
    width: '100%',
    minHeight: '10%',
    marginTop: 8,
    marginBottom: 10,
  },
  employeeCard: {
    borderWidth: 1,
    borderRadius: 8,
    minHeight: '7%',
    marginTop: 8,
    borderColor: '#b2bec3',
    marginHorizontal: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
    flexDirection: 'row',
  },
  employeeInfo: {
    marginLeft: 10,
    width: '100%',
    justifyContent: 'space-around',
  },
  DeleteModalLogo: {
    alignSelf: 'center',
    borderWidth: 12,
    borderColor: '#FDF0DD',
    borderRadius: 100,
    height: 110,
    width: 110,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#D7D7D7',
    height: height * 0.02,
    width: width * 0.48,
    alignSelf: 'center',
  },
  deleteModalText: {
    fontSize: width * 0.042,
    width: width * 0.47,
    alignSelf: 'center',
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
    color: '#4C4C4C',
    padding: width * 0.04,
  },
});
