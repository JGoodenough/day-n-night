import { SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { geocodeAsync } from 'expo-location';
import { useLocation } from '../hooks/use-location';
import { useEffect, useState } from 'react';

const AddressLookup = () => {
  const { location, setLocation } = useLocation();
  const [text, onChangeText] = useState('');

  useEffect(() => {
    (async () => {
      const geocodeLocationInfo = await geocodeAsync(text);
      if (geocodeLocationInfo) {
        setLocation({
          ...location,
          coords: {
            ...location?.coords,
            ...geocodeLocationInfo[0],
          },
        });
      }
    })();
  }, [text]);

  return (
    <SafeAreaView>
      <TextInput
        onChangeText={onChangeText}
        style={styles.input}
        value={text}
        placeholder="Enter your location here"
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});
export default AddressLookup;
