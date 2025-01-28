import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './auth/Auth';
import Router from './routes/Router';
import 'expo-dev-client';
import { enableScreens } from 'react-native-screens';
enableScreens();
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </AuthProvider>
  );
}
