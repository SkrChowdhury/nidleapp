import React, {useEffect, useState} from 'react';
import Ionicon from 'react-native-vector-icons/dist/Ionicons';
import Icon from 'react-native-vector-icons/dist/Feather';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

let width = Dimensions.get('screen').width;
let height = Dimensions.get('screen').height;

export default function EmployeeCard(props) {
  return (
    <View style={styles.employeeCard}>
      <View style={{flexDirection: 'row'}}>
        <View>
          <Image
            style={{
              borderRadius: 5,
              borderWidth: 2,
              borderColor: `${props.employee.statusColor}`,
            }}
            width={34}
            height={34}
            source={props.employee.image}
          />
        </View>
        <View style={styles.employeeInfo}>
          <Text style={{fontFamily: 'Lato-Regular', color: '#000'}}>
            {props.employee.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: width * 0.01,
              //   width: '85%',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicon name="checkmark-done-circle" size={16} color="#666666" />
              <View style={{flexDirection: 'row', marginLeft: width * 0.02}}>
                <Icon name="clock" size={14} color="#666666" />

                <Text
                  style={{
                    fontFamily: 'Lato-Regular',
                    color: '#95afc0',
                    fontSize: 12,
                    marginLeft: width * 0.01,
                  }}>
                  {props.employee.time}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Text
        style={{
          fontSize: width * 0.04,
          color: '#000',
          fontFamily: 'Lato-Regular',
          fontWeight: '600',
          alignSelf: 'center',
          paddingHorizontal: width * 0.04,
          borderLeftWidth: width * 0.004,
          borderLeftColor: '#B3B3B3',
        }}>
        999
      </Text>
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
    borderWidth: 1,
    borderRadius: 8,
    minHeight: '3%',
    marginTop: 8,
    borderColor: '#E4E4E4',
    marginHorizontal: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  employeeInfo: {
    marginLeft: 10,
    justifyContent: 'space-around',
    elevation: 0.4,
  },
});
