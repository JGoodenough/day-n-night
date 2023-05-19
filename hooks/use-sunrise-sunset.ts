import { useEffect, useState } from 'react';
import { EmptyValues } from '../constants/ui';
import dayjs from 'dayjs';

const SunriseSunsetAPI = 'https://api.sunrisesunset.io/json';

export const DATE_FORMAT = 'YYYY-MM-DD';

type SunriseSunsetHookProps = {
  lat?: string;
  lng?: string;
  date?: string;
};

export const useSunriseSunset = ({
  lat,
  lng,
  date = dayjs().format(DATE_FORMAT),
}: SunriseSunsetHookProps) => {
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
            date,
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
            'An error occurred when attempting to retrieve the sunrise/sunset times.'
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
