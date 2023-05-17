import { FC } from 'react';
import dayjs from 'dayjs';
import SunriseSunsetCard from './SunriseSunsetCard';
import { useSunriseSunset } from '../hooks/use-sunrise-sunset';

type SunriseSunsetProps = {
  lat?: string;
  lng?: string;
};

const SunriseSunset: FC<SunriseSunsetProps> = ({ lat, lng }) => {
  const today = dayjs().format('ddd, MMM D, YYYY');

  const { sunrise, sunset, dawn, dusk, isLoading, errorMessage } =
    useSunriseSunset({ lat, lng });

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
