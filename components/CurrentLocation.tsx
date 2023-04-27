import { Text, View } from 'react-native';

const CurrentLocation = ({ location, locationAddresses }) => {
  return (
    <View>
      <Text style={{ fontWeight: '600' }}>Current Location:</Text>
      {!!location?.coords?.latitude ? (
        <Text>Lat: {location.coords.latitude}</Text>
      ) : null}
      {!!location?.coords?.longitude ? (
        <Text>Lng: {location.coords.longitude}</Text>
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
