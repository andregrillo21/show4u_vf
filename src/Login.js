import React, { Component, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import IconHeadeset from 'react-native-vector-icons/Ionicons';
import IconGuitar from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, KeyboardAvoidingView, Platform, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import sqlServer from '../Database/DataBaseSql';
import AsyncStorage from '@react-native-community/async-storage';

IconHeadeset.loadFont();
IconGuitar.loadFont();

export default function Login({ navigation }) {
    const [email, setEmail] = useState("sergio@hot.com");
    const [senha, setSenha] = useState("123");

    React.useEffect(() => {
        async function LoadStorageData() {
            const getResult = await AsyncStorage.getItem('@RNAuth:user');
            const result = JSON.parse(getResult);

            if (result) {
                console.log("foi " + result)
                navigation.navigate("HomeBanda", { result })
            }
        }
        LoadStorageData();
    }, [])

    async function sendBd() {
        try {
            var _email = '\'' + email + '\'';
            var _senha = '\'' + senha + '\'';
            const query = 'SELECT * FROM dbo.Banda WHERE Email = ' + _email + ' AND Senha = ' + _senha + '';
            const resultQuery = sqlServer.executeQuery(query);

            resultQuery.then(async (result) => {

                if (result) {
                    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(result)) |
                        navigation.navigate('HomeBanda', { result });
                } else {
                    Alert.alert("Opa", "Seu e-mail ou senha estão incorretos.")
                }

            }).catch(err => {
                alert('Erro na busca');
            });


        } catch (err) {
            console.log('falha', err)
        }
    }

    return (
        <LinearGradient colors={['#560194', '#160026']} style={styles.linearGradient}>

                <Text style={styles.textTitle}>Login</Text>


                <View style={styles.viewContainer}>
                    <Text style={styles.inputTitle}>E-mail</Text>
                    <TextInput style={styles.textInput} value={email} onChangeText={setEmail}/>
                </View>

                <View style={styles.viewContainer}>
                    <Text style={styles.inputTitle}>Senha</Text>
                    <TextInput style={styles.textInput} secureTextEntry={true} value={senha} onChangeText={setSenha}/>
                </View>

                <View style={styles.viewCreateLogin}>
                    <TouchableOpacity style={{padding:10}} onPress={() => navigation.navigate('RegisterLoginPage')}>
                        <Text style={styles.TextCreateLogin}>Crie sua conta</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.viewButton}>
                    <TouchableOpacity style={styles.customBtnBG} onPress={() => { sendBd(email, senha) }}>
                        <Text style={styles.customBtnText}>ENTRAR</Text>
                    </TouchableOpacity>
                </View>


        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        justifyContent:'space-around'
    },

    textTitle: {
        textAlign: "center",
        margin: 40,
        fontSize: 50,
        fontWeight: "bold",
        color: "#FFF"
    },

    viewContainer: {
        width:"100%",
        paddingHorizontal:10,
        marginTop:'10%'
    },

    inputTitle: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "bold",
    },

    textInput: {
        height: 40,
        borderRadius: 7,
        color: "#FFF",
        fontSize: 20,
        borderWidth: 1,
        borderColor: "#FFF",
    },

    viewButton: {
        margin: 50,
        alignItems: "center",
        justifyContent:'center',
    },

    customBtnBG: {
        width: "65%",
        height: 50,
        borderRadius: 30,
        alignItems: "center",
        justifyContent:'center',
        backgroundColor: "#D930BD",
    },

    customBtnText: {
        fontSize: 20,
        color: "#fff",
    },

    viewCreateLogin: {
        padding:10,
        marginTop: 50,
        alignItems: "center",
        // borderWidth: 1,
        // borderColor: "#FFF",
    },

    TextCreateLogin: {
        color: "#D930BD",
        fontSize: 20
    }
})