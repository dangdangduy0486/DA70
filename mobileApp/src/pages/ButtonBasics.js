import React, {Component} from 'react';
import {
  Button,
  StyleSheet,

  View,
  Text,
  TouchableWithoutFeedback,
  Animated
} from 'react-native';
import { TouchableOpacity } from 'react-native-' 

export default class ButtonBasics extends Component {
  _onPressButton = () => {
    alert('You tapped the button!');
  };
  closeDrawer = () => {
    console.log('does not work');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button onPress={this._onPressButton} title="Press Me" />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._onPressButton}
            title="Press Me"
            color="#841584"
          />
        </View>
        <View style={styles.alternativeLayoutButtonContainer}>
          <Button
            onPress={this._onPressButton.bind(this)}
            title="This looks great!"
          />
          <Button onPress={this._onPressButton} title="OK!" color="#841584" />
        </View>
        <View>
          <TouchableOpacity onPress={this._onPressButton}>
            <Text> Touch Here </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{backgroundColor: 'red', padding: 20}}
          onPress={() => {
            console.log('does not work');
          }}>
          <Text>X</Text>
        </TouchableOpacity>
        <TouchableWithoutFeedback onPressIn={this.closeDrawer}>
          <Animated.View
            pointerEvents={'none'}
            title='Y'
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20,
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
