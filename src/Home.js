import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import IconHeadeset from 'react-native-vector-icons/Ionicons';
import IconGuitar from 'react-native-vector-icons/MaterialCommunityIcons';
IconHeadeset.loadFont();
IconGuitar.loadFont();
import {StyleSheet,View,Text, TouchableOpacity} from 'react-native';


export default function Home({navigation}) {
    return (
        <LinearGradient colors={['#560194', '#160026']} style={{flex:1 ,justifyContent:'space-around'}}>

            <Text style={styles.textTitle}>Bem-vindo</Text>

            <Text style={styles.textSelectUser}>Selecione o tipo de usuário</Text>

            <View style={styles.viewIcons}>

                <TouchableOpacity style={styles.icons} onPress={() => navigation.navigate('Mapa')}>
                    <IconHeadeset name="headset" size={100} color="#D930BD" />
                    <Text style={{fontSize:20,color:"#D930BD",fontWeight:"bold"}}>Ouvinte</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.icons} onPress={() => navigation.navigate('LoginPage')}>
                    <IconGuitar name="guitar-electric" size={100} color="#A83BF5"/>
                    <Text style={{fontSize:20,color:"#A83BF5",fontWeight:"bold"}}>Artista</Text>
                </TouchableOpacity>

            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({

    textTitle: {
        textAlign: "center",
        // margin: 40,
        fontSize: 30,
        fontWeight: "bold",
        color: "#FFF"
    },

    textSelectUser: {
        textAlign: "center",
        // marginTop: 100,
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFF"
    },

    viewIcons: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        // borderWidth:2,
        // borderColor:'#fff',
    },

    icons:{
        flex:1,
        alignItems:'center',
        // borderWidth:2,
        // borderColor:'#fff',
    },
})  