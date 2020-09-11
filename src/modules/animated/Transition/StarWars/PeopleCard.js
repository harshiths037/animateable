/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import {normalize} from '../../../../utils/Responsive';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

class PeopleCard extends React.Component {
  render() {
    const {person, onCardPress, index, isAnimating, animating} = this.props;
    console.log('isAnimating', isAnimating);
    return (
      <View
        // onPress={() => {
        //   if (this.cardRef) {
        //     //Use ref callbacks to measure React component size

        //     this.cardRef.measure((x, y, width, height, pageX, pageY) => {
        //       const layout = {x: pageX, y: pageY, width, height};
        //       if (onCardPress) {
        //         onCardPress({person, index, layout});
        //       }
        //     });
        //   }
        // }}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          alignSelf: 'center',
          // opacity: isAnimating === true || undefined ? 0 : 1,
          backgroundColor: 'white',
          height: windowHeight * 0.15,
          borderRadius: normalize(5),
          width: windowWidth * 0.9,
        }}
        ref={(ref) => {
          this.cardRef = ref;
        }}>
        <Image
          source={person.url}
          style={{
            width: windowWidth * 0.2,
            height: windowHeight * 0.1,
            borderRadius: normalize(windowWidth),
          }}
          resizeMode={'contain'}
          // resizeMethod={'resize'}
        />
        <View
          style={{
            width: windowWidth * 0.5,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: normalize(20)}}>{person.name}</Text>
        </View>
      </View>
    );
  }
}
export default PeopleCard;
