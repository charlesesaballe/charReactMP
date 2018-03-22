import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import Expo, { SQLite } from 'expo';
import { FormLabel, FormInput, Button, List, ListItem, Text, Header } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';


const db = SQLite.openDatabase('addressdb.db');


export default class MyPlacesScreen extends React.Component {
  static navigationOptions = {title: 'My Places'}


  constructor(props) {
    super(props);
    this.state = {address: '', addresslist: []};
  }

  componentDidMount() {   
    db.transaction(tx => {
      tx.executeSql('create table if not exists addresses (id integer primary key not null, address text);');
    });
    this.updateList();
  }

  saveItem = () => {
    db.transaction(tx => {
        tx.executeSql('insert into addresses (address) values (?)', [this.state.address]);    
      }, null, this.updateList)
  }

  updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from addresses', [], (_, { rows }) =>
        this.setState({addresslist: rows._array})
      ); 
    });
    
  }

  deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from addresses where id = ?;`, [id]);
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
    let addresslist = this.state.addresslist;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <FormLabel>PLACEFINDER</FormLabel>
        <FormInput placeholder='Type in Address' style={{marginTop: 10, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(address) => this.setState({address})}
          value={this.state.address}/>

        <View style={{marginTop: 5, width: 300}}>      
          <Button raised icon={{name: 'save'}} title='SAVE' onPress={this.saveItem} />
        </View>
        <Text style={{marginTop: 30, marginBottom: 10, fontSize: 20}}>Saved Addresses</Text>
            <List style={styles.listcontainer}>
            <View style={{marginTop: 5, width: 350}}>
              {
                addresslist.map((item, i) => (
                    <ListItem 
                      key={i}
                      title={item.address} 
                      rightTitle= 'show on map'   
                      onLongPress={() => this.deleteItem(item.id)}
                      onPress={() => navigate('MyPlacesMap', {itemAddress: item.address})}
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

