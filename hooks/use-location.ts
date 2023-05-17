import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

enum LocationErrorMessages {
  NotFound = 'Location not found. Use search bar to find a valid location.',
}

export const useLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject>(null);
  const [locationPermissionStatus, setLocationPermissionStatus] =
    useState(null);
  const [locationAddresses, setLocationAddresses] = useState(null);
  const [locationErrorMessage, setLocationErrorMessage] = useState();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermissionStatus(status);
      if (Location.PermissionStatus.GRANTED !== status) {
        return;
      }

      const locationObj = await Location.getCurrentPositionAsync();
      setLocation(locationObj);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (location?.coords?.latitude || location?.coords?.longitude) {
        const coords = {
          latitude: location.coords?.latitude,
          longitude: location.coords?.longitude,
        };
        const addresses = await Location.reverseGeocodeAsync(coords);
        setLocationAddresses([...addresses]);
        const errorMessage =
          !addresses?.length || !location ? LocationErrorMessages.NotFound : '';
        setLocationErrorMessage(errorMessage);
      }
    })();
  }, [location]);

  return {
    location,
    setLocation,
    locationAddresses,
    setLocationAddresses,
    locationPermissionStatus,
    locationErrorMessage,
  };
};
