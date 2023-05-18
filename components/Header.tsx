import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { AppFontSizes, AppFontFamilies, AppColors } from '../constants/ui';

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
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.PrimaryThemeColor,
    fontFamily: 'WaitingfortheSunrise_400Regular',
  },
  Header__AppName: {
    fontSize: AppFontSizes.HeaderFontSize,
    fontFamily: AppFontFamilies.MainFontFamily,
    color: '#fff',
    paddingTop: 36,
  },
});
