import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export const useLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject>(null);
  const [locationPermissionStatus, setLocationPermissionStatus] =
    useState(null);
  const [locationAddresses, setLocationAddresses] = useState(null);
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
      if (location?.coords) {
        const addresses = await Location.reverseGeocodeAsync(location.coords);
        setLocationAddresses(addresses);
      }
    })();
  }, [location]);

  return { location, setLocation, locationAddresses, locationPermissionStatus };
};
