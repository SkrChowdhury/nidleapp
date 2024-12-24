import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import {BG_COLOR} from '../../common/style';
import {GlobalContext} from '../../context/GlobalProvider';

let width = Dimensions.get('screen').width;
let height = Dimensions.get('screen').height;
export default function WorkStudy(props) {
  const [activeButton, setActiveButton] = useState('All');
  const items = ['All', 'Complete', 'Incomplete'];
  const {setHeader} = useContext(GlobalContext);

  useEffect(() => {
    setHeader('Work Study');
  });
  const studyList = [
    {
      studyNo: 'CS-123456789',
      lineName: 'Line-16',
      style: 'CL1048077...',
      potentialpcs: 3658,
      productivityGap: 53,
    },
    {
      studyNo: 'CS-123456789',
      lineName: 'Line-16',
      style: 'CL1048077...',
      potentialpcs: 3658,
      productivityGap: 53,
    },
    {
      studyNo: 'CS-123456789',
      lineName: 'Line-16',
      style: 'CL1048077...',
      potentialpcs: 3658,
      productivityGap: 53,
    },
    {
      studyNo: 'CS-123456789',
      lineName: 'Line-16',
      style: 'CL1048077...',
      potentialpcs: 3658,
      productivityGap: 53,
    },
    {
      studyNo: 'CS-123456789',
      lineName: 'Line-16',
      style: 'CL1048077...',
      potentialpcs: 3658,
      productivityGap: 53,
    },
    {
      studyNo: 'CS-123456789',
      lineName: 'Line-16',
      style: 'CL1048077...',
      potentialpcs: 3658,
      productivityGap: 53,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', width: width * 1}}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {items.map((itemName, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                setActiveButton(itemName);
              }}
              style={activeButton === itemName ? styles.active : styles.button}>
              <Text
                style={
                  activeButton === itemName
                    ? styles.activeButtonText
                    : styles.buttonText
                }>
                {itemName}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {studyList.map((study, i) => (
          <TouchableOpacity style={styles.studyListBorder} key={i}>
            <View style={styles.studyList}>
              <View>
                <Text style={styles.studyListText}>Study No:</Text>
                <Text style={styles.studyListText}>Line Name:</Text>
                <Text style={styles.studyListText}>Style:</Text>
                <Text style={styles.studyListText}>Potential pcs:</Text>
                <Text style={styles.studyListText}>Productivity Gap:</Text>
              </View>

              <View>
                <Text style={styles.studyListText2}>{study.studyNo}</Text>
                <Text style={styles.studyListText2}>{study.lineName}</Text>
                <Text style={styles.studyListText2}>{study.style}</Text>
                <Text style={styles.studyListText2}>{study.potentialpcs}</Text>
                <Text style={styles.studyListText2}>
                  {study.productivityGap}
                </Text>
              </View>
              <Image source={require('../../assets/arrow-right.png')} />
            </View>
          </TouchableOpacity>
        ))}
        <View style={{height: height * 0.12}} />
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => props.navigation.navigate('WorkStudyStack')}>
        <Icon name="plus" size={22} color="#FFF" />
        <Text style={{marginLeft: width * 0.02, color: '#FFF'}}>New</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_COLOR,
    flex: 1,
    padding: 10,
    width: '100%',
  },
  button: {
    justifyContent: 'center',
    padding: 10,
    marginBottom: 10,
    width: width * 0.298,
    height: 40,
    marginHorizontal: 4,
  },
  active: {
    backgroundColor: '#F84646',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 10,
    width: width * 0.298,
    height: 40,
    borderRadius: 50,
    marginHorizontal: 4,
    color: BG_COLOR,
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
    color: '#F84646',
    fontWeight: '600',
  },
  activeButtonText: {
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
    fontWeight: '600',
    color: BG_COLOR,
  },
  studyListBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#B0B0B0',
    marginHorizontal: width * 0.03,
    marginVertical: width * 0.01,
  },
  studyList: {
    width: width * 0.8,
    height: height * 0.15,
    marginHorizontal: width * 0.04,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  studyListText: {
    fontSize: width * 0.037,
    lineHeight: 21,
    color: '#5E5E5E',
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
  },
  studyListText2: {
    fontSize: width * 0.037,
    lineHeight: 21,
    color: '#4C4C4C',
    fontWeight: '600',
    fontFamily: 'Lato-Regular',
  },
  floatingButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.28,
    height: height * 0.07,
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#00C51F',
    borderRadius: 100,
    display: 'flex',
    flexDirection: 'row',
  },
  scrollView: {
    // marginBottom: 100,
  },
});
