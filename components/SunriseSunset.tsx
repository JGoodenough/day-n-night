import { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import SunriseSunsetCard from './SunriseSunsetCard';
import { DATE_FORMAT, useSunriseSunset } from '../hooks/use-sunrise-sunset';

type SunriseSunsetProps = {
  lat?: string;
  lng?: string;
};

const SunriseSunset: FC<SunriseSunsetProps> = ({ lat, lng }) => {
  const today = dayjs().format('ddd, MMM D, YYYY');
  const tomorrow = dayjs().add(1, 'day').format('ddd, MMM D, YYYY');

  const { sunrise, sunset, dawn, dusk, isLoading, errorMessage } =
    useSunriseSunset({ lat, lng });
  const {
    sunrise: tomorrowSunrise,
    sunset: tomorrowSunset,
    dawn: tomorrowDawn,
    dusk: tomorrowDusk,
    isLoading: tomorrowIsLoading,
    errorMessage: tomorrowErrorMessage,
  } = useSunriseSunset({
    lat,
    lng,
    date: dayjs().add(1, 'day').format(DATE_FORMAT),
  });

  return (
    <View style={styles.SunriseSunset__Container}>
      <SunriseSunsetCard
        when="Today"
        date={today}
        isLoading={isLoading}
        sunrise={sunrise}
        sunset={sunset}
        dawn={dawn}
        dusk={dusk}
        errorMessage={errorMessage}
      />
      <SunriseSunsetCard
        when="Tomorrow"
        date={tomorrow}
        isLoading={tomorrowIsLoading}
        sunrise={tomorrowSunrise}
        sunset={tomorrowSunset}
        dawn={tomorrowDawn}
        dusk={tomorrowDusk}
        errorMessage={tomorrowErrorMessage}
      />
    </View>
  );
};

export default SunriseSunset;

const styles = StyleSheet.create({
  SunriseSunset__Container: {
    width: '100%',
  },
});
