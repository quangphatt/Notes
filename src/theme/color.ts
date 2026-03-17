export type ThemeColors = {
  primary: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  dark: string;
  border: string;
  textSecondary: string;
  icon: string;
};

export const darkColors: ThemeColors = {
  primary: '#FF1493',
  background: '#2A1546',
  surface: '#3D2561',
  text: '#FFFFFF',
  muted: '#999999',
  dark: '#220B3A',
  border: '#4D3571',
  textSecondary: '#CCCCCC',
  icon: '#A855F7',
};

export const lightColors: ThemeColors = {
  primary: '#FF1493',
  background: '#F8F5FF',
  surface: '#FFFFFF',
  text: '#1A0A2E',
  muted: '#888888',
  dark: '#EDE8F8',
  border: '#D0C0E8',
  textSecondary: '#555555',
  icon: '#9333EA',
};

// Default export kept for backward compatibility
export const COLORS = darkColors;
