import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useLocation } from './hooks/use-location';
import { PermissionStatus } from 'expo-location';
import AddressLookup from './components/AddressLookup';
import CurrentLocation from './components/CurrentLocation';
import SunriseSunset from './components/SunriseSunset';
import MainLayout from './components/layouts/MainLayout';
import { useAppFont } from './hooks/use-app-font';
import * as SplashScreen from 'expo-splash-screen';
import { AppFontSizes, AppFontFamilies } from './constants/ui';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { fontsLoaded, onLayoutRootView } = useAppFont();
  const {
    location,
    setLocation,
    locationAddresses,
    locationPermissionStatus,
    locationErrorMessage,
  } = useLocation();

  if (!fontsLoaded) {
    return null;
  }
  return (
    <MainLayout onLayoutRootView={onLayoutRootView}>
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
          lat={location?.coords?.latitude}
          lng={location?.coords?.longitude}
        />
      </SafeAreaView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: AppFontSizes.BodyFontSize,
    fontFamily: AppFontFamilies.MainFontFamily,
  },
});
