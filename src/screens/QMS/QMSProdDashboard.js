import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLegend,
  VictoryTheme,
} from 'victory-native';
import {
  getEndPoint,
  getProductionDashBoardQcPass,
  getProductivityEfficiency,
  getTodaysHourWiseProductionEfficiencyBar,
  getUser,
} from '../../api';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {GlobalContext} from '../../context/GlobalProvider';
import PopOverMenu from '../../common/PopOverMenu';
import {ScrollView} from 'react-native-gesture-handler';
import Utils from '../../common/Utils';
import WebView from 'react-native-webview';
import {useFocusEffect} from '@react-navigation/native';

export default function QMSProdDashboard(props) {
  const {
    contextValue,
    setHeader,
    selectedLine,
    setSelectedLine,
    setUserInfo,
    token,
  } = useContext(GlobalContext);

  async function getUserInfo() {
    setTimeout(async () => {
      await getUser().then(user => {
        setUserInfo(user);
      });
    }, 2000);
  }

  const [qcData, setQcData] = useState('');

  const [efficiency, setEfficiency] = useState('');
  const [graphBar, setGraphBar] = useState([]);
  const [user, setUser] = useState('');
  const [popOver, setPopOverVisible] = useState(false);

  async function getQCPassData() {
    const currentDateAndTime = Utils.getCurrentDate();
    await getProductionDashBoardQcPass(
      currentDateAndTime,
      selectedLine?.currentNode
        ? selectedLine?.currentNode
        : contextValue?.userInfo?.orgId,
    )
      .then(response => {
        setQcData(response);
      })
      .catch(error => console.log(error));
  }

  async function getEfficiency() {
    const currentDateAndTime = Utils.getCurrentDate();
    await getProductivityEfficiency(
      currentDateAndTime.split('T')[0] + 'T00:00:00',
      currentDateAndTime,
      selectedLine?.currentNode
        ? selectedLine?.currentNode
        : contextValue.userInfo?.orgId,
    )
      .then(response => {
        setEfficiency(response);
      })
      .catch(error => console.log(error));
  }

  async function getHourBar() {
    const currentDateAndTime = Utils.getCurrentDate();
    await getTodaysHourWiseProductionEfficiencyBar(
      currentDateAndTime,
      selectedLine?.currentNode
        ? selectedLine?.currentNode
        : contextValue.userInfo?.orgId,
    )
      .then(response => {
        // setGraphBar(response);
        setGraphBar(
          response?.production.map(data => {
            return {hr: data.hour, production: data.production, efficiency: data.efficiency};
          }),
        );
      })
      .catch(error => console.log(error));
  }

  async function loadData() {
    await getUser().then(user => {
      setUser(user);
      getQCPassData();
      getEfficiency();
      getHourBar();
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      setHeader('Production Dashboard');
      getUserInfo();
      setSelectedLine('')
    }, []),
  );

  const myInjectedJs = `(function(){      
    window.localStorage.setItem('auth_app_token', '{"name":"nb:auth:jwt:token","ownerStrategyName":"email","createdAt":1673155312000,"value":"${token}"}'); 
})();`;

  useEffect(() => {
    loadData();
    let interval = setInterval(() => {
      loadData();
    }, 15000);

    return () => clearInterval(interval);
  }, [selectedLine, contextValue]);

  function Chart() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <VictoryChart
        width={380}
        height={300}
        theme={VictoryTheme.material}
      >
        <VictoryLegend
          x={150}
          y={20}
          orientation="horizontal"
          symbolSpacer={5}
          gutter={20}
          colorScale={['#4FD5FF', '#c43a31']}
          data={[{name: 'Production'}, {name: 'Efficiency'}]}
        />
        <VictoryGroup offset={15} style={{ data: { width: 10 } }}>
          <VictoryBar
            style={{ data: { fill: '#4FD5FF' } }}
            data={graphBar}
            x="hr"
            y="production"
          />
          <VictoryBar
            style={{ data: { fill: '#c43a31' } }}
            data={graphBar}
            x="hr"
            y="efficiency"
          />
        </VictoryGroup>
      </VictoryChart>
    </View>
    );
  }

  const menu = [
    {name: 'Line 1', id: 2333},
    {name: 'Line 3', id: 2433},
    {name: 'Line 4', id: 2383},
    {name: 'Line 5', id: 2336},
    {name: 'Line 7', id: 2338},
    {name: 'Line 8', id: 2339},
    {name: 'Line 9', id: 2399},
    {name: 'Line 96', id: 2993},
  ];

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <PopOverMenu
              callBack={response => setSelectedLine(response)}
              onBackgroundPress={() => setPopOverVisible(false)}
              setPopOverVisible={() => setPopOverVisible(!popOver)}
              backdropColor="#10244552"
              borderRadius={6}
              itemList={menu}
              visible={popOver}
              color="#fff"
            />
          </View>
          <View style={{paddingVertical: 2}}>
            <Text style={styles.lineLabel}>
              {' '}
              {selectedLine ? selectedLine.item.parentName : ''}
            </Text>
            <Text style={styles.lineLabel2}>
              {selectedLine ? selectedLine.item.name : 'No line selected'}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%',
          }}>
          <View style={styles.cardBoxHalf}>
            <Text style={styles.cardBoxHeader}>Efficiency</Text>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={[styles.cardBoxText, {fontSize: 32}]}>
                {efficiency?.efficiency !== 'Infinity'
                  ? parseFloat(efficiency?.efficiency).toFixed(2)
                  : 0}
                %
              </Text>
              <Text style={[styles.cardBoxText, {fontSize: 32}]}>{` `}</Text>
              <Text style={[styles.cardBoxText, {fontSize: 32}]}>{` `}</Text>
              <Text style={[styles.cardBoxText, {fontSize: 32}]}>
                <FontAwesome5 name="arrow-up" size={32} color="#11E533" />
              </Text>
            </View>
          </View>

          <View style={styles.cardBoxHalf}>
            <Text style={styles.cardBoxHeader}>Achievements</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={[styles.cardBoxText, {fontSize: 32}]}>
                {qcData?.cumulativeProduction && qcData?.cumulativeTarget
                  ? parseFloat(
                      (qcData?.cumulativeProduction /
                        qcData?.cumulativeTarget) *
                        100,
                    ).toFixed(2)
                  : '0.00'}
                %
              </Text>
              <Text style={[styles.cardBoxText, {fontSize: 32}]}>{` `}</Text>
              <Text style={[styles.cardBoxText, {fontSize: 32}]}>{` `}</Text>
              <Text style={[styles.cardBoxText, {fontSize: 32}]}>
                <FontAwesome5 name="arrow-down" size={32} color="#F84646" />
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%',
          }}>
          <View style={styles.cardBoxHalf}>
            <Text style={styles.cardBoxHeader}>Produces Minutes</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={[styles.cardBoxText, {fontSize: 32}]}>
                {qcData?.produceMinute || 0}
              </Text>
            </View>
          </View>

          <View style={styles.cardBoxHalf}>
            <Text style={styles.cardBoxHeader}>Targets Minutes</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={[styles.cardBoxText, {fontSize: 32}]}>
                {qcData?.targetMinute || 0}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.cardBox}>
          <Text style={styles.cardBoxHeader}>Day Target (Pcs)</Text>

          <Text
            style={[
              styles.cardBoxText,
              {color: qcData?.dayTargetLight ? 'red' : '#4C4C4C'},
            ]}>
            {qcData?.dayTarget || 0}
          </Text>
        </View>

        <View
          style={[
            styles.cardBox,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 35,
            },
          ]}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.cardBoxHeader}>Current Hr Production</Text>

            <Text
              style={[styles.cardBoxText, {fontSize: 32, color: '#F84646'}]}>
              {qcData?.hourProduction || 0}
            </Text>
          </View>

          <View
            style={{
              borderLeftWidth: 1,
              height: 60,
              borderColor: '#C1C1C1',
            }}></View>

          <View style={{alignItems: 'center'}}>
            <Text style={styles.cardBoxHeader}>Current Hr Target</Text>

            <Text
              style={[styles.cardBoxText, {fontSize: 32, color: '#DAB600'}]}>
              {qcData?.hourTarget || 0}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.cardBox,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 35,
            },
          ]}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.cardBoxHeader}>Cumulative Production</Text>

            <Text
              style={[styles.cardBoxText, {fontSize: 32, color: '#03CA0B'}]}>
              {qcData?.cumulativeProduction || 0}
            </Text>
          </View>
          <View
            style={{
              borderLeftWidth: 1,
              height: 60,
              borderColor: '#C1C1C1',
            }}></View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.cardBoxHeader}>Cumulative Target</Text>

            <Text
              style={[
                styles.cardBoxText,
                {
                  fontSize: 32,
                  color: qcData?.cumulativeTarget ? 'red' : '#4C4C4C',
                },
              ]}>
              {qcData?.cumulativeTarget || 0}
            </Text>
          </View>
        </View>

        <View style={{backgroundColor: '#efefef', borderRadius: 10}}>
          {graphBar ? <Chart /> : null}
        </View>
      </ScrollView>

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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  cardBox: {
    backgroundColor: '#efefef',
    paddingVertical: 10,
    height: 120,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  cardBoxText: {
    color: '#4C4C4C',
    fontFamily: 'Lato-Bold',
    fontSize: 40,
  },
  cardBoxHeader: {
    color: '#4C4C4C',
    fontFamily: 'Lato-Regular',
    fontSize: 15,
    marginBottom: 5,
  },
  cardBoxHalf: {
    backgroundColor: '#efefef',
    paddingVertical: 10,
    height: 120,
    justifyContent: 'center',
    width: '48%',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  lineLabel: {
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    paddingHorizontal: 5,
  },
  lineLabel2: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    paddingHorizontal: 5,
    color: '#e74c3c',
  },
});
