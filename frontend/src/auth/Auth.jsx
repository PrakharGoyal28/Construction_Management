import { View, Text } from 'react-native'
import React, { createContext, useState } from 'react'
import { BASE_URL } from './config'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState("")

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/users/login`,
        { email, password },
        { withCredentials: true } // Required for cookies
      );
      const data =await response.data; // Access user from response
      setUser(data.data)
      console.log(user)
      setIsLoggedIn(true)
      await AsyncStorage.setItem('user', JSON.stringify(data.data));
      return data.data
    } catch (error) {
      console.error('Login failed:', result.message);
    }
  }
  const logoutUser = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/users/logout`,
        { userId:user._id },
        { withCredentials: true } // Required for cookies
      );
      await AsyncStorage.removeItem('user');
      
      setUser(null);
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
    logoutUser
  }
  return (
    <AuthContext.Provider value={defaultValue}>
      {children}
    </AuthContext.Provider>
  )
}

