import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import PrimaryButton from '../../common/PrimaryButton';
import {BG_COLOR} from '../../common/style';
import Modal from '../../common/RModal';
import SVGImg from './../../assets/logo.svg';

let width = Dimensions.get('screen').width;
let height = Dimensions.get('screen').height;
const GetUsername = props => {
  const [successEmail, setSuccessEmail] = useState();

  function SuccessModal(props) {
    return (
      <View>
        <Image
          style={styles.emailSuccessLogo}
          source={require('../../assets/email-success-logo.png')}
        />
        <View style={styles.horizontalLine}></View>
        <Text style={styles.emailSuccessText}>
          An email has been sent to your mail with{' '}
          <Text style={{fontWeight: 'bold'}}>username.</Text> Please check your
          inbox or spam folder.
        </Text>

        <View
          style={{
            width: width * 0.55,
            alignSelf: 'center',
            marginBottom: height * 0.04,
          }}>
          <PrimaryButton onPress={() => props.showHide()} title="OK" />
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={{backgroundColor: BG_COLOR}}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <SVGImg width={200} height={150} />
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.resetPassText}>GET USERNAME</Text>
          <Image source={require('../../assets/nidle-vector.png')} />
        </View>
        <View style={styles.loginFormContainer}>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputImage}
              source={require('../../assets/login/mail.png')}
            />
            <TextInput
              style={styles.textInput}
              placeholderTextColor="#B9B9B9"
              placeholder="email@email.com"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="RESET"
            onPress={() => setSuccessEmail(!successEmail)}
          />
        </View>
      </View>

      <View style={styles.bottomText}>
        <Text style={styles.alreadyText}>Already have an account?</Text>
        <Text
          style={styles.loginText}
          onPress={() => props.navigation.navigate('Login')}>
          Log In
        </Text>
      </View>
      <Modal
        width="90%"
        isVisible={successEmail}
        showHide={() => setSuccessEmail(!successEmail)}
        content={
          <SuccessModal showHide={() => setSuccessEmail(!successEmail)} />
        }
        closeButton={false}
      />
    </ScrollView>
  );
};

export default GetUsername;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  logoContainer: {
    marginVertical: height * 0.07,
  },
  resetPassText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 4,
    color: 'black',
  },
  loginFormContainer: {
    marginTop: height * 0.02,
  },
  inputContainer: {
    width: width * 0.78,
    height: height * 0.06,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#4C4C4C',
    marginBottom: height * 0.035,
  },
  inputImage: {
    width: width * 0.08,
    marginLeft: 5,
  },
  textInput: {
    width: width * 0.57,
    marginLeft: 10,
    color: '#4C4C4C',
  },
  loginBottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rememberContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rememberText: {
    fontSize: width * 0.032,
    color: '#7D7D7D',
  },
  buttonContainer: {
    marginTop: height * 0.07,
  },
  bottomText: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  alreadyText: {
    fontSize: width * 0.038,
    fontFamily: 'Lato-Regular',
    color: '#4C4C4C',
  },
  loginText: {
    marginLeft: width * 0.03,
    fontSize: width * 0.038,
    fontFamily: 'Lato-Bold',
    color: '#4C4C4C',
  },
  emailSuccessLogo: {
    alignSelf: 'center',
    borderWidth: 12,
    borderColor: '#D7F8DC',
    borderRadius: 50,
    height: 90,
    width: 90,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#D7D7D7',
    height: height * 0.02,
    width: width * 0.48,
    alignSelf: 'center',
  },
  emailSuccessText: {
    fontSize: width * 0.039,
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
    color: '#4C4C4C',
    marginTop: height * 0.02,
    padding: width * 0.04,
    marginBottom: height * 0.03,
  },
});
