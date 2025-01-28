import { SafeAreaView, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../screens/Loading';
import AppStack from './AppStack';
import Login from '../screens/Login';

const Router = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn, setIsLoggedIn, setUser } = useContext(AuthContext);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          setUser(JSON.parse(user));
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Failed to load user from storage:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, [setIsLoggedIn, setUser]); // Add dependencies for useEffect

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {isLoggedIn ? <AppStack /> : <Login />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default Router;
