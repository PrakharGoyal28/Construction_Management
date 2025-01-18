import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native'
import React, { useState } from 'react'
import bg from '../../assets/loadingbg.jpg';
import Checkbox from 'expo-checkbox';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const handleSubmit = () => {
        Alert.alert('Form Submitted', `Username: ${username}\nPassword: ${password}`);
    };
    return (
        <ImageBackground source={bg} style={styles.container}>
            <View style={styles.box} >
                <Text style={styles.text}>Get Started</Text>
                <View style={styles.container}>

                    {/* Username Input */}
                    <View style={styles.inputDiv}>
                        <Text style={styles.inputText}>User Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your User Name here"
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>
                    {/* Password Input */}
                    <View style={styles.inputDiv}>
                        <Text style={styles.inputText}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>


                    {/* Checkbox */}
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            style={styles.checkbox}
                            value={isChecked}
                            onValueChange={setIsChecked}
                            color={isChecked ? '#aaa' : undefined}
                        />
                        <Text style={styles.checkboxText}>
                            Yes, I understand the T&C of the company
                        </Text>
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity
                        style={[
                            styles.button,
                            { backgroundColor: isChecked ? 'black' : '#aaa' }, // Disable button if checkbox is not checked
                        ]}
                        disabled={!isChecked} // Disable button functionality
                        onPress={handleSubmit}
                    >
                        <Text style={styles.buttonText}>Enter</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
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
        fontFamily: 'Albert Sans',
        fontSize: 32,
        fontWeight: '700',
        lineHeight: 38.4,
        marginTop: 30
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputDiv: {
        width: '80%'
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
        // fontFamily: 'Alber',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 19.2,
        textAlign: 'left',
        marginBottom: 15
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkboxText: {
        fontSize: 13,
        fontWeight: '500',
        lineHeight: 15.6,
        textAlign: 'left',
    },
    button: {
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 51,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    checkbox: {
        margin: 8,
    },
});


export default Login
