import { StyleSheet, Text, View } from 'react-native';

const Header = () => {
  return (
    <View style={styles.Header__Container}>
      <Text style={styles.Header__AppName}>Day n' Night</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  Header__Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffa700',
  },
  Header__AppName: {
    fontWeight: 'bold',
    fontSize: 32,
  },
});
