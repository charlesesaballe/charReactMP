import React from 'react';
import {StyleSheet, Text, TextInput, View, Button, FlatList} from 'react-native';
import Expo, { SQLite } from 'expo';


const db = SQLite.openDatabase('shoppingdb.db');

export default class ShoppingListScreen extends React.Component {
  static navigationOptions = {title: 'ShoppingListDB'};

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
        <TextInput placeholder='product' style={{marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(product) => this.setState({product})}
          value={this.state.product}/>
        <TextInput placeholder='amount' style={{ marginTop: 5, marginBottom: 5,  fontSize:18, width: 200, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(amount) => this.setState({amount})}
          value={this.state.amount}/>      
        <Button onPress={this.saveItem} title="Save" />
        <Text style={{marginTop: 30, fontSize: 20}}>Shopping List</Text>
        
        <FlatList 
          style={{marginLeft : "5%"}}
          keyExtractor={item => item.id} 
          renderItem={({item}) => <View style={styles.listcontainer}><Text style={{fontSize: 18}}>{item.product}, {item.amount}   </Text>
          <Text style={{fontSize: 18, color: '#0000ff'}} onPress={() => this.deleteItem(item.id)}>bought</Text></View>} data={this.state.shoppinglist} ItemSeparatorComponent={this.listSeparator} 
        />      
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

