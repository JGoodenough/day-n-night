import {
  StyleSheet,
  TextInput,
  Text,
  View,
  FlatList,
  Modal,
} from 'react-native';
import { geocodeAsync } from 'expo-location';
import { useEffect, useMemo, useState } from 'react';
import { MAP_BOX_PUBLIC_API_TOKEN } from '@env';
import * as Crypto from 'expo-crypto';
import { AppColors } from '../constants/ui';

const AddressLookup = ({ location, setLocation }) => {
  const [text, onChangeText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
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
          const result = await fetch(url);
          const suggestionResults = await result.json();
          setSuggestions(suggestionResults.suggestions);
        } else {
          setSuggestions([]);
        }
      } catch (err) {
        console.error(err, 'ERROR ADDRESS LOOKUP');
      }
    })();
  }, [text?.length]);

  return (
    <View style={styles.AddressLookup__Container}>
      <Modal visible={false}>
        <TextInput
          aria-label="Location Search"
          onChangeText={onChangeText}
          style={styles.AddressLookup__Input}
          value={text}
          placeholder="Search"
        />

        <FlatList
          style={[
            styles.AddressLookup__SuggestionDropdown,
            { display: !!suggestions?.length ? 'flex' : 'none' },
          ]}
          data={suggestions}
          renderItem={({ item, index }) => {
            return (
              <Text
                style={[
                  styles.AddressLookup__SuggestionDropdownItem,
                  {
                    borderBottomWidth: index === suggestions.length - 1 ? 0 : 1,
                  },
                ]}
              >
                {item.name}{' '}
                {item.context.region?.region_code &&
                  `, ${item.context.region.name}`}{' '}
                {item.context.country?.name && `(${item.context.country.name})`}
              </Text>
            );
          }}
          keyExtractor={(suggestion) => suggestion.mapbox_id}
        />
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  AddressLookup__Container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 4,
  },
  AddressLookup__Input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    backgroundColor: '#FFF',
  },
  AddressLookup__SuggestionDropdown: {
    width: '100%',
    marginTop: 5,
    borderColor: AppColors.SecondaryThemeColor,
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    zIndex: 999,
    backgroundColor: '#FFF',
  },
  AddressLookup__SuggestionDropdownItem: {
    backgroundColor: '#FFF',
    borderBottomColor: AppColors.SecondaryThemeColor,
    marginBottom: 5,
    borderBottomWidth: 1,
    padding: 6,
  },
});

export default AddressLookup;
