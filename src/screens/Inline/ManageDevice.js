import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {BG_COLOR} from '../../common/style';
import BottomSheetContent from './BottomSheetContent';
import DeviceCard from './DeviceCard';
import {GlobalContext} from '../../context/GlobalProvider';
import {Icon} from 'react-native-ui-lib';
import LoadingModal from './../../common/ModalIndicator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PopOverMenu from '../../common/PopOverMenu';
import {RefreshControl} from 'react-native';
import {getDeviceList} from '../../api';
import {orgTree} from '../../api';
import {useFocusEffect} from '@react-navigation/core';

let width = Dimensions.get('screen').width;
let height = Dimensions.get('screen').height;

export default function ManageDevice(props) {
  const {contextValue, setHeader, setDeviceList, setOrgTree} =
    useContext(GlobalContext);
  const [popOver, setPopOverVisible] = useState(false);
  const [selectedLine, setLine] = useState('');
  const [allDevices, setDevices] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchDeviceResult, setSearchResult] = useState([]);
  const [selectedDevice, setDevice] = useState('');
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['1%', '1%', '87%'], []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    if (index === -1) {
      loadDevices();
    }
  }, []);

  const handleSnapPress = useCallback(index => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  const [bottomSheet, setBottomSheet] = useState('');
  const onRefresh = () => {
    setRefreshing(true);
    // Fetch new data here
    setTimeout(() => setRefreshing(false), 2000);
  };
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

  async function loadDevices() {
    setLoader(true);
    await getDeviceList()
      .then(response => {
        setDevices(response.content);
        setLoader(false);
        setDeviceList(response.content);
      })
     
      .catch(error => {
        console.log(error);
      });
    await orgTree().then(response => {
      setOrgTree(response);
    });
  }

  function handlePopOverMenu(response) {
    console.log(response.currentNode);
  }

  useEffect(() => {
    loadDevices();
  }, []);

  useFocusEffect(()=>{
    setHeader('Manage Devices');
  })

  async function setBottomSheetScreen(param) {
    return new Promise((resolve, reject) => {
      resolve(setBottomSheet(param));
    }).catch(error => {
      console.log(error);
      reject(error);
    });
  }

  async function handleBuyerBottomSheet(param, device) {
    await setBottomSheetScreen(param).then(() => {
      bottomSheetRef.current?.expand();
    });
    setDevice(device);
  }

  function searchDevice(searchText, lineId = 0) {
    setSearchText(searchText);
    var filterList = allDevices;
    if (searchText) {
      filterList = allDevices.filter(dv => dv.deviceId === Number(searchText));
    }
    if (lineId > 0) {
      filterList = filterList.filter(
        dv => dv?.organization?.id === Number(lineId),
      );
    }

    setSearchResult(filterList);
  }

  const renderItem = ({item}) => (
    <DeviceCard
      onEditButtonPress={() => handleBuyerBottomSheet('employee', item)}
      device={item}
    />
  );

  function resetLine() {
    setLine('');
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', width: '100%'}}>
        <View style={{justifyContent: 'space-around', width: '10%'}}>
          <PopOverMenu
            callBack={response => {
              setLine(response);
              handlePopOverMenu(response);
            }}
            onBackgroundPress={() => setPopOverVisible(false)}
            setPopOverVisible={() => setPopOverVisible(!popOver)}
            backdropColor="#10244552"
            borderRadius={6}
            visible={popOver}
            color="#fff"
          />
        </View>

        <View style={{width: '10%', justifyContent: 'center'}}>
          <Text style={{color: 'red', paddingHorizontal: 15, fontSize: 20}}>
            |
          </Text>
        </View>

        <View style={{width: '80%'}}>
          <View style={styles.searchSection}>
            <AntDesign
              style={styles.searchIcon}
              name="search1"
              size={20}
              color="#efefef"
            />
            <TextInput
              style={styles.input}
              placeholder="Search ID..."
              onChangeText={searchText => searchDevice(searchText)}
              underlineColorAndroid="transparent"
            />
          </View>
        </View>
      </View>
      <View style={{width: '100%', alignItems: 'center'}}>
        <View style={{marginVertical: 10, flexDirection: 'row'}}>
          {selectedLine.item?.name ? (
            <>
              <Text style={{fontFamily: 'Lato-Regular', color: '#4d4d4d'}}>
                {selectedLine?.item?.parentName}{' '}
              </Text>
              <Text style={{fontFamily: 'Lato-Regular'}}> | </Text>
              <Text style={{fontFamily: 'Lato-Bold', color: 'red'}}>
                {' '}
                {selectedLine?.item?.name}
              </Text>
              <TouchableOpacity onPress={() => resetLine()}>
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: 'Lato-Regular',
                    color: 'red',
                  }}>
                  {' '}
                  {` `} <MaterialCommunityIcons size={15} name="close-circle" />
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={{fontFamily: 'Lato-Bold', color: 'red'}}>
              No Line selected
            </Text>
          )}
        </View>
        <View style={{height: 15, flexDirection: 'row'}}>
          {loader ? (
            <Text
              style={{
                fontFamily: 'Lato-Regular',
                color: 'green',
                fontSize: 10,
              }}>
              Loading...
            </Text>
          ) : (
            <Text>{` `}</Text>
          )}
        </View>
        <View style={{width: '100%', height: '90%'}}>
          {searchText !== '' ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{width: '100%'}}
              data={searchDeviceResult}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              initialNumToRender={4}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          ) : selectedLine.item?.id ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{width: '100%'}}
              data={allDevices.filter(
                device => device?.organization?.id === selectedLine?.item?.id,
              )}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              initialNumToRender={4}
            />
          ) : null}

          {!selectedLine.item?.name && searchText === '' ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{width: '100%'}}
              data={allDevices}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              initialNumToRender={4}
            />
          ) : null}
        </View>
      </View>

      {/* <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => props.navigation.navigate('QRScannerStack')}>
        <MaterialCommunityIcons name="qrcode-scan" size={28} color="#FFF" />
      </TouchableOpacity> */}

      <BottomSheet
        enablePanDownToClose={true}
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}>
        <BottomSheetContent
          {...props}
          selectedDevice={selectedDevice}
          bottomSheetRef={bottomSheetRef}
        />
      </BottomSheet>

      {/* <LoadingModal visible={loader} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  floatingButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 72,
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#00C51F',
    borderRadius: 50,
    display: 'flex',
    flexDirection: 'row',
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#efefef',
    borderRadius: 20,
    width: '100%',
  },
  searchBuyerSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#efefef',
    borderRadius: 20,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 6,
    paddingRight: 10,
    paddingBottom: 6,
    paddingLeft: 5,
    backgroundColor: '#fff',
    color: '#424242',
    borderRadius: 20,
  },
});
