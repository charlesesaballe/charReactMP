import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, Button, Alert, Picker} from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class EuroConverter extends React.Component {
    static navigationOptions = {title: 'EuroConverter'};

    constructor(){ 
        super(); 
        this.state={ 
          PickerValue: '', 
          conversionRates:[],
          inputValue: '',
          euroValue: ''
        }
      }
    
      componentDidMount = () => {
        const url = "https://api.fixer.io/latest";
        fetch(url)
          .then((response) =>  response.json())
          .then((responseJson) => {
            this.setState({
              conversionRates: responseJson.rates
            });
          });
      }
     
      GetSelectedPickerItem=()=>{
        const convertedValue = (this.state.inputValue / this.state.PickerValue).toFixed(2);
        this.setState({
          euroValue: convertedValue
        });
      }
     
     render() {
       return (  
         <View style={styles.container}>
          <Image style={styles.imageStyle} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpJJqjk-pUdhQixRxqJ8OJYXl5pMBso4YzdJyb9y0-tLgV1Pzq'}}/>
          <Text style={styles.textStyle}>{this.state.euroValue} €</Text>
          <View style={{flexDirection:'row', marginTop: 20}}>
            
            <TextInput style={styles.textInput} keyboardType="numeric" onChangeText={(inputValue)=> this.setState({inputValue})}/>  
            
            <Picker style={styles.pickerStyle}
                selectedValue={this.state.PickerValue} 
                onValueChange={(itemValue) => this.setState({PickerValue: itemValue})} >
                <Picker.Item label="DKK" value={this.state.conversionRates.DKK} />
                <Picker.Item label="GBP" value={this.state.conversionRates.GBP} />
                <Picker.Item label="JPY" value={this.state.conversionRates.JPY} />
                <Picker.Item label="NOK" value={this.state.conversionRates.NOK} />
                <Picker.Item label="PHP" value={this.state.conversionRates.PHP} />
                <Picker.Item label="SEK" value={this.state.conversionRates.SEK} />
                <Picker.Item label="USD" value={this.state.conversionRates.USD} /> 
            </Picker>
            </View>
            <Button title="CONVERT" onPress={ this.GetSelectedPickerItem } />
                 
         </View>
       );
     }
    }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        width: 100,
        height: 40,
        fontSize: 18,
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 18,
        width: 200,
        borderColor: 'gray',
        borderWidth: 2,
        marginTop: 20
    },
    imageStyle: {
        width: 100, 
        height: 50
    },
    pickerStyle: {
        width: 100,
        height: 40,
        borderWidth: 2,
        borderColor: 'gray',
    },
    buttonView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
  });