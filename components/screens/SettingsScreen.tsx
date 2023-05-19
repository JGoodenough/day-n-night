import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { AppFontSizes } from '../../constants/ui';
import MainLayout from '../layouts/MainLayout';

const SettingsScreen = () => {
  return (
    <MainLayout>
      <SafeAreaView style={styles.container}>
        <Text>Settings Screen</Text>
      </SafeAreaView>
    </MainLayout>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    fontSize: AppFontSizes.BodyFontSize,
  },
});
