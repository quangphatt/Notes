import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeIcon, SummaryIcon, PlusIcon } from '@/assets/icons';
import { useTheme } from '@/context/ThemeContext';

const { width } = Dimensions.get('window');

const BottomNavigation = ({ state, navigation }: BottomTabBarProps) => {
  const styles = useStyles();
  const { colors } = useTheme();

  const handlePress = (routeName: string) => {
    if (routeName === 'NewNoteTab') {
      navigation.navigate('NewNote');
    } else {
      const event = navigation.emit({
        type: 'tabPress',
        target: routeName,
        canPreventDefault: true,
      });

      if (!event.defaultPrevented) {
        navigation.navigate(routeName);
      }
    }
  };

  const isHomeActive = state.index === 0;
  const isSummaryActive = state.index === 1;

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {/* Home Tab */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => handlePress('HomeTab')}
          activeOpacity={0.7}
        >
          <HomeIcon
            width={50}
            height={50}
            color={isHomeActive ? colors.primary : '#6B6B7B'}
          />
          <Text
            style={[
              styles.tabLabel,
              { color: isHomeActive ? colors.primary : colors.muted },
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        {/* Plus Button */}
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => handlePress('NewNoteTab')}
          activeOpacity={0.7}
        >
          <PlusIcon size={40} />
        </TouchableOpacity>

        {/* Summary Tab */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => handlePress('SummaryTab')}
          activeOpacity={0.7}
        >
          <SummaryIcon
            width={50}
            height={50}
            color={isSummaryActive ? colors.primary : '#6B6B7B'}
          />
          <Text
            style={[
              styles.tabLabel,
              { color: isSummaryActive ? colors.primary : colors.muted },
            ]}
          >
            Summary
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const useStyles = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
    tabBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: colors.dark,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingTop: 10,
      paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
      paddingHorizontal: 20,
    },
    tabItem: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    tabLabel: {
      fontSize: 14,
      fontWeight: '500',
      marginTop: 4,
    },
    plusButton: {
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 20,
    },
  });
};

export default BottomNavigation;
