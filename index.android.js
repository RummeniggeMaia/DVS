import React from 'react';
import {
    AppRegistry
} from 'react-native';
import {
    StackNavigator
} from 'react-navigation';
import TelaLogin from './src/telas/login/TelaLogin';
// import TelaRegistro from './src/telas/login/TelaRegistro';
// import TelaRecuperarSenha from './src/telas/login/TelaRecuperarSenha';
// import TelaAlimentacao from './src/telas/diarias/TelaAlimentacao';

const DietaViverSaudavel = StackNavigator({
    Login: {
        screen: TelaLogin
    },
    // Registro: {
    //     screen: TelaRegistro
    // },
    // RecuperarSenha: {
    //     screen: TelaRecuperarSenha
    // },
    // Alimentacao: {
    //     screen: TelaAlimentacao
    // },
}, {
    navigationOptions: {
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#00C853'
        }
    },
});

AppRegistry.registerComponent('DietaViverSaudavel', () => DietaViverSaudavel);
