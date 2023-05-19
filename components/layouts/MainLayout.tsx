import { FC, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import Acknowledgements from '../Acknowledgements';

type MainLayoutProps = {
  children?: ReactNode;
};

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <View style={styles.MainLayout}>
      {children}
      <Acknowledgements />
    </View>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  MainLayout: {
    flex: 1,
    padding: 10,
  },
});
