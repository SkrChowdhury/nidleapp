// import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
// import React, {
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from 'react';
// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// import {BG_COLOR} from '../../common/style';
// import BottomSheetContent from './BottomSheetContent';
// import DeviceCard from './DeviceCard';
// import {GlobalContext} from '../../context/GlobalProvider';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import QRCodeScanner from 'react-native-qrcode-scanner';
// // import {RNCamera} from 'react-native-camera';
// import {getDeviceList} from './../../api';

// export default function QRScanner(props) {
//   const [scannedResult, setResult] = useState({data: ''});
//   const {contextValue} = useContext(GlobalContext);
//   const [searchedDevices, setSearchDevice] = useState([]);
//   const [selectedDevice, setDevice] = useState([]);

//   function handleScanner(e) {
//     new Promise((res, rej) => {
//       setResult(e);
//       res(e);
//     }).then(response => {
//       searchDevice();
//     });
//   }

//   async function searchDevice() {
//     await getDeviceList()
//       .then(response => {
//         setSearchDevice(response.content);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }
//   const [popOver, setPopOverVisible] = useState(false);

//   // ref
//   const bottomSheetRef = useRef(null);

//   // variables
//   const snapPoints = useMemo(() => ['1%', '1%', '87%'], []);

//   // callbacks
//   const handleSheetChanges = useCallback(index => {
//     console.log('handleSheetChanges', index);
//     searchDevice();
//   }, []);

//   const handleSnapPress = useCallback(index => {
//     bottomSheetRef.current?.snapToIndex(index);
//   }, []);

//   const [bottomSheet, setBottomSheet] = useState('');
//   // renders
//   const renderBackdrop = useCallback(
//     props => (
//       <BottomSheetBackdrop
//         {...props}
//         disappearsOnIndex={1}
//         appearsOnIndex={2}
//       />
//     ),
//     [],
//   );

//   useEffect(() => {
//     setResult({data: ''});
//   }, []);

//   async function setBottomSheetScreen(param) {
//     return new Promise((resolve, reject) => {
//       resolve(setBottomSheet(param));
//       setDevice(param);
//     }).catch(error => {
//       console.log(error);
//       reject(error);
//     });
//   }

//   async function handleBuyerBottomSheet(param) {
//     await setBottomSheetScreen(param).then(() => {
//       bottomSheetRef.current?.expand();
//     });
//   }

//   function resetSearch() {
//     setResult({data: ''});
//   }

//   return (
//     <View style={styles.container}>
//       <View style={{alignItems: 'center'}}>
//         <Text style={{fontFamily: 'Lato-Regular', fontSize: 20, marginTop: 10}}>
//           Scan QR Code
//         </Text>
//         <Text style={{fontFamily: 'Lato-Regular', fontSize: 10}}>
//           Put your camera on QR code from device screens
//         </Text>
//       </View>
//       <View style={{height: 300}}>
//         <QRCodeScanner
//           reactivate={true}
//           reactivateTimeout={3000}
//           onRead={e => handleScanner(e)}
//           cameraContainerStyle={{
//             height: 200,
//           }}
//           showMarker={true}
//           cameraStyle={{
//             height: '100%',
//             width: '100%',
//             overflow: 'hidden',
//             borderColor: '#4D4D4D',
//             borderRadius: 10,
//             backgroundColor: '#000',
//           }}
//           containerStyle={{
//             alignItems: 'center',
//             overflow: 'hidden',
//             margin: 10,
//             height: 20,
//             position: 'relative',
//           }}
//           markerStyle={{
//             borderColor: '#fff',
//             borderRadius: 10,
//             width: 100,
//             height: 100,
//             marginHorizontal: 60,
//             justifyContent: 'center',
//           }}
//           flashMode={RNCamera.Constants.FlashMode.off}
//         />
//       </View>

//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           width: '100%',
//         }}>
//         <Text
//           style={{
//             textAlignVertical: 'center',
//             fontFamily: 'Lato-Regulzar',
//             borderLeftColor: 'red',
//             borderLeftWidth: 1,
//             paddingLeft: 5,
//           }}>
//           Device ID :{' '}
//           <Text>
//             {scannedResult?.data ? (
//               scannedResult?.data
//             ) : (
//               <Text style={{color: 'red'}}>No device found !</Text>
//             )}
//           </Text>
//         </Text>

//         <TouchableOpacity onPress={() => resetSearch()}>
//           <Text
//             style={{
//               justifyContent: 'center',
//               textAlign: 'center',
//               padding: 4,
//               fontFamily: 'Lato-Regular',
//               borderRadius: 4,
//               borderColor: '#4d4d4d',
//               borderWidth: 1,
//             }}>
//             <Ionicons name="reload" />
//           </Text>
//         </TouchableOpacity>
//       </View>
//       <View style={{marginTop: 10, width: '100%'}}>
//         {searchedDevices
//           .filter(d => d.deviceId === Number(scannedResult?.data))
//           .map((dev, key) => {
//             return (
//               <DeviceCard
//                 key={key}
//                 onEditButtonPress={() => handleBuyerBottomSheet(dev)}
//                 device={dev}
//               />
//             );
//           })}
//       </View>
//       <BottomSheet
//         enablePanDownToClose={true}
//         ref={bottomSheetRef}
//         index={-1}
//         snapPoints={snapPoints}
//         onChange={handleSheetChanges}
//         backdropComponent={renderBackdrop}>
//         <BottomSheetContent
//           selectedDevice={selectedDevice}
//           bottomSheetRef={bottomSheetRef}
//         />
//       </BottomSheet>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     backgroundColor: BG_COLOR,
//     flex: 1,
//   },
//   centerText: {
//     flex: 1,
//     fontSize: 18,
//     padding: 32,
//     color: '#777',
//     fontFamily: 'Lato-Regular',
//   },
//   textBold: {
//     fontWeight: '500',
//     color: '#000',
//   },
//   buttonText: {
//     fontSize: 21,
//     color: '#fff',
//     backgroundColor: '#4D4D4D',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 30,
//     fontFamily: 'Lato-Regular',
//   },
//   buttonTouchable: {
//     padding: 16,
//   },
// });
