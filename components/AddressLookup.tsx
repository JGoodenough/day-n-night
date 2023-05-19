import { SafeAreaView, StyleSheet, TextInput, Text, View } from 'react-native';
import { geocodeAsync } from 'expo-location';
import { useEffect, useState } from 'react';

const AddressLookup = ({ location, setLocation }) => {
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
    <SafeAreaView style={styles.AddressLookup__SafeContainer}>
      <TextInput
        aria-label="Location Search"
        onChangeText={onChangeText}
        style={styles.AddressLookup__Input}
        value={text}
        placeholder="Enter your location here"
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  AddressLookup__SafeContainer: {
    flexDirection: 'row',
    paddingBottom: 4,
  },
  AddressLookup__InputTitle: {
    fontWeight: '600',
  },
  AddressLookup__Input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    backgroundColor: '#FFF',
  },
});
export default AddressLookup;
