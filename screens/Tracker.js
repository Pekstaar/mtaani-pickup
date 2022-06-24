import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import MapView from 'react-native-maps';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontiso from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Actionsheet, Box, Button, Center, Icon, Text} from 'native-base';

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
    showActionSheet: false,
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
  componentDidMount() {
    this.getAddress();
  }

  hideActionSheet = () => {
    this.setState({
      showActionSheet: false,
    });
  };

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

  handleActionSheet = () => {
    this.setState({
      showActionSheet: true,
    });
  };

  render() {
    return (
      <View style={styles.map}>
        <MapView style={styles.map} initialRegion={this.state.region} />
        <View style={styles.markerFixed}>
          {/* <Image
            style={styles.marker}
            source={{
              uri: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png',
            }}
          /> */}
        </View>

        <Button
          onPress={this.handleActionSheet}
          bg={'primary'}
          p={4}
          position={'absolute'}
          bottom={3}
          shadow={'5'}
          right={5}
          borderRadius={'full'}>
          <Icon color={'gray.800'} size={7} as={<Entypo name="location" />} />
        </Button>

        <SheetModal
          isOpen={this?.state.showActionSheet}
          onClose={this.hideActionSheet}
        />
      </View>
    );
  }
}

const SheetModal = ({isOpen, onClose}) => (
  <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
    <Actionsheet.Content py={5}>
      <Actionsheet.Item
        py={0}
        startIcon={
          <Center w={10} h={10} borderRadius={'full'} bg={'primary'}>
            <Icon as={<Fontiso name="shopping-package" />} color="black" />
          </Center>
        }>
        <Text fontWeight={'medium'} fontSize={'xs'} my={'auto'} color={'black'}>
          Agent gives package to rider
        </Text>
      </Actionsheet.Item>

      <Actionsheet.Item py={0}>
        <DashedLine
          // position={'absolute'}
          ml={'18px'}
          left={0}
          zIndex={'5'}
        />
      </Actionsheet.Item>

      <Actionsheet.Item
        py={0}
        startIcon={
          <Center w={10} h={10} borderRadius={'full'} bg={'primary'}>
            <Icon
              as={<Ionicons name="cube-outline" />}
              size={5}
              color="black"
              my={'auto'}
            />
          </Center>
        }>
        <Text fontWeight={'medium'} fontSize={'xs'} my={'auto'} color={'black'}>
          Rider confirms package collection
        </Text>
      </Actionsheet.Item>

      <Actionsheet.Item py={0}>
        <DashedLine
          // position={'absolute'}
          ml={'18px'}
          left={0}
          zIndex={'5'}
        />
      </Actionsheet.Item>

      <Actionsheet.Item
        py={0}
        startIcon={
          <Center w={10} h={10} borderRadius={'full'} bg={'muted.300'}>
            <Icon
              as={<Ionicons name="cube-outline" />}
              size={5}
              color="black"
              my={'auto'}
            />
          </Center>
        }>
        <Text
          fontWeight={'medium'}
          fontSize={'xs'}
          my={'auto'}
          color={'gray.500'}>
          Rider drops at HQ
        </Text>
      </Actionsheet.Item>

      <Actionsheet.Item py={0}>
        <DashedLine
          // position={'absolute'}
          ml={'18px'}
          left={0}
          zIndex={'5'}
        />
      </Actionsheet.Item>

      <Actionsheet.Item
        py={0}
        startIcon={
          <Center w={10} h={10} borderRadius={'full'} bg={'muted.300'}>
            <Icon
              as={<Ionicons name="cube-outline" />}
              size={5}
              color="black"
              my={'auto'}
            />
          </Center>
        }>
        <Text
          fontWeight={'medium'}
          fontSize={'xs'}
          my={'auto'}
          color={'gray.500'}>
          HQ confirms package reveived
        </Text>
      </Actionsheet.Item>

      <Actionsheet.Item py={0}>
        <DashedLine
          // position={'absolute'}
          ml={'18px'}
          left={0}
          zIndex={'5'}
        />
      </Actionsheet.Item>

      <Actionsheet.Item
        py={0}
        startIcon={
          <Center w={10} h={10} borderRadius={'full'} bg={'muted.300'}>
            <Icon
              as={<MaterialCommunityIcons name="hand-wash" />}
              size={5}
              color="black"
              my={'auto'}
            />
          </Center>
        }>
        <Text
          fontWeight={'medium'}
          fontSize={'xs'}
          my={'auto'}
          color={'gray.500'}>
          Sent to buyer
        </Text>
      </Actionsheet.Item>
    </Actionsheet.Content>
  </Actionsheet>
);

const DashedLine = ({...rest}) => (
  <Box
    borderStyle={'dashed'}
    borderLeftColor={'gray.700'}
    borderLeftWidth={2}
    height={'8'}
    {...rest}
  />
);

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  markerFixed: {
    left: '50%',
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
