import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getNoteCountByCategory, getAllNotes } from '@/services/storage';
import { CATEGORIES } from '@/data/category';
import { COLORS } from '@/theme/color';

export default function SummaryScreen() {
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>(
    {},
  );
  const [loading, setLoading] = useState(true);
  const styles = useStyles();

  // Avatar colors for each category
  const avatarColors = ['#7DD3A0', '#A8D5F0', '#F5E6A3'];

  useFocusEffect(
    React.useCallback(() => {
      loadCategoryCounts();
    }, []),
  );

  const loadCategoryCounts = async () => {
    try {
      setLoading(true);
      const countMap: Record<string, number> = {};

      for (const category of CATEGORIES) {
        const count = await getNoteCountByCategory(category.key);
        countMap[category.key] = count;
      }

      setCategoryCounts(countMap);
    } catch (error) {
      console.error('Error loading category counts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenInBrowser = async (category: string) => {
    try {
      const notes = await getAllNotes();
      const categoryNotes = notes.filter((note) => note.category === category);
      const categoryName =
        CATEGORIES.find((cat) => cat.key === category)?.name || category;

      if (categoryNotes.length === 0) {
        Alert.alert('No Notes', `No notes found in "${categoryName}" category`);
        return;
      }

      // For now, just show an alert
      Alert.alert(
        'Notes Overview',
        `Total notes in "${categoryName}": ${categoryNotes.length}\n\nNote: In a production app, this would open in the browser.`,
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to load notes');
      console.error('Error opening notes:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Summary</Text>
        <Image
          source={require('@/assets/images/robot.png')}
          style={styles.robotImage}
          resizeMode="contain"
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Category Cards */}
        {CATEGORIES.map((category, index) => (
          <View key={category.key} style={styles.categoryCard}>
            {/* Top Row: Icon, Name, Detail Button */}
            <View style={styles.cardTopRow}>
              <View style={styles.categoryInfo}>
                <View
                  style={[
                    styles.iconCircle,
                    {
                      backgroundColor:
                        avatarColors[index % avatarColors.length],
                    },
                  ]}
                >
                  {category.icon && <category.icon size={28} color="#333" />}
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </View>
              <TouchableOpacity
                style={styles.detailButton}
                onPress={() => handleOpenInBrowser(category.key)}
              >
                <Text style={styles.detailButtonText}>Detail</Text>
              </TouchableOpacity>
            </View>

            {/* Record Count Box */}
            <View style={styles.recordCountBox}>
              <Text style={styles.recordCountText}>
                This topic has a total of {categoryCounts[category.key] || 0}{' '}
                records.
              </Text>
            </View>
          </View>
        ))}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const useStyles = () => {
  const insets = useSafeAreaInsets();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
      paddingTop: insets.top,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 12,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    robotImage: {
      width: 100,
      height: 100,
    },
    scrollView: {
      flex: 1,
      paddingHorizontal: 16,
    },
    categoryCard: {
      marginBottom: 24,
    },
    cardTopRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    categoryInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    iconCircle: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
      borderWidth: 2,
      borderColor: '#FFFFFF',
    },
    categoryName: {
      fontSize: 18,
      fontWeight: '600',
      color: '#FFFFFF',
      flex: 1,
    },
    detailButton: {
      backgroundColor: COLORS.primary,
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 24,
    },
    detailButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    recordCountBox: {
      backgroundColor: 'rgba(61, 37, 97, 0.6)',
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: 'rgba(77, 53, 113, 0.5)',
    },
    recordCountText: {
      fontSize: 14,
      color: '#999',
    },
    bottomSpacer: {
      height: 40,
    },
  });
};
