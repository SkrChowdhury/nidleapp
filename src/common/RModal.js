import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

export default function RModal(props) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Modal
      animationType="fade"
      coverScreen={true}
      animationOutTiming={200}
      animationIn="fadeIn"
      animationOut="fadeOut"
      isVisible={props.isVisible ? modalOpen : modalOpen}
      {...props}
      style={{alignItems: 'center'}}>
      <View
        style={{
          width: props?.width,
          minHeight: 100,
          backgroundColor: '#fff',
          borderRadius: 20,
          paddingHorizontal: 10,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: '#000', fontFamily: 'Lato-Regular'}}>
            {props?.title}
          </Text>
          {props?.closeButton ? (
            <TouchableOpacity onPress={() => props.showHide()}>
              <Text style={{color: '#000'}}>
                <Ionicons size={26} name="close-circle-outline" />
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={{marginTop: 10}}>{props?.content}</View>
      </View>
    </Modal>
  );
}
