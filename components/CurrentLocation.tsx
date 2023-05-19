import { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LocationGeocodedAddress } from 'expo-location';
import { AppColors, AppFontSizes } from '../constants/ui';
import { Entypo } from '@expo/vector-icons';
import TimezoneBadge from './TimezoneBadge';

type CurrentLocation = {
  locationAddress?: LocationGeocodedAddress;
  errorMessage?: string;
};

const CurrentLocation: FC<CurrentLocation> = ({
  locationAddress,
  errorMessage,
}) => {
  return (
    <View>
      <View style={styles.CurrentLocation__LocationAddressContainer}>
        {locationAddress && (
          <View style={styles.CurrentLocation__LocationInfoContainer}>
            <View style={styles.CurrentLocation__LocationInfoContainerTopRow}>
              <Entypo
                name="location"
                size={24}
                color={AppColors.PrimaryThemeColor}
                style={styles.CurrentLocation__LocationPinIcon}
              />
              <Text style={styles.CurrentLocation__LocationAddress}>
                {locationAddress?.city && `${locationAddress.city},`}{' '}
                {locationAddress.region}
              </Text>
            </View>
            <View
              style={styles.CurrentLocation__LocationInfoContainerBottomRow}
            >
              <Text style={styles.CurrentLocation__LocationAddressByLine}>
                {locationAddress.country} ({locationAddress.subregion})
              </Text>
              {locationAddress?.timezone && (
                <TimezoneBadge timezone={locationAddress.timezone} />
              )}
            </View>
          </View>
        )}
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
  CurrentLocation__LocationInfoContainer: {
    flexDirection: 'column',
  },
  CurrentLocation__LocationInfoContainerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  CurrentLocation__LocationInfoContainerBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  CurrentLocation__LocationAddress: {
    fontSize: 28,
  },
  CurrentLocation__LocationAddressByLine: {
    fontSize: 18,
    color: AppColors.PrimaryThemeColor,
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
    marginRight: 4,
  },
});

export default CurrentLocation;
