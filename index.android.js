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
import TelaDadosPessoais from './src/telas/login/TelaDadosPessoais';
import { MenuContext } from 'react-native-popup-menu';
import MenuTopo from './src/components/MenuTopo';


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
}, {
    navigationOptions: {
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#00C853'
        }
    },
});

const App = () => (
    <MenuContext style={{ flex: 1 }}>
        <DietaViverSaudavel/>
    </MenuContext>
);


AppRegistry.registerComponent('DietaViverSaudavel', () => App);
