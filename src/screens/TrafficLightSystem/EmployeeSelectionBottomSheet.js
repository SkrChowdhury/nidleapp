import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useContext, useEffect, useMemo, useState} from 'react';

import Alphabet from './Alphabet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {GlobalContext} from '../../context/GlobalProvider';
import {getEmployees} from '../../api';
import {useFocusEffect} from '@react-navigation/native';

function EmployeeSelectionBottomSheet(props) {
  const {employees, setEmployees, setSelectedEmployee} =
    useContext(GlobalContext);
  const alphabets = [
    'All',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  const [clickedAlPha, setAlpha] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  async function getEmployeesList() {
    if (employees.length === 0) {
      await getEmployees()
        .then(response => {
          let employeeMap = response.map(emp => {
            return {name: emp.name, id: emp.id, empImage: emp.employeeImage};
          });
          setEmployees(employeeMap);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    getEmployeesList();
  }, [props.bottomSheetRef.current]);

  useFocusEffect(
    React.useCallback(() => {
      alphabetHandler('All');
    }, []),
  );

  const findContentJS = (items, searchTerm) =>
    items.filter(x =>
      x.name
        .toUpperCase()
        .includes((searchTerm === '' ? 'A' : searchTerm).toUpperCase()),
    );

  const alphabetHandler = e => {
    const filterByLetter = employees.filter(x =>
      x.name.toUpperCase().startsWith(e === '' ? 'ALL' : e),
    );
    setFilteredEmployees(e === 'All' ? employees : filterByLetter);
    setAlpha(e);
  };

  function selectedEmployeeHandler(item) {
    if (props.module === 'ts') {
      props.navigation.navigate('TLSStack');
    }
    if (props.module === 'ws') {
      props.navigation.navigate('CapacityDetails', {operator: item});
    }
    props.bottomSheetRef.current?.close();
  }

  const Operator = ({employee}) => (
    <TouchableOpacity
      onPress={() => {
        selectedEmployeeHandler();
        setSelectedEmployee(employee);
      }}
      key={employee.id}>
      <View style={[styles.employee, {flexDirection: 'row'}]}>
        <Text
          style={[styles.employeeText, {fontFamily: 'Lato-Bold', width: 60}]}>
          {employee.id}
        </Text>
        <Text style={styles.employeeText}>| </Text>
        <Text style={styles.employeeText}> {employee.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <View style={{width: '80%'}}></View>
        <TouchableOpacity onPress={() => props.bottomSheetRef.current?.close()}>
          <Text style={{marginTop: 5}}>
            <AntDesign
              style={styles.searchIcon}
              name="close"
              size={30}
              color="#efefef"
            />
          </Text>
        </TouchableOpacity>

        {/* </View> */}
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}>
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
              placeholder="Search operator..."
              onChangeText={searchString => setSearchText(searchString)}
              underlineColorAndroid="transparent"
            />
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <View
          style={{
            width: '20%',
            backgroundColor: '#efefef',
            borderRadius: 20,
            padding: 10,
            minHeight: '2%',
          }}>
          <FlatList
            initialNumToRender={5}
            showsVerticalScrollIndicator={false}
            data={alphabets}
            keyExtractor={item => item}
            renderItem={({item, i}) => (
              <Alphabet
                clickedAlPha={clickedAlPha}
                setAlpha={e => alphabetHandler(e)}
                key={i}
                items={item}
              />
            )}
          />
        </View>
        <View style={{width: '80%'}}>
          <FlatList
            initialNumToRender={5}
            ListEmptyComponent={
              <Text
                style={{
                  color: '#4C4C4C',
                  justifyContent: 'center',
                  fontFamily: 'Lato-Regular',
                  alignSelf: 'center',
                }}>
                No employee found
              </Text>
            }
            showsVerticalScrollIndicator={false}
            data={findContentJS(filteredEmployees || employees, searchText)}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <Operator key={index} employee={item} />
            )}
          />
        </View>
      </View>
    </View>
  );
}

export default memo(EmployeeSelectionBottomSheet);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    height: '80%',
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#efefef',
    borderRadius: 20,
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
  employee: {
    backgroundColor: '#4C4C4C',
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 2,
    paddingHorizontal: 10,
    borderRadius: 8,
    paddingVertical: 8,
  },
  employeeText: {
    color: '#fff',
    paddingHorizontal: 2,
    fontFamily: 'Lato-Regular',
  },
});
