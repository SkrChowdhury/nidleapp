import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function ForgetPassword() {
  return (
    <>
      <View style={styles.container}>
        <Text>ForgetPassword</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
