import React, {useCallback, useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getFloorData, getTopDefects} from '../../api';

import {BG_COLOR} from '../../common/style';
import {GlobalContext} from '../../context/GlobalProvider';
import {ScrollView} from 'react-native-gesture-handler';
import Utils from '../../common/Utils';
import {useFocusEffect} from '@react-navigation/native';

export default function QMSProdDashboard(props) {
  const {contextValue, setHeader} = useContext(GlobalContext);

  const [tabSwitcher, setSwitcher] = useState('fd');
  const [topDefectList, setTopDefects] = useState([]);
  const [floorData, setFloorData] = useState([]);
  useEffect(() => {
    topDefects();
    getFloorDataList();
  }, [props.navigation]);

  useFocusEffect(
    React.useCallback(() => {
      setHeader('Floor Dashboard');
    }, []),
  );

  async function topDefects() {
    let currentDateAndTime = Utils.getCurrentDate();
    await getTopDefects(
      currentDateAndTime.split('T')[0] + 'T00:00:00',
      currentDateAndTime.split('T')[0] + 'T19:00:00',
      contextValue.userInfo?.orgId,
    )
      .then(response => {
        setTopDefects(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async function getFloorDataList() {
    let currentDateAndTime = Utils.getCurrentDate();
    await getFloorData(currentDateAndTime.split('T')[0] + 'T00:00:00')
      .then(response => setFloorData(response.floor))
      .catch(error => console.log(error));
  }

  function SwitchButton() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: 6,
        }}>
        <TouchableOpacity
          onPress={() => setSwitcher('fd')}
          style={{width: '48%'}}>
          <Text
            style={[
              styles.switchButton,
              {
                backgroundColor: tabSwitcher === 'fd' ? '#F84646' : '#fff',
                color: tabSwitcher === 'fd' ? '#fff' : '#000',
              },
            ]}>
            Floor data
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSwitcher('td')}
          style={{width: '48%'}}>
          <Text
            style={[
              styles.switchButton,
              {
                backgroundColor: tabSwitcher === 'td' ? '#F84646' : '#fff',
                color: tabSwitcher === 'td' ? '#fff' : '#000',
              },
            ]}>
            Top Defects
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function Card(props) {
    const {data} = props;
    const bgColor = props.backgroundColor ? props.backgroundColor : '';

    return (
      <View
        style={{
          width: '100%',
          marginTop: 6,
          backgroundColor: bgColor,
          paddingHorizontal: 4,
          borderRadius: 5,
        }}>
        <View style={{flexDirection: 'column', justifyContent: 'space-around'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 6,
            }}>
            <Text style={styles.header}>{data?.smv} </Text>
            <Text style={styles.header}>{data?.operator} </Text>
            <Text style={styles.header}>{data?.helper} </Text>
            <Text style={styles.header}>{data?.target} </Text>
            <Text style={styles.header}>{data?.production} </Text>
            <Text style={styles.header}>{data?.variance} </Text>
            <Text style={styles.header}>{String(data?.efficiency)} </Text>
            <Text style={styles.header}>{data?.dhu} </Text>
            <Text style={styles.header}>{data?.wip} </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 6,
              borderTopWidth: 1,
              borderTopColor: '#fff',
            }}>
            <Text
              style={{
                fontFamily: 'Lato-Regular',
                fontSize: 8,
                color: '#fff',
                textAlignVertical: 'center',
              }}>
              {data?.line.toUpperCase() || 'No Line'} {` | `}{' '}
              {data?.style.toUpperCase() || ' No Style'} {` | `}{' '}
              {data?.buyer.toUpperCase() || 'No Buyer'}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function FloorData() {
    return (
      <>
        <View
          style={{
            width: '100%',
            marginTop: 20,
            backgroundColor: '#4D4d4d',
            paddingVertical: 8,
            paddingHorizontal: 4,
            borderRadius: 5,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.header}>SMV</Text>
            <Text style={styles.header}>Opt</Text>
            <Text style={styles.header}>Helper</Text>
            <Text style={styles.header}>Target</Text>
            <Text style={styles.header}>Prod.</Text>
            <Text style={styles.header}>Var.</Text>
            <Text style={styles.header}>Eff.</Text>
            <Text style={styles.header}>DHU.</Text>
            <Text style={styles.header}>WIP.</Text>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{width: '100%', paddingBottom: 300}}>
          {floorData.length > 0
            ? floorData.map((item, key) => {
                return (
                  <Card
                    key={key}
                    data={item}
                    backgroundColor={
                      item.status === 'green'
                        ? '#03CA0B'
                        : item.status === 'red'
                        ? '#F84646'
                        : '#909090'
                    }
                  />
                );
              })
            : null}

          <View style={{height: 100, alignItems: 'center', marginTop: 20}}>
            <Text style={{color: '#4d4d4d', fontFamily: 'Lato-Regular'}}>
              No more
            </Text>
          </View>
        </ScrollView>
      </>
    );
  }

  function TopDefects() {
    return (
      <>
        <View style={{width: '100%', paddingTop: 20}}>
          <ScrollView>
            {topDefectList.map((def, index) => {
              return (
                <View key={index}>
                  <View style={styles.defectRow}>
                    <Text style={styles.textLabel}>
                      {def.defectName.toUpperCase()}
                    </Text>
                    <Text
                      style={[
                        styles.textLabel,
                        {color: '#F84646', fontFamily: 'Lato-Bold'},
                      ]}>
                      {def.value}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>

          {!topDefectList.length > 0 ? (
            <View style={{alignItems: 'center', marginVertical: 20}}>
              <Text
                style={{alignContent: 'center', fontFamily: 'Lato-Regular'}}>
                {' '}
                No data
              </Text>
            </View>
          ) : null}
        </View>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <SwitchButton />
      {tabSwitcher === 'fd' ? (
        <FloorData floorData={props.floorData} />
      ) : (
        <TopDefects />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    flex: 1,
  },
  cardBox: {
    backgroundColor: '#232526',
    paddingVertical: 10,
    height: 150,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  cardBoxText: {
    color: '#fff',
    fontFamily: 'Lato-Bold',
    fontSize: 60,
  },
  cardBoxHeader: {
    color: '#E4E4E4',
  },
  cardBoxHalf: {
    backgroundColor: '#232526',
    paddingVertical: 10,
    height: 150,
    justifyContent: 'center',
    width: '48%',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  switchButton: {
    backgroundColor: '#F84646',
    color: '#fff',
    paddingVertical: 13,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontFamily: 'Lato-Bold',
    borderRadius: 20,
  },
  header: {
    fontFamily: 'Lato-Regular',
    fontSize: 9,
    color: '#fff',
    width: '10%',
    textAlign: 'center',
  },
  textLabel: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: '#4C4C4C',
  },
  defectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingHorizontal: 20,
  },
});
