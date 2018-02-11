import React from 'react';
import {Alert, Button, TextInput, StyleSheet, Text, View } from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class App extends React.Component {
    static navigationOptions = {title: 'GuessingGame'};

  constructor(props) {
    super(props);
    this.state= {number:'', randomNumber: Math.floor(Math.random() * 100) + 1, counter: 0, result: 'Guess a number between 1-100' }
  }

  
    guessNumber = () => {
    const guess = parseInt(this.state.number)

      if(guess < this.state.randomNumber) {
        this.setState(
          {result: 'Your guess ' + guess + ' is too low.', counter: this.state.counter + 1}
        );
      } else if(guess > this.state.randomNumber) {
        this.setState(
          {result: 'Your guess ' + guess + ' is too high.', counter: this.state.counter + 1}
        );
      } else {
          Alert.alert('You guessed the number in ' + (this.state.counter + 1) + ' guesses.');
      }
    };

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.result}</Text>

        <TextInput keyboardType='numeric' style={styles.textbox}
          onChangeText={(number) => this.setState({number})}
          value={this.state.number}/>

        <Button onPress={this.guessNumber} title="MAKE A GUESS" />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textbox: {
    width: 200,
    borderColor: 'gray',
    borderWidth: 2,
  }
});