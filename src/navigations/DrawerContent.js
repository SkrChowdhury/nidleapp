import {Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {getUser, orgTree} from '../api';

import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GlobalContext} from '../context/GlobalProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import jwt_decode from 'jwt-decode';
import {useFocusEffect} from '@react-navigation/native';

export default function DrawerContent(props) {
  const {contextValue, setToken, setUserInfo, setOrgTree, token} =
    useContext(GlobalContext);
  const {userInfo} = contextValue;
  const [qmsChildShow, setQmsChildMenu] = useState(false);
  const [inlineChildShow, setInlineQmsChildMenu] = useState(false);

  async function logout() {
    setToken('');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
    props.navigation.closeDrawer();
    props.navigation.navigate('PublicStack');
  }

  function QmsChildMenuShowHide() {
    setQmsChildMenu(!qmsChildShow);
    setInlineQmsChildMenu(false);
  }

  function inlineChildMenuShowHide() {
    setInlineQmsChildMenu(!inlineChildShow);
    setQmsChildMenu(false);
  }

  async function getJWTUserInfo() {
    setUserInfo(jwt_decode(token));
  }

  async function getOrgTree() {
    const orgTrees = await orgTree();
    setOrgTree(orgTrees);
    console.log(orgTrees);
  }

  useFocusEffect(
    React.useCallback(() => {
      getOrgTree();
    }, []),
  );

  useEffect(() => {}, [contextValue.userInfo]);

  function checkData() {
    getJWTUserInfo();
  }
  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#000'}}>
      <View style={{marginTop: 20}}>
        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
            fontSize: 40,
            marginTop: 8,
          }}>
          Nidle
        </Text>

        <View
          style={{
            height: 150,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'grey',
              height: 80,
              width: 80,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: '#fff',
            }}>
            {/* <Image style={{ width: 50, height: 50 }} source={require('../assets/user.png')} /> */}
          </View>
          <Text style={{fontFamily: 'Lato-Bold', color: '#fff'}}>
            {userInfo?.name}
          </Text>
          <Text
            style={{fontFamily: 'Lato-Regular', fontSize: 10, color: '#fff'}}>
            {userInfo?.email}
          </Text>
          <Text
            onPress={() => checkData()}
            style={{fontFamily: 'Lato-Regular', color: '#fff', fontSize: 10}}>
            Administrator
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <View>
          <View style={{alignItems: 'center', marginBottom: 20}}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('QMSProdDashboard')}>
              <Text
                style={{
                  fontFamily: 'Lato-Regular',
                  backgroundColor: 'grey',
                  color: '#fff',
                  paddingHorizontal: 40,
                  paddingVertical: 8,
                  fontSize: 12,
                  borderRadius: 15,
                }}>
                <SimpleLineIcons name="home" size={13} /> Home
              </Text>
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity
            onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.navigate('TrafficLightSystem');
            }}>
            <Text
              style={{
                fontFamily: 'Lato-Regular',
                backgroundColor: '#000',
                color: '#fff',
                padding: 15,
                borderBottomColor: '#fff',
                borderBottomWidth: 1,
              }}>
              <MaterialCommunityIcons name="traffic-light" size={16} /> Traffic
              Light System
            </Text>
          </TouchableOpacity> */}

          {/* <TouchableOpacity
            onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.navigate('WorkStudy');
            }}>
            <Text
              style={{
                fontFamily: 'Lato-Regular',
                backgroundColor: '#000',
                color: '#fff',
                padding: 15,
                borderBottomColor: '#fff',
                borderBottomWidth: 1,
              }}>
              <MaterialCommunityIcons name="timer-outline" size={16} /> Work
              Study
            </Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => {
              QmsChildMenuShowHide();
              // props.navigation.closeDrawer();
              // props.navigation.navigate("QMS");
            }}>
            <Text
              style={{
                fontFamily: 'Lato-Regular',
                // backgroundColor: '#000',
                color: '#fff',
                padding: 15,
                borderBottomColor: '#fff',
                borderBottomWidth: 1,
              }}>
              <MaterialCommunityIcons name="ruler-square-compass" size={16} />{' '}
              QMS
            </Text>
          </TouchableOpacity>
          {qmsChildShow ? (
            <>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.closeDrawer();
                  props.navigation.navigate('QMSProdDashboard');
                }}>
                <Text
                  style={{
                    fontFamily: 'Lato-Regular',
                    color: '#fff',
                    padding: 15,
                    borderBottomColor: '#fff',
                    borderBottomWidth: 1,
                  }}>
                  {` `} <MaterialCommunityIcons name="minus" size={16} /> Prod
                  DashBoard
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.closeDrawer();
                  props.navigation.navigate('QMSFloorDashboard');
                }}>
                <Text
                  style={{
                    fontFamily: 'Lato-Regular',
                    color: '#fff',
                    padding: 15,
                    borderBottomColor: '#fff',
                    borderBottomWidth: 1,
                  }}>
                  {` `} <MaterialCommunityIcons name="minus" size={16} /> Floor
                  Dashboard
                </Text>
              </TouchableOpacity>
            </>
          ) : null}

          <TouchableOpacity
            onPress={() => {
              inlineChildMenuShowHide();
              // props.navigation.closeDrawer();
              // props.navigation.navigate("Inline");
            }}>
            <Text
              style={{
                fontFamily: 'Lato-Regular',
                color: '#fff',
                padding: 15,
                borderBottomColor: '#fff',
                borderBottomWidth: 1,
              }}>
              <MaterialCommunityIcons name="file-tree" size={16} /> In Line
            </Text>
          </TouchableOpacity>

          {inlineChildShow ? (
            <>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.closeDrawer();
                  props.navigation.navigate('ManageDevice');
                }}>
                <Text
                  style={{
                    fontFamily: 'Lato-Regular',
                    color: '#fff',
                    padding: 15,
                    borderBottomColor: '#fff',
                    borderBottomWidth: 1,
                  }}>
                  {` `} <MaterialCommunityIcons name="minus" size={16} /> Manage
                  Device
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.closeDrawer();
                  props.navigation.navigate('LiveDashboard');
                }}>
                <Text
                  style={{
                    fontFamily: 'Lato-Regular',
                    color: '#fff',
                    padding: 15,
                    borderBottomColor: '#fff',
                    borderBottomWidth: 1,
                  }}>
                  {` `} <MaterialCommunityIcons name="minus" size={16} /> Live
                  Monitoring
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.closeDrawer();
                  props.navigation.navigate('NPTAnalysis');
                }}>
                <Text
                  style={{
                    fontFamily: 'Lato-Regular',
                    color: '#fff',
                    padding: 15,
                    borderBottomColor: '#fff',
                    borderBottomWidth: 1,
                  }}>
                  {` `} <MaterialCommunityIcons name="minus" size={16} /> NPT
                  Analysis
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.closeDrawer();
                  props.navigation.navigate('CapacityAnalysis');
                }}>
                <Text
                  style={{
                    fontFamily: 'Lato-Regular',
                    color: '#fff',
                    padding: 15,
                    borderBottomColor: '#fff',
                    borderBottomWidth: 1,
                  }}>
                  {` `} <MaterialCommunityIcons name="minus" size={16} />{' '}
                  Capacity Analysis
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.closeDrawer();
                  props.navigation.navigate('HourlyProduction');
                }}>
                <Text
                  style={{
                    fontFamily: 'Lato-Regular',
                    color: '#fff',
                    padding: 15,
                    borderBottomColor: '#fff',
                    borderBottomWidth: 1,
                  }}>
                  {` `} <MaterialCommunityIcons name="minus" size={16} />
                  Hourly Production
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.closeDrawer();
                  props.navigation.navigate('SkillMatrix');
                }}>
                <Text
                  style={{
                    fontFamily: 'Lato-Regular',
                    color: '#fff',
                    padding: 15,
                    borderBottomColor: '#fff',
                    borderBottomWidth: 1,
                  }}>
                  {` `} <MaterialCommunityIcons name="minus" size={16} />
                  Skill Matrix
                </Text>
              </TouchableOpacity>
            </>
          ) : null}

          <TouchableOpacity
            onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.navigate('Kanban');
            }}>
            <Text
              style={{
                fontFamily: 'Lato-Regular',
                backgroundColor: '#000',
                color: '#fff',
                padding: 15,
                borderBottomColor: '#fff',
                borderBottomWidth: 1,
              }}>
              <MaterialCommunityIcons name="locker-multiple" size={16} /> KanBan
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
            borderRadius: 20,
            borderColor: '#fff',
            borderWidth: 1,
            margin: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              logout();
            }}>
            <Text
              style={{
                fontFamily: 'Lato-Bold',
                color: '#fff',
                padding: 10,
              }}>
              <AntDesign name="logout" size={16} /> Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
