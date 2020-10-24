import React, { Component, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import IconHeadeset from 'react-native-vector-icons/Ionicons';
import IconLogOut from 'react-native-vector-icons/Ionicons';

import IconGuitar from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import sqlServer from '../Database/DataBaseSql';

IconHeadeset.loadFont();
IconLogOut.loadFont();
IconGuitar.loadFont();
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default function Home({ navigation }) {
    const routes = useRoute();
    const userLogin = routes.params.result;

    function logout() {
        AsyncStorage.clear()
        navigation.navigate("LoginPage")
    }

    const query = `SELECT * from dbo.Show WHERE Id_Banda_S = ${userLogin[0].Id_Banda} AND Estado = 'A'`;
    var resultQuery = sqlServer.executeQuery(query);

    const [docs, setDocs] = useState([]);

    resultQuery.then(result => {
        setDocs(result);
    }).catch(err => {
        alert('Erro na busca');
    });

    function RedCadastroShow() {
        navigation.navigate('RegisterBandPage', { userLogin });
    }

    function UpdateShow(res){
       navigation.navigate('UpdateShow',{res})
    }

    return (
        <LinearGradient colors={['#560194', '#160026']} style={styles.linearGradient}>
            <View style={styles.viewContent}>
                <Text style={styles.textTitle}>Seu menu</Text>
            </View>

            <IconLogOut
                style={styles.styleIconLogOut}
                name="log-out-outline"
                size={40}
                color="#A83BF5"
                onPress={() => logout()}
            />

            <View style={styles.viewButton}>
                <TouchableOpacity style={styles.customBtnBG}onPress={() => { RedCadastroShow() }}>
                    <Text style={styles.customBtnText}>Cadastrar show</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.viewListShows}>
                <Text style={styles.textListShows}>Lista de shows</Text>
            </View>

            {docs.map(res => (
                <TouchableOpacity key={res.Id_Show} onPress={()=>UpdateShow(res)} style={styles.viewShow}>
                    <Text style={styles.textShow}>Endereço: {res.Endereco}</Text>
                    <Text style={styles.textShow}>Data: {res.Horario}</Text>
                    <Text style={styles.textShow}>Tipo de entrada: {res.forma_de_entrada}</Text>
                    <Text style={styles.textShow}>Status do show: {res.Estado}</Text>
                </TouchableOpacity>
            ))}

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
        margin: 20,
        fontSize: 30,
        fontWeight: "bold",
        color: "#FFF"
    },

    styleIconLogOut: {
        textAlign: "right",
        marginTop: -60,
        marginBottom: 35
    },

    viewButton: {
        alignItems: "center",
        margin: 50,
        marginBottom: 50
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

    viewListShows: {
        alignItems: "center"
    },

    textListShows: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "bold"
    },

    viewShow: {
        marginTop: 20,
        backgroundColor: "#FFF",
    },

    textShow: {
        margin: 5,
        marginLeft: 10,
        fontWeight: "bold"
    }
});