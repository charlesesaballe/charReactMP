import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, FlatList } from 'react-native';
import {StackNavigator} from 'react-navigation';
import HomeScreen from './HomeScreen';
import CalculatorScreen from './CalculatorScreen';
import CalculatorModifiedScreen from './CalculatorModifiedScreen';
import ShoppingListScreen from './ShoppingListScreen';
import GuessingGameScreen from './GuessingGameScreen';
import RecipeFinderScreen from './RecipeFinder';
import EuroConverterScreen from './EuroConverterScreen';

const MyApp = StackNavigator ({
  Home: {screen: HomeScreen},
  Calculator: {screen: CalculatorScreen},
  CalculatorModified: {screen: CalculatorModifiedScreen},
  ShoppingList: {screen: ShoppingListScreen},
  GuessingGame: {screen: GuessingGameScreen},
  RecipeFinder: {screen: RecipeFinderScreen},
  EuroConverter: {screen: EuroConverterScreen}
});

export default class App extends React.Component {

  render() {
    return <MyApp/>;
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

