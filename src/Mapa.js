import React, { useState, useEffect } from 'react';
import MapsView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { PermissionsAndroid, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import sqlServer from '../Database/DataBaseSql';
import IconGuitar from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import ArrowBack from 'react-native-vector-icons/Ionicons';

export default function App() {

    const navig = useNavigation()

    const [docs, setDocs] = useState([]);
    const query = "SELECT * from dbo.Show WHERE Estado = 'A'";
    const resultQuery = sqlServer.executeQuery(query);

    resultQuery.then(result => {
        setDocs(result);
    }).catch(err => {
        alert('Erro na busca');
    });

    const [getCurrentRegion, setCurrentRegion] = useState(null);

    async function loadInitialPosition() {
        await Geolocation.getCurrentPosition(
            (position) => {
                const { coords } = position
                const { latitude, longitude } = coords
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0,
                    longitudeDelta: 0.005,
                })
            },
        );
    }

    useEffect(() => {
        loadInitialPosition();
    },[]);

    function handleRegionChange(region) {
        setCurrentRegion(region);
    }

    if (!getCurrentRegion) {
        return null;
    }

    return (
        <>
        <MapsView
            onRegionChangeComplete={handleRegionChange}
            style={{ flex: 1 }}
            initialRegion={getCurrentRegion}
            showsUserLocation
            loadingEnabled
        >
            {docs.map(desc => (
                console.log(desc),
                <Marker
                    key={desc.Id_Show}
                    coordinate={{
                        longitude: desc.Longitude,
                        latitude: desc.Latitude,
                    }}>

                    <IconGuitar name="guitar-electric" size={50} color="#1c1c1c" />

                    <Callout>
                        <View style={{ width: 200, textAlign: "left", backgroundColor: "#000" }}>
                            <Text style={{ fontSize: 13, color: "#FFF" }}> Data: {desc.Horario} </Text>
                            <Text style={{ fontSize: 13, color: "#FFF" }}> Entrada: {desc.forma_de_entrada} </Text>
                            <Text style={{ fontSize: 13, color: "#FFF" }}> Endereço: {desc.Endereco} </Text>
                            <Text style={{ fontSize: 13, color: "#FFF" }}> Banda: {desc.NomeBanda} </Text>
                            <Text style={{ fontSize: 13, color: "#FFF" }}> Genero: {desc.GeneroBanda} </Text>
                        </View>
                    </Callout>

                </Marker>
            ))}
        </MapsView>
        <TouchableOpacity style={{
            position:"absolute",
            top:10, left:10,
            padding:20,
            // backgroundColor:"#1c1c1caa"

        }}>
            <ArrowBack
                style={styles.styleIconLogOut}
                name="arrow-back-outline"
                size={40}
                color="#A83BF5"
                onPress={() => navig.goBack()}
            />
        </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    mapView: {
        flex: 1,
    }
})