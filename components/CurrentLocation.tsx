import { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LocationGeocodedAddress } from 'expo-location';
import { AppColors, AppFontSizes } from '../constants/ui';
import { Entypo } from '@expo/vector-icons';

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
      <View style={styles.CurrentLocation__LocationAddressContainer}>
        <Entypo
          name="location"
          size={24}
          color={AppColors.PrimaryThemeColor}
          style={styles.CurrentLocation__LocationPinIcon}
        />
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
    borderBottomColor: AppColors.PrimaryThemeColor,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    color: AppColors.PrimaryThemeColor,
  },
  CurrentLocation__LatLngContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  CurrentLocation__LocationAddressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 14,
    textAlign: 'center',
  },
  CurrentLocation__ErrorMessageContainer: {
    marginBottom: 16,
  },
  CurrentLocation__LocationPinIcon: {
    marginRight: 2,
  },
});

export default CurrentLocation;
