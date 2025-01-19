import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'


import Loading from '../screens/Loading'
import AppStack from './AppStack'
import Login from '../screens/Login'


const Router = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)

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