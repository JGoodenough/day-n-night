import { FC, ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../Header';
import { A } from '@expo/html-elements';
import { AppFontSizes } from '../../constants/ui';

export type MainLayout = {
  children?: ReactNode;
  onLayoutRootView?: () => Promise<void>;
};
const MainLayout: FC<MainLayout> = ({ children, onLayoutRootView }) => {
  return (
    <View style={styles.MainLayout__Container} onLayout={onLayoutRootView}>
      <Header />
      <View style={styles.MainLayout__Body}>{children}</View>

      <Text
        style={{
          textAlign: 'center',
          fontFamily: 'WaitingfortheSunrise_400Regular',
          fontSize: AppFontSizes.MainFontSize,
        }}
      >
        Powered by:{' '}
        <A
          style={{ color: 'blue', textAlign: 'center' }}
          href="https://sunrisesunset.io/"
        >
          SunriseSunset.io
        </A>
      </Text>
    </View>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  MainLayout__Container: {
    flex: 0.5,
    flexDirection: 'column',
  },
  MainLayout__Body: {
    flex: 3,
    padding: 10,
    alignContent: 'flex-start',
  },
});
