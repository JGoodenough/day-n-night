import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useLocation } from './hooks/use-location';
import { PermissionStatus } from 'expo-location';
import AddressLookup from './components/AddressLookup';
import CurrentLocation from './components/CurrentLocation';
import SunriseSunset from './components/SunriseSunset';
import MainLayout from './components/layouts/MainLayout';

export default function App() {
  const { location, setLocation, locationAddresses, locationPermissionStatus } =
    useLocation();
  return (
    <MainLayout>
      <View style={styles.container}>
        <AddressLookup location={location} setLocation={setLocation} />
        <CurrentLocation
          location={location}
          locationAddresses={locationAddresses}
        />
        <StatusBar style="auto" />
        <SunriseSunset
          lat={location?.coords?.latitude}
          lng={location?.coords?.longitude}
        />
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
