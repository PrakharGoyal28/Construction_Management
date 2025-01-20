import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'


import Loading from '../screens/Loading'
import AppStack from './AppStack'
import Login from '../screens/Login'
import { AuthContext } from '../auth/Auth'
import AsyncStorage from '@react-native-async-storage/async-storage'


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
  }, []);

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      {isLoggedIn ? <AppStack /> : <Login />}
    </>
  )
}

export default Router