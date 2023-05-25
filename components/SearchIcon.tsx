import { Dispatch, FC, SetStateAction } from 'react';
import { Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { AppColors } from '../constants/ui';

type SearchIconProps = {
  onPress?: Dispatch<SetStateAction<any>>;
};

const SearchIcon: FC = ({ onPress }: SearchIconProps) => {
  return (
    <Pressable onPress={onPress}>
      <FontAwesome5
        name="search-location"
        size={24}
        color={AppColors.PrimaryThemeColor}
        style={{ marginRight: 15 }}
      />
    </Pressable>
  );
};

export default SearchIcon;
