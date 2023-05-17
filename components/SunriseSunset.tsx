import { useEffect, useState, FC } from 'react';
import dayjs from 'dayjs';
import { EmptyValues } from '../constants/ui';
import SunriseSunsetCard from './SunriseSunsetCard';

const SunriseSunsetAPI = 'https://api.sunrisesunset.io/json';

type SunriseSunsetProps = {
  lat?: string;
  lng?: string;
};

const SunriseSunset: FC<SunriseSunsetProps> = ({ lat, lng }) => {
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
  );
};

export default SunriseSunset;
