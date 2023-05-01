import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useLocation } from './hooks/use-location';
import { PermissionStatus } from 'expo-location';
import AddressLookup from './components/AddressLookup';
import CurrentLocation from './components/CurrentLocation';
import { A } from '@expo/html-elements';
import SunriseSunset from './components/SunriseSunset';
import MainLayout from './components/layouts/MainLayout';

export default function App() {
  const { location, setLocation, locationAddresses, locationPermissionStatus } =
    useLocation();
  return (
    <MainLayout>
      <View style={styles.container}>
        <Text style={styles.appName}>Day n' Night</Text>
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
        <Text>
          Powered by:{' '}
          <A style={{ color: 'blue' }} href="https://sunrisesunset.io/">
            SunriseSunset.io
          </A>
        </Text>
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontWeight: 'bold',
    fontSize: 32,
  },
});
