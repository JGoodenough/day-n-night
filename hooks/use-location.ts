import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import dayjs from 'dayjs';

const DEFAULT_LOCATION_TEXT = 'Montauk, NY';

enum LocationErrorMessages {
  NotFound = 'Location not found. Use search bar to find a valid location.',
  UnauthorizedLocation = 'We could not find your position. Please make sure your location service provider is on.',
}

export const useLocation = () => {
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject>(null);
  const [locationPermissionStatus, setLocationPermissionStatus] = useState(
    Location.PermissionStatus.UNDETERMINED
  );
  const [locationAddresses, setLocationAddresses] = useState(null);
  const [locationErrorMessage, setLocationErrorMessage] = useState('');
  const initializeDefaultLocation = async () => {
    if (
      [
        Location.PermissionStatus.UNDETERMINED,
        Location.PermissionStatus.DENIED,
      ].includes(locationPermissionStatus)
    ) {
      try {
        // If Geo Location Permission is denied set the default location
        // until the user manually selects a location via the search bar.
        const geocodedLocations = await Location.geocodeAsync(
          DEFAULT_LOCATION_TEXT
        );
        const firstGeocodedLocation = geocodedLocations?.[0];
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
      } catch (err) {
        setLocationErrorMessage(LocationErrorMessages.UnauthorizedLocation);
      }
    }
  };
  const requestLocationPermsOnInit = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setLocationPermissionStatus(status);
    if (Location.PermissionStatus.GRANTED !== status) {
      return;
    }
    const location = await Location.getCurrentPositionAsync();
    setLocation(location);
  };

  useEffect(() => {
    // TODO: First check if location is cached

    // Otherwise init default location and ask perms.
    initializeDefaultLocation();
    requestLocationPermsOnInit();
  }, []);

  useEffect(() => {
    if (location?.coords?.latitude || location?.coords?.longitude) {
      (async () => {
        setIsLocationLoading(true);
        const coords = {
          latitude: location.coords?.latitude,
          longitude: location.coords?.longitude,
        };
        const addresses = await Location.reverseGeocodeAsync(coords);
        setLocationAddresses([...addresses]);
        const errorMessage =
          !addresses?.length || !location ? LocationErrorMessages.NotFound : '';
        setLocationErrorMessage(errorMessage);

        setIsLocationLoading(false);
      })();
    }
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
