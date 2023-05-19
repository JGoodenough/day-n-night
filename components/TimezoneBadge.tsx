import { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppColors } from '../constants/ui';

type TimezoneBadgeProps = {
  timezone: string;
};

const TimezoneBadge: FC<TimezoneBadgeProps> = ({ timezone }) => {
  return (
    <View style={styles.TimezoneBadge}>
      <Text>{timezone}</Text>
    </View>
  );
};

export default TimezoneBadge;

const styles = StyleSheet.create({
  TimezoneBadge: {
    backgroundColor: AppColors.PrimaryThemeColor,
    padding: 2,
    borderRadius: 5,
  },
});
