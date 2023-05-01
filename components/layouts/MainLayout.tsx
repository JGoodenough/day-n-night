import { FC, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

export type MainLayout = {
  children?: ReactNode;
};

const MainLayout: FC<MainLayout> = ({ children }) => {
  return <View style={styles.MainLayout__Container}>{children}</View>;
};

export default MainLayout;

const styles = StyleSheet.create({
  MainLayout__Container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
  },
});
