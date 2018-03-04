import React from 'react';
import {Alert, Button, TextInput, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class App extends React.Component {
    static navigationOptions = {title: 'GuessingGame'};

  constructor(props) {
    super(props);
    this.state= {
      number:'', 
      randomNumber: Math.floor(Math.random() * 100) + 1, 
      guessCounter: 0, 
      result: 'Guess a number between 1-100', 
      highscore: '' }
  }

  
  guessNumber = () => {
    const guess = parseInt(this.state.number);
    this.setState({
      guessCounter: this.state.guessCounter + 1
    })
  
    if(guess < this.state.randomNumber) {
      this.setState(
        {result: 'Your guess ' + guess + ' is too low.'}
      );
    } else if(guess > this.state.randomNumber) {
      this.setState(
        {result: 'Your guess ' + guess + ' is too high.'}
      );
    } else {
        Alert.alert('You guessed the number in ' + (this.state.guessCounter + 1) + ' guesses.');
        this.setState({
          guessCounter: 0, 
          randomNumber: Math.floor(Math.random() * 100) + 1, 
        });
        this.compareScores();
    }
  };

  compareScores = () => {
    if (this.state.highscore == '') {
      this.setState({highscore: JSON.stringify(this.state.guessCounter + 1)});
    } else if (this.state.guessCounter + 1 < this.state.highscore) {
      this.setState({highscore: JSON.stringify(this.state.guessCounter + 1)});
      
    }
    this.saveHighest();
    this.readHighest();
  }

  saveHighest = async () => {
    try {
      await AsyncStorage.setItem('highest', JSON.stringify(this.state.highscore));
    } catch (error) {
      Alert.alert('Error saving data');
    }
  }

  readHighest = async () => {
    try {
      let highestscore = await AsyncStorage.getItem('highest');
      this.setState({highscore: this.state.highscore});
    } catch (error) {
      Alert.alert('Error reading data');
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <Text>{this.state.result}</Text>

        <TextInput keyboardType='numeric' style={styles.textbox}
          onChangeText={(number) => this.setState({number})}
          value={this.state.number}/>

        <Button onPress={this.guessNumber} title="MAKE A GUESS" />

        <Text>Highscore:  {this.state.highscore} guesses.</Text>

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