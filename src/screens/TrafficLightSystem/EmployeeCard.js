import React, {useEffect, useState, memo} from 'react';

import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

export default function EmployeeCard(props) {
  let source;
  if (props.employee.empImage && props.employee.empImage?.length > 100) {
    source = {uri: `data:image/png;base64,${props.employee?.empImage}`};
  } else {
    source = require('../../assets/male.png');
  }
  return (
    <View
      style={[
        styles.employeeCard,
        props.isSwipeOpen === true &&
        props.swipedItem.empKey === props.empKey &&
        props.swipedItem.wsKey === props.wsKey
          ? {marginRight: 0}
          : {borderTopRightRadius: 8, borderBottomRightRadius: 8},
      ]}>
      <View>
        <Image
          style={{
            borderRadius: 5,
            borderWidth: 2,
            borderColor: `${props.employee.statusColor}`,
          }}
          width={34}
          height={34}
          source={source}
        />
      </View>
      <View style={styles.employeeInfo}>
        <Text style={{fontFamily: 'Lato-Regular', color: '#535c68'}}>
          {props.employee?.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '85%',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: 'Lato-Regular',
                color: '#95afc0',
                fontSize: 12,
              }}>
              Defect:
              <Text style={{color: '#000', fontFamily: 'Lato-Bold'}}>
                {' '}
                {props.employee?.defects?.length}{' '}
              </Text>
            </Text>
            <Text
              style={{
                fontFamily: 'Lato-Regular',
                color: '#95afc0',
                fontSize: 12,
              }}>
              Check:
              <Text style={{color: '#000', fontFamily: 'Lato-Bold'}}>
                {' '}
                {props.employee?.check}{' '}
              </Text>
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              right: 0,
              bottom: 0,
            }}>
            <Text
              style={{
                height: 12,
                backgroundColor: 'red',
                width: 12,
                borderRadius: 10,
                marginHorizontal: 1,
              }}></Text>
            <Text
              style={{
                height: 12,
                backgroundColor: '#f9ca24',
                width: 12,
                borderRadius: 10,
                marginHorizontal: 1,
              }}></Text>
            <Text
              style={{
                height: 12,
                backgroundColor: 'red',
                width: 12,
                borderRadius: 10,
                marginHorizontal: 1,
              }}></Text>
            <Text
              style={{
                height: 12,
                backgroundColor: '#f9ca24',
                width: 12,
                borderRadius: 10,
                marginHorizontal: 1,
              }}></Text>
            <Text
              style={{
                height: 12,
                backgroundColor: '#44bd32',
                width: 12,
                borderRadius: 10,
                marginHorizontal: 1,
              }}></Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  headerCard: {
    flexDirection: 'column',
    backgroundColor: '#ecf0f1',
    width: '100%',
    minHeight: '10%',
    marginTop: 15,
    borderRadius: 10,
    padding: 8,
    elevation: 0.2,
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
    padding: 8,
    justifyContent: 'center',
  },
  processCard: {
    width: '100%',
    minHeight: '10%',
    marginTop: 20,
    marginBottom: 20,
  },
  employeeCard: {
    width: '100%',
    borderWidth: 1,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    minHeight: '3%',
    marginTop: 8,
    marginLeft: 0,
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
    elevation: 0.4,
  },
});
