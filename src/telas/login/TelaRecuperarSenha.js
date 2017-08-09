import React from 'react';
import { Text, View} from 'react-native';
import styles from 'DietaViverSaudavel/src/styles/Styles.js';

export default class TelaRecuperarSenha extends React.Component {
    static navigationOptions = {
        title: 'Recuperar Senha',
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    App Dieta Vida Saudável
                </Text>
                <Text style={styles.instructions}>
                    Form Recuperar Senha
                </Text>
            </View>
        );
    }
}
