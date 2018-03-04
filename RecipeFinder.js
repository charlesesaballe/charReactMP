import React from 'react';
import {Alert, Button, TextInput, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class RecipeFinder extends React.Component {
    static navigationOptions = {title: 'RecipeFinder'};

    constructor(props) {
        super(props);
        this.state = {recipe: [], ingredient: ''};
      }

    getRecipe = () => {
    const url = 'http://www.recipepuppy.com/api/?i=' + this.state.ingredient;
    fetch(url)
        .then((response) => response.json())
        .then((responseJson) => { 
        this.setState({jobs: responseJson});
        })
        .catch((error) => { 
        Alert.alert(error); 
        });    
    }

    listSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "80%",
              backgroundColor: "#CED0CE",
              marginLeft: "10%"
            }}
          />
        );
      };
    
      render() {
        return (
          <View style={styles.container}>
            <StatusBar hidden={true} />
            <FlatList 
              style={{marginLeft : "5%"}}
              keyExtractor={item => item.title} 
              renderItem={({item}) => 
                <Text style={styles.textStyle}>{item.title}</Text>} 
                
                data={this.state.recipe} 
            
                ItemSeparatorComponent={this.listSeparator} /> 
                
                <TextInput style={styles.textInput} placeholder='location' onChangeText={(ingredient) => this.setState({ingredient})} />
                <Button title="Find" onPress={this.getRecipe} />
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
    textInput: {
        fontSize: 18, 
        width: 200
    },
    textStyle: {
        fontSize: 18,
        width: 200,
        borderColor: 'gray',
        borderWidth: 2,
    },
    buttonView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
  });