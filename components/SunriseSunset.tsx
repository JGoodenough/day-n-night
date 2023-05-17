import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppColors, AppFontSizes } from '../constants/ui';
import dayjs from 'dayjs';
import { Feather } from '@expo/vector-icons';

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
  const [dawn, setDawn] = useState(EmptyValues.EmptyTime);
  const [dusk, setDusk] = useState(EmptyValues.EmptyTime);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const today = dayjs().format('ddd, MMM D, YYYY');

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
            results: { sunrise, sunset, dawn, dusk, first_light, last_light },
          } = sunriseSunsetJSON;
          setSunrise(sunrise);
          setSunset(sunset);
          setFirstLight(first_light);
          setLastLight(last_light);
          setDawn(dawn);
          setDusk(dusk);
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
      <Text style={styles.SunriseSunset__DayTitle}>Today</Text>
      <Text style={styles.SunriseSunset__Date}>{today}</Text>
      <Feather name="sunrise" size={32} color="#fff200" />
      <Text style={[styles.SunriseSunset__Time, { fontSize: 16 }]}>
        {isLoading ? 'loading...' : sunrise ?? EmptyValues.EmptyTime}
      </Text>
      <Text style={[styles.SunriseSunset__Time, { marginBottom: 8 }]}>
        (dawn) {isLoading ? 'loading...' : dawn ?? EmptyValues.EmptyTime}
      </Text>
      <Feather name="sunset" size={32} color="#fff200" />
      <Text style={[styles.SunriseSunset__Time, { fontSize: 16 }]}>
        {isLoading ? 'loading...' : sunset ?? EmptyValues.EmptyTime}
      </Text>
      <Text style={[styles.SunriseSunset__Time, { marginBottom: 4 }]}>
        (dusk)
        {isLoading ? 'loading...' : dusk ?? EmptyValues.EmptyTime}
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
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: AppColors.PrimaryThemeColor,
    width: '100%',
    padding: 12,
    color: AppColors.SecondaryThemeColor,
    borderRadius: 8,
  },
  SunriseSunset__DayTitle: {
    fontWeight: '600',
    textAlign: 'center',
    fontSize: AppFontSizes.BodyHeaderFontSize,
    color: AppColors.TitleCardColor,
    marginBottom: 4,
  },
  SunriseSunset__Date: {
    color: AppColors.SecondaryThemeColor,
    fontSize: 18,
    marginBottom: 4,
  },
  SunriseSunset__ErrorMessage: {
    color: 'red',
  },
  SunriseSunset__Time: {
    color: AppColors.SecondaryThemeColor,
  },
});
