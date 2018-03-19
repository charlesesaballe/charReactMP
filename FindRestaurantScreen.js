import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, Button, Alert, Dimensions} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {MapView, Marker} from 'expo';

const {height, width} = Dimensions.get('window');

export default class FindRestaurantScreen extends React.Component {
    static navigationOptions = {title: 'FindRestaurant'};

    constructor(props){
        super(props);
        this.state= {
            inputAddress: '',
            region: {
              latitude: 60.200690,
              longitude: 24.934302,
              latitudeDelta: 0.0322,
              longitudeDelta: 0.0221
            },
            markerDescription: []    
        }
    };

    onRegionChange(region) {
        console.log('onRegionChange', region);
    }

    findRestaurant = () => {
        const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.inputAddress + "&key=AIzaSyB6STh_DDnSirjwaAKMET4N5ZFIUzy2fVI";
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
              }
            });
            const nearbyURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitudeResponse + ',' + longitudeResponse + '&radius=500&type=restaurant&key=AIzaSyCwhe6-K6QFjASLty1r5ezisMLrMGVOpHc';
            fetch(nearbyURL)
            .then((responseNearby) => responseNearby.json())
            .then((responseNearbyJson) => {
                this.setState({
                    markerDescription: responseNearbyJson.results
                })
            })
          })


          .catch((error) => {
            Alert.alert(JSON.stringify(error));
          });
    }

    

    render() {
    
        return (
          <View style={styles.container}>
            <View style={styles.input}>
                <TextInput style={styles.textInput} value={this.state.inputAddress} onChangeText={(inputAddress) => this.setState({inputAddress})}/>
                <Button title="Show" onPress={this.findRestaurant}/>
            </View>
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

                {this.state.markerDescription.map(marker => (
                    <MapView.Marker
                        key = {marker["id"]}
                        coordinate={{
                            latitude: marker.geometry.location.lat,
                            longitude: marker.geometry.location.lng
                        }}
                        title={marker.name}
                        description={marker.vicinity}
                    />
                ))}
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
        width: 200,
        borderColor: 'blue',
        borderWidth: 2,
        marginTop: 20
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