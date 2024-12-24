import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
  useContext,
  memo,
} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {BG_COLOR} from '../../common/style';
import DropShadow from 'react-native-drop-shadow';
import {ScrollView} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import DefectsBottomSheet from './DefectsBottomSheet';
import {GlobalContext} from '../../context/GlobalProvider';
import {getDefects} from '../../api';

function TLSStudyInfo(props) {
  const {
    selectedEmployee,
    setDefects,
    defects,
    setWorker,
    clickedItemId,
    selectedBuyerStyle,
  } = useContext(GlobalContext);

  async function getDefectsList() {
    if (defects.length === 0) {
      await getDefects()
        .then(response => {
          let defectMap = response.map(defect => {
            return {id: defect.id, name: defect.name, type: defect.type};
          });
          setDefects(defectMap);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    getDefectsList();
  }, [props.selectedDevice]);

  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['1%', '1%', '87%'], []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    // console.log('handleSheetChanges', index);
  }, []);

  const handleSnapPress = useCallback(index => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  const [bottomSheet, setBottomSheet] = useState('');
  const [popOver, setPopOverVisible] = useState(false);
  const [selectedDefects, setSelectedDefects] = useState([]);
  const [alreadySelectedDefects, setAlreadySelectedDefects] = useState([]);
  const [defectCount, setDefectCount] = useState(0);

  const uniqueSelectedDefects = alreadySelectedDefects.filter(
    (value, index, self) => self.indexOf(value) === index,
  );
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

  function bottomSheetHandler() {
    setSelectedDefects([]);
    bottomSheetRef.current?.expand();
  }

  function saveButtonHandler() {
    setWorker(worker);
    props.navigation.navigate('TrafficLightSystem', {employee: worker});
  }

  let source;
  if (selectedEmployee && selectedEmployee?.empImage?.length > 100) {
    source = {uri: `data:image/png;base64,${selectedEmployee?.empImage}`};
  } else {
    source = require('../../assets/male.png');
  }

  uniqueSelectedDefects.sort((a, b) => {
    const countA = alreadySelectedDefects.filter(
      item => item.id === a.id,
    ).length;
    const countB = alreadySelectedDefects.filter(
      item => item.id === b.id,
    ).length;
    return countB - countA;
  });

  const worker = {
    id: selectedEmployee.id,
    name: selectedEmployee.name,
    defects: uniqueSelectedDefects,
    check: 6,
    statusColor: '#44bd32',
    empImage: selectedEmployee.empImage,
    customerId: selectedBuyerStyle.customerId,
    styleId: selectedBuyerStyle.styleId,
  };

  return (
    <View style={styles.container}>
      <View style={styles.studySummary}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
          <View style={{width: '20%'}}>
            <View style={styles.avatar}>
              {selectedEmployee && selectedEmployee?.empImage.length > 100 ? (
                <Image
                  source={source}
                  style={{width: '100%', height: '100%', borderRadius: 10}}
                />
              ) : (
                <Image
                  source={source}
                  style={{width: '100%', height: '100%', borderRadius: 10}}
                />
              )}
            </View>
          </View>
          <View style={{width: '80%', justifyContent: 'space-around'}}>
            <View>
              <Text style={styles.profileName}>
                {selectedEmployee
                  ? selectedEmployee?.name
                  : 'No Employee Selected'}
              </Text>
            </View>
            <View style={styles.circleContainer}>
              <DropShadow style={styles.shadow}>
                <Text style={styles.circle}>29/11 23:33</Text>
              </DropShadow>
              <DropShadow style={styles.shadow}>
                <Text style={styles.circle}>29/11 23:33</Text>
              </DropShadow>
              <DropShadow style={styles.shadow}>
                <Text style={styles.circle}>29/11 23:33</Text>
              </DropShadow>
              <DropShadow style={styles.shadow}>
                <Text style={styles.circle}>29/11 23:33</Text>
              </DropShadow>
              <DropShadow style={styles.shadow}>
                <Text style={styles.circle}>29/11 23:33</Text>
              </DropShadow>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 15,
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Text style={styles.checkText}>
          Total Check:{' '}
          <Text style={{fontFamily: 'Lato-Bold', color: '#000'}}>55</Text>
        </Text>
        <Text style={styles.checkText}>
          Defective Item:{' '}
          <Text style={{fontFamily: 'Lato-Bold', color: '#000'}}>
            {uniqueSelectedDefects.length}
          </Text>
        </Text>
        <Text style={styles.checkText}>
          Defects:{' '}
          <Text style={{fontFamily: 'Lato-Bold', color: '#000'}}>
            {alreadySelectedDefects.length}
          </Text>
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 15,
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <TouchableOpacity style={{width: '48%'}}>
          <Text style={styles.okButton}> OK </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => bottomSheetHandler()}
          style={{width: '48%'}}>
          <Text style={styles.defectButton}> DEFECTS </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flexDirection: 'column',
          width: '100%',
          paddingHorizontal: 10,
          marginTop: 10,
        }}>
        <View
          style={{
            marginTop: 20,
            justifyContent: 'space-between',
            marginHorizontal: 6,
          }}>
          {uniqueSelectedDefects.length > 0 ? (
            uniqueSelectedDefects.map((selectedDefect, i) => {
              return (
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    borderWidth: 2,
                    marginBottom: 20,
                    paddingVertical: 10.5,
                    paddingHorizontal: 4,
                    borderStyle: 'dashed',
                    borderRadius: 8,
                    borderColor: '#E5E5E5',
                  }}>
                  <Text
                    style={{
                      backgroundColor: '#fff',
                      fontFamily: 'Lato-Regular',
                      marginLeft: -6,
                      marginTop: -15,
                      padding: 4,
                      position: 'absolute',
                      borderRadius: 20,
                      borderColor: 'red',
                      color: 'red',
                      borderWidth: 1,
                    }}>
                    {alreadySelectedDefects
                      .filter(item => item.id === selectedDefect.id)
                      .length.toString()
                      .padStart(2, '0')}
                  </Text>

                  <Text
                    style={{fontFamily: 'Lato-Regular', textAlign: 'center'}}>
                    {selectedDefect.name}
                  </Text>

                  {/* <Text> | </Text>
                                    <Text style={{ fontFamily: 'Lato-Regular' }}>Main Label Reverse</Text>
                                    <Text> | </Text>
                                    <Text style={{ fontFamily: 'Lato-Regular' }}>Number Slow....</Text> */}
                </View>
              );
            })
          ) : (
            <Text
              style={{
                fontFamily: 'Lato-Regular',
                textAlign: 'center',
                color: '#4C4C4C',
              }}>
              No Defects Selected
            </Text>
          )}
        </View>
      </ScrollView>

      <View style={{marginVertical: 10, width: '100%', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            saveButtonHandler();
          }}
          style={{width: '50%'}}>
          <Text style={[styles.defectButton, {borderRadius: 30}]}>SAVE</Text>
        </TouchableOpacity>
      </View>

      <BottomSheet
        enablePanDownToClose={true}
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        // onClose={()=>setBottomSheet('closed')}
      >
        <DefectsBottomSheet
          {...props}
          bottomSheetRef={bottomSheetRef}
          setSelectedDefects={setSelectedDefects}
          selectedDefects={selectedDefects}
          setAlreadySelectedDefects={setAlreadySelectedDefects}
          alreadySelectedDefects={alreadySelectedDefects}
        />
      </BottomSheet>
    </View>
  );
}

export default memo(TLSStudyInfo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: BG_COLOR,
  },

  studySummary: {
    backgroundColor: '#4D4D4D',
    paddingVertical: 8,
    paddingHorizontal: 8,
    minHeight: '3%',
    borderRadius: 20,
  },
  avatar: {
    height: 60,
    width: 60,
    borderWidth: 2,
    borderColor: '#00C51F',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  profileName: {
    fontFamily: 'Lato-Regular',
    color: '#fff',
    fontSize: 16,
  },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
  },
  circle: {
    height: 35,
    width: 35,
    borderRadius: 20,
    backgroundColor: '#00C51F',
    fontSize: 8,
    textAlign: 'center',
    padding: 2,
    textAlignVertical: 'center',
  },
  shadow: {
    shadowColor: '#00C51F',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  checkText: {
    fontFamily: 'Lato-Regular',
    fontSize: 10,
    color: '#636e72',
  },
  okButton: {
    backgroundColor: '#00C51F',
    color: '#fff',
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    paddingVertical: 18,
    borderRadius: 20,
  },
  defectButton: {
    backgroundColor: '#4C4C4C',
    color: '#fff',
    fontFamily: 'Lato-Regular',
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingVertical: 18,
    borderRadius: 20,
  },
});
