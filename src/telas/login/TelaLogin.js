import React from 'react';
import { Text, View, Button, Link, TouchableHighlight, TextInput} from 'react-native';
import styles from 'DietaViverSaudavel/src/styles/Boxes_style';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

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
                      (LOGO) App Dieta Viver Saudável
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
                    <Button
                        onPress = { () => this.props.navigation.navigate('Alimentacao') }
                        title = "Login"
                        color = "#5497FF"/ >
                    <Button
                        onPress = { () => this.props.navigation.navigate('Alimentacao') }
                        title = "Facebook"
                        color = "#3b5998"/ >
                    <Text style={{color: 'blue'}}
                        onPress={() => this.props.navigation.navigate('Registro') }>
                        Registrar-se
                    </Text>
                    <Text style={{color: 'blue'}}
                        onPress={() => this.props.navigation.navigate('RecuperarSenha') }>
                        Esqueceu a senha?
                    </Text>
                </View>
            </View>
        );
    }
}
