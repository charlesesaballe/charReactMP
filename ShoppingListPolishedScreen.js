import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import Expo, { SQLite } from 'expo';
import { FormLabel, FormInput, Button, List, ListItem, Text } from 'react-native-elements';


const db = SQLite.openDatabase('shoppingdb.db');

export default class ShoppingListScreen extends React.Component {
  static navigationOptions = {title: 'ShoppingListPolished'};

  constructor(props) {
    super(props);
    this.state = {product: '', amount:'', shoppinglist: []};
  }

  componentDidMount() {   
    db.transaction(tx => {
      tx.executeSql('create table if not exists shopping (id integer primary key not null, product text, amount text);');
    });
    this.updateList();
  }

  saveItem = () => {
    db.transaction(tx => {
        tx.executeSql('insert into shopping (product, amount) values (?, ?)', [this.state.product, this.state.amount]);    
      }, null, this.updateList)
  }

  updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shopping', [], (_, { rows }) =>
        this.setState({shoppinglist: rows._array})
      ); 
    });
    
  }

  deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from shopping where id = ?;`, [id]);
      }, null, this.updateList
    )    
  }

  listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };

  render() {
    return (  
      <View style={styles.container}>
        <FormLabel>PRODUCT</FormLabel>
        <FormInput placeholder='product' style={{marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(product) => this.setState({product})}
          value={this.state.product}/>
        <FormLabel>AMOUNT</FormLabel>
        <FormInput placeholder='amount' style={{ marginTop: 5, marginBottom: 5,  fontSize:18, width: 200, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(amount) => this.setState({amount})}
          value={this.state.amount}/>      
        <Button title='SAVE' onPress={this.saveItem} />
        <Text style={{marginTop: 30, fontSize: 20}}>Shopping List</Text>
            <List>
              {
                this.state.shoppinglist.map((item, i) => (
                  <ListItem
                    key={i}
                    title='hello' 
                    subtitle={item.amount}   
                    onPress={() => this.deleteItem(item.id)} 
                    rightTitle= 'bought'
                  />
                ))
              }
            </List> 
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
  }  
});

