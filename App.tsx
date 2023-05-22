import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useLocation } from './hooks/use-location';
import HomeScreen from './components/screens/HomeScreen';
import { ScreenRouteNames } from './components/screens/constants';
import { LocationContext } from './context/location';
import { useLayoutRootView } from './hooks/use-layout-root-view';
import { Feather } from '@expo/vector-icons';
import { AppColors } from './constants/ui';
import SettingsScreen from './components/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

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
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let iconColor;

              if (route.name === ScreenRouteNames.Home) {
                iconName = 'clock';
                iconColor = focused
                  ? AppColors.PrimaryThemeColor
                  : AppColors.SecondaryThemeColor;
              } else if (route.name === ScreenRouteNames.Settings) {
                iconName = 'settings';
                iconColor = focused
                  ? AppColors.PrimaryThemeColor
                  : AppColors.SecondaryThemeColor;
              }

              // You can return any component that you like here!
              return <Feather name={iconName} size={24} color={iconColor} />;
            },
            tabBarActiveTintColor: AppColors.PrimaryThemeColor,
            tabBarInactiveTintColor: AppColors.SecondaryThemeColor,
            headerTitleAlign: 'center',
          })}
        >
          <Tab.Screen
            name={ScreenRouteNames.Home}
            component={HomeScreen}
            options={{
              title: ScreenRouteNames.HomeTitle,
              headerTintColor: AppColors.PrimaryThemeColor,
            }}
          />

          <Tab.Screen
            name={ScreenRouteNames.Settings}
            component={SettingsScreen}
            options={{
              title: ScreenRouteNames.SettingsTitle,
              headerTintColor: AppColors.PrimaryThemeColor,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </LocationContext.Provider>
  );
}
