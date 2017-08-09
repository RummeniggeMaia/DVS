import React from 'react';
import { Text, View, Button, Link} from 'react-native';
import styles from 'DietaViverSaudavel/src/styles/Styles.js';

export default class TelaLogin extends React.Component {
    static navigationOptions = {
        title: 'Login',
    };
    render() {
        return (
            <View style={ styles.container }>
                <Text style={styles.welcome}>
                    App Dieta Vida Saudável
                </Text>
                <Text style={styles.instructions}>
                    Form Login
                </Text>
                <Button
                   onPress = { () => this.props.navigation.navigate('Alimentacao') }
                   title = "Login" / >
                < Button
                    onPress = { () => this.props.navigation.navigate('Registro') }
                    title = "Registrar-se" / >
                <Text style={{color: 'blue'}}
                    onPress={() => this.props.navigation.navigate('RecuperarSenha') }>
                    Esqueceu a senha?
                </Text>
            </View>
        );
    }
}
