import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Hint} from 'react-native-ui-lib';
import {GlobalContext} from '../context/GlobalProvider';
import TreeSelect from 'react-native-tree-select';

export default function PopOverMenu(props) {
  const {setSelectedLine, orgTree} = useContext(GlobalContext);
  function handleMenuItemPress(param) {
    if (param.children.length === 0) {
      props.setPopOverVisible(true);
    }
    props.callBack(param);
  }

  function onLeafClicked(e) {
    setSelectedLine(e);
    props.setPopOverVisible(true);
    props.callBack(e);
  }

  function PopOverContent() {
    return (
      <View style={{width: 200, height: 300}}>
        <TreeSelect
          data={orgTree}
          isShowTreeId={false}
          selectType="single"
          itemStyle={{
            fontSize: 14,
            color: '#4d4d4d',
          }}
          selectedItemStyle={{
            fontSize: 14,
            color: '#000',
          }}
          onClickLeaf={e => onLeafClicked(e)}
          treeNodeStyle={{
            openIcon: (
              <AntDesign
                size={10}
                color="#000"
                style={{marginRight: 2}}
                name="caretdown"
              />
            ),
            closeIcon: (
              <AntDesign
                size={10}
                color="#000"
                style={{marginRight: 2}}
                name="caretright"
              />
            ),
          }}
        />
      </View>
    );
  }

  return (
    <View>
      <Hint {...props} customContent={<PopOverContent />}>
        <TouchableOpacity
          onPress={() => props.setPopOverVisible(props.visible)}
          onBackgroundPress={true}>
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              backgroundColor: '#353b48',
              color: '#fff',
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 10,
            }}>
            <MaterialCommunityIcons name="format-list-checks" size={18} />
          </Text>
        </TouchableOpacity>
      </Hint>
    </View>
  );
}
