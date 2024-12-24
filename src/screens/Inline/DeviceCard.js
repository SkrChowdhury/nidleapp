import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import DropShadow from 'react-native-drop-shadow';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function DeviceCard(props) {
  const {device} = props;
  function isSyncUpdate(device) {

    if (!device.lastSyncAt) return false;
    for (
      let i = 0;
      i < Math.min(device?.lastInfoUpdate?.length, device?.lastSyncAt?.length);
      i++
    ) {
      if (device?.lastSyncAt[i] < device?.lastInfoUpdate[i]) {
        return false;
      } else if (device?.lastSyncAt[i] > device?.lastInfoUpdate[i]) {
        return true;
      }
    }
    return true;
  }
  return (
    <DropShadow style={styles.shadow}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: device?.organization?.id
              ? isSyncUpdate(device) === false
                ? '#FFCECE'
                : '#F2F2F2'
              : '#FBFFCD',
          },
        ]}>
        {device ? (
          <>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '15%'}}>
                <Text
                  style={[
                    styles.cardText,
                    {
                      backgroundColor: 'rgba(255, 0, 0, 0.05)',
                      textAlign: 'center',
                      color: '#F84646',
                      borderRadius: 10,
                    },
                  ]}>
                  {device?.deviceId}
                </Text>
              </View>
              <View style={{width: '75%'}}>
                <Text style={[styles.cardText, {fontFamily: 'Lato-Bold'}]}>
                  {device?.employee?.name}
                </Text>
              </View>
              <View style={{width: '10%'}}>
                <TouchableOpacity onPress={() => props.onEditButtonPress()}>
                  <Text
                    style={[
                      styles.cardText,
                      {
                        padding: 5,
                        backgroundColor: '#4C4C4C',
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        borderRadius: 12,
                      },
                    ]}>
                    <MaterialCommunityIcons
                      name="playlist-edit"
                      size={20}
                      color="#fff"
                    />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <View style={{justifyContent: 'center'}}>
                <Text style={[styles?.cardBodyText]}>
                  <Ionicons name="shirt" />
                </Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text style={[styles.cardBodyText, {color: 'red'}]}>|</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text style={[styles.cardBodyText]}>{device?.style?.name?.length > 30 ? device?.style?.name.substring(0,30,)+' ...' : device?.style?.name || 'Style not found'}</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <View style={{justifyContent: 'center'}}>
                <Text style={[styles.cardBodyText]}>
                  <Fontisto name="spinner-fidget" />
                </Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text style={[styles.cardBodyText, {color: 'red'}]}>|</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text style={[styles.cardBodyText]}>
                  {device?.workStationNo || 'Work station number not found'}
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <View>
                <Text style={[styles.cardBodyText, {color: '#FF0000'}]}>
                  SMV - Not Found
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    styles.cardBodyText,
                    {
                      fontFamily: 'Lato-Bold',
                      borderWidth: 1,
                      padding: 3,
                      textAlign: 'center',
                      color: '#0194FF',
                      borderColor: '#0194FF',
                      borderRadius: 10,
                      paddingHorizontal: 10,
                      marginHorizontal: 50,
                      textAlignVertical: 'center',
                    },
                  ]}>
                  B
                </Text>
              </View>
              <View>
                <Text style={[styles.cardBodyText, {color: '#FF0000'}]}>
                  TV - {device?.triggerVoltage || `00`}
                </Text>
              </View>
            </View>
          </>
        ) : null}
      </View>
    </DropShadow>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 113,
    // width:'100%',
    backgroundColor: '#FFCECE',
    marginVertical: 5,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardText: {
    fontFamily: 'Lato-Regular',
    padding: 4,
  },
  cardBodyText: {
    fontFamily: 'Lato-Regular',
    padding: 4,
    color: '#4d4d4d',
    fontSize: 12,
  },
});
