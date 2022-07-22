import {Box} from 'native-base';
import React from 'react';
import MapView from 'react-native-maps';
import RiderJourney from '../../Rider/RiderJourney';
import RiderProfileHeader from '../../Rider/RiderProfileHeader';

const TrackingSnippet = () => {
  return (
    <Box my={'5'}>
      <Box h={200} borderRadius={'xl'} overflow={'hidden'}>
        <MapView
          style={{
            height: '100%',
            borderRadius: 20,
          }}
          initialRegion={{
            latitude: -1.286389,
            longitude: 36.817223,
            latitudeDelta: 0.09,
            longitudeDelta: 0.05,
          }}
          // onRegionChange={handleRegionChange}
          //     onPress={r => {
          //       console.log(r);
          // }}
        />
      </Box>

      {/* rider profile header */}
      <RiderProfileHeader />

      {/* rider Journey */}
      <RiderJourney />
    </Box>
  );
};

export default TrackingSnippet;
