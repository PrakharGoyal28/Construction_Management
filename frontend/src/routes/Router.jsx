import { SafeAreaView, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../screens/Loading';
import AppStack from './AppStack';

import Login from '../screens/Login';
import EngineerStack from './EngineerStack';
import { NavigationContainer } from '@react-navigation/native';

const Router = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn, setIsLoggedIn, setUser,userRole,setUserRole } = useContext(AuthContext);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        const role = await AsyncStorage.getItem('userRole');

        if (user&&role) {
          setUser(JSON.parse(user));
          setUserRole(role);
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
  }, [setIsLoggedIn, setUser,setUserRole]); // Add dependencies for useEffect

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
  {isLoggedIn ? (
    userRole === "Supervisor"? <AppStack /> : <EngineerStack />
  ) : (
    <Login />
  )}
</SafeAreaView>

  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default Router;
