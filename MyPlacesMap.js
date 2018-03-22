import React, { Component } from 'react';
import { StyleSheet, View, Alert, Dimensions, Platform} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {MapView, Marker, Constants, Location, Permissions} from 'expo';

const {height, width} = Dimensions.get('window');


export default class MyPlacesMap extends React.Component {
    static navigationOptions = {title: 'Map'};

    constructor(props){
        super(props);
        this.state= {
            region: {
              latitude: 60.200690,
              longitude: 24.934302,
              latitudeDelta: 0.0322,
              longitudeDelta: 0.0221
            },
            coordinate: {
                latitude: 0,
                longitude: 0
            }    
        }
    };
    
    onRegionChange(region) {
        console.log('onRegionChange', region);
    }


    componentDidMount = () => {
        const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + this.props.navigation.state.params.itemAddress + "&key=AIzaSyB6STh_DDnSirjwaAKMET4N5ZFIUzy2fVI";
        fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
            let latitudeResponse = responseJson.results[0].geometry.location.lat;
            let longitudeResponse = responseJson.results[0].geometry.location.lng;
            this.setState({          
              region: {
                latitude: latitudeResponse,
                longitude: longitudeResponse,
                latitudeDelta: 0.0322,
                longitudeDelta: 0.0221
              },
              coordinate: {
                latitude: latitudeResponse,
                longitude: longitudeResponse
              }
            });
          })
          .catch((error) => {
            Alert.alert(JSON.stringify(error));
          });
    
          return 
    }

    render() {
    
        return (
          <View style={styles.container}>
            <MapView style={styles.map}          
                region={{
                    latitude: this.state.region.latitude,
                    longitude: this.state.region.longitude,
                    latitudeDelta: this.state.region.latitudeDelta,
                    longitudeDelta: this.state.region.longitudeDelta
              }}
              onRegionChange={this.onRegionChange}
              onRegionChangeComplete={(region)=>this.setState({region})}
            >
            <MapView.Marker
                coordinate={{
                    latitude: this.state.coordinate.latitude,
                    longitude: this.state.coordinate.longitude
                }}
            />
            </MapView>       
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