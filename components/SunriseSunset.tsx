import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SunriseSunsetAPI = 'https://api.sunrisesunset.io/json';
enum EmptyValues {
  EmptyTime = '--:--',
  EmptyLatLng = '--.--',
}

const SunriseSunset = ({ lat, lng }) => {
  const [sunrise, setSunrise] = useState(EmptyValues.EmptyTime);
  const [sunset, setSunset] = useState(EmptyValues.EmptyTime);
  const [firstLight, setFirstLight] = useState(EmptyValues.EmptyTime);
  const [lastLight, setLastLight] = useState(EmptyValues.EmptyTime);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (lat && lng) {
      (async () => {
        setIsLoading(true);
        try {
          const url = `${SunriseSunsetAPI}?${new URLSearchParams({
            lat,
            lng,
          })}`;
          const response = await fetch(url);
          const sunriseSunsetJSON = await response.json();
          const {
            results: { sunrise, sunset, first_light, last_light },
          } = sunriseSunsetJSON;
          setSunrise(sunrise);
          setSunset(sunset);
          setFirstLight(first_light);
          setLastLight(last_light);
        } catch (err) {
          setErrorMessage(
            'An error occurred when attempting to retrieve the sunrise or sunset times.'
          );
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [lat, lng]);

  return (
    <View style={styles.container}>
      <Text>
        First light:{' '}
        {isLoading ? 'loading...' : firstLight ?? EmptyValues.EmptyTime}
      </Text>
      <Text>
        Sunrise: {isLoading ? 'loading...' : sunrise ?? EmptyValues.EmptyTime}
      </Text>
      <Text>
        Sunset: {isLoading ? 'loading...' : sunset ?? EmptyValues.EmptyTime}
      </Text>
      <Text>
        Last light:{' '}
        {isLoading ? 'loading...' : lastLight ?? EmptyValues.EmptyTime}
      </Text>
      {errorMessage && (
        <Text style={styles.SunriseSunset__ErrorMessage}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default SunriseSunset;

const styles = StyleSheet.create({
  container: {},
  SunriseSunset__ErrorMessage: {
    color: 'red',
  },
});
