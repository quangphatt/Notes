import { View } from 'react-native';
import RootNavigation from '@/navigation/RootNavigation';
import { ThemeProvider } from '@/context/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <View style={{ flex: 1 }}>
        <RootNavigation />
      </View>
    </ThemeProvider>
  );
};

export default App;
