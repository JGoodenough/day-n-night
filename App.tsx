import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useLocation } from './hooks/use-location';
import { PermissionStatus } from 'expo-location';
import AddressLookup from './components/AddressLookup';
import CurrentLocation from './components/CurrentLocation';

export default function App() {
  const { location, locationAddresses, locationPermissionStatus } =
    useLocation();
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Day N' Night</Text>
      <CurrentLocation />
      <AddressLookup />
      <StatusBar style="auto" />
    </View>
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
