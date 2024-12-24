import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Client} from '@stomp/stompjs';
import Entypo from 'react-native-vector-icons/Entypo';
import {GlobalContext} from '../../context/GlobalProvider';
import {ScrollView} from 'react-native-gesture-handler';
import SockJS from 'sockjs-client';
import {TouchableOpacity} from 'react-native-ui-lib';
import WebSocket from 'react-native-websocket';
import {useFocusEffect} from '@react-navigation/native';

const KanbanNotificationScreen = () => {
  const {contextValue, setHeader, selectedLine} = useContext(GlobalContext);
  const [connected, setConnected] = useState(false);
  let socket = '';
  let stompClient = '';

  const send = param => {
    let send_message = param;
    if (stompClient && stompClient.connected) {
      const msg = {name: send_message};
      stompClient.send('/app/hello', JSON.stringify(msg), {});
    }
  };

  const connect = () => {
    socket = new SockJS('http://192.168.10.53:8081/socket');
    stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {},
      // Add other configuration options as needed
     
    });

    stompClient.onConnect = frame => {
      setConnected(true);
      stompClient.subscribe(`/user/${contextValue.userInfo?.name}/queue/notification`, notifications => {
        console.log(notifications);
      });
    };

    stompClient.onStompError = error => {
      console.log(error);
      setConnected(false);
    };

    stompClient.activate();
  };

  const disconnect = () => {
    if (stompClient && stompClient.connected) {
      stompClient.disconnect();
    }
    setConnected(false);
  };

  const tickleConnection = () => {
    connected ? disconnect() : connect();
  };

  useEffect(() => {
    connect();

    // Cleanup function to disconnect when the component unmounts
    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setHeader('Kanban Notifications');
    }, []),
  );

  const kanbanNotificationsInfo = [
    {
      lineSelected: '[Kanban] [Line 9]',
      reqNo: '07556',
      timePassed: '100%',
      color: 35,
      size: 0,
      requireTime: '7 Sep 17:52 PM',
      kanbanNotiTime: '20 days ago',
    },
    {
      lineSelected: '[Kanban] [Line 1]',
      reqNo: '98765',
      timePassed: '80%',
      color: 23,
      size: 3,
      requireTime: '8 Sep 23:52 PM',
      kanbanNotiTime: '10 days ago',
    },
    {
      lineSelected: '[Kanban] [Line 2]',
      reqNo: '34567',
      timePassed: '30%',
      color: 56,
      size: 2,
      requireTime: '4 Oct 4:52 AM',
      kanbanNotiTime: '30 days ago',
    },
  ];
  return (
    <ScrollView style={styles.container}>
      {kanbanNotificationsInfo.map((kanbanSingeCard, index) => (
        <TouchableOpacity key={index} style={styles.kanbanNotificationsCards}>
          <Entypo style={styles.iconStyle} name="bell" size={25} color="#000" />

          <View style={{width: '80%', paddingHorizontal: 10, flex: 10}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>{kanbanSingeCard.lineSelected}</Text>
              <Text>Req. No:{kanbanSingeCard.reqNo}</Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>{kanbanSingeCard.timePassed} time passed</Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>[Color & Size selection]</Text>
              <Text>
                {kanbanSingeCard.color} | {kanbanSingeCard.size}
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>Require: {kanbanSingeCard.requireTime}</Text>
              <Text>{kanbanSingeCard.kanbanNotiTime}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default KanbanNotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  kanbanNotificationsCards: {
    flexDirection: 'row',
    backgroundColor: '#f5f5dc',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  iconStyle: {
    padding: 10,
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 8,
    flex: 1,
    height: 50,
    width: 50,
    alignSelf: 'center',
  },
});
