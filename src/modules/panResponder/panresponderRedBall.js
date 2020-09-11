// require('react-native').unstable_enableLogBox();
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
  PanResponder,
  View,
} from 'react-native';

const PanresponderRedBall = () => {
  const pan = useState(new Animated.ValueXY())[0];

  const panResponder = useState(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  )[0];

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.box, pan.getLayout()]}
        {...panResponder.panHandlers}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  container: {
    flex: 1,
  },
});
export default PanresponderRedBall;
