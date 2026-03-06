import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  Trash2Icon,
  HeadphonesIcon,
  FileTextIcon,
  ShieldIcon,
  InfoIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from 'lucide-react-native';
import { COLORS } from '@/theme/color';
import { deleteAllNotes } from '@/services/storage';

const settingsItems = [
  {
    title: 'Online Customer',
    icon: HeadphonesIcon,
    onPress: () => {
      Alert.alert(
        'Online Customer',
        'Contact support at support@notes-app.com',
      );
    },
  },
  {
    title: 'User Agreement',
    icon: FileTextIcon,
    onPress: () => {
      Alert.alert(
        'User Agreement',
        'By using this app, you agree to our terms and conditions.',
      );
    },
  },
  {
    title: 'Privacy Policy',
    icon: ShieldIcon,
    onPress: () => {
      Alert.alert(
        'Privacy Policy',
        'We respect your privacy. Your notes are stored locally on your device.',
      );
    },
  },
  {
    title: 'About Us',
    icon: InfoIcon,
    onPress: () => {
      Alert.alert(
        'About Us',
        'Notes App v1.0\n\nA simple and elegant notes application for organizing your thoughts.',
      );
    },
  },
];

const SettingsScreen = () => {
  const navigation = useNavigation();
  const styles = useStyles();

  const handleDeleteAllNotes = () => {
    Alert.alert(
      'Delete All Notes',
      'Are you sure you want to delete all notes? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            // Delete all notes from storage
            await deleteAllNotes();
            Alert.alert('Success', 'All notes have been cleared.');
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ChevronLeftIcon size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {settingsItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.settingItem}
            onPress={item.onPress}
          >
            <View style={styles.settingContent}>
              <View style={styles.iconContainer}>
                <item.icon size={28} color="#A855F7" />
              </View>
              <Text style={styles.settingTitle}>{item.title}</Text>
            </View>
            <ChevronRightIcon size={20} color={COLORS.primary} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteAllNotes}
        >
          <Trash2Icon size={20} color="#FFFFFF" style={styles.deleteIcon} />
          <Text style={styles.deleteButtonText}>Delete All Notes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsScreen;

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
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 14,
      backgroundColor: COLORS.surface,
      borderRadius: 8,
      marginBottom: 12,
    },
    settingContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    iconContainer: {
      width: 36,
      height: 36,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 14,
    },
    settingTitle: {
      fontSize: 16,
      color: '#FFFFFF',
      fontWeight: '500',
    },
    settingArrow: {
      fontSize: 20,
      color: COLORS.primary,
    },
    bottomContainer: {
      paddingHorizontal: 16,
      paddingTop: 24,
      paddingBottom: insets.bottom > 0 ? insets.bottom : 24,
      backgroundColor: COLORS.dark,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    },
    deleteButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.primary,
      borderRadius: 25,
      paddingVertical: 14,
      paddingHorizontal: 24,
    },
    deleteIcon: {
      marginRight: 8,
    },
    deleteButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
    },
  });
};
