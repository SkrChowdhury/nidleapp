import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text} from 'react-native';
function Alphabet({items, setAlpha, clickedAlPha}) {
  return (
    <TouchableOpacity onPress={() => setAlpha(items)}>
      <Text
        style={{
          marginBottom: 8,
          fontFamily: 'Lato-Bold',
          backgroundColor: clickedAlPha === items ? '#4c4c4c' : '#fff',
          color: clickedAlPha === items ? '#efefef' : '#4c4c4c',
          borderRadius: 10,
          padding: 13,
          textAlign: 'center',
        }}>
        {items}
      </Text>
    </TouchableOpacity>
  );
}

export default memo(Alphabet);
