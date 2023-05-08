import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  WaitingfortheSunrise_400Regular,
} from '@expo-google-fonts/waiting-for-the-sunrise';
import { useCallback } from 'react';

export const useAppFont = () => {
  const [fontsLoaded] = useFonts({
    WaitingfortheSunrise_400Regular,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return {
    fontsLoaded,
    onLayoutRootView,
  };
};
