import { SafeAreaView, StyleSheet, TextInput, Text, View } from 'react-native';
import { geocodeAsync } from 'expo-location';
import { useEffect, useMemo, useState } from 'react';
import { MAP_BOX_PUBLIC_API_TOKEN } from '@env';
import * as Crypto from 'expo-crypto';

const AddressLookup = ({ location, setLocation }) => {
  const [text, onChangeText] = useState('');
  const sessionToken = useMemo(() => Crypto.randomUUID(), []);

  useEffect(() => {
    (async () => {
      // const geocodeLocationInfo = await geocodeAsync(text);
      // if (geocodeLocationInfo) {
      //   setLocation({
      //     ...location,
      //     coords: {
      //       ...location?.coords,
      //       ...geocodeLocationInfo[0],
      //     },
      //   });
      // }
      try {
        if (text) {
          const url = `https://api.mapbox.com/search/searchbox/v1/suggest?${new URLSearchParams(
            {
              access_token: MAP_BOX_PUBLIC_API_TOKEN,
              session_token: sessionToken,
              q: text,
              types: 'city,country,region',
            }
          )}`;
          console.log(url);
          const result = await fetch(url);
          const suggestions = await result.json();
          console.log(JSON.stringify(suggestions, null, 2));
        }
      } catch (err) {
        console.error(err, 'ERROR ADDRESS LOOKUP');
      }
    })();
  }, [!!text]);

  return (
    <SafeAreaView style={styles.AddressLookup__SafeContainer}>
      <TextInput
        aria-label="Location Search"
        onChangeText={onChangeText}
        style={styles.AddressLookup__Input}
        value={text}
        placeholder="Search"
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
