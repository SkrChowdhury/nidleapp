import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';

const SecondaryButton = (props, {children}) => {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        {...props}
        style={({pressed}) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed, {borderWidth: 0}]
            : styles.buttonInnerContainer
        }
        android_ripple={{color: 'red'}}>
        <Text style={styles.buttonText}>{props.title}</Text>
      </Pressable>
    </View>
  );
};

export default SecondaryButton;
const styles = StyleSheet.create({
  buttonOuterContainer: {
    marginHorizontal: 4,
    marginVertical: 20,
    overflow: 'hidden',
    borderRadius: 28,
  },
  buttonInnerContainer: {
    borderColor: '#4C4C4C',
    borderRadius: 28,
    borderWidth: 1,
    paddingVertical: 18,
    paddingHorizontal: 84,
    // elevation: 2
  },
  buttonText: {
    color: '#4C4C4C',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Lato-Regular',
  },
  pressed: {
    opacity: 0.75,
    marginVertical: 1,
  },
});
