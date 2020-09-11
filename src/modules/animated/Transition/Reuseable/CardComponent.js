/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {normalize} from '../../../../utils/Responsive';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

class CardComponent extends React.Component {
  cardRef;
  render() {
    console.log('cardRef', this.cardRef);
    const {person, onCardPress, index, isAnimating, animating} = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          if (this.cardRef) {
            this.cardRef.measure((x, y, width, height, pageX, pageY) => {
              const layout = {x: pageX, y: pageY, width, height};
              if (onCardPress) {
                onCardPress(person, index, layout);
              }
            });
          }
        }}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          alignSelf: 'center',
          // backgroundColor: 'red',
          height: windowHeight * 0.15,
          borderRadius: normalize(5),
          width: windowWidth * 0.9,
        }}
        ref={(ref) => {
          this.cardRef = ref;
        }}>
        {React.cloneElement(this.props.component, {
          person: person,
        })}
      </TouchableOpacity>
    );
  }
}
export default CardComponent;
