import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';

const PrimaryButton = (props, {children}) => {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        {...props}
        style={({pressed}) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        android_ripple={{color: 'red'}}>
        <Text style={styles.buttonText}>{props.title}</Text>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;
const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    backgroundColor: '#4C4C4C',
    paddingVertical: 18,
    paddingHorizontal: 84,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Lato-Regular',
  },
  pressed: {
    opacity: 0.75,
  },
});
