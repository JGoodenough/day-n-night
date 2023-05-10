import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { AppFontSizes, AppFontFamilies } from '../constants/ui';

const Header = () => {
  return (
    <SafeAreaView style={{ ...styles.Header__Container }}>
      <Text style={styles.Header__AppName}>Day n' Night</Text>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  Header__Container: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a7998',
    fontFamily: 'WaitingfortheSunrise_400Regular',
  },
  Header__AppName: {
    fontSize: AppFontSizes.HeaderFontSize,
    fontFamily: AppFontFamilies.MainFontFamily,
    color: '#fff',
  },
});
