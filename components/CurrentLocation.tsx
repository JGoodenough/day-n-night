import { Text, View } from 'react-native';
import { useLocation } from '../hooks/use-location';
import { useEffect } from 'react';

const CurrentLocation = ({ location, locationAddresses }) => {
  useEffect(() => {
    console.info('locationAddresses', locationAddresses);
  }, [locationAddresses]);

  return (
    <View>
      <Text style={{ fontWeight: '600' }}>Current Location:</Text>
      {!!location?.coords?.latitude ? (
        <Text>Lat: {location.coords.latitude}</Text>
      ) : null}
      {!!location?.coords?.longitude ? (
        <Text>Long: {location.coords.longitude}</Text>
      ) : null}
      {locationAddresses ? (
        <Text>
          {`${locationAddresses[0].city}, ${locationAddresses[0].region}`}
        </Text>
      ) : null}
    </View>
  );
};

export default CurrentLocation;
