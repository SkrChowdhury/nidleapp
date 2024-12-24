import 'react-native-gesture-handler';

import React, {useEffect} from 'react';

import {BG_COLOR} from '../common/style';
import CapacityAnalysis from '../screens/Inline/CapacityAnalysis';
import Dashboard from '../screens/Dashboard';
import {Header} from 'react-native-elements';
import HourlyProduction from '../screens/Inline/HourlyProduction';
import Icon from 'react-native-vector-icons/Ionicons';
import Inline from '../screens/Inline';
import Kanban from '../screens/Kanban';
import KanbanNotificationScreen from '../screens/Kanban/KanbanNotificationScreen';
import LineInfo from '../screens/WorkStudy/LineInfo';
import LiveDashboard from '../screens/Inline/LiveDashboard';
import ManageDevice from '../screens/Inline/ManageDevice';
import NPTAnalysis from '../screens/Inline/NPTAnalysis';
import QMS from '../screens/QMS';
import QMSFloorDashboard from '../screens/QMS/QMSFloorDashboard';
import QMSProdDashboard from '../screens/QMS/QMSProdDashboard';
import SkillMatrix from '../screens/Inline/SkillMatrix';
import {Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getHeaderTitle} from '@react-navigation/elements';

const Stack = createNativeStackNavigator();

const routes = [
  {
    name: 'QMS',
    title: 'QMS',
    component: QMS,
  },
  {
    name: 'Inline',
    title: 'Inline',
    component: Inline,
  },
  {
    name: 'LiveDashboard',
    title: 'Live Dashboard',
    component: LiveDashboard,
  },
  {
    name: 'Kanban',
    title: 'Kanban',
    component: Kanban,
  },
  {
    name: 'QMSProdDashboard',
    title: 'QMS Production Dashboard',
    component: QMSProdDashboard,
  },
  {
    name: 'QMSFloorDashboard',
    title: 'QMS Floor Dashboard',
    component: QMSFloorDashboard,
  },
  {
    name: 'ManageDevice',
    title: 'Manage Device',
    component: ManageDevice,
  },
  {
    name: 'NPTAnalysis',
    title: 'NPT Analysis',
    component: NPTAnalysis,
  },
  {
    name: 'CapacityAnalysis',
    title: 'Capacity Analysis',
    component: CapacityAnalysis,
  },
  {
    name: 'HourlyProduction',
    title: 'Hourly Production',
    component: HourlyProduction,
  },
  {
    name: 'SkillMatrix',
    title: 'Skill Matrix',
    component: SkillMatrix,
  },
  {
    name: 'KanbanNotifications',
    title: 'Kanban Notifications',
    component: KanbanNotificationScreen,
  },
];

function PrivateStack() {
  return (
    <Stack.Navigator
      initialRouteName="QMSProdDashboard"
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
                    fontFamily: 'Lato-Regular',
                    fontSize: 18,
                  }}>
                  {title}
                </Text>
              }
            />
          );
        },
      }}>
      {routes.map((item, key) => {
        return (
          <Stack.Screen
            key={key}
            name={item.name}
            component={item.component}
            options={{title: item.title, headerShown: false}}
          />
        );
      })}
    </Stack.Navigator>
  );
}

export default PrivateStack;
