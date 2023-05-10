import { FC, ReactNode } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import Header from '../Header';
import Acknowledgements from '../Acknowledgements';

export type MainLayout = {
  children?: ReactNode;
  onLayoutRootView?: () => Promise<void>;
};
const MainLayout: FC<MainLayout> = ({ children, onLayoutRootView }) => {
  return (
    <SafeAreaView
      style={styles.MainLayout__Container}
      onLayout={onLayoutRootView}
    >
      <Header />
      <View style={styles.MainLayout__Body}>{children}</View>
      <Acknowledgements />
    </SafeAreaView>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  MainLayout__Container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  MainLayout__Body: {
    width: '100%',
    height: '85%',
    padding: 10,
  },
});
