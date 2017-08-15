import React from 'react';
import {
    AppRegistry
} from 'react-native';
import {
    StackNavigator
} from 'react-navigation';
import TelaLogin from './src/telas/login/TelaLogin';
import TelaRegistro from './src/telas/login/TelaRegistro';
import TelaAlimentacao from './src/telas/diarias/TelaAlimentacao';
// import TelaRecuperarSenha from './src/telas/login/TelaRecuperarSenha';
import TelaDadosPessoais from './src/telas/login/TelaDadosPessoais';
//import TelaDadosDaConta from './src/telas/login/TelaDadosDaConta';

const DietaViverSaudavel = StackNavigator({
    Login: {
        screen: TelaLogin
    },
    Registro: {
        screen: TelaRegistro
    },

    Alimentacao: {
        screen: TelaAlimentacao
    },
   DadosPessoais: {
        screen: TelaDadosPessoais
   },
//    DadosDaConta: {
//        screen: TelaDadosDaConta
//    },
// 	RecuperarSenha: {
    //     screen: TelaRecuperarSenha
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
