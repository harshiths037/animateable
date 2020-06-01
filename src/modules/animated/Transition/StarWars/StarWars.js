/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Animated, BackHandler} from 'react-native';
import people from './Data/people';
import HeaderComponent from './HeaderComponent';
import PeopleCard from './PeopleCard';
import {normalize} from '../../../../utils/Responsive';
import PeopleDetails from './PeopleDetails';

const ANIMATION_DURATION = 1000;
const TRANSITION_VALUE = 0.001;
const NATIVE_DRIVER = true;

class StarWars extends React.Component {
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
    this.setState({data: people});
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

  // reverseAnimation = () => {
  //   this.setState(
  //     {
  //       startTransition: true,
  //       transitionCompleted: false,
  //       isAnimating: true,
  //     },
  //     () => {
  //       Animated.timing(this.state.animatedValue, {
  //         toValue: 0,
  //         duration: ANIMATION_DURATION,
  //         useNativeDriver: NATIVE_DRIVER,
  //       }).start(() => {
  //         this.setState({
  //           transitionCompleted: true,
  //           isAnimating: false,
  //           shouldShowInfo: false,
  //         });
  //       });
  //     },
  //   );
  // };

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

  cardsOpacity = ({person, index, layout}) => {
    console.log({person, index, layout});
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

  render() {
    const {
      data,
      animatedValue,
      startTransition,
      transitionCompleted,
      shouldShowInfo,
      selectedIndex,
      isAnimating,
    } = this.state;
    const transitionLayerCardStyle = this.getTransitionCardStyle();
    const opacityAndScale = animatedValue.interpolate({
      inputRange: [0, 0.1],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        {/*//////////////////////////////////////////////////////////////////*/}
        <Animated.View
          style={{
            flex: 1,
            alignSelf: 'center',
            opacity: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          }}>
          <Animated.FlatList
            ItemSeparatorComponent={() => (
              <View style={{margin: normalize(10)}} />
            )}
            ListHeaderComponent={() => (
              <HeaderComponent
                style={{
                  transform: [
                    {
                      scale: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                }}
                url={require('./Data/assets/starWarsLogo.jpg')}
              />
            )}
            data={data}
            renderItem={({item, index}) => (
              <Animated.View
                style={{
                  opacity: opacityAndScale,
                }}>
                <PeopleCard
                  onCardPress={this.cardsOpacity}
                  person={item}
                  index={index}
                  animating={animatedValue}
                  isAnimating={isAnimating}
                />
              </Animated.View>
            )}
          />
        </Animated.View>
        {/*//////////////////////////////////////////////////////////////////*/}
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
            <PeopleDetails
              index={0}
              data={data[selectedIndex]}
              animatedValue={animatedValue}
              isAnimating={isAnimating}
              onCardPress={this.reverseAnimation}
            />
          </Animated.View>
        )}

        {startTransition && !transitionCompleted && (
          <Animated.View style={transitionLayerCardStyle}>
            <PeopleCard
              // animating={animatedValue}
              index={selectedIndex}
              person={data[selectedIndex]}
            />
          </Animated.View>
        )}
      </View>
    );
  }
}
export default StarWars;
