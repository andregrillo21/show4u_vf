import React, { Component, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import BuscaEndereco from '../src/BuscaEndereco';
import sqlServer from '../Database/DataBaseSql';
import TextInputMask from 'react-native-text-input-mask'
import { useNavigation, useRoute } from '@react-navigation/native';

import {
    TextInput,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

const initialState = {
    local: {
        latitude: 0,
        longitude: 0,
    },
}

export default function CadastroShow() {

    const routes = useRoute();
    const userLogin2 = routes.params.userLogin;

    const [horario, setHorario] = useState("");
    const [formaEntrada, setFormaEntrada] = useState("");
    const [status, setStatus] = useState("A");
    const Id_Banda_S = userLogin2[0].Id_Banda;
    const NomeBanda = userLogin2[0].Nome;
    const Genero = userLogin2[0].Genero;

    function sendBd({ }) {
        let data = '';
        data += '' + lat + ',';
        data += '' + lng + ',';
        data += '\'' + status + '\',';
        data += '\'' + horario + '\',';
        data += '' + Id_Banda_S + ',';
        data += '\'' + enderecoSelected + '\',';
        data += '\'' + NomeBanda + '\',';
        data += '\'' + Genero + '\',';
        data += '\'' + formaEntrada + '\'';

        console.log(data);

        const query = 'INSERT INTO dbo.Show (Latitude, Longitude, Estado, Horario, Id_Banda_S, Endereco, NomeBanda, GeneroBanda, forma_de_entrada) values (' + data + ')';
        var resultQuery = sqlServer.executeUpdate(query);

        resultQuery.then(result => {
            alert('Show cadastrado.');
        }).catch(err => {
            alert('Ocorreu um erro, por favor tente novamente.');
        });
    }

    const [state, setState] = useState({ ...initialState });
    var enderecoSelected = null;
    if (state.endereco){
        var enderecoSplit = state.endereco.split(", ")
        enderecoSelected = enderecoSplit[0] + ", " + enderecoSplit[1];
    }

    const lat = `${state.local.latitude}`;
    const lng = `${state.local.longitude}`;
    const handleLocationSelected = (data, { geometry }) => {
        const { location: { lat: latitude, lng: longitude } } = geometry

        setState({
            endereco: data.description,
            local: {
                latitude,
                longitude,
            }
        })
    }

    return (
        <LinearGradient colors={['#560194', '#160026']} style={styles.linearGradient}>
            

            <Text style={{margin: 30}}/>


            <View style={styles.viewContainer}>
                <Text style={styles.inputTitle}>Horário</Text>
                <TextInputMask
                    keyboardType='numeric'
                    style={styles.textInput}
                    onChangeText={setHorario}
                    value={horario}
                    mask={"[00]/[00]/[0000]-[00]:[00]"}
                    placeholderTextColor='#555'
                    placeholder="Data e Hora"
                />
            </View>

            <View style={styles.viewContainer}>
                <Text style={styles.inputTitle}>Forma de entrada</Text>
                <TextInput style={styles.textInput} onChangeText={setFormaEntrada}/>
            </View>

            <View style={styles.viewContainer}>
                <Text style={styles.inputTitle}>Status do show</Text>
                <TextInput style={styles.textInput} onChangeText={setStatus}/>
            </View>

            <View style={styles.viewButton}>
                <TouchableOpacity style={styles.customBtnBG} onPress={() => { sendBd(horario, formaEntrada, status)}}>
                    <Text style={styles.customBtnText}>CADASTRAR</Text>
                </TouchableOpacity>
            </View>

            <BuscaEndereco onLocationSelected={handleLocationSelected} />

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        justifyContent:'space-between'
    },

    viewContainer: {
        width:"100%",
        paddingHorizontal:10
    },

    inputTitle: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "bold",
    },

    textInput: {
        height: 40,
        width:"100%",
        borderRadius: 7,
        color: "#FFF",
        borderColor: "#FFF",
        borderWidth: 1
    },

    viewButton: {
        alignItems: "center",
        margin: 50,
    },

    customBtnBG: {
        height: 50,
        width: '70%',
        borderRadius: 30,
        alignItems: "center",
        justifyContent:'center',
        backgroundColor: "#D930BD",
    },

    customBtnText: {
        fontSize: 20,
        color: "#fff",
    },
})