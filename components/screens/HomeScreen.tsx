import { SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AddressLookup from '../AddressLookup';
import CurrentLocation from '../CurrentLocation';
import SunriseSunset from '../SunriseSunset';
import { AppFontSizes } from '../../constants/ui';
import { useContext } from 'react';
import { LocationContext } from '../../context/location';

const HomeScreen = () => {
  const { location, setLocation, locationAddresses, locationErrorMessage } =
    useContext(LocationContext);

  return (
    <SafeAreaView style={styles.container}>
      <AddressLookup location={location} setLocation={setLocation} />
      <CurrentLocation
        latitude={location?.coords?.latitude}
        longitude={location?.coords?.longitude}
        locationAddress={locationAddresses?.[0]}
        errorMessage={locationErrorMessage}
      />
      <StatusBar style="auto" />
      <SunriseSunset
        lat={location?.coords?.latitude ? `${location.coords.latitude}` : ''}
        lng={location?.coords?.longitude ? `${location.coords.longitude}` : ''}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: AppFontSizes.BodyFontSize,
  },
});
