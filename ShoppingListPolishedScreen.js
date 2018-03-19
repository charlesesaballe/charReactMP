import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import Expo, { SQLite } from 'expo';
import { FormLabel, FormInput, Button, List, ListItem, Text, Header } from 'react-native-elements';


const db = SQLite.openDatabase('shoppingdb.db');


export default class ShoppingListScreen extends React.Component {
  static navigationOptions = {title: 'Shopping List Polished'}


  constructor(props) {
    super(props);
    this.state = {product: '', amount:'', shoppinglist: []};
  }

  componentDidMount() {   
    db.transaction(tx => {
      tx.executeSql('create table if not exists shopping2 (id integer primary key not null, product text, amount text);');
    });
    this.updateList();
  }

  saveItem = () => {
    db.transaction(tx => {
        tx.executeSql('insert into shopping2 (product, amount) values (?, ?)', [this.state.product, this.state.amount]);    
      }, null, this.updateList)
  }

  updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shopping2', [], (_, { rows }) =>
        this.setState({shoppinglist: rows._array})
      ); 
    });
    
  }

  deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from shopping2 where id = ?;`, [id]);
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
    let shoppinglist = this.state.shoppinglist
    return (
      <View style={styles.container}>
        <FormLabel>PRODUCT</FormLabel>
        <FormInput placeholder='product' style={{marginTop: 10, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(product) => this.setState({product})}
          value={this.state.product}/>
        <FormLabel>AMOUNT</FormLabel>
        <FormInput placeholder='amount' style={{ marginTop: 5, marginBottom: 5,  fontSize:18, width: 200, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(amount) => this.setState({amount})}
          value={this.state.amount}/>
        <View style={{marginTop: 5, width: 300}}>      
          <Button raised icon={{name: 'save'}} title='SAVE' onPress={this.saveItem} />
        </View>
        <Text style={{marginTop: 30, marginBottom: 10, fontSize: 20}}>Shopping List</Text>
            <List style={styles.listcontainer}>
            <View style={{marginTop: 5, width: 350}}>
              {
                shoppinglist.map((item, i) => (
                    <ListItem 
                      key={i}
                      title={item.product} 
                      subtitle={item.amount}
                      rightTitle= 'bought'   
                      onPress={() => this.deleteItem(item.id)}
                    />
                  
                ))
                
              } 
            </View>
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
    alignItems: 'center',
    width: 200
  }  
});

