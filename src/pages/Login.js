import React, { useState, useEffect } from 'react';
import { 
    KeyboardAvoidingView, 
    StyleSheet, 
    Image, 
    TextInput,
    Text,
    TouchableOpacity,
    Platform
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';
import logo from '../assets/logo.png';

export default function Login({ navigation }) {
    const [user, setUser] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user')
            .then((user) => {

                console.log(user);

                if (user) {
                    navigation.navigate('Main', { user });
                }
            })
    }, []);

    async function handleLogin() {
        console.log(user);

        const response = await api.post('/devs', {
                username: user
            }
        );

        const { _id : userId } = response.data
        AsyncStorage.setItem('user', userId);
        navigation.navigate('Main', { user: userId });
    }

    return (
        <KeyboardAvoidingView 
            style={style.container}
            behavior="padding"
            enabled={Platform.OS === 'ios'}
        >
            <Image source={logo} />
            <TextInput 
                style={style.input}
                placeholder="Digite seu usuário do GitHub"
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
                value={user}
                onChangeText={setUser}
            />

            <TouchableOpacity 
                style={style.button}
                onPress={handleLogin}
            >
                <Text style={style.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: "center",
        alignItems: 'center',
        padding: 30
    },
    input: {
        height: 46,
        alignSelf: "stretch",
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15
    },
    button: {
        height: 46,
        alignSelf: "stretch",
        backgroundColor: '#df4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center"

    },
    buttonText: {
        color: '#fff',
        fontWeight: "bold",
        fontSize: 16
    }
})
