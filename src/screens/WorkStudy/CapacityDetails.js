import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import React, {memo, useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import DropShadow from 'react-native-drop-shadow';
import {GlobalContext} from '../../context/GlobalProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import {clockRunning} from 'react-native-reanimated';
import {last} from 'lodash';

function CapacityDetails(props) {
  const {selectedEmployee} = useContext(GlobalContext);
  console.log(
    '🚀 ~ file: CapacityDetails.js:19 ~ CapacityDetails ~ selectedEmployee:',
    selectedEmployee,
  );
  const [selectedChip, setSelectedChip] = useState(null);
  const [chips, setChips] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [time, setTime] = useState({ms: 0, s: 0, m: 0, h: 0});
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [pausedTime, setPausedTime] = useState(null);

  const wsWorker = {
    name: 'Worker',
    chips: [],
    laps: [],
    chipAvg: '00:00:00:000',
    allAvg: '00000',
  };

  const selectedLaps = laps[selectedChip] || [];
  const lastLap = selectedLaps.length
    ? selectedLaps[selectedLaps.length - 1]
    : {h: 0, m: 0, s: 0, ms: 0};
  const lapsInDescendingOrder = [...selectedLaps].sort(
    (a, b) => b.h - a.h || b.m - a.m || b.s - a.s || b.ms - a.ms,
  );

  useEffect(() => {
    let animationFrameId = null;
    if (running) {
      let startTime = performance.now();
      if (pausedTime) {
        startTime -=
          pausedTime.h * 60 * 60 * 1000 +
          pausedTime.m * 60 * 1000 +
          pausedTime.s * 1000 +
          pausedTime.ms;
        setPausedTime(null);
      }
      setStartTime(startTime);
      const updateTime = () => {
        animationFrameId = requestAnimationFrame(updateTime);
        const currentTime = performance.now();
        const elapsedTime = currentTime - startTime;
        let ms = Math.floor(elapsedTime % 1000);
        let s = Math.floor((elapsedTime / 1000) % 60) | 0;
        let m = Math.floor((elapsedTime / (1000 * 60)) % 60) | 0;
        let h = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24) | 0;
        setTime({ms, s, m, h});
      };
      updateTime();
    } else if (!running && startTime !== null) {
      cancelAnimationFrame(animationFrameId);
      setPausedTime(time);
    }
    return () => cancelAnimationFrame(animationFrameId);
  }, [running]);

  const lapsInMs = selectedLaps.map(lap => {
    return lap.h * 60 * 60 * 1000 + lap.m * 60 * 1000 + lap.s * 1000 + lap.ms;
  });

  // Convert laps into an array of laps
  const allLaps = Object.values(laps).flat();

  // Convert each lap into milliseconds
  const averageLapTimes = allLaps.map(lap => {
    const {h, m, s, ms} = lap;
    return h * 3600000 + m * 60000 + s * 1000 + ms;
  });

  // Calculate the total time
  const totalTime = averageLapTimes.reduce((total, time) => total + time, 0);

  // Calculate the average time
  const averageTime = totalTime / averageLapTimes.length;
  const averageLap = {
    h: Math.floor(averageTime / 3600000) | 0,
    m: Math.floor((averageTime % 3600000) / 60000) | 0,
    s: Math.floor((averageTime % 60000) / 1000) | 0,
    ms: Math.floor(averageTime % 1000) | 0,
  };

  if (lapsInMs.length === 0) {
    console.log('Laps array is empty');
  } else {
    const totalLapsTime = lapsInMs.reduce((a, b) => a + b);
    const averageLapTime = totalLapsTime / selectedLaps.length;

    //converting total lap time
    // var total_ms = (totalLapsTime % 1000);
    // var remainingTime = (totalLapsTime - total_ms) / 1000;

    // var total_s = (remainingTime % 60);
    // remainingTime = (remainingTime - total_s) / 60;

    // var total_m = remainingTime % 60;
    // remainingTime = (remainingTime - total_m) / 60;

    // var total_h = remainingTime;

    //converting average lap time
    var average_ms = averageLapTime % 1000;
    remainingTime = (averageLapTime - average_ms) / 1000;

    var average_s = remainingTime % 60;
    remainingTime = (remainingTime - average_s) / 60;

    var average_m = remainingTime % 60;
    remainingTime = (remainingTime - average_m) / 60;

    var average_h = remainingTime;
  }

  const handleStartPause = () => {
    if (running) {
      setPausedTime(time);
    } else {
      if (!startTime) {
        setStartTime(performance.now());
      }
    }
    setRunning(!running);
  };

  const handleReset = () => {
    setTime({ms: 0, s: 0, m: 0, h: 0});
    setRunning(false);
    // setLaps([]);
    setPausedTime(null);
    setStartTime(null);
  };

  const handleLap = () => {
    if (selectedChip !== null) {
      const currentTime = {...time};
      const currentLaps = laps[selectedChip] || [];
      currentLaps.push(currentTime);
      setLaps({...laps, [selectedChip]: currentLaps});
    }
  };

  function addChipsText() {
    if (textInput) {
      const newChips = [...chips, textInput];
      setChips(newChips);
      setLaps({...laps, [newChips.length - 1]: []}); // Add an empty lap array for the new chip
      setTextInput('');
      setSelectedChip(newChips.length - 1);
    }
  }

  function removeChips(index) {
    const newChips = chips.filter((_, i) => i !== index);
    const newLaps = {};
    Object.keys(laps).forEach(key => {
      const lapIndex = parseInt(key);
      if (lapIndex < index) {
        newLaps[lapIndex] = laps[lapIndex];
      } else if (lapIndex > index) {
        newLaps[lapIndex - 1] = laps[lapIndex];
      }
    });
    setChips(newChips);
    setLaps(newLaps);
    setSelectedChip(newChips?.length - 1);
  }

  useEffect(() => {
    setTime({ms: 0, s: 0, m: 0, h: 0});
    setRunning(false);
    setPausedTime(lastLap);
    setStartTime(lastLap);
  }, [selectedChip]);

  let source;
  if (selectedEmployee && selectedEmployee?.empImage?.length > 100) {
    source = {uri: `data:image/png;base64,${selectedEmployee?.empImage}`};
  } else {
    source = require('../../assets/male.png');
  }

  function saveButtonHandler() {
    // setWorker(worker)
    props.navigation.navigate('LineInfo');
  }

  return (
    <ScrollView style={{backgroundColor: '#FFFFFF'}}>
      <View style={styles.container}>
        <View style={styles.employeeCard}>
          <View>
            <View style={styles.avatar}>
              {selectedEmployee && selectedEmployee?.empImage.length > 100 ? (
                <Image
                  source={source}
                  style={{width: '100%', height: '100%', borderRadius: 10}}
                />
              ) : (
                <Image
                  source={source}
                  style={{width: '100%', height: '100%', borderRadius: 10}}
                />
              )}
            </View>
            <Text
              style={{
                padding: 5,
                backgroundColor: '#F84646',
                width: 23,
                borderRadius: 20,
                position: 'absolute',
                bottom: -5,
                right: -5,
              }}>
              <Ionicons name="refresh" color="#fff" />
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              paddingLeft: 10,
              justifyContent: 'space-around',
            }}>
            <Text
              style={{fontFamily: 'Lato-Regular', color: '#fff', fontSize: 16}}>
              {selectedEmployee?.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '70%',
              }}>
              <Text
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  padding: 6,
                  borderRadius: 10,
                  color: '#fff',
                  fontFamily: 'Lato-Regular',
                  fontSize: 12,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Lato-Bold',
                    fontSize: 16,
                  }}>
                  0.0
                </Text>{' '}
                (C.T.)
              </Text>
              <Text style={{color: '#fff', textAlignVertical: 'center'}}>
                {' '}
                |{' '}
              </Text>
              <Text
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  padding: 6,
                  borderRadius: 10,
                  color: '#fff',
                  fontFamily: 'Lato-Regular',
                  fontSize: 12,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Lato-Bold',
                    fontSize: 16,
                  }}>
                  0.0
                </Text>{' '}
                (Cap)
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#A3A3A3',
              padding: 5,
              borderRadius: 10,
              borderStyle: 'dashed',
              width: '80%',
            }}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {chips.map((text, key) => {
                return (
                  <TouchableOpacity
                    key={key}
                    onPress={() => setSelectedChip(key)}
                    onLongPress={() => removeChips(key)}>
                    <Text
                      style={{
                        marginTop: 5,
                        backgroundColor:
                          key === selectedChip ? '#4C4C4C' : '#efefef',
                        color: key === selectedChip ? '#efefef' : '#4C4C4C',
                        fontFamily: 'Lato-Regular',
                        borderRadius: 8,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        marginHorizontal: 4,
                        fontSize: 14,
                      }}>
                      {text}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TextInput
              style={{
                width: '100%',
                borderRadius: 20,
                height: 30,
                padding: 2,
                paddingLeft: 5,
              }}
              placeholder="Click + to add work"
              placeholderTextColor={'#CCCCCC'}
              defaultValue={textInput}
              onChangeText={e => setTextInput(e)}
            />
          </View>
          <View>
            <TouchableOpacity onPress={() => addChipsText()}>
              <Text
                style={{
                  padding: 15,
                  backgroundColor: '#00C51F',
                  borderRadius: 10,
                }}>
                <Octicons name="plus" size={20} color="#fff" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{width: '100%'}}>
          <DropShadow style={styles.shadow}>
            <View
              style={{
                height: 128,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: '#efefef',
                marginTop: 20,
              }}>
              <Text style={styles.button2}>
                {laps[selectedChip]?.length || '0'}
              </Text>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <Text
                  style={{
                    fontFamily: 'Lato-Regular',
                    fontSize: 28,
                    color: '#4d4d4d',
                  }}>
                  {time.h.toString().padStart(2, '0')}:
                  {time.m.toString().padStart(2, '0')}:
                  {time.s.toString().padStart(2, '0')}:
                  {time.ms.toString().padStart(3, '0')}
                </Text>

                <View
                  style={{
                    borderBottomColor: '#A3A3A3',
                    borderBottomWidth: 1,
                    height: 1,
                    width: '60%',
                    marginVertical: 10,
                  }}
                />

                <Text
                  style={{
                    fontFamily: 'Lato-Regular',
                    fontSize: 18,
                    color: '#A3A3A3',
                  }}>
                  {lastLap.h.toString().padStart(2, '0')}:
                  {lastLap.m.toString().padStart(2, '0')}:
                  {lastLap.s.toString().padStart(2, '0')}:
                  {lastLap.ms.toString().padStart(3, '0')}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity onPress={handleReset}>
                    <Text style={styles.button}>
                      <Ionicons name="reload" size={24} />
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    disabled={
                      !chips.length || selectedChip !== chips.length - 1
                    }
                    activeOpacity={0.7}
                    style={{marginBottom: 20}}
                    onPress={handleStartPause}>
                    <Text
                      style={
                        !chips.length || selectedChip !== chips.length - 1
                          ? styles.disabledCbutton
                          : styles.Cbutton
                      }>
                      {running ? (
                        <Ionicons name="pause" size={28} />
                      ) : (
                        <Ionicons name="play" size={28} />
                      )}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={handleLap} disabled={!running}>
                    <Text
                      style={running ? styles.button : styles.disabledButton}>
                      <Ionicons name="alarm-outline" size={24} />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </DropShadow>

          <View
            style={{
              flexDirection: 'row',
              width: '70%',
              alignSelf: 'center',
              marginTop: '15%',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontFamily: 'Lato-Bold'}}>Average</Text>
            <View style={{width: '1%', backgroundColor: '#4C4C4C'}} />
            <Text style={{fontFamily: 'Lato-Regular'}}>
              {(average_h !== undefined &&
                Math.floor(average_h).toString().padStart(2, '0')) ||
                '00'}
              :
              {(average_m !== undefined &&
                Math.floor(average_m).toString().padStart(2, '0')) ||
                '00'}
              :
              {(average_s !== undefined &&
                Math.floor(average_s).toString().padStart(2, '0')) ||
                '00'}
              :
              {(average_ms !== undefined &&
                Math.floor(average_ms).toString().padStart(3, '0')) ||
                '000'}
            </Text>
            <View style={{width: '1%', backgroundColor: '#4C4C4C'}} />
            <Text style={{fontFamily: 'Lato-Regular'}}>
              {(averageLap.h !== undefined &&
                Math.floor(averageLap.h).toString().padStart(2, '0')) ||
                '00'}
              :
              {(averageLap.m !== undefined &&
                Math.floor(averageLap.m).toString().padStart(2, '0')) ||
                '00'}
              :
              {(averageLap.s !== undefined &&
                Math.floor(averageLap.s).toString().padStart(2, '0')) ||
                '00'}
              :
              {(averageLap.ms !== undefined &&
                Math.floor(averageLap.ms).toString().padStart(3, '0')) ||
                '000'}
            </Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{margin: '3%', height: 180}}>
            {lapsInDescendingOrder.map((lap, index) => (
              <View
                style={{
                  width: '100%',
                  backgroundColor: '#F6F4F4',
                  alignSelf: 'center',
                  marginVertical: '1%',
                  height: 30,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 15,
                  alignItems: 'center',
                  borderColor: '#EBE6E5',
                  borderWidth: 1,
                  borderRadius: 30,
                }}
                key={index}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontFamily: 'Lato-Bold',
                      fontSize: 18,
                      color: '#4C4C4C',
                    }}>
                    {lapsInDescendingOrder.length - index}
                  </Text>
                  <Text style={{fontSize: 12, color: '#7B7A7A'}}>Lap</Text>
                </View>
                <Text style={{fontSize: 14, color: '#4C4C4C'}}>
                  {lap.h.toString().padStart(2, '0')}:
                  {lap.m.toString().padStart(2, '0')}:
                  {lap.s.toString().padStart(2, '0')}:
                  {lap.ms.toString().padStart(3, '0')}
                </Text>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity>
            <Text
              onPress={() => {
                saveButtonHandler();
              }}
              style={{
                backgroundColor: '#4C4C4C',
                fontSize: 16,
                color: 'white',
                paddingHorizontal: 90,
                paddingVertical: 20,
                borderRadius: 30,
                width: '60%',
                alignSelf: 'center',
              }}>
              SAVE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default memo(CapacityDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  employeeCard: {
    flexDirection: 'row',
    backgroundColor: '#616161',
    padding: 10,
    borderRadius: 20,
  },
  avatar: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 60,
    width: 60,
  },
  shadow: {
    marginHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  button: {
    backgroundColor: '#F84646',
    color: '#fff',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 19,
    marginHorizontal: 15,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 17,
  },
  disabledButton: {
    backgroundColor: '#f57373',
    color: '#fff',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 19,
    marginHorizontal: 15,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 17,
  },
  button2: {
    backgroundColor: '#EAEAEA',
    color: '#fff',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#CACACA',
    paddingVertical: 1,
    paddingHorizontal: 2,
    marginHorizontal: 15,
    width: 40,
    height: 40,
    position: 'absolute',
    textAlign: 'center',
    textAlignVertical: 'center',
    left: -30,
    top: -10,
    color: '#4C4C4C',
    fontSize: 18,
  },
  Cbutton: {
    backgroundColor: '#F84646',
    color: '#fff',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 35,
    height: 60,
    marginHorizontal: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 10,
  },
  disabledCbutton: {
    backgroundColor: '#f57373',
    color: '#fff',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 35,
    height: 60,
    marginHorizontal: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 10,
  },
});
