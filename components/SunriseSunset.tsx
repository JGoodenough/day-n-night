import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SunriseSunsetAPI = 'https://api.sunrisesunset.io/json';
const EmptyTime = '--:--';

const SunriseSunset = ({ lat, lng }) => {
  const [sunrise, setSunrise] = useState(EmptyTime);
  const [sunset, setSunset] = useState(EmptyTime);
  const [firstLight, setFirstLight] = useState(EmptyTime);
  const [lastLight, setLastLight] = useState(EmptyTime);
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
        First light: {isLoading ? 'loading...' : firstLight ?? EmptyTime}
      </Text>
      <Text>Sunrise: {isLoading ? 'loading...' : sunrise ?? EmptyTime}</Text>
      <Text>Sunset: {isLoading ? 'loading...' : sunset ?? EmptyTime}</Text>
      <Text>
        Last light: {isLoading ? 'loading...' : lastLight ?? EmptyTime}
      </Text>
      {errorMessage && (
        <Text style={styles.SunriseSunset__ErrorMessage}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default SunriseSunset;

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  SunriseSunset__ErrorMessage: {
    color: 'red',
  },
});