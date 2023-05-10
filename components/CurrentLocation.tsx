import { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LocationGeocodedAddress } from 'expo-location';
import { AppFontSizes } from '../constants/ui';

enum ErrorMessages {
  LatNotFound = 'Latitude coordinate cannot be found.',
  LngNotFound = 'Longitude coordinate cannot be found.',
  LocationAddressNotFound = 'Location cannot be found. Try using the search bar above to search for a location.',
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

      <View style={styles.CurrentLocation__LocationAddressContainer}>
        {locationAddresses ? (
          <Text style={styles.CurrentLocation__LocationAddress}>
            {locationAddresses[0].city}, {locationAddresses[0].region}
          </Text>
        ) : (
          <Text style={styles.CurrentLocation__NotFound}>
            {ErrorMessages.LocationAddressNotFound}
          </Text>
        )}
      </View>

      <View style={styles.CurrentLocation__LatLngContainer}>
        <Text style={styles.CurrentLocation__label}>Lat: </Text>
        {!!latitude ? (
          <Text style={styles.CurrentLocation__latOrLng}>{latitude}</Text>
        ) : (
          <Text style={styles.CurrentLocation__NotFound}>
            {ErrorMessages.LatNotFound}
          </Text>
        )}
        <Text style={styles.CurrentLocation__label}>Lng: </Text>
        {!!longitude ? (
          <Text>{longitude}</Text>
        ) : (
          <Text style={styles.CurrentLocation__NotFound}>
            {ErrorMessages.LngNotFound}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CurrentLocation__Title: {
    fontWeight: '600',
    fontSize: AppFontSizes.BodyHeaderFontSize,
  },
  CurrentLocation__LatLngContainer: {
    flexDirection: 'row',
  },
  CurrentLocation__LocationAddressContainer: {
    flexDirection: 'row',
  },
  CurrentLocation__LocationAddress: {
    fontSize: 28,
  },
  CurrentLocation__NotFound: {
    color: 'red',
    fontSize: AppFontSizes.BodyFontSize,
  },
  CurrentLocation__label: {
    fontWeight: '600',
  },
  CurrentLocation__latOrLng: {
    marginRight: 4,
  },
});

export default CurrentLocation;
