import React from 'react';
import { Text, View, Button, Link, TouchableHighlight, TextInput} from 'react-native';
import styles from 'DietaViverSaudavel/src/styles/Boxes_style.js';

export default class TelaLogin extends React.Component {
    constructor(props) {
      super(props);
      this.state = { textLogin: 'Insira seu login.',
                     textPassword: 'Insira sua senha.'
                   };
    }
    static navigationOptions = {
        title: 'Login',
    };

    render() {
        return (
            <View style={ styles.container }>

                <View style={styles.box1}>
                  <Text style={styles.welcome}>
                      App Dieta Vida Saudável
                  </Text>
                </View>
                <View style={styles.box2}>
                    <Text style={styles.textViewOverButton}>
                        Login:
                    </Text>
                    <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 0}}
                            autoCapitalize="none"
                            placeholder={this.state.textLogin}
                            autoCorrect={true}
                          />
                    <Text style={styles.textViewOverButton}>
                      Senha:
                    </Text>
                    <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 0}}
                            autoCapitalize="none"
                            placeholder={this.state.textPassword}
                            autoCorrect={true}
                          />
                    <View style={styles.viewbuttonsLoginPage}>
                        <Button
                           onPress = { () => this.props.navigation.navigate('Alimentacao') }
                           title = "Login" / >
                    </View>
                    <View style={styles.viewbuttonsRegisterPage}>
                        < Button
                            onPress = { () => this.props.navigation.navigate('Registro') }
                            title = "Registrar-se" / >
                    </View>
                    <Text style={{color: 'blue'}}
                        onPress={() => this.props.navigation.navigate('RecuperarSenha') }>
                        Esqueceu a senha?
                    </Text>
                </View>
            </View>
        );
    }
}
