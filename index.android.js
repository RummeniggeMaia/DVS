import React from 'react';
import {
    AppRegistry
} from 'react-native';
import {
    StackNavigator
} from 'react-navigation';
import TelaLogin from './src/telas/login/TelaLogin';
import FormLogin from 'DietaViverSaudavel/src/components/FormLogin';
import TelaRegistro from './src/telas/login/TelaRegistro';
//import TelaRecuperarSenha from './src/telas/login/TelaRecuperarSenha';
import TelaAlimentacao from './src/telas/diarias/TelaAlimentacao';
//import TelaDadosPessoais from './src/telas/login/TelaDadosPessoais';
//import TelaDadosDaConta from './src/telas/login/TelaDadosDaConta';
//import TelaAlterarSenha from './src/telas/login/TelaAlterarSenha';

const DietaViverSaudavel = StackNavigator({
    Login: {
        screen: TelaLogin
    },
    // Registro: {
    //     screen: TelaRegistro
    // },
    //RecuperarSenha: {
    //     screen: TelaRecuperarSenha
    // },
    // Alimentacao: {
    //     screen: TelaAlimentacao
    // }
    //DadosPessoais: {
    //        screen: TelaDadosPessoais
    //},
//    DadosDaConta: {
//        screen: TelaDadosDaConta
//    },
//      AlterarSenha:{
//        screen: TelaAlterarSenha
//      }
}, {
    navigationOptions: {
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#00C853'
        }
    },
});

AppRegistry.registerComponent('DietaViverSaudavel', () => DietaViverSaudavel);
