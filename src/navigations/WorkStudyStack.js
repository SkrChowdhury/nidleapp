// import { View, Text } from 'react-native';
// import React from 'react';
// import { BG_COLOR } from '../common/style';
// import LineInfo from '../screens/WorkStudy/LineInfo';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { getHeaderTitle, Header } from '@react-navigation/elements';
// import Icon from 'react-native-vector-icons/Ionicons';

// const Stack = createNativeStackNavigator();
// const WorkStudyStack = () => {
//   return (
//     <Stack.Navigator
//       initialRouteName="LineInfo"
//       screenOptions={{
//         animation: 'slide_from_right',
//         drawerStyle: { width: 240 },
//         header: ({ navigation, route, options, focused }) => {
//           const title = getHeaderTitle(options, route.name);

//           return (
//             <Header
//               placement="left"
//               containerStyle={{
//                 backgroundColor: BG_COLOR,
//                 justifyContent: 'space-around',
//                 height: 80,
//                 borderBottomWidth: 0,
//               }}
//               leftComponent={
//                 <Text
//                   onPress={() => {
//                     navigation.goBack();
//                   }}
//                   style={{ padding: 5, borderRadius: 15 }}
//                 >
//                   <Icon name="chevron-back" size={25} color="#000" />
//                 </Text>
//               }
//               centerComponent={
//                 <Text
//                   style={{
//                     padding: 5,
//                     borderRadius: 15,
//                     color: '#fff',
//                     fontFamily: 'Lato-Regular',
//                     fontSize: 18,
//                   }}
//                 >
//                   {title}
//                 </Text>
//               }
//             />
//           );
//         },
//       }}
//     >

//       <Stack.Screen
//         name="LineInfo"
//         component={LineInfo}
//         options={{ title: 'Line Info', headerShown: true }}
//       />

//     </Stack.Navigator>
//   );
// };

// export default WorkStudyStack;

import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
const Stack = createNativeStackNavigator();
import {getHeaderTitle} from '@react-navigation/elements';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {BG_COLOR} from '../common/style';

import LineInfo from '../screens/WorkStudy/LineInfo';
import CapacityDetails from '../screens/WorkStudy/CapacityDetails';
function WorkStudyStack() {
  return (
    <Stack.Navigator
      initialRouteName="LineInfo"
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
                  <Icon name="chevron-back" size={25} color="#000" />
                </Text>
              }
              centerComponent={
                <Text
                  style={{
                    padding: 5,
                    borderRadius: 15,
                    color: '#000',
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
      <Stack.Screen
        name="LineInfo"
        component={LineInfo}
        options={{title: 'Line Info', headerShown: true}}
      />
      <Stack.Screen
        name="CapacityDetails"
        component={CapacityDetails}
        options={{title: 'Capacity Details', headerShown: true}}
      />
    </Stack.Navigator>
  );
}

export default WorkStudyStack;
