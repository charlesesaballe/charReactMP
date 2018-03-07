import React from 'react';
import {Alert, Button, TextInput, StyleSheet, Text, View, Image, FlatList } from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class RecipeFinder extends React.Component {
    static navigationOptions = {title: 'RecipeFinder'};

    constructor(props) {
        super(props);
        this.state = {recipes: [], ingredient: ''};
      }

    findRecipe = () => {
      const url = "http://www.recipepuppy.com/api/?i=" + this.state.ingredient;
    fetch(url)
        .then((response) => response.json())
        .then((responseJson) => { 
        this.setState({recipes: responseJson.results});
        })
        .catch((error) => { 
        Alert.alert(error); 
        });    
    }

    listSeparator = () => {
      return (
        <View style={{
          height: 1,
          width: "90%",
          backgroundColor: "#42bff4"
        }}/>     
      );
    }
    
      render() {
        return (
          <View style={styles.container}>

            <FlatList 
              keyExtractor={item => item.title} 
              renderItem={({item}) =>
                <View> 
                  <Text style={styles.textStyle} key={item.id}>{item.title}</Text>
                  <Image style={styles.imageStyle} source={{uri: item.thumbnail}}/>
                </View>
              } 
                
                data={this.state.recipes} 
            
                ItemSeparatorComponent={this.listSeparator} 
            />     
                <TextInput style={styles.textInput} onChangeText={(ingredient) => this.setState({ingredient})} value={this.state.ingredient} />
                <Button title="Find" onPress={this.findRecipe} />
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
        marginTop: 15
    },
    textInput: {
        fontSize: 18, 
        width: 200,
        height: 30,
        marginBottom: 5,
        marginTop: 5,
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 18,
        width: 200,
    },
    imageStyle: {
        width: 50, 
        height: 50
    },
    buttonView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
  });