import { View, Text } from 'react-native'
import React, { createContext, useState,useEffect } from 'react'
import { BASE_URL } from './config'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    const loadUserFromStorage = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      const storedRole = await AsyncStorage.getItem('userRole');

      if (storedUser && storedRole) {
        setUser(JSON.parse(storedUser));
        setUserRole(storedRole);
        setIsLoggedIn(true);
      }
    };
    loadUserFromStorage();
  }, []);

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/users/login`,
        { email, password },
        // { withCredentials: true } // Required for cookies
      );
      const data =await response.data; // Access user from response
      setUser(data.data)
      console.log(user)
      console.log(userRole);
      // console.log(data);
      
      setUserRole(data.data.role);

      setIsLoggedIn(true)
      await AsyncStorage.setItem('user', JSON.stringify(data.data));
      await AsyncStorage.setItem('userRole', data.data.role);

      return data.data
    } catch (error) {
      console.error('Login failed:', result.message);
    }
  }
  const logoutUser = async () => {
    setUser(null);
    setUserRole(null);
    try {
      const response = await axios.post(
        `${BASE_URL}/users/logout`,
        { userId:user._id },
        { withCredentials: true } 
      );
      // console.log(user);
      
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('userRole');

      
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Failed to logout:', error.message);
    }
  };
  const defaultValue = {
    user: user,
    isLoggedIn,
    setIsLoggedIn,
    setUser: setUser,
    loginUser,
    userRole:userRole,
    setUserRole:setUserRole,
    logoutUser
  }
  return (
    <AuthContext.Provider value={defaultValue}>
      {children}
    </AuthContext.Provider>
  )
}

