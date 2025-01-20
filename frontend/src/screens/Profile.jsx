import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../auth/Auth'
import Button from '../components/button'

const Profile = () => {
  const { setIsLoggedIn, logoutUser } = useContext(AuthContext)
  const handleSubmit = async () => {
    logoutUser()
  };
  return (
    <View style={styles.container}>
      <Button
        title="Enter"
        onPress={handleSubmit}
      />
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
})