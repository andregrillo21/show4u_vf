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
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    React.useEffect(() => {
        async function LoadStorageData() {
            const getResult = await AsyncStorage.getItem('@RNAuth:user');
            const result = JSON.parse(getResult);

            if (result[0]) {
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

                if (result[0]) {
                    console.log(result)
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

            <ScrollView style={{flex:1}}>
                <View>
                    <Text style={styles.textTitle}>
                        Login
                    </Text>
                </View>

                <View style={styles.viewContainer}>
                    <Text style={styles.inputTitle}>
                        E-mail
                    </Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(email) => setEmail(email)}
                    />
                </View>

                <View style={styles.viewContainer}>
                    <Text style={styles.inputTitle}>
                        Senha
                    </Text>
                    <TextInput
                        style={styles.textInput}
                        secureTextEntry={true}
                        onChangeText={(senha) => setSenha(senha)}
                    />
                </View>

                <View style={styles.viewCreateLogin}>
                    <Text
                        style={styles.TextCreateLogin}
                        onPress={() => navigation.navigate('RegisterLoginPage')}>
                        Crie sua conta
                    </Text>
                </View>

                <View style={styles.viewButton}>
                    <TouchableOpacity
                        style={styles.customBtnBG}
                        onPress={() => { sendBd(email, senha) }}  >
                        <Text style={styles.customBtnText}>ENTRAR</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
    },

    textTitle: {
        textAlign: "center",
        margin: 40,
        fontSize: 50,
        fontWeight: "bold",
        color: "#FFF"
    },

    viewContainer: {
        marginLeft: 10,
        marginTop: 20
    },

    inputTitle: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "bold",
    },

    textInput: {
        height: 40,
        width: 360,
        borderRadius: 7,
        borderColor: "#FFF",
        color: "#FFF",
        fontSize: 20,
        padding: 10,
        borderWidth: 1
    },

    viewButton: {
        alignItems: "center",
        margin: 50,
        marginTop: 150,
        marginBottom: 80
    },

    customBtnBG: {
        backgroundColor: "#D930BD",
        width: 200,
        height: 50,
        alignItems: "center",
        paddingVertical: 10,
        borderRadius: 30
    },

    customBtnText: {
        fontSize: 20,
        color: "#fff",
    },

    viewCreateLogin: {
        alignItems: "center",
        marginTop: 50
    },

    TextCreateLogin: {
        color: "#D930BD",
        fontSize: 20
    }
})