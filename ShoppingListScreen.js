import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, FlatList } from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class ShoppingListScreen extends React.Component {
  static navigationOptions = {title: 'ShoppingList'};

  constructor(props) {
    super(props);
    this.state = {shoppingItem: '', data: []}
  }

    buttonAdd = () => {
    this.setState({data: [...this.state.data, {key: [this.state.shoppingItem]}]});
    }

    buttonClear = () => {
    this.setState({data: []});
    }
    
    render() {
    return (
        <View style={styles.container}>

        <View style={styles.inputView}>
            <TextInput style={styles.textbox}
            onChangeText={(shoppingItem) => this.setState({shoppingItem})}
            value={this.state.shoppingItem}
            />
        </View>

        <View style={styles.buttonView}>
            <View>
            <Button onPress={this.buttonAdd} title="Add" />
            </View>
            <Text>    </Text>
            <View>
            <Button onPress={this.buttonClear} title="Clear" />
            </View>
        </View>

        <View style={styles.historyView}>
            <Text style={{color: 'blue', fontWeight: 'bold'}}>Shopping List</Text>
            <FlatList data={this.state.data}
            renderItem={({item}) =>
                <Text>{item.key}</Text>
            }
            />
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

