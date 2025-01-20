import { StyleSheet, Text, View } from 'react-native';
import Router from './routes/Router';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './auth/Auth';


export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </AuthProvider>
  );
}
