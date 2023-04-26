import { StyleSheet, Text, View } from 'react-native';

const CurrentLocation = ({ location }) => {
  return <Text>{location && JSON.stringify(location, null, 2)}</Text>;
};

export default CurrentLocation;
