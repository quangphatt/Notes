import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note } from '@/types';

const NOTES_STORAGE_KEY = 'notes_app';

// Get all notes from AsyncStorage
export const getAllNotes = async (): Promise<Note[]> => {
  try {
    const data = await AsyncStorage.getItem(NOTES_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading notes:', error);
    return [];
  }
};

// Get notes by category
export const getNotesByCategory = async (category: string): Promise<Note[]> => {
  try {
    const notes = await getAllNotes();
    return notes.filter((note) => note.category === category);
  } catch (error) {
    console.error('Error filtering notes:', error);
    return [];
  }
};

// Get latest notes by category with limit
export const getLatestNotesByCategory = async (
  category: string,
  limit: number = 3,
): Promise<Note[]> => {
  try {
    const notes = await getNotesByCategory(category);
    return notes.sort((a, b) => b.createdAt - a.createdAt).slice(0, limit);
  } catch (error) {
    console.error('Error getting latest notes:', error);
    return [];
  }
};

// Save a new note
export const saveNote = async (
  note: Omit<Note, 'id' | 'createdAt'>,
): Promise<Note> => {
  try {
    const notes = await getAllNotes();
    const newNote: Note = {
      id: `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...note,
      createdAt: Date.now(),
    };
    notes.push(newNote);
    await AsyncStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
    return newNote;
  } catch (error) {
    console.error('Error saving note:', error);
    throw error;
  }
};

// Delete a note by ID
export const deleteNote = async (noteId: string): Promise<void> => {
  try {
    const notes = await getAllNotes();
    const filtered = notes.filter((note) => note.id !== noteId);
    await AsyncStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};

// Delete all notes
export const deleteAllNotes = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(NOTES_STORAGE_KEY);
  } catch (error) {
    console.error('Error deleting all notes:', error);
    throw error;
  }
};

// Get note count by category
export const getNoteCountByCategory = async (
  category: string,
): Promise<number> => {
  try {
    const notes = await getNotesByCategory(category);
    return notes.length;
  } catch (error) {
    console.error('Error getting note count:', error);
    return 0;
  }
};
