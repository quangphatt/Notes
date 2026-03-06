import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getLatestNotesByCategory } from '@/services/storage';
import { CATEGORIES } from '@data/category';
import { Note } from '@/types';
import { BoltIcon } from 'lucide-react-native';
import { COLORS } from '@/theme/color';

const HomeScreen = () => {
  const [categoryNotes, setCategoryNotes] = useState<Record<string, Note[]>>(
    {},
  );
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();
  const styles = useStyles();

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, []),
  );

  const loadNotes = async () => {
    try {
      setLoading(true);
      const notesMap: Record<string, Note[]> = {};

      for (const category of CATEGORIES) {
        const notes = await getLatestNotesByCategory(category.key, 3);
        notesMap[category.key] = notes;
      }

      setCategoryNotes(notesMap);
    } catch (error) {
      console.error('Error loading notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const truncateContent = (content: string, maxLength: number = 20): string => {
    return content.length > maxLength
      ? content.substring(0, maxLength)
      : content;
  };

  const onPressSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
        <Pressable onPress={onPressSettings}>
          <BoltIcon size={32} color="#999" />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Recently created notes</Text>

        {CATEGORIES.map((category, index) => (
          <View key={category.key} style={styles.categorySection}>
            <View style={styles.categoryHeader}>
              {!!category.icon && <category.icon size={20} color={COLORS.primary} />}
              <Text style={styles.categoryName}>{category.name}</Text>
            </View>

            {categoryNotes[category.key] &&
            categoryNotes[category.key].length > 0 ? (
              categoryNotes[category.key].map((note, noteIndex) => (
                <TouchableOpacity
                  key={note.id}
                  style={[
                    styles.noteItem,
                    noteIndex === categoryNotes[category.key].length - 1 &&
                      styles.lastNoteItem,
                  ]}
                >
                  <Text style={styles.noteContent}>
                    {truncateContent(note.content)}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No notes yet</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

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
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 12,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    headerIcon: {
      fontSize: 24,
    },
    scrollView: {
      flex: 1,
      paddingHorizontal: 16,
    },
    sectionTitle: {
      fontSize: 14,
      color: '#999',
      marginBottom: 16,
      marginTop: 8,
    },
    categorySection: {
      marginBottom: 24,
    },
    categoryHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      gap: 8,
    },
    categoryIcon: {
      fontSize: 20,
      marginRight: 12,
    },
    categoryName: {
      fontSize: 18,
      fontWeight: '600',
      color: '#FFFFFF',
      flex: 1,
    },
    noteItem: {
      paddingVertical: 12,
      paddingHorizontal: 14,
      backgroundColor: '#3D2561',
      borderRadius: 8,
      marginBottom: 10,
    },
    lastNoteItem: {
      marginBottom: 0,
    },
    noteContent: {
      fontSize: 14,
      color: '#CCC',
      lineHeight: 20,
    },
    emptyState: {
      paddingVertical: 20,
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 14,
      color: '#666',
    },
    bottomNav: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#2A1546',
      borderTopColor: '#3D2561',
      borderTopWidth: 1,
      paddingVertical: 8,
      paddingBottom: 20,
    },
    navIcon: {
      alignItems: 'center',
    },
    activeIcon: {
      backgroundColor: '#FF1493',
    },
    navLabel: {
      fontSize: 12,
      color: '#999',
      marginTop: 4,
    },
    iconCircle: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#666',
    },
    iconSquare: {
      width: 24,
      height: 24,
      borderRadius: 6,
      backgroundColor: '#666',
    },
  });
};
