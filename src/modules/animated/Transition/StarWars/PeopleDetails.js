/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Animated, StyleSheet, Text} from 'react-native';
import PeopleCard, {windowWidth} from './PeopleCard';
import {normalize} from '../../../../utils/Responsive';
import Icon from 'react-native-vector-icons/FontAwesome';

function getSharedElementOpacityStyle(animatedValue) {
  const opacityInterpolation = animatedValue.interpolate({
    inputRange: [0, 0.995, 1],
    outputRange: [0, 0, 1],
  });
  return {
    opacity: opacityInterpolation,
    paddingHorizontal: 0,
  };
}
const PeopleDetails = ({
  index,
  data,
  onCardPress,
  isAnimating,
  animatedValue,
}) => {
  const transitionLayerStyle = getSharedElementOpacityStyle(animatedValue);
  return (
    <>
      <Animated.View style={[{flex: 1}, transitionLayerStyle]}>
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <PeopleCard
              index={index}
              person={data}
              isAnimating={isAnimating}
              animating={animatedValue}
              onCardPress={() => {
                if (onCardPress) {
                  onCardPress();
                }
              }}
            />
          </View>
        </View>
      </Animated.View>
      <Animated.View
        style={{
          flex: 4,
          alignSelf: 'center',
          alignItems: 'center',
          width: windowWidth,
          justifyContent: 'center',
          opacity: animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0.5, 1],
            extrapolate: 'clamp',
          }),
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [400, 200, -10],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}>
        <View style={styles.details}>
          <Text style={styles.detailFont}>Name</Text>
          <Text style={styles.detailFont}>{data.name}</Text>
        </View>

        <View style={styles.details}>
          <Text style={styles.detailFont}>Gender</Text>
          <Text style={styles.detailFont}>{data.gender}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.detailFont}>Birth year</Text>
          <Text style={styles.detailFont}>{data.birth_year}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.detailFont}>Eye color</Text>
          <Text style={styles.detailFont}>{data.eye_color}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.detailFont}>Skin color</Text>
          <Text style={styles.detailFont}>{data.skin_color}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.detailFont}>Hair color</Text>
          <Text style={styles.detailFont}>{data.hair_color}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.detailFont}>Mass</Text>
          <Text style={styles.detailFont}>{data.mass}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.detailFont}>Height</Text>
          <Text style={styles.detailFont}>{data.height}</Text>
        </View>
      </Animated.View>
      <Animated.View
        style={{
          flex: 1,
          alignSelf: 'center',
          alignItems: 'center',
          width: windowWidth,
          justifyContent: 'center',
          opacity: animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0.5, 1],
            extrapolate: 'clamp',
          }),
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [400, 200, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}>
        <Icon name="heart" size={normalize(20)} color="white" />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  details: {
    width: windowWidth * 0.7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailFont: {fontSize: normalize(20), color: '#ffe81f'},
});
export default PeopleDetails;
