import { FC, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../Header';
import Acknowledgements from '../Acknowledgements';

export type MainLayout = {
  children?: ReactNode;
  onLayoutRootView?: () => Promise<void>;
};
const MainLayout: FC<MainLayout> = ({ children, onLayoutRootView }) => {
  return (
    <View style={styles.MainLayout__Container} onLayout={onLayoutRootView}>
      <Header />
      <View style={styles.MainLayout__Body}>{children}</View>
      <Acknowledgements />
    </View>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  MainLayout__Container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  MainLayout__Body: {
    flex: 4,
    padding: 10,
  },
});
