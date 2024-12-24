import {BG_COLOR, FONT_FAMILY, TEXT_BLACK, TEXT_GREY} from '../../common/style';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {VictoryBar, VictoryChart, VictoryTheme} from 'victory-native';
import {getEndPoint, getUser} from '../../api';

import CheckBox from '@react-native-community/checkbox';
import CheckboxList from 'rn-checkbox-list';
import {GlobalContext} from '../../context/GlobalProvider';
import Modal from '../../common/RModal';
import Octicons from 'react-native-vector-icons/Octicons';
import Utils from '../../common/Utils';
import WebView from 'react-native-webview';
import {getProductionReportQcPass} from '../../api';
import {useFocusEffect} from '@react-navigation/native';

let width = Dimensions.get('screen').width;
let height = Dimensions.get('screen').height;

export default function Dashboard() {
  const {contextValue, setUserInfo, token} = useContext(GlobalContext);
  useEffect(() => {
    getProductionReport();
  }, []);

  async function getUserInfo() {
    setTimeout(async () => {
      await getUser().then(user => setUserInfo(user));
    }, 2000);
  }

  const kpiList = [
    {id: 1, name: 'Efficiency', value: 99},
    {id: 2, name: 'Product Minutes', value: 99},
    {id: 3, name: 'Available Minutes', value: 99},
    {id: 4, name: 'Cumulative Target', value: 1923},
    {id: 5, name: 'Total Production', value: 123},
    {id: 6, name: 'Total Manpower', value: 123},
    {id: 7, name: 'CT Vs CMV', value: 123},
    {id: 8, name: 'Defective %', value: 123},
    {id: 9, name: 'NPT', value: 123},
    {id: 10, name: 'Req Qty in Damage', value: 123},
    {id: 11, name: 'Input Requisition', value: 123},
  ];

  const [kpiModal, setKpiModal] = useState(false);
  const [filteredKPIList, setKpiList] = useState(kpiList);
  const [chartModal, setChartModalWindow] = useState(false);
  var checkBox = [];

  async function getProductionReport() {
    const date = Utils.getCurrentDate().split('T')[0];
    console.log('startDate', date);
    const orgId = contextValue?.userInfo?.orgId;
    await getProductionReportQcPass(
      date + ' 00:00:00',
      date + '23:59:59',
      orgId,
    )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
  const data = [
    {line: 'L1', earnings: 13000},
    {line: 'L2', earnings: 16500},
    {line: 'L3', earnings: 14250},
    {line: 'L4', earnings: 19000},
    {line: 'L5', earnings: 19000},
    {line: 'L6', earnings: 4555},
    {line: 'L7', earnings: 6767},
    {line: 'L8', earnings: 54555},
    {line: 'L9', earnings: 54555},
    {line: 'L10', earnings: 566},
    {line: 'L11', earnings: 656},
    {line: 'L12', earnings: 6566},
  ];

  const productivityDetails = [
    {
      date: '01 Jan 2022',
      time: '1st Hr.',
      productivityNo: 20,
      lineUp: 99,
      lineDown: 99,
      noProduction: 99,
      highProduction: 99,
      normalProduction: 99,
      lowProduction: 99,
      newKanban: 99,
      warningKanban: 99,
      dangerKanban: 99,
    },
    {
      date: '23 Dec 2022',
      time: '2nd Hr.',
      productivityNo: 50,
      lineUp: 76,
      lineDown: 46,
      noProduction: 34,
      highProduction: 65,
      normalProduction: 35,
      lowProduction: 89,
      newKanban: 34,
      warningKanban: 13,
      dangerKanban: 56,
    },
    {
      date: '31 Apr 2022',
      time: '3rd Hr.',
      productivityNo: 54,
      lineUp: 32,
      lineDown: 35,
      noProduction: 67,
      highProduction: 27,
      normalProduction: 47,
      lowProduction: 58,
      newKanban: 23,
      warningKanban: 56,
      dangerKanban: 46,
    },
  ];
  const chartConfig = {
    //    backgroundGradientFrom: "#fff",
    // backgroundGradientFromOpacity: 0,
    //  backgroundGradientTo: "#fff",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,

    barPercentage: 0.9,
    useShadowColorFromDataset: false, // optional
  };

  const filteredKPIListFunc = e => {
    let filteredData = [];
    kpiList.map(kpi => {});
    setKpiList(filteredData);
  };

  const myInjectedJs = `(function(){      
        window.localStorage.setItem('auth_app_token', '{"name":"nb:auth:jwt:token","ownerStrategyName":"email","createdAt":1673155312000,"value":"${token}"}'); 
    })();`;

  useEffect(() => {
    // filteredKPIListFunc()
    // console.log(getArrayCheckbox())
  }, [kpiModal, filteredKPIList]);

  useFocusEffect(
    React.useCallback(() => {
      getUserInfo();
    }, []),
  );

  function setChartModal(param) {
    setChartModalWindow(param);
  }

  function KPIFilter(props) {
    return (
      <View style={{height: 400}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CheckboxList
            headerName="All"
            theme="black"
            selectedListItems={filteredKPIList}
            listItems={kpiList}
            onChange={({ids, items}) => {
              // eslint-disable-next-line no-console
              console.log('My updated list 1 :: ', ids, items);
              setKpiList(items);
            }}
            checkboxProp={{boxType: 'square'}} // iOS (supported from v0.3.0)
            headerStyle={{
              padding: 4,
              flexDirection: 'row',
              alignItems: 'center',
              fontFamily: 'Lato-Bold',
              text: {
                fontWeight: 'bold',
                fontSize: 16,
              },
            }}
            listItemStyle={{
              padding: 2,
              flexDirection: 'row',
              alignItems: 'center',
              fontFamily: 'Lato-Regular',
              borderBottomColor: '#eee',
              borderBottomWidth: 0.7,

              text: {
                fontWeight: 'bold',
                fontSize: 16,
              },
            }}
            // onLoading={() => <LoaderComponent />}
          />
        </ScrollView>
      </View>
    );
  }

  function Chart() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <VictoryChart width={300} theme={VictoryTheme.material}>
          <VictoryBar
            barRatio={0.9}
            style={{
              data: {fill: '#badc58'},
            }}
            data={data}
            x="line"
            y="earnings"
          />
        </VictoryChart>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: height * 0.006,
        }}>
        <View>
          <Text style={{fontFamily: FONT_FAMILY, color: TEXT_GREY}}>
            Organization
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontFamily: 'Lato-Bold', color: TEXT_BLACK}}>4A</Text>
            <Text style={{fontFamily: 'Lato-Bold', color: 'red'}}> | </Text>
            <Text style={{fontFamily: 'Lato-Bold', color: TEXT_BLACK}}>
              Unit - 1
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={() => setKpiModal(!kpiModal)}>
            <Text
              style={{
                fontFamily: 'Lato-Regular',
                backgroundColor: '#4C4C4C',
                color: '#fff',
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 10,
              }}>
              <Octicons name="filter" size={13} /> KPI
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: 16,
          // paddingBottom: 100,
          bottom: 10,
        }}>
        {filteredKPIList.map(kpi => {
          return (
            <TouchableOpacity
              onPress={() => setChartModal(true)}
              key={kpi.id}
              style={styles.KPIBOX}>
              <Text
                style={{
                  fontSize: width * 0.031,
                  fontFamily: 'Lato-Regular',
                  color: '#FFF',
                }}>
                {kpi.name}
              </Text>
              <Text
                style={{
                  fontSize: width * 0.045,
                  fontFamily: 'Lato-Bold',
                  color: '#FFF',
                  marginTop: 10,
                }}>
                {kpi.value}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: 10,
          paddingBottom: height * 0.02,
        }}>
        {productivityDetails.map((productivityDetail, index) => (
          <View style={styles.Card} key={index}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: width * 0.04,
                  fontFamily: 'Lato-Regular',
                  color: '#4C4C4C',
                }}>
                {productivityDetail.date}
              </Text>
              <Text
                style={{
                  fontSize: width * 0.04,
                  fontFamily: 'Lato-Regular',
                  color: '#4C4C4C',
                }}>
                {productivityDetail.time}
              </Text>
            </View>
            <View
              style={{
                height: height * 0.001,
                marginVertical: height * 0.01,
                width: width * 0.8,
                backgroundColor: '#CECECE',
              }}
            />
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: '#4C4C4C', fontSize: width * 0.035}}>
                Productivity in{' '}
                <Text style={{fontWeight: '700'}}>
                  {productivityDetail.productivityNo}
                </Text>{' '}
                Line
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Octicons name="arrow-up" size={16} color="#22B14C" />
                  <Text
                    style={{
                      marginLeft: width * 0.01,
                      color: '#22B14C',
                      fontSize: width * 0.033,
                      fontFamily: 'Lato-Regular',
                    }}>
                    Line-{productivityDetail.lineUp}
                  </Text>
                </View>
                <View
                  style={{
                    width: width * 0.002,
                    height: height * 0.02,
                    backgroundColor: '#CECECE',
                    marginLeft: width * 0.02,
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: width * 0.02,
                    // paddingLeft: width * 0.02,
                    height: height * 0.02,
                  }}>
                  <Octicons name="arrow-down" size={16} color="#EE1C24" />
                  <Text
                    style={{
                      marginLeft: width * 0.01,
                      color: '#EE1C24',
                      fontFamily: 'Lato-Regular',
                      fontSize: width * 0.033,
                    }}>
                    Line-{productivityDetail.lineDown}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: width * 0.85,
                marginTop: width * 0.02,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#D6D6D6',
                  borderRadius: 10,
                  paddingHorizontal: width * 0.03,
                  paddingVertical: height * 0.005,
                }}>
                <Text
                  style={{
                    fontSize: width * 0.028,
                    color: '#4C4C4C',
                    fontFamily: 'Lato-Regular',
                  }}>
                  No Prod -{' '}
                </Text>
                <Text
                  style={{
                    color: '#4C4C4C',
                    fontFamily: 'Lato-Bold',
                    fontSize: width * 0.035,
                  }}>
                  {productivityDetail.noProduction}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#D6EACD',
                  borderRadius: 10,
                  paddingHorizontal: width * 0.03,
                  paddingVertical: height * 0.005,
                }}>
                <Text
                  style={{
                    fontSize: width * 0.028,
                    color: '#028B2B',
                    fontFamily: 'Lato-Regular',
                  }}>
                  High -{' '}
                </Text>
                <Text
                  style={{
                    color: '#028B2B',
                    fontFamily: 'Lato-Bold',
                    fontSize: width * 0.035,
                  }}>
                  {productivityDetail.highProduction}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#F2EBC6',
                  borderRadius: 10,
                  paddingHorizontal: width * 0.03,
                  paddingVertical: height * 0.005,
                }}>
                <Text
                  style={{
                    fontSize: width * 0.028,
                    color: '#998900',
                    fontFamily: 'Lato-Regular',
                  }}>
                  Normal -{' '}
                </Text>
                <Text
                  style={{
                    color: '#998000',
                    fontFamily: 'Lato-Bold',
                    fontSize: width * 0.035,
                  }}>
                  {productivityDetail.normalProduction}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(238, 28, 36, 0.1)',
                  borderRadius: 10,
                  paddingHorizontal: width * 0.03,
                  paddingVertical: height * 0.005,
                }}>
                <Text
                  style={{
                    fontSize: width * 0.028,
                    color: '#EE1C24',
                    fontFamily: 'Lato-Regular',
                  }}>
                  Low -{' '}
                </Text>
                <Text
                  style={{
                    color: '#EE1C24',
                    fontFamily: 'Lato-Bold',
                    fontSize: width * 0.035,
                  }}>
                  {productivityDetail.lowProduction}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: width * 0.84,
                marginTop: height * 0.01,
              }}>
              <Text
                style={{
                  color: '#4C4C4C',
                  fontSize: width * 0.035,
                  marginRight: width * 0.02,
                }}>
                Kanban
              </Text>
              <View
                style={{
                  width: width * 0.0026,
                  height: height * 0.02,
                  alignSelf: 'center',
                  backgroundColor: '#F84646',
                  marginRight: width * 0.01,
                }}
              />
              <Text
                style={{
                  color: '#4C4C4C',
                  fontSize: width * 0.035,
                  marginLeft: width * 0.02,
                }}>
                Requisition
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                width: width * 0.85,
                marginTop: width * 0.02,
                marginBottom: width * 0.004,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#D6D6D6',
                  borderRadius: 10,
                  paddingHorizontal: width * 0.03,
                  paddingVertical: height * 0.005,
                  marginRight: width * 0.02,
                }}>
                <Text
                  style={{
                    fontSize: width * 0.028,
                    color: '#4C4C4C',
                    fontFamily: 'Lato-Regular',
                  }}>
                  New -{' '}
                </Text>
                <Text
                  style={{
                    color: '#4C4C4C',
                    fontFamily: 'Lato-Bold',
                    fontSize: width * 0.035,
                  }}>
                  {productivityDetail.newKanban}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#F2EBC6',
                  borderRadius: 10,
                  paddingHorizontal: width * 0.03,
                  paddingVertical: height * 0.005,
                  marginRight: width * 0.02,
                }}>
                <Text
                  style={{
                    fontSize: width * 0.028,
                    color: '#998900',
                    fontFamily: 'Lato-Regular',
                  }}>
                  Warning -{' '}
                </Text>
                <Text
                  style={{
                    color: '#998000',
                    fontFamily: 'Lato-Bold',
                    fontSize: width * 0.035,
                  }}>
                  {productivityDetail.warningKanban}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(238, 28, 36, 0.1)',
                  borderRadius: 10,
                  paddingHorizontal: width * 0.03,
                  paddingVertical: height * 0.005,
                }}>
                <Text
                  style={{
                    fontSize: width * 0.028,
                    color: '#EE1C24',
                    fontFamily: 'Lato-Regular',
                  }}>
                  Danger -{' '}
                </Text>
                <Text
                  style={{
                    color: '#EE1C24',
                    fontFamily: 'Lato-Bold',
                    fontSize: width * 0.035,
                  }}>
                  {productivityDetail.dangerKanban}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal
        width="90%"
        isVisible={chartModal}
        showHide={() => setChartModal(!chartModal)}
        title="KPI Chart"
        content={<Chart />}
        closeButton={true}
      />

      <Modal
        width="90%"
        isVisible={kpiModal}
        showHide={() => setKpiModal(!kpiModal)}
        title="Choose KPI"
        content={<KPIFilter kpiList={kpiList} />}
        closeButton={true}
      />

      <WebView
        showsVerticalScrollIndicator={false}
        javaScriptEnabled={true}
        injectedJavaScript={myInjectedJs}
        originWhitelist={['*']}
        onHttpError={e => console.log(e)}
        style={{height: 0, width: 0}}
        source={{uri: getEndPoint('/#/kanban/kanban-requisition')}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: width * 0.045,
    backgroundColor: BG_COLOR,
  },
  KPIBOX: {
    backgroundColor: '#4C4C4C',
    paddingVertical: height * 0.02,
    width: width * 0.289,
    height: height * 0.09,
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: height * 0.01,
    shadowColor: '#000',
    shadowColor: '#171717',
    shadowRadius: 3,
    elevation: 2,
  },
  Card: {
    backgroundColor: '#F8F8F8',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.04,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    // elevation: 2,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 1,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 6,
  },
});
