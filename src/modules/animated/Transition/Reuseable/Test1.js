/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import CustomAnimatedFlatlist from './CustomAnimatedFlatlist';
import people from '../StarWars/Data/people';
import PeopleCard from '../StarWars/PeopleCard';
import HeaderComponent from '../StarWars/HeaderComponent';

class Test1 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CustomAnimatedFlatlist
          header={
            <HeaderComponent
              url={require('../StarWars/Data/assets/starWarsLogo.jpg')}
            />
          }
          data={people}
          component={<PeopleCard person={people[0]} />}
        />
      </View>
    );
  }
}

export default Test1;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
