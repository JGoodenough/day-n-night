import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useLocation } from './hooks/use-location';
import HomeScreen from './components/screens/HomeScreen';
import { ScreenRouteNames } from './components/screens/constants';
import { LocationContext } from './context/location';
import { useLayoutRootView } from './hooks/use-layout-root-view';

const Stack = createNativeStackNavigator();

export default function App() {
  const { location, setLocation, locationAddresses, locationErrorMessage } =
    useLocation();
  const { appIsReady, fontsLoaded, onLayoutRootView } = useLayoutRootView();

  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        locationAddresses,
        locationErrorMessage,
      }}
    >
      <NavigationContainer onReady={onLayoutRootView}>
        <Stack.Navigator>
          <Stack.Screen
            name={ScreenRouteNames.Home}
            component={HomeScreen}
            options={{ title: ScreenRouteNames.HomeTitle }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LocationContext.Provider>
  );
}
