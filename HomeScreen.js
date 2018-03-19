import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';

export default class CalculatorScreen extends React.Component {
    static navigationOptions = {title: 'Home'};

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>

                    <View style={{marginTop: 5, width: 250}}>
                        <Button onPress={() => navigate('Calculator')} title="Calculator" buttonStyle={styles.buttonViewStyle} />
                   
                        <Button onPress={() => navigate('CalculatorModified')} title="Calculator Modified" buttonStyle={styles.buttonViewStyle} />

                        <Button onPress={() => navigate('ShoppingList')} title="Shopping List" buttonStyle={styles.buttonViewStyle} />

                        <Button onPress={() => navigate('GuessingGame')} title="Guessing Game" buttonStyle={styles.buttonViewStyle} />

                        <Button onPress={() => navigate('RecipeFinder')} title="Recipe Finder" buttonStyle={styles.buttonViewStyle} />

                        <Button onPress={() => navigate('EuroConverter')} title="Euro Converter" buttonStyle={styles.buttonViewStyle} />

                        <Button onPress={() => navigate('FindAddress')} title="Find Address" buttonStyle={styles.buttonViewStyle} />

                        <Button onPress={() => navigate('FindRestaurant')} title="Find Restaurant" buttonStyle={styles.buttonViewStyle} />

                        <Button onPress={() => navigate('Location')} title="Current Location" buttonStyle={styles.buttonViewStyle} />

                        <Button onPress={() => navigate('ShoppingListDB')} title="Shopping List DB" buttonStyle={styles.buttonViewStyle} />

                        <Button onPress={() => navigate('ShoppingListPolished')} title="Shopping List Polished" buttonStyle={styles.buttonViewStyle} />
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
        marginTop: 10
    },
    buttonViewStyle:{
        backgroundColor: "rgba(92, 99,216, 1)",
        height: 40,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5,
        marginTop: 5
    }
  });
  