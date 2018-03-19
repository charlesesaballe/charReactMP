import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, Dimensions, Platform} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {MapView, Marker, Constants, Location, Permissions} from 'expo';

const {height, width} = Dimensions.get('window');

export default class LocationScreen extends React.Component {
    static navigationOptions = {title: 'Location'};

    state = {
        location: null,
        errorMessage: null,
        region: null,
        coordinate: {
          latitude: 0,
          longitude: 0
        }
      } 
    
    componentDidMount() {    
        this.getLocation();    
    }

    getLocation = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        } else {
            let location = await Location.getCurrentPositionAsync({});
            this.setState({ location });
            this.setState({
                region: {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.0322,
                  longitudeDelta: 0.0221
               },
                coordinate: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
               }
      }); 
        }

    }

    render() {
        
        let text1 = 'Waiting...'; 
        let text2;  

        if (this.state.errorMessage) {
            text1 = this.state.errorMessage;
        } else if (this.state.location) {
            text1 = '';
            text2 = (
                <MapView style={styles.map}
                  region={this.state.region}
                >
                  <MapView.Marker
                    coordinate={this.state.coordinate}
                    description = "Current location"
                  />
                </MapView>
        );
        }

        return (
            <View style={styles.container}>
                {text2}
                <Text style={styles.textStyle}>{text1}</Text>
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
        width: 200,
        height: 30,
        borderColor: 'darkslateblue',
        borderWidth: 2,
    },
    map: {
        flex: 9,
        width,
        height
    },
    input: {
        flex: 1,
        flexDirection:"row", 
        justifyContent: "center", 
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 18,
        margin: 24,
        textAlign: 'center'
    },
    imageStyle: {
        width: 100, 
        height: 50
    },
    pickerStyle: {
        width: 100,
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