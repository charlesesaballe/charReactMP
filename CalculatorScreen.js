import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, FlatList } from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class CalculatorScreen extends React.Component {
  static navigationOptions = {title: 'Calculator'};

  constructor(props) {
    super(props);
    this.state = {firstNumber: '', secondNumber: '', result: 0}
  }

  buttonAdd = () => {
    this.setState({result: parseInt(this.state.firstNumber) + parseInt(this.state.secondNumber)});
  }

  buttonSubtract = () => {
    this.setState({result: parseInt(this.state.firstNumber) - parseInt(this.state.secondNumber)});
  }
  
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.inputView}>
          <Text>Result:  {this.state.result} </Text>
          <TextInput keyboardType="numeric" style={styles.textbox}
            onChangeText={(firstNumber) => this.setState({firstNumber})}
            value={this.state.firstNumber}
          />
          <TextInput keyboardType="numeric" style={styles.textbox}
            onChangeText={(secondNumber) => this.setState({secondNumber})}
            value={this.state.secondNumber}
          />
        </View>

        <View style={styles.buttonView}>
          <View>
            <Button onPress={this.buttonAdd} title="+" />
          </View>
          <Text>    </Text>
          <View>
            <Button onPress={this.buttonSubtract} title="-" />
          </View>
        </View>

        <View style={styles.historyView}>
          <Text></Text>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputView: {
    flex:2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textbox: {
    width: 200,
    borderColor: 'gray',
    borderWidth: 2,
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  historyView: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});

