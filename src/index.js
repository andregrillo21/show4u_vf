import React from 'react';

import {LogBox} from "react-native"
LogBox.ignoreAllLogs(true)

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomePage from './Home';
import LoginPage from './Login';
import RegisterLoginPage from './CadastroLogin';
import HomeBanda from './HomeBanda';
import Mapa from './Mapa';
import RegisterBandPage from './CadastroShow';
import UpdateShow from './UpdateShow';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="HomePage" component={HomePage} />
                <Stack.Screen name="LoginPage" component={LoginPage} />
                <Stack.Screen name="Mapa" component={Mapa} />
                <Stack.Screen name="RegisterLoginPage" component={RegisterLoginPage} />
                <Stack.Screen name="RegisterBandPage" component={RegisterBandPage} />
                <Stack.Screen name="HomeBanda" component={HomeBanda} />
                <Stack.Screen name="UpdateShow" component={UpdateShow} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}