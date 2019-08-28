import React, {useState, useEffect} from 'react'
import { SafeAreaView, Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native'

import api from '../services/api'

import logo from '../assets/logo.png';
import dislike from '../assets/dislike.png';
import like from '../assets/like.png';

import AsyncStorage from '@react-native-community/async-storage';

export default function Main( { navigation } ) {
    const id = navigation.getParam('user');

    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUsers() {
            const response = await api.post('/devs/index', [] ,{
                headers : { 
                    fromdevid: id
                }
            });

            console.log(response.data);
            setUsers(response.data);
        }
        loadUsers();
    }, [id]);

    async function handleLike(id) {
        console.log('like', id)

        await api.post(`/devs/${id}/likes`, null, {
            headers: {
                fromDevId: id
            }
        })
        setUsers(users.filter( user => user._id !== id))
    }
    async function handleDislike(id) {
        console.log('dislike', id)

        await api.post(`/devs/${id}/dislikes`, null, {
            headers: {
                fromDevId: id
            }
        })
        setUsers(users.filter( user => user._id !== id))
    }

    function logout() {
        AsyncStorage.removeItem('user');
        navigation.navigate('Login', { user: null });
    }

    return (
        <SafeAreaView style={style.container}>
            <TouchableOpacity onPress={() => logout()}>
                <Image style={style.logo} source={logo} />
            </TouchableOpacity>

            <View style={style.cardsContainer}>
                <View style={style.card}>
                    <Image 
                        style={style.avatar}
                        source={{ uri: 'https://avatars0.githubusercontent.com/u/4248081?v=4' }}
                    />
                    <View style={style.footer}>
                        <Text style={style.name}>Nome completo sinistro</Text>
                        <Text style={style.bio} numberOfLines={3} > Descrição do dev  Descrição do dev Descrição do dev Descrição do dev Descrição do dev Descrição do dev Descrição do dev Descrição do dev Descrição do dev </Text>
                    </View>
                    
                </View>
            </View>

            <View style={style.buttonsContainer}>
                <TouchableOpacity style={style.button}>
                    <Image source={dislike} />
                </TouchableOpacity>
                <TouchableOpacity style={style.button}>
                    <Image source={like} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: "center",
        justifyContent: "space-between"
    },
    logo: {
        marginTop: 30
    },
    cardsContainer: {
        flex: 1,
        alignSelf: "stretch",
        justifyContent: 'center',
        maxHeight: 500
    },
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        margin: 30,
        overflow: "hidden",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    avatar: {
        flex: 1,
        height: 300
    },
    footer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#333'
    },
    bio: {
        fontSize: 14,
        color: '#999',
        marginTop: 2,
        lineHeight: 20
    },
    buttonsContainer: {
        flexDirection: "row",
        marginBottom: 30
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 1,
        shadowOffset: {
            width: 0,
            height: 2
        }
    }
});