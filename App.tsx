import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useLocation } from './hooks/use-location';
import { PermissionStatus } from 'expo-location';
import AddressLookup from './components/AddressLookup';
import CurrentLocation from './components/CurrentLocation';
import SunriseSunset from './components/SunriseSunset';
import MainLayout from './components/layouts/MainLayout';
import { useAppFont } from './hooks/use-app-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { fontsLoaded, onLayoutRootView } = useAppFont();
  const { location, setLocation, locationAddresses, locationPermissionStatus } =
    useLocation();

  if (!fontsLoaded) {
    return null;
  }
  return (
    <MainLayout onLayoutRootView={onLayoutRootView}>
      <View style={styles.container}>
        <AddressLookup location={location} setLocation={setLocation} />
        <CurrentLocation
          latitude={location?.coords?.latitude}
          longitude={location?.coords?.longitude}
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
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
  },
});
