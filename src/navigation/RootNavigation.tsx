import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { RootStackParamList, MainTabParamList } from '@/types';
import HomeScreen from '@/screens/HomeScreen';
import NewNoteScreen from '@/screens/NewNoteScreen';
import SummaryScreen from '@/screens/SummaryScreen';
import SettingsScreen from '@screens/SettingsScreen';
import BottomNavigation from './BottomNavigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const renderTabBar = (props: any) => <BottomNavigation {...props} />;

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="SummaryTab" component={SummaryScreen} />
    </Tab.Navigator>
  );
}

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainApp" component={MainTabNavigator} />
        <Stack.Screen name="NewNote" component={NewNoteScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
