import { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LocationObject, LocationGeocodedAddress } from 'expo-location';

enum ErrorMessages {
  LatNotFound = 'Latitude coordinate cannot be found.',
  LngNotFound = 'Longitude coordinate cannot be found.',
  LocationAddressNotFound = 'Location cannot be found.',
}

type CurrentLocation = {
  latitude?: number | ErrorMessages.LatNotFound;
  longitude?: number | ErrorMessages.LngNotFound;
  locationAddresses?: LocationGeocodedAddress[];
};

const CurrentLocation: FC<CurrentLocation> = ({
  latitude,
  longitude,
  locationAddresses,
}) => {
  return (
    <View>
      <Text style={styles.CurrentLocation__Title}>Current Location:</Text>
      <View style={styles.CurrentLocation__LatContainer}>
        <Text>Lat: </Text>
        {!!latitude ? (
          <Text>{latitude}</Text>
        ) : (
          <Text>{ErrorMessages.LatNotFound}</Text>
        )}
      </View>
      <View style={styles.CurrentLocation__LngContainer}>
        <Text>Lng: </Text>
        {!!longitude ? (
          <Text>{longitude}</Text>
        ) : (
          <Text>{ErrorMessages.LngNotFound}</Text>
        )}
      </View>

      <View style={styles.CurrentLocation__LocationAddressContainer}>
        <Text>
          {locationAddresses
            ? `${locationAddresses[0].city}, ${locationAddresses[0].region}`
            : ErrorMessages.LocationAddressNotFound}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CurrentLocation__Title: {
    fontWeight: '600',
  },
  CurrentLocation__LatContainer: {
    flexDirection: 'row',
  },
  CurrentLocation__LngContainer: {
    flexDirection: 'row',
  },
  CurrentLocation__LocationAddressContainer: {
    flexDirection: 'row',
  },
});

export default CurrentLocation;
