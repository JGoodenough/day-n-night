import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  WaitingfortheSunrise_400Regular,
} from '@expo-google-fonts/waiting-for-the-sunrise';
import { useCallback, useEffect, useState } from 'react';

export const useLayoutRootView = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    WaitingfortheSunrise_400Regular,
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  return {
    appIsReady,
    fontsLoaded,
    onLayoutRootView,
  };
};
