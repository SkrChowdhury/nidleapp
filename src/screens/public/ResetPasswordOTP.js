import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import PrimaryButton from '../../common/PrimaryButton';
import {BG_COLOR} from '../../common/style';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import SVGImg from './../../assets/logo.svg';

let width = Dimensions.get('screen').width;
let height = Dimensions.get('screen').height;
const ResetPasswordOTP = props => {
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
          <Text style={styles.resetPassText}>RESET PASS</Text>
          <Image source={require('../../assets/nidle-vector.png')} />
        </View>
        <View style={styles.loginFormContainer}>
          <View style={styles.inputContainer}>
            <OTPInputView
              pinCount={6}
              style={{width: '80%', borderBottom: 2}}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              autoFocusOnLoad
            />
          </View>
          <View style={styles.warningTextContainer}>
            <Text style={styles.warningText}>
              Please enter verification code which has been sent to your email.
            </Text>
          </View>
          <View style={styles.resendContainer}>
            <Text style={styles.notGetText}>Didn't get the code?</Text>
            <Text
              style={styles.resendText}
              //   onPress={() => props.navigation.navigate("Login")}
            >
              Resend Code
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <View>
            <PrimaryButton
              onPress={() => props.navigation.navigate('ResetNewPassword')}
              title="SUBMIT"
            />
          </View>
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
    </ScrollView>
  );
};

export default ResetPasswordOTP;

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
    alignItems: 'center',
  },
  inputContainer: {
    width: width * 0.78,
    height: height * 0.06,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#C6C6C6',
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
    marginTop: height * 0.03,
  },

  warningTextContainer: {
    width: width * 0.7,
  },
  warningText: {
    color: '#FF5353',
    fontSize: width * 0.035,
    textAlign: 'center',
  },
  resendContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  notGetText: {
    fontSize: width * 0.032,
    fontFamily: 'Lato-Regular',
    color: '#868686',
  },
  resendText: {
    marginLeft: width * 0.03,
    fontSize: width * 0.032,
    fontFamily: 'Lato-Bold',
    color: '#868686',
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
  // OTP Styles
  borderStyleHighLighted: {
    borderColor: '#4C4C4C',
  },

  underlineStyleBase: {
    width: width * 0.08,
    height: height * 0.046,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: '#4C4C4C',
  },
});
