import React, { useContext, useState } from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    SafeAreaView,
    TextInput,
    Alert,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import axios from 'axios'; // Import Axios for API requests
import bg from '../assets/loadingbg.jpg';
import Button from '../components/button';
import { AuthContext } from '../auth/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const { loginUser, user } = useContext(AuthContext)

    const handleSubmit = async () => {
        const response = await loginUser(username, password);
        // if(user){
        //     if(user.role=="SuperVis")
        // }
    };

    return (
        <ImageBackground source={bg} style={styles.container}>
            <SafeAreaView style={styles.box}>
                <Text style={styles.text}>Get Started</Text>
                <SafeAreaView style={styles.container}>
                    {/* Username Input */}
                    <SafeAreaView style={styles.inputDiv}>
                        <Text style={styles.inputText}>User Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email here"
                            value={username}
                            onChangeText={setUsername}
                        />
                    </SafeAreaView>

                    {/* Password Input */}
                    <SafeAreaView style={styles.inputDiv}>
                        <Text style={styles.inputText}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </SafeAreaView>

                    {/* Checkbox */}
                    <SafeAreaView style={styles.checkboxContainer}>
                        <Checkbox
                            style={styles.checkbox}
                            value={isChecked}
                            onValueChange={setIsChecked}
                            color={isChecked ? '#aaa' : undefined}
                        />
                        <Text style={styles.checkboxText}>
                            Yes, I understand the T&C of the company
                        </Text>
                    </SafeAreaView>

                    {/* Submit Button */}
                    <SafeAreaView style={{ width: '80%' }}>
                        <Button
                            title="Enter"
                            onPress={handleSubmit}
                            isDisabled={!isChecked}
                        />
                    </SafeAreaView>
                </SafeAreaView>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    box: {
        flex: 1,
        alignItems: 'center',
        height: '80%',
        width: '100%',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    text: {
        fontSize: 32,
        fontWeight: '700',
        marginTop: 30,
    },
    inputDiv: {
        width: '80%',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    inputText: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 15,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkboxText: {
        fontSize: 13,
        fontWeight: '500',
    },
    checkbox: {
        margin: 8,
    },
});

export default Login;
