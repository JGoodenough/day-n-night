import { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LocationGeocodedAddress } from 'expo-location';
import { AppFontSizes } from '../constants/ui';

type CurrentLocation = {
  latitude?: number;
  longitude?: number;
  locationAddress?: LocationGeocodedAddress;
  errorMessage?: string;
};

const CurrentLocation: FC<CurrentLocation> = ({
  latitude = '--.--',
  longitude = '--.--',
  locationAddress,
  errorMessage,
}) => {
  return (
    <View>
      <Text style={styles.CurrentLocation__Title}>Current Location:</Text>

      <View style={styles.CurrentLocation__LocationAddressContainer}>
        {locationAddress && (
          <Text style={styles.CurrentLocation__LocationAddress}>
            {locationAddress.city}, {locationAddress.region}
          </Text>
        )}
      </View>

      <View style={styles.CurrentLocation__LatLngContainer}>
        <Text style={styles.CurrentLocation__label}>Lat: </Text>
        {!!latitude && (
          <Text style={styles.CurrentLocation__latOrLng}>{latitude}</Text>
        )}
        <Text style={styles.CurrentLocation__label}>Lng: </Text>
        {!!longitude && <Text>{longitude}</Text>}
      </View>
      <View style={styles.CurrentLocation__ErrorMessageContainer}>
        {errorMessage && (
          <Text style={styles.CurrentLocation__ErrorMessage}>
            {errorMessage}
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
    textAlign: 'center',
  },
  CurrentLocation__LatLngContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  CurrentLocation__LocationAddressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  CurrentLocation__LocationAddress: {
    fontSize: 28,
  },
  CurrentLocation__label: {
    fontWeight: '600',
  },
  CurrentLocation__latOrLng: {
    marginRight: 4,
  },
  CurrentLocation__ErrorMessage: {
    color: 'red',
    fontSize: AppFontSizes.BodyFontSize,
  },
  CurrentLocation__ErrorMessageContainer: {
    marginBottom: 20,
  },
});

export default CurrentLocation;
