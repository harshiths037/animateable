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

const PanresponderRedBallHARD = () => {
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
      onPanResponderMove: (_, gesture) => {
        pan.x.setValue(gesture.dx);
        pan.y.setValue(gesture.dy);
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  )[0];

  return (
    <View style={styles.container}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.box,
          {
            transform: [{translateX: pan.x}, {translateY: pan.y}],
            // transform: pan.getTranslateTransform(),
          },
          // pan.getLayout()
        ]}
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
export default PanresponderRedBallHARD;
