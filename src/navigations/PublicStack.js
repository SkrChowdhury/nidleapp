import React, {useEffect, useContext} from 'react';
import {Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
const Stack = createNativeStackNavigator();
import {getHeaderTitle} from '@react-navigation/elements';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {BG_COLOR} from '../common/style';
import Welcome from '../screens/public/Welcome';
import Register from '../screens/public/Register';
import Login from '../screens/public/Login';
import ForgetPassword from '../screens/public/ForgetPassword';
import ResetPassword from '../screens/public/ResetPassword';
import ResetPasswordWithEmail from '../screens/public/ResetPasswordWithEmail';
import GetUsername from '../screens/public/GetUsername';
import ResetPasswordOTP from '../screens/public/ResetPasswordOTP';
import ResetNewPassword from '../screens/public/ResetNewPassword';
import {GlobalContext} from '../context/GlobalProvider';

function PublicStack() {
  const {contextValue} = useContext(GlobalContext);

  return (
    <Stack.Navigator
    initialRouteName="Welcome"
      screenOptions={{
        animation: 'slide_from_right',
        drawerStyle: {width: 240},
        header: ({navigation, route, options, focused}) => {
          const title = getHeaderTitle(options, route.name);
          return (
            <Header
              placement="left"
              containerStyle={{
                backgroundColor: BG_COLOR,
                justifyContent: 'space-around',
                height: 80,
                borderBottomWidth: 0,
              }}
              leftComponent={
                <Text
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{padding: 5, borderRadius: 15}}>
                  <Icon name="chevron-back" size={25} color="#fff" />
                </Text>
              }
              centerComponent={
                <Text
                  style={{
                    padding: 5,
                    borderRadius: 15,
                    color: '#fff',
                    fontFamily: 'Nunito-Light',
                    fontSize: 18,
                  }}>
                  {contextValue.header || title}
                </Text>
              }
            />
          );
        },
      }}>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{title: 'Welcome', headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{title: 'Login', headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{title: 'Register', headerShown: false}}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{title: 'Forget Password', headerShown: false}}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{title: 'Reset Password', headerShown: false}}
      />
      <Stack.Screen
        name="ResetPasswordWithEmail"
        component={ResetPasswordWithEmail}
        options={{title: 'Reset Password With Email', headerShown: false}}
      />
      <Stack.Screen
        name="GetUsername"
        component={GetUsername}
        options={{title: 'Get Username', headerShown: false}}
      />
      <Stack.Screen
        name="ResetPasswordOTP"
        component={ResetPasswordOTP}
        options={{title: 'Reset Password OTP', headerShown: false}}
      />
      <Stack.Screen
        name="ResetNewPassword"
        component={ResetNewPassword}
        options={{title: 'Reset New Password', headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default PublicStack;
