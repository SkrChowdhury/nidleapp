import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BG_COLOR} from '../../common/style';

export default function Inline() {
  return (
    <View style={styles.container}>
      <Text>Inline</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: BG_COLOR,
  },
});
