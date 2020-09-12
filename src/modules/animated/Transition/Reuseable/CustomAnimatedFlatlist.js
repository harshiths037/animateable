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
import { normalize } from '../../../../utils/Responsive';
import PeopleDetails from '../StarWars/PeopleDetails';
import PeopleCard from '../StarWars/PeopleCard';
import CardComponent from './CardComponent';
import CustomDetails from './CustomDetails';

const ANIMATION_DURATION = 500;
const TRANSITION_VALUE = 0.001;
const NATIVE_DRIVER = true;

class CustomAnimatedFlatlist extends React.Component {
    cardRef;
    constructor() {
        super();
        this.state = {
            shouldShowInfo: false,
            startTransition: false,
            transitionCompleted: false,
            animatedValue: new Animated.Value(0),
            selectedIndex: 0,
            selectedViewLayoutParam: { x: 0, y: 0, width: 0, height: 0 },
            isAnimating: false,
        };
    }

    backAction = () => {
        this.reverseAnimation();
        return true;
    };

    reverseAnimation = () => {
        this.setState({
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
        this.state.animatedValue.setValue(0); //set animationValue back to zero
        this.setState({
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
        const { selectedViewLayoutParam } = this.state; //layout params
        const initialPosition = selectedViewLayoutParam.y; //card's position on y axis
        const finalPosition = normalize(50);
        const top = this.state.animatedValue.interpolate({
            inputRange: [0, 1],
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
            top: 0,
            transform: [{ translateY: top }, { translateX: selectedViewLayoutParam.x }],
            opacity: opacityInterpolation,
        };
    };

    render() {
        const {
            shouldShowInfo,
            animatedValue,
            selectedIndex,
            startTransition,
            transitionCompleted,
        } = this.state;
        // const opacityAndScale = animatedValue.interpolate({
        //   inputRange: [0, 0.1],
        //   outputRange: [1, 0],
        //   extrapolate: 'clamp',
        // });
        const { data, header, style, component } = this.props;
        const transitionLayerCardStyle = this.getTransitionCardStyle();
        return (<View 
            style={{
                flex: 1,
                alignSelf: 'center',
                justifyContent: 'center',
                backgroundColor: 'black',
            }}>
            <Animated.View style={
                    {
                        opacity: animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 0],
                            extrapolate: 'clamp',
                        }),
                    }}>
                <FlatList data={data}
                    ItemSeparatorComponent={
                        () => (<View style={
                                { margin: normalize(10) }}
                        />
                        )
                    }
                    ListHeaderComponent={
                        header ?
                            React.cloneElement(header, {
                                style: {
                                    transform: [{
                                        scale: animatedValue.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [1, 0],
                                            extrapolate: 'clamp',
                                        }),
                                    }],
                        },}): () => <View style={
                    { margin: normalize(10) }}
                />
        }
        renderItem = {
                    ({ item, index }) => (<Animated.View style={
                            {
                                opacity: animatedValue.interpolate({
                                    inputRange: [0, TRANSITION_VALUE, 1],
                                    outputRange: [1, 0, 0],
                                    extrapolate: 'clamp',
                                }),
                                alignItems: 'center',
                                justifyContent: 'center',
                            }
                        } >
                        <CardComponent index={index}
                            component={component}
                            onCardPress={this.getLayout}
                            person={item}
                        />
                        </Animated.View>
            )
        }
        />
        </Animated.View>
        {shouldShowInfo && (<Animated.View style={
                                        {
                                            position: 'absolute',
                                            top: normalize(50),
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundColor: 'black',
                                            opacity: animatedValue.interpolate({
                                                inputRange: [0, TRANSITION_VALUE, 1 - TRANSITION_VALUE, 1],
                                                outputRange: [0, 0, 1, 1],
                                                // extrapolate: 'clamp',
                                            }),
                                        }
                                    } >
                                    <CardComponent index={selectedIndex}
                                        component={component}
                                        onCardPress={this.reverseAnimation}
                                        person={data[selectedIndex]}
                                    /><CustomDetails index={0}
                                        data={data[selectedIndex]}
                                        animatedValue={animatedValue}
                                    // isAnimating={isAnimating}
                                    // onCardPress={this.reverseAnimation}
                                    />
                                    </Animated.View>
                                    // </>
            )
        } { /* //transsition layer */} 
        {
                                        startTransition && !transitionCompleted && (
                                            <Animated.View style={
                                                { ...transitionLayerCardStyle }} >
                                            <CardComponent index={selectedIndex}
                                                component={component}
                                                person={data[selectedIndex]}
                                            />
                                            </Animated.View>
            )
        } 
        </View>
    );
}
}

export default CustomAnimatedFlatlist;