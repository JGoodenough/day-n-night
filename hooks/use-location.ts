import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import dayjs from 'dayjs';

const DEFAULT_LOCATION_TEXT = 'Montauk, NY';

enum LocationErrorMessages {
  NotFound = 'Location not found. Use search bar to find a valid location.',
}

export const useLocation = () => {
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject>(null);
  const [locationPermissionStatus, setLocationPermissionStatus] =
    useState(null);
  const [locationAddresses, setLocationAddresses] = useState(null);
  const [locationErrorMessage, setLocationErrorMessage] = useState('');

  useEffect(() => {
    (async () => {
      setIsLocationLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermissionStatus(status);
      if (Location.PermissionStatus.GRANTED === status) {
        const locationObj = await Location.getCurrentPositionAsync();
        setLocation(locationObj);
      } else {
        // If Geo Location Permission is denied set the default location
        // until the user manually selects a location via the search bar.
        const geocodedLocations = await Location.geocodeAsync(
          DEFAULT_LOCATION_TEXT
        );
        // Pick first result
        if (geocodedLocations?.length) {
          const firstGeocodedLocation = geocodedLocations[0];
          setLocation({
            coords: {
              ...firstGeocodedLocation,
              altitude: null,
              accuracy: null,
              altitudeAccuracy: null,
              heading: null,
              speed: null,
            },
            mocked: true,
            timestamp: dayjs().unix(),
          });
        } else {
          setLocationErrorMessage(LocationErrorMessages.NotFound);
        }
      }
      setIsLocationLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setIsLocationLoading(true);
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
      setIsLocationLoading(false);
    })();
  }, [location]);

  return {
    location,
    setLocation,
    locationAddresses,
    setLocationAddresses,
    locationPermissionStatus,
    locationErrorMessage,
    isLocationLoading,
  };
};
