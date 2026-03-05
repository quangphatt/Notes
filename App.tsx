import { StatusBar, useColorScheme, View } from 'react-native';
import RootNavigation from '@/navigation/RootNavigation';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <RootNavigation />
    </View>
  );
}

export default App;
