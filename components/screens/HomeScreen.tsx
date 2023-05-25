import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AddressLookup from '../AddressLookup';
import CurrentLocation from '../CurrentLocation';
import SunriseSunset from '../SunriseSunset';
import { AppFontSizes } from '../../constants/ui';
import { useContext } from 'react';
import { LocationContext } from '../../context/location';
import MainLayout from '../layouts/MainLayout';

const HomeScreen = () => {
  const {
    location,
    setLocation,
    locationAddresses,
    locationErrorMessage,
    isLocationLoading,
  } = useContext(LocationContext);

  return (
    <MainLayout>
      <SafeAreaView style={styles.HomeScreen__MainContainer}>
        <AddressLookup location={location} setLocation={setLocation} />

        {isLocationLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View style={styles.HomeScreen__MainContainer}>
            <CurrentLocation
              locationAddress={locationAddresses?.[0]}
              errorMessage={locationErrorMessage}
            />
            <StatusBar style="auto" />
            <SunriseSunset
              lat={
                location?.coords?.latitude ? `${location.coords.latitude}` : ''
              }
              lng={
                location?.coords?.longitude
                  ? `${location.coords.longitude}`
                  : ''
              }
            />
          </View>
        )}
      </SafeAreaView>
    </MainLayout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  HomeScreen__MainContainer: {
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    fontSize: AppFontSizes.BodyFontSize,
    zIndex: 1,
  },
  HomeScreen__LocationContainer: {
    zIndex: 1,
  },
});
