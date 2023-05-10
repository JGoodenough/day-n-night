import { A } from '@expo/html-elements';
import { AppFontSizes } from '../constants/ui';
import { Text, StyleSheet } from 'react-native';

const Acknowledgements = () => {
  return (
    <Text style={styles.Acknowledgements__Container}>
      Powered by:{' '}
      <A
        style={{ color: 'blue', textAlign: 'center' }}
        href="https://sunrisesunset.io/"
      >
        SunriseSunset.io
      </A>
    </Text>
  );
};

export default Acknowledgements;

const styles = StyleSheet.create({
  Acknowledgements__Container: {
    textAlign: 'center',
    fontFamily: 'WaitingfortheSunrise_400Regular',
    fontSize: AppFontSizes.MainFontSize,
    flex: 1,
  },
});
