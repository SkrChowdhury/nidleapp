import {
  Dimensions,
  Image,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  GlobalContext,
  GlobalProvider,
} from '../../../src/context/GlobalProvider';
import React, {useContext, useEffect, useState} from 'react';
import {getModules, getUser, login, orgTree} from './../../api/index';

import {BG_COLOR} from '../../common/style';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import LoadingModal from './../../common/ModalIndicator';
import Nidle from './../../assets/nidle_1.svg';
import PrimaryButton from '../../common/PrimaryButton';
import {RNToasty} from 'react-native-toasty';
import SVGImg from './../../assets/logo.svg';
import {ScrollView} from 'react-native-gesture-handler';

let width = Dimensions.get('screen').width;
let height = Dimensions.get('screen').height;
export default function Login(props) {
  const [isEnabled, setIsEnabled] = useState(false);

  const [formData, setFormData] = useState({email: '', password: ''});
  const [loader, setLoader] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    // setFormData({ ...formData, rememberMe: !isEnabled })
  };
  const {contextValue, setToken, setUserInfo, setOrgTree} =
    useContext(GlobalContext);
  function loginHandler() {
    if (formData.email && formData.password) {
      setLoader(true);

      login(formData)
        .then(async response => {
          if (response.accessToken) {
            setToken(response.accessToken);
            getOrgTree();
            RNToasty.Success({
              title: 'Authentication successful !',
              fontFamily: 'Lato-Regular',
              position: 'bottom',
            });
          }
        })
        .catch(error => {
          RNToasty.Error({
            title: 'Invalid credentials !',
            fontFamily: 'Lato-Regular',
            position: 'bottom',
          });
          console.log(error);
          setLoader(false);
        });
    }
  }

  useEffect(() => {
    setToken(props.route.params.token);
  }, [props.navigation]);

  async function getOrgTree() {
    await orgTree()
      .then(response => {
        setOrgTree(response);
      })
      .catch(error => console.log(error));
  }

  return (
    <ScrollView style={{backgroundColor: BG_COLOR}}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <SVGImg width={200} height={150} />
        </View>
        <View>
          <Text style={styles.loginText}>LOGIN</Text>
          <Nidle width={150} height={30} />
        </View>
        <View style={styles.loginFormContainer}>
          <View style={{flexDirection: 'column', marginBottom: 10}}>
            <View
              style={[
                styles.inputContainer,
                {borderColor: !formData.email ? 'red' : '#4C4C4C'},
              ]}>
              <Image
                style={styles.inputImage}
                source={require('../../assets/login/User.png')}
              />
              <TextInput
                onChangeText={e => setFormData({...formData, email: e})}
                style={styles.textInput}
                placeholderTextColor="#B9B9B9"
                placeholder="Email"
              />
            </View>
            {!formData.email ? (
              <Text
                style={{
                  color: 'red',
                  fontFamily: 'Lato-Regular',
                  fontSize: 10,
                  marginLeft: 10,
                }}>{` Please enter username `}</Text>
            ) : null}
          </View>

          <View style={{flexDirection: 'column', marginBottom: 10}}>
            <View
              style={[
                styles.inputContainer,
                {borderColor: !formData.password ? 'red' : '#4C4C4C'},
              ]}>
              <Image
                style={styles.inputImage}
                source={require('../../assets/login/password.png')}
              />
              <TextInput
                style={styles.textInput}
                onChangeText={e => setFormData({...formData, password: e})}
                placeholderTextColor="#B9B9B9"
                placeholder="Password"
                secureTextEntry={secureTextEntry}
              />

              <TouchableOpacity
                onPress={() => setSecureTextEntry(!secureTextEntry)}>
                <Image
                  style={{width: width * 0.04}}
                  source={require('../../assets/login/eye-icon.png')}
                />
              </TouchableOpacity>
            </View>
            {!formData.password ? (
              <Text
                style={{
                  color: 'red',
                  fontFamily: 'Lato-Regular',
                  fontSize: 10,
                  marginLeft: 10,
                }}>{` Please enter password `}</Text>
            ) : null}
          </View>

          <View style={styles.loginBottomContainer}>
            <View style={styles.rememberContainer}>
              <Switch
                style={{
                  transform: [{scaleX: 0.8}, {scaleY: 0.8}],
                  height: 16,
                }}
                trackColor={{false: '#BEBEBE', true: '#4C4C4C'}}
                thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              <Text style={styles.rememberText}>Remember Me</Text>
            </View>
            <View>
              <Text
                onPress={() => props.navigation.navigate('ResetPassword')}
                style={styles.rememberText}>
                Forgot Credentials?
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={() => loginHandler()} title="LOGIN" />
        </View>
      </View>
      <LoadingModal title="Authenticating... " color="red" visible={loader} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  logoContainer: {
    marginVertical: height * 0.09,
  },
  loginText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 4,
    fontFamily: 'Lato-Regular',
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
    // marginBottom: height * 0.035
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
    fontFamily: 'Lato-Regular',
  },
  buttonContainer: {
    marginTop: height * 0.07,
  },
});
