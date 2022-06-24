import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
} from 'react-native';
import MapView from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
const latitudeDelta = 0.03;
const longitudeDelta = 0.025;
export default class LocationPickerDemo extends React.Component {
  state = {
    region: {
      latitudeDelta,
      longitudeDelta,
      latitude: -1.286389,
      longitude: 36.817223,
    },
    listViewDisplayed: true,
    address: '',
    showAddress: false,
    search: '',
    currentLat: '',
    currentLng: '',
    forceRefresh: 0,
  };

  goToInitialLocation = region => {
    let initialRegion = Object.assign({}, region);
    initialRegion['latitudeDelta'] = 0.005;
    initialRegion['longitudeDelta'] = 0.005;
    this.mapView.animateToRegion(initialRegion, 2000);
  };

  onRegionChange = region => {
    this.setState(
      {
        region: region,
        forceRefresh: Math.floor(Math.random() * 100),
      },
      this.getCurrentAddress, //callback
    );
  };
  // componentWillMount() {
  //   this.getAddress();
  // }

  getAddress() {
    //function to get address using current lat and lng
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        this.state.region.latitude +
        ',' +
        this.state.region.longitude +
        '&key=' +
        'AIzaSyDvar1cepuiI2cvd3GDkQvjLvsicrr5EY8',
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(
          'ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson),
        );

        this.setState({
          address: JSON.stringify(
            responseJson.results[0].formatted_address,
          ).replace(/"/g, ''),
        });
      })
      .catch(err => {
        console.log(err);
        return;
      });
  }

  render() {
    return (
      <View style={styles.map}>
        <MapView style={styles.map} initialRegion={this.state.region} />
        <View style={styles.markerFixed}>
          <Image
            style={styles.marker}
            source={{
              uri: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png',
            }}
          />
        </View>

        {/* <KeyboardAvoidingView style={styles.footer}>
          <View style={{flexDirection: 'row', margin: 10}}>
            <Text style={styles.addressText}>Address</Text>
          </View>
          <TextInput
            multiline={true}
            clearButtonMode="while-editing"
            style={{
              marginBottom: 5,
              width: '90%',
              minHeight: 70,
              alignSelf: 'center',
              borderColor: 'lightgrey',
              borderWidth: 1.5,
              fontSize: 12,
              borderRadius: 5,
              flex: 0.5,
              alignContent: 'flex-start',
              textAlignVertical: 'top',
              fontFamily: 'Calibri',
            }}
            onChangeText={text => this.setState({address: text})}
            value={this.state.address}
          />
          <TouchableOpacity
            onPress={() => {}}
            style={{
              width: '30%',
              alignSelf: 'center',
              alignItems: 'center',
              backgroundColor: 'blue',
              borderRadius: 16.5,
              shadowColor: 'rgba(0,0,0, .4)', // IOS
              shadowOffset: {height: 1, width: 1}, // IOS
              shadowOpacity: 1, // IOS
              shadowRadius: 1, //IOS
              elevation: 2, // Android
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Calibri',
                fontSize: 12,
                paddingVertical: 4,
              }}>
              SAVE
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%',
  },
  marker: {
    height: 40,
    width: 35,
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%',
  },
  addressText: {
    color: 'black',
    margin: 3,
    fontFamily: 'Calibri',
  },
  footer: {
    backgroundColor: 'white',
    bottom: 0,
    position: 'absolute',
    width: '100%',
    height: '30%',
  },
});
