import React, {memo, useContext, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {GlobalContext} from '../../context/GlobalProvider';

export default function DefectsBottomSheet(props) {
  const {defects} = useContext(GlobalContext);
  const [searchText, setSearchText] = useState('');

  const findContentJS = (items, searchTerm) =>
    items.filter(x =>
      x.name.toUpperCase().startsWith(searchTerm.toUpperCase()),
    );
  function updateHandler() {
    props.bottomSheetRef.current?.close();
  }

  const Defect = memo(
    ({defect}) => {
      const {name} = defect;
      const isSelected =
        props.selectedDefects.filter(i => i.id === defect.id).length > 0;

      const isSelectStyle = useMemo(() => {
        return isSelected ? styles.defectItemActive : styles.defectItem;
      }, [isSelected]);

      return (
        <Pressable
          style={isSelectStyle}
          onPress={() => {
            if (isSelected) {
              props.setSelectedDefects(prev =>
                prev.filter(i => i.id !== defect.id),
              );
            } else {
              props.setSelectedDefects(prev => [...prev, defect]);
              props.setAlreadySelectedDefects(prev => [...prev, defect]);
            }
          }}>
          <Text
            style={isSelected ? styles.defectTextActive : styles.defectText}>
            {name}
          </Text>
        </Pressable>
      );
    },
    (prevProps, nextProps) => {
      return prevProps.isSelected === nextProps.isSelected;
    },
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Defect Lists</Text>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}>
        <View style={{width: '100%'}}>
          <View style={styles.searchSection}>
            <AntDesign
              style={styles.searchIcon}
              name="search1"
              size={20}
              color="#efefef"
            />
            <TextInput
              style={styles.input}
              placeholder="Search defects..."
              onChangeText={searchString => setSearchText(searchString)}
              underlineColorAndroid="transparent"
            />
          </View>
        </View>
      </View>
      <View style={{height: '85%'}}>
        <FlatList
          initialNumToRender={5}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          data={findContentJS(defects, searchText)}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => <Defect key={index} defect={item} />}
        />
        <View style={{marginVertical: 10, width: '100%', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => updateHandler()}
            style={{width: '50%'}}>
            <Text style={[styles.defectButton, {borderRadius: 30}]}>
              UPDATE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    fontFamily: 'Lato-Regular',
    marginBottom: 10,
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
  defectItem: {
    backgroundColor: 'rgba(76, 76, 76, 0.1)',
    marginVertical: '1%',
    marginHorizontal: '.5%',
    borderRadius: 10,
    width: '32%',
    color: '#4C4C4C',
  },
  defectText: {
    color: '#4C4C4C',
    fontFamily: 'Lato-Regular',
    paddingHorizontal: 20,
    paddingVertical: 12,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '700',
  },
  defectItemActive: {
    backgroundColor: '#4C4C4C',
    marginVertical: '1%',
    marginHorizontal: '.5%',
    borderRadius: 10,
    width: '32%',
    color: '#4C4C4C',
  },
  defectTextActive: {
    color: 'white',
    fontFamily: 'Lato-Regular',
    paddingHorizontal: 20,
    paddingVertical: 12,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '700',
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
