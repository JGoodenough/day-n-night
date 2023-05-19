import { A } from '@expo/html-elements';
import { AppFontSizes } from '../constants/ui';
import { Text, StyleSheet, SafeAreaView } from 'react-native';

const Acknowledgements = () => {
  return (
    <SafeAreaView style={styles.Acknowledgements__Container}>
      <Text style={styles.Acknowledgements__Text}>
        Powered by:{' '}
        <A
          style={{ color: 'blue', textAlign: 'center' }}
          href="https://sunrisesunset.io/"
        >
          SunriseSunset.io
        </A>
      </Text>
    </SafeAreaView>
  );
};

export default Acknowledgements;

const styles = StyleSheet.create({
  Acknowledgements__Container: {
    width: '100%',
    height: '5%',
  },
  Acknowledgements__Text: {
    textAlign: 'center',
    fontFamily: 'WaitingfortheSunrise_400Regular',
    fontSize: AppFontSizes.MainFontSize,
  },
});
