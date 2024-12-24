import React, {useContext, useEffect} from 'react';
import { Text, View} from 'react-native';

import {BG_COLOR} from '../common/style';
import DrawerContent from './DrawerContent';
import {GlobalContext} from '../context/GlobalProvider';
import {Header} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PrivateStack from './PrivateStack';
import PublicStack from './PublicStack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {getHeaderTitle} from '@react-navigation/elements';
import {getUser} from '../api';

const Drawer = createDrawerNavigator();

function DrawerNavigation(props) {
  const {token, header, setUserInfo} = useContext(GlobalContext);

  async function userParse() {
    return getUser().then(user => setUserInfo(user));
  }

  useEffect(() => {
    userParse();
  }, []);

  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      defaultScreenOptions="PublicStack"
      useLegacyImplementation={false}
      screenOptions={{
        drawerStyle: {width: '50%', backgroundColor: 'rgb(255 255 255 / 0%)'},
        header: ({navigation, route, options, focused}) => {
          const title = getHeaderTitle(options, route.name);

          return (
            <Header
              containerStyle={{
                backgroundColor: BG_COLOR,
                justifyContent: 'space-around',
                height: 80,
                borderBottomWidth: 0,
              }}
              leftComponent={
                <Text
                  onPress={() => navigation.toggleDrawer()}
                  style={{padding: 5, borderRadius: 15}}>
                  <Ionicons name="menu" color="#000" size={20} />
                </Text>
              }
              centerComponent={
                <View>
                  <Text style={{paddingVertical: 6, fontFamily: 'Lato-Bold'}}>
                    {header || title}
                  </Text>
                </View>
              }
            />
          );
        },
      }}>
      {token? (
        <>
          <Drawer.Screen
            options={{
              headerShown: true,
              swipeEnabled: true,
              title: 'Home ',
              drawerItemStyle: {display: 'none'},
            }}
            name="PrivateStack"
            component={PrivateStack}
          />
        </>
      ) : (
        <Drawer.Screen
          options={{
            headerShown: false,
            swipeEnabled: false,
            title: 'PublicStack',
            drawerItemStyle: {display: 'none'},
          }}
          name="PublicStack"
          component={PublicStack}
        />
      )}
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
