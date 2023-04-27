import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SunriseSunsetAPI = 'https://api.sunrisesunset.io/json';

const SunriseSunset = ({ lat, lng }) => {
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();
  const [firstLight, setFirstLight] = useState();
  const [lastLight, setLastLight] = useState();

  useEffect(() => {
    if (lat && lng) {
      (async () => {
        const url = `${SunriseSunsetAPI}?${new URLSearchParams({ lat, lng })}`;
        const response = await fetch(url);
        const sunriseSunsetJSON = await response.json();
        const {
          results: { sunrise, sunset, first_light, last_light },
        } = sunriseSunsetJSON;
        setSunrise(sunrise);
        setSunset(sunset);
        setFirstLight(first_light);
        setLastLight(last_light);
      })();
    }
  }, [lat, lng]);

  return (
    <View>
      <Text>First light: {firstLight}</Text>
      <Text>Sunrise: {sunrise}</Text>
      <Text>Sunset: {sunset}</Text>
      <Text>Last light: {lastLight}</Text>
    </View>
  );
};

export default SunriseSunset;
