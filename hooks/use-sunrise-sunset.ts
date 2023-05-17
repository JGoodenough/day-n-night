import { useEffect, useState } from 'react';
import { EmptyValues } from '../constants/ui';

const SunriseSunsetAPI = 'https://api.sunrisesunset.io/json';

type SunriseSunsetHookProps = {
  lat?: string;
  lng?: string;
};

export const useSunriseSunset = ({ lat, lng }: SunriseSunsetHookProps) => {
  const [sunrise, setSunrise] = useState(EmptyValues.EmptyTime);
  const [sunset, setSunset] = useState(EmptyValues.EmptyTime);
  const [dawn, setDawn] = useState(EmptyValues.EmptyTime);
  const [dusk, setDusk] = useState(EmptyValues.EmptyTime);
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
            results: { sunrise, sunset, dawn, dusk },
          } = sunriseSunsetJSON;
          setSunrise(sunrise);
          setSunset(sunset);
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

  return {
    sunrise,
    sunset,
    dawn,
    dusk,
    isLoading,
    errorMessage,
  };
};
