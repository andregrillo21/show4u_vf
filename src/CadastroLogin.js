import React, { Component, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import sqlServer from '../Database/DataBaseSql';
import { TextInput, StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';

export default function CadastroLogin({ navigation }) {
  const [email, setEmail] = useState("sergio@hot.com");
  const [senha, setSenha] = useState("123");
  const [configSenha, setConfigSenha] = useState("321")
  const [nome, setNome] = useState("Sérgio");
  const [genero, setGenero] = useState("Rock");

  function validareBd({ }) {
    const validadeEmail = '\'' + email + '\'';

    if(senha != configSenha){
    
      Alert.alert('Opa','As senhas não são iguais')
    
    }else{

      const queryEmail = 'SELECT Email FROM dbo.Banda WHERE Email = ' + validadeEmail + '';

      sqlServer.executeQuery(queryEmail)
      .then(result => {
        console.log(result);
        alert('Cadastro já existente.');
      }).catch(err => {
        sendBd(email, senha, nome, genero);
      });
      
      navigation.navigate('LoginPage');
    
    }
  }

  function sendBd({ }) {
    let data = '';
    data += '\'' + nome + '\',';
    data += '\'' + genero + '\',';
    data += '\'' + email + '\',';
    data += '\'' + senha + '\'';

    const query = 'INSERT INTO dbo.Banda (Nome, Genero, Email, Senha) values (' + data + ')';
    var resultQuery = sqlServer.executeUpdate(query);

    resultQuery.then(result => {
      console.log(result);
      navigation.navigate('LoginPage');
    }).catch(err => {
      alert('Ocorreu um erro, por favor tente novamente.');
    });
  }

  return (
    <LinearGradient colors={['#560194', '#160026']} style={styles.linearGradient}>

        <View>
          <Text style={styles.textTitle}>Cadastro de login</Text>
        </View>

        <View style={styles.viewContainer}>
          <Text style={styles.inputTitle}>E-mail</Text>
          <TextInput style={styles.textInput} value={email} onChangeText={setEmail}/>
        </View>

        <View style={styles.viewContainer}>
          <Text style={styles.inputTitle}>Senha</Text>
          <TextInput style={styles.textInput} value={senha} onChangeText={setSenha}/>
        </View>

        <View style={styles.viewContainer}>
          <Text style={styles.inputTitle}>Confirmação de senha</Text>
          <TextInput style={styles.textInput} value={configSenha} onChangeText={setConfigSenha} />
        </View>

        <View style={styles.viewContainer}>
          <Text style={styles.inputTitle}>Artista</Text>
          <TextInput style={styles.textInput} value={nome} onChangeText={setNome}/>
        </View>

        <View style={styles.viewContainer}>
          <Text style={styles.inputTitle}>Gênero musical</Text>
          <TextInput style={styles.textInput} value={genero} onChangeText={setGenero}/>
        </View>

        <View style={styles.viewButton}>
          <TouchableOpacity style={styles.customBtnBG} onPress={() => { validareBd(email, senha, nome, genero) }}  >
            <Text style={styles.customBtnText}>AVANÇAR</Text>
          </TouchableOpacity>
        </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex:1,
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
    borderWidth: 1,
    color: "#FFF",
    fontSize: 20,
    padding: 10,
    borderWidth: 1
  },

  viewButton: {
    alignItems: "center",
    margin: 50,
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
  }
});