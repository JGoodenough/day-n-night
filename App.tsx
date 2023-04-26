import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useLocation } from './hooks/use-location';

export default function App() {
  const { locationStatus } = useLocation();
  return (
    <View style={styles.container}>
      <Text>Day N' Nigh appt!</Text>
      <Text>{locationStatus}</Text>
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
});
