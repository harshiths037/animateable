/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {normalize} from '../../../utils/Responsive';

const {width} = Dimensions.get('window');
const MINIMUM_HEIGHT = normalize(50);
const MAXIMUM_HEIGHT = normalize(180);

const Data = Array.from({length: 20}).map((_, i) => i + 1);

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      animation: new Animated.Value(0),
    };
  }

  componentDidMount() {}

  render() {
    const {animation} = this.state;

    const textSize = animation.interpolate({
      inputRange: [0, MAXIMUM_HEIGHT],
      outputRange: [normalize(25), normalize(19)],
      extrapolate: 'clamp',
    });
    const headerTextmarginRight = animation.interpolate({
      inputRange: [0, MAXIMUM_HEIGHT],
      outputRange: [normalize(0), normalize(40)],
      extrapolate: 'clamp',
    });
    const headerTextBottom = animation.interpolate({
      inputRange: [0, MAXIMUM_HEIGHT],
      outputRange: [normalize(0), normalize(20)],
      extrapolate: 'clamp',
    });
    const imageSize = animation.interpolate({
      inputRange: [0, MAXIMUM_HEIGHT],
      outputRange: [normalize(40), normalize(20)],
      extrapolate: 'clamp',
    });
    const imageOpacity = animation.interpolate({
      inputRange: [0, MAXIMUM_HEIGHT - MINIMUM_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const headerOpacity = animation.interpolate({
      inputRange: [0, MAXIMUM_HEIGHT],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    const headerBackgroundColor = animation.interpolate({
      inputRange: [0, MAXIMUM_HEIGHT],
      outputRange: ['transparent', '#1DA1F2'],
      extrapolate: 'clamp',
    });
    const topanimation = animation.interpolate({
      inputRange: [0, MAXIMUM_HEIGHT],
      outputRange: [MAXIMUM_HEIGHT - 25, MINIMUM_HEIGHT],
      extrapolate: 'clamp',
    });

    const headerHeight = animation.interpolate({
      inputRange: [0, MAXIMUM_HEIGHT],
      outputRange: [MAXIMUM_HEIGHT, MINIMUM_HEIGHT],
      extrapolate: 'clamp',
    });
    const heightAnimation = {
      height: headerHeight,
    };
    const headerTextAnimation = {
      fontSize: textSize,
      left: headerTextmarginRight,
      bottom: headerTextBottom,
    };
    const image = {uri: 'https://reactjs.org/logo-og.png'};
    return (
      <View style={styles.container}>
        <Animated.Image
          source={image}
          style={{
            height: headerHeight,
            width: width,
          }}
        />

        <Animated.ScrollView
          scrollEventThrottle={1}
          // contentContainerStyle={{paddingTop: MAXIMUM_HEIGHT}}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: animation}}}],
            {useNativeDriver: false}, // <-- Add this
          )}>
          {Data.map((d) => (
            <View style={styles.view}>
              <Text style={styles.text}>{d}</Text>
            </View>
          ))}
        </Animated.ScrollView>

        <Animated.View
          style={[
            styles.headerContainer,
            {
              backgroundColor: headerBackgroundColor,
              position: 'absolute',
              top: 0, //header
              width: width,
              alignItems: 'center',
            },
            heightAnimation,
          ]}>
          <Animated.Text
            style={[
              styles.headerText,
              headerTextAnimation,
              {textAlign: 'center'},
            ]}>
            12345678901234567890
          </Animated.Text>
        </Animated.View>

        <View
          style={{
            justifyContent: 'center',
            position: 'absolute',
            left: 0,
            top: 0,
            alignItems: 'center',
            // backgroundColor: 'red',
            // padding: normalize(10),
            margin: normalize(10),
          }}>
          <Icon name="arrow-left" size={normalize(20)} color="white" />
        </View>
        <View
          style={{
            justifyContent: 'center',
            position: 'absolute',
            right: 0,
            top: 0,
            alignItems: 'center',
            // backgroundColor: 'red',
            // padding: normalize(10),
            margin: normalize(10),
          }}>
          <Icon name="heart" size={normalize(20)} color="white" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  headerContainer: {
    justifyContent: 'flex-end',
  },
  headerText: {
    color: 'white',
    fontSize: normalize(15),
    position: 'absolute',
    textAlign: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    fontSize: 28,
  },
  view: {
    padding: 10,
    backgroundColor: 'white',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
