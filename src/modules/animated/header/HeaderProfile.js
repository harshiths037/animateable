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

const {width, height} = Dimensions.get('window');
const MINIMUM_HEIGHT = height * 0.1;
const MAXIMUM_HEIGHT = height * 0.3;

const imageProfile = {
  uri:
    'https://cdn3.vectorstock.com/i/thumbs/28/42/number-seven-symbol-neon-sign-seventh-vector-21302842.jpg',
};

const Data = Array.from({length: 120}).map((_, i) => i + 1);

export default class HeaderProfile extends Component {
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
    //
    // const textSize = animation.interpolate({
    //   inputRange: [0, MAXIMUM_HEIGHT],
    //   outputRange: [normalize(25), normalize(19)],
    //   extrapolate: 'clamp',
    // });
    const profileImageLeft = animation.interpolate({
      inputRange: [0, MAXIMUM_HEIGHT],
      outputRange: [width / 2.9, normalize(40)],
      extrapolate: 'clamp',
    });
    const headerTextTop = animation.interpolate({
      inputRange: [0, MAXIMUM_HEIGHT], //profile image
      outputRange: [MAXIMUM_HEIGHT - MINIMUM_HEIGHT, normalize(7)],
      extrapolate: 'clamp',
    });
    const imageSize = animation.interpolate({
      inputRange: [0, MAXIMUM_HEIGHT], //cover image
      outputRange: [normalize(100), normalize(40)],
      extrapolate: 'clamp',
    });
    // const imageOpacity = animation.interpolate({
    //   inputRange: [0, MAXIMUM_HEIGHT - MINIMUM_HEIGHT],
    //   outputRange: [1, 0],
    //   extrapolate: 'clamp',
    // });

    // const headerOpacity = animation.interpolate({
    //   inputRange: [0, MAXIMUM_HEIGHT],
    //   outputRange: [0, 1],
    //   extrapolate: 'clamp',
    // });
    const headerBackgroundColor = animation.interpolate({
      inputRange: [0, MAXIMUM_HEIGHT],
      outputRange: ['transparent', '#1DA1F2'],
      extrapolate: 'clamp',
    });
    // const topanimation = animation.interpolate({
    //   inputRange: [0, MAXIMUM_HEIGHT],
    //   outputRange: [MAXIMUM_HEIGHT - 25, MINIMUM_HEIGHT],
    //   extrapolate: 'clamp',
    // });

    const headerHeight = animation.interpolate({
      inputRange: [0, MAXIMUM_HEIGHT],
      outputRange: [MAXIMUM_HEIGHT, MINIMUM_HEIGHT],
      extrapolate: 'clamp',
    });
    const heightAnimation = {
      height: headerHeight,
    };
    const profileImageAnimation = {
      left: profileImageLeft,
      top: headerTextTop,
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
          <Text style={{fontSize: normalize(20)}}>
            max height {MAXIMUM_HEIGHT}
          </Text>
          <Text style={{fontSize: normalize(20)}}>height {height}</Text>
          <Text style={{fontSize: normalize(20)}}>width {width}</Text>
          <Text style={{fontSize: normalize(20)}}>ratio {height / width}</Text>

          {Data.map((d, i) => (
            <View style={styles.view}>
              {i <= 6 && (
                <Text style={styles.text}>
                  {Array(1 + i * 10).join(' ')}
                  {i * 10}
                </Text>
              )}
              {i >= 6 && i >= 0 && (
                <Text style={styles.text}>
                  {Array(i * 10 - 50).join(' ')}
                  {i * 10}
                </Text>
              )}
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
          <Animated.Image
            source={imageProfile}
            style={[
              {
                position: 'absolute',
                // alignSelf: 'center',
                top: MAXIMUM_HEIGHT - MINIMUM_HEIGHT,
                width: imageSize,
                borderRadius: normalize(50),
                // backgroundColor: 'tomato',
                height: imageSize,
              },
              profileImageAnimation,
            ]}
          />
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
