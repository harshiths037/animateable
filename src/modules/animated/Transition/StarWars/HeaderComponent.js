import React from 'react';
import {
  View,
  Animated,
  Text,
  Image,
  useWindowDimensions,
  FlatList,
} from 'react-native';

const HeaderComponent = (props) => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const {url, style} = props;
  console.warn(props);
  return (
    <Animated.Image
      source={url}
      style={{
        width: windowWidth,
        height: windowHeight * 0.3,
        ...style,
      }}
    />
  );
};
export default HeaderComponent;
