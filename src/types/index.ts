export interface Note {
  id: string;
  category: string;
  content: string;
  createdAt: number; // timestamp
}

export type RootStackParamList = {
  MainApp: undefined;
  Home: undefined;
  NewNote: undefined;
  Summary: undefined;
  Settings: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  SummaryTab: undefined;
};
