import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class CalculatorScreen extends React.Component {
    static navigationOptions = {title: 'Home'};

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.buttonView}>
                    <View>
                        <Button onPress={() => navigate('Calculator')} title="Calculator" />
                    </View>
                    
                    <View>
                        <Button onPress={() => navigate('CalculatorModified')} title="Calculator Modified" />
                    </View>
                    
                    <View>
                        <Button onPress={() => navigate('ShoppingList')} title="Shopping List" />
                    </View>

                    <View>
                        <Button onPress={() => navigate('GuessingGame')} title="Guessing Game" />
                    </View>

                    <View>
                        <Button onPress={() => navigate('RecipeFinder')} title="Recipe Finder" />
                    </View>
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
      alignItems: 'center',
    },
    inputView: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: 20,
    },
    textbox: {
      width: 200,
      borderColor: 'gray',
      borderWidth: 2,
    },
    buttonView: {
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: 50,
      width: 500,
    }
  });
  