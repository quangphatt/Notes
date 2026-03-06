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
import { COLORS } from '@/theme/color';

// Create new note
const NewNoteScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Store category key
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigation = useNavigation();
  const styles = useStyles();

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
          <ChevronLeftIcon size={24} color="#FFFFFF" />
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
            <ChevronDownIcon size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Content Input */}
        <View style={styles.contentSection}>
          <TextInput
            style={styles.contentInput}
            placeholder="Please input note content"
            placeholderTextColor="#666"
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
                    <CheckIcon size={20} color="#FF1493" />
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

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
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
      color: '#FFFFFF',
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
      backgroundColor: '#3D2561',
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#4D3571',
    },
    dropdownLabel: {
      fontSize: 16,
      color: '#FFFFFF',
    },
    dropdownPlaceholder: {
      color: '#999',
    },
    pickerContainer: {
      backgroundColor: '#3D2561',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#4D3571',
      overflow: 'hidden',
      justifyContent: 'center',
    },
    picker: {
      color: '#FFFFFF',
      backgroundColor: 'transparent',
    },
    pickerItem: {
      color: '#FFFFFF',
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
      color: '#FFFFFF',
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
      backgroundColor: COLORS.dark,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    },
    saveButton: {
      backgroundColor: COLORS.primary,
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
      backgroundColor: '#3D2561',
      borderRadius: 16,
      width: '100%',
      maxHeight: 300,
      overflow: 'hidden',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#FFFFFF',
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#4D3571',
    },
    modalItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: '#4D3571',
    },
    modalItemText: {
      fontSize: 16,
      color: '#FFFFFF',
    },
    modalItemTextSelected: {
      color: COLORS.primary,
      fontWeight: '600',
    },
  });
};
