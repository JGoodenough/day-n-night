import { FC, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

type MainLayoutProps = {
  children?: ReactNode;
};

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return <View style={styles.MainLayout}>{children}</View>;
};

export default MainLayout;

const styles = StyleSheet.create({
  MainLayout: {
    flex: 1,
    padding: 10,
  },
});
