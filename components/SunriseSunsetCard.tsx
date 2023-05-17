import { StyleSheet, Text, View } from 'react-native';
import { AppColors, AppFontSizes, EmptyValues } from '../constants/ui';
import { Feather } from '@expo/vector-icons';
import { FC } from 'react';

type SunriseSunsetCardProps = {
  when?: 'Today' | 'Tomorrow';
  date: string;
  isLoading: boolean;
  sunrise?: string;
  sunset?: string;
  dawn?: string;
  dusk?: string;
  errorMessage?: string;
};

const SunriseSunsetCard: FC<SunriseSunsetCardProps> = ({
  when,
  date,
  isLoading,
  sunrise,
  sunset,
  dawn,
  dusk,
  errorMessage,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.SunriseSunset__DayTitle}>{when}</Text>
      <Text style={styles.SunriseSunset__Date}>{date}</Text>
      <Feather name="sunrise" size={32} color="#fff200" />
      <Text style={[styles.SunriseSunset__Time, { fontSize: 16 }]}>
        {isLoading ? 'loading...' : sunrise ?? EmptyValues.EmptyTime}
      </Text>
      <Text style={[styles.SunriseSunset__Time, { marginBottom: 8 }]}>
        (dawn) {isLoading ? 'loading...' : dawn ?? EmptyValues.EmptyTime}
      </Text>
      <Feather name="sunset" size={32} color="#fff200" />
      <Text style={[styles.SunriseSunset__Time, { fontSize: 16 }]}>
        {isLoading ? 'loading...' : sunset ?? EmptyValues.EmptyTime}
      </Text>
      <Text style={[styles.SunriseSunset__Time, { marginBottom: 4 }]}>
        (dusk)
        {isLoading ? 'loading...' : dusk ?? EmptyValues.EmptyTime}
      </Text>
      {errorMessage && (
        <Text style={styles.SunriseSunset__ErrorMessage}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default SunriseSunsetCard;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: AppColors.PrimaryThemeColor,
    width: '100%',
    padding: 12,
    color: AppColors.SecondaryThemeColor,
    borderRadius: 8,
    marginBottom: 8,
  },
  SunriseSunset__DayTitle: {
    fontWeight: '600',
    textAlign: 'center',
    fontSize: AppFontSizes.BodyHeaderFontSize,
    color: AppColors.TitleCardColor,
    marginBottom: 4,
  },
  SunriseSunset__Date: {
    color: AppColors.SecondaryThemeColor,
    fontSize: 18,
    marginBottom: 4,
  },
  SunriseSunset__ErrorMessage: {
    color: 'red',
  },
  SunriseSunset__Time: {
    color: AppColors.SecondaryThemeColor,
  },
});
