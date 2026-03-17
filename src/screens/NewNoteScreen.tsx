import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ChevronLeftIcon,
  ChevronDownIcon,
  CheckIcon,
} from 'lucide-react-native';
import { saveNote } from '@/services/storage';
import { CATEGORIES } from '@/data/category';
import { useTheme } from '@/context/ThemeContext';

// Create new note
const NewNoteScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Store category key
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigation = useNavigation();
  const styles = useStyles();
  const { colors } = useTheme();

  const handleSaveNote = async () => {
    if (!selectedCategory) {
      Alert.alert('Error', 'Please select a category');
      return;
    }

    if (!content.trim()) {
      Alert.alert('Error', 'Please enter note content');
      return;
    }

    if (content.length > 200) {
      Alert.alert('Error', 'Note content cannot exceed 200 characters');
      return;
    }

    try {
      setLoading(true);
      await saveNote({
        category: selectedCategory,
        content: content.trim(),
      });

      // Reset form
      setContent('');
      setSelectedCategory(null);
      Alert.alert('Success', 'Note saved successfully');

      // Navigate back to Home after saving
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save note');
      console.error('Error saving note:', error);
    } finally {
      setLoading(false);
    }
  };

  const charLimit = 200;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ChevronLeftIcon size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New note</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Category Dropdown */}
        <View style={styles.dropdownSection}>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setIsDropdownOpen(true)}
          >
            <Text
              style={[
                styles.dropdownLabel,
                !selectedCategory && styles.dropdownPlaceholder,
              ]}
            >
              {selectedCategory
                ? CATEGORIES.find((cat) => cat.key === selectedCategory)?.name
                : 'Choose a category'}
            </Text>
            <ChevronDownIcon size={20} color={colors.muted} />
          </TouchableOpacity>
        </View>

        {/* Content Input */}
        <View style={styles.contentSection}>
          <TextInput
            style={styles.contentInput}
            placeholder="Please input note content"
            placeholderTextColor={colors.muted}
            multiline
            maxLength={charLimit}
            value={content}
            onChangeText={setContent}
            editable={!loading}
          />
        </View>
      </ScrollView>

      {/* Save Button - Fixed at bottom */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.saveButton, loading && styles.buttonDisabled]}
          onPress={handleSaveNote}
          disabled={loading}
        >
          <Text style={styles.saveButtonText}>
            {loading ? 'Saving...' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Dropdown Modal */}
      <Modal
        visible={isDropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsDropdownOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsDropdownOpen(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose a category</Text>
            <FlatList
              data={CATEGORIES}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedCategory(item.key);
                    setIsDropdownOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.modalItemText,
                      selectedCategory === item.key &&
                        styles.modalItemTextSelected,
                    ]}
                  >
                    {item.name}
                  </Text>
                  {selectedCategory === item.key && (
                    <CheckIcon size={20} color={colors.primary} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default NewNoteScreen;

const useStyles = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: insets.top,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 12,
    },
    backButton: {
      marginRight: 8,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    scrollView: {
      flex: 1,
      paddingHorizontal: 16,
    },
    pickerSection: {
      marginBottom: 20,
      marginTop: 16,
    },
    dropdownSection: {
      marginBottom: 20,
      marginTop: 16,
    },
    dropdown: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.surface,
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    dropdownLabel: {
      fontSize: 16,
      color: colors.text,
    },
    dropdownPlaceholder: {
      color: colors.muted,
    },
    pickerContainer: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
      justifyContent: 'center',
    },
    picker: {
      color: colors.text,
      backgroundColor: 'transparent',
    },
    pickerItem: {
      color: colors.text,
      fontSize: 16,
      height: 120,
    },
    contentSection: {
      flex: 1,
    },
    contentInput: {
      backgroundColor: 'transparent',
      borderRadius: 12,
      borderWidth: 2,
      borderColor: '#00BFFF',
      color: colors.text,
      fontSize: 16,
      paddingHorizontal: 16,
      paddingVertical: 16,
      minHeight: 200,
      textAlignVertical: 'top',
    },
    bottomContainer: {
      paddingHorizontal: 16,
      paddingTop: 24,
      paddingBottom: insets.bottom > 0 ? insets.bottom : 24,
      backgroundColor: colors.dark,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    },
    saveButton: {
      backgroundColor: colors.primary,
      borderRadius: 25,
      paddingVertical: 14,
      alignItems: 'center',
    },
    saveButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    buttonDisabled: {
      opacity: 0.6,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 32,
    },
    modalContent: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      width: '100%',
      maxHeight: 300,
      overflow: 'hidden',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    modalItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    modalItemText: {
      fontSize: 16,
      color: colors.text,
    },
    modalItemTextSelected: {
      color: colors.primary,
      fontWeight: '600',
    },
  });
};
