import React, { Component, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import BuscaEndereco from '../src/BuscaEndereco';
import sqlServer from '../Database/DataBaseSql';
import TextInputMask from 'react-native-text-input-mask'
import { useNavigation, useRoute } from '@react-navigation/native';

import {Picker} from '@react-native-community/picker'

import {
    TextInput,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Alert
} from 'react-native';


export default function UpdateShow({ navigation }) {

    const navigat = useNavigation()

    const routes = useRoute();
    const dadosShow = routes.params.res;

    const [horario, setHorario] = useState(dadosShow.Horario);
    const [formaEntrada, setFormaEntrada] = useState(dadosShow.forma_de_entrada);
    const [status, setStatus] = useState(dadosShow.Estado);

    const initialState = {
        endereco: dadosShow.Endereco,
        local: {
          latitude: dadosShow.Latitude,
          longitude: dadosShow.Longitude,
        },
    }

    const [state, setState] = useState({ ...initialState });
    var enderecoSelected = null;
    if (state.endereco){
        var enderecoSplit = state.endereco.split(", ")
        enderecoSelected = enderecoSplit[0] + ", " + enderecoSplit[1];
    }

    const lat = `${state.local.latitude}`;
    const lng = `${state.local.longitude}`;

    function sendBd({ }) {
        let data = '';
        data += '' + lat + ',';
        data += '' + lng + ',';
        data += '\'' + status + '\',';
        data += '\'' + horario + '\',';
        data += '\'' + enderecoSelected + '\',';
        data += '\'' + formaEntrada + '\'';

        const query = "UPDATE dbo.Show SET Latitude = " + lat + ", Longitude = " + lng + ", Estado = '" + status + "', Horario = '" + horario + "', Endereco = '" + enderecoSelected + "', forma_de_entrada = '" + formaEntrada + "' WHERE Id_Show = " + dadosShow.Id_Show + "";
        console.log(query);

        var resultQuery = sqlServer.executeUpdate(query);

        resultQuery.then(result => {
            console.log(result)
            Alert.alert('Opa', 'Dados do show, alterados.');
            navigat.goBack();
        }).catch(err => {
            alert('Ocorreu um erro, por favor tente novamente.');
        });
    }


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

            <View style={styles.viewTitle}>
                <Text style={styles.textTitle}/>
            </View>

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
                <TextInput style={styles.textInput} value={formaEntrada} onChangeText={setFormaEntrada}/>
            </View>

            <View style={styles.viewContainer}>
                <Text style={styles.inputTitle}>Status do show</Text>
                <View style={{borderColor:"#fff",borderWidth:1, borderRadius:7}}>
                    <Picker style={styles.textInput} selectedValue={status} onValueChange={(itemValue) => setStatus(itemValue)}>
                        <Picker.Item label="Aberto" value="A"/>
                        <Picker.Item label="Fechado" value="F"/>
                    </Picker>
                </View>
            </View>

            <View style={styles.viewButton}>
                <TouchableOpacity style={styles.customBtnBG} onPress={() => { sendBd(horario, formaEntrada, status) }}  >
                    <Text style={styles.customBtnText}>ATUALIZAR</Text>
                </TouchableOpacity>
            </View>

            <BuscaEndereco onLocationSelected={handleLocationSelected}/>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        justifyContent:'space-around'
    },

    viewTitle: {
        alignItems: "center",
    },

    textTitle: {
        textAlign: "center",
        margin: 20,
        fontSize: 30,
        fontWeight: "bold",
        color: "#FFF"
    },

    viewContainer: {
        width:"100%",
        paddingHorizontal:10,
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
})