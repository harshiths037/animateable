/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Animated,
  BackHandler,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {normalize} from '../../../../utils/Responsive';
import PeopleDetails from '../StarWars/PeopleDetails';

const ANIMATION_DURATION = 1000;
const TRANSITION_VALUE = 0.001;
const NATIVE_DRIVER = true;

class CustomAnimatedFlatlist extends React.Component {
  cardRef;
  constructor() {
    super();
    this.state = {
      data: [],
      shouldShowInfo: false,
      startTransition: false,
      transitionCompleted: false,
      animatedValue: new Animated.Value(0),
      selectedIndex: 0,
      selectedViewLayoutParam: {x: 0, y: 0, width: 0, height: 0},
      isAnimating: false,
    };
  }

  backAction = () => {
    this.reverseAnimation();
    return true;
  };

  reverseAnimation = () => {
    this.setState(
      {
        startTransition: true,
        transitionCompleted: false,
        isAnimating: true,
      },
      () => {
        Animated.timing(this.state.animatedValue, {
          toValue: 0,
          duration: ANIMATION_DURATION,
          useNativeDriver: NATIVE_DRIVER,
        }).start(() => {
          this.setState({
            transitionCompleted: true,
            isAnimating: false,
            shouldShowInfo: false,
          });
        });
      },
    );
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backAction);
  }

  startAnimation = () => {
    Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      useNativeDriver: NATIVE_DRIVER,
    }).start(() => {
      this.setState({
        transitionCompleted: true,
        isAnimating: false,
      });
    });
  };

  getLayout = (item, index, layout) => {
    console.log('getLayout', item, index, layout);
    this.state.animatedValue.setValue(0); //set animationValue back to zero
    this.setState(
      {
        startTransition: true,
        selectedIndex: index,
        selectedViewLayoutParam: layout,
        transitionCompleted: false,
        isAnimating: true,
        shouldShowInfo: true,
      },
      () => {
        this.startAnimation();
      },
    );
  };

  getTransitionCardStyle = () => {
    const {selectedViewLayoutParam} = this.state; //layout params
    const initialPosition = selectedViewLayoutParam.y; //card's position on y axis
    const finalPosition = normalize(50);

    const top = this.state.animatedValue.interpolate({
      inputRange: [0, 0.5],
      outputRange: [initialPosition, finalPosition],
      extrapolate: 'clamp',
    });

    const opacityInterpolation = this.state.animatedValue.interpolate({
      inputRange: [0, TRANSITION_VALUE, 1 - TRANSITION_VALUE, 1],
      outputRange: [0, 1, 1, 0],
      extrapolate: 'clamp',
    });

    return {
      position: 'absolute',
      transform: [{translateY: top}, {translateX: selectedViewLayoutParam.x}],
      opacity: opacityInterpolation,
    };
  };

  render() {
    const {shouldShowInfo, animatedValue, selectedIndex} = this.state;
    const {data, header, component} = this.props;

    return (
      <Animated.View
        style={{
          flex: 1,
          alignSelf: 'center',
          justifyContent: 'center',
          backgroundColor: 'black',
        }}>
        <FlatList
          data={data}
          ItemSeparatorComponent={() => (
            <View style={{margin: normalize(10)}} />
          )}
          ListHeaderComponent={
            header
              ? () => header
              : () => <View style={{margin: normalize(10)}} />
          }
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (this.cardRef) {
                  this.cardRef.measure((x, y, width, height, pageX, pageY) => {
                    const layout = {x: pageX, y: pageY, width, height};
                    this.getLayout({item, index, layout});
                  });
                }
              }}
              ref={(ref) => {
                this.cardRef = ref;
              }}>
              {React.cloneElement(component, {
                person: item,
              })}
            </TouchableOpacity>
          )}
        />

        {shouldShowInfo && (
          <Animated.View
            style={{
              position: 'absolute',
              top: normalize(50),
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'black',
              opacity: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            }}>
            <TouchableOpacity onPress={this.reverseAnimation}>
              {React.cloneElement(component, {
                person: data[selectedIndex],
              })}
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    );
  }
}

export default CustomAnimatedFlatlist;
