import { LocationGeocodedAddress, LocationObject } from 'expo-location';
import { Text } from 'react-native';

type CurrentLocationProps = {
  location?: LocationObject;
  locationAddresses?: LocationGeocodedAddress[];
};

const CurrentLocation = ({
  location,
  locationAddresses,
}: CurrentLocationProps) => {
  return (
    <>
      {location?.coords && (
        <>
          <Text>Lat: {location.coords.latitude}</Text>
          <Text>Long: {location.coords.longitude}</Text>
          {locationAddresses?.map((address, index) => {
            return (
              <Text key={index}>
                {address && (
                  <Text>
                    {address.city}, {address.region}, {address.country}
                  </Text>
                )}
              </Text>
            );
          })}
          <Text>{JSON.stringify(locationAddresses, null, 2)}</Text>
        </>
      )}
    </>
  );
};

export default CurrentLocation;
