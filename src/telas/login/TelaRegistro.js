import React from 'react';
import { Text, TextInput, Button, View} from 'react-native';
import styles from 'DietaViverSaudavel/src/styles/Boxes_style.js';

export default class TelaRegistro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {   textNome: 'Insira seu nome',
                     textEmail: 'Insira seu email',
                     textSenha: 'Insira sua senha',
                     textConfirmeSenha: "Confirme sua senha"
                 };
  }

    static navigationOptions = {
        title: 'Registrar-se',
    };
    render() {
        return (
            <View style={styles.container}>


                <View style={styles.box2}>
                    <Text style={styles.textViewOverButton}>
                        Nome:
                    </Text>
                    <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 0}}
                            autoCapitalize="none"
                            placeholder={this.state.textNome}
                            autoCorrect={true}
                          />
                    <Text style={styles.textViewOverButton}>
                      Email:
                    </Text>
                    <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 0}}
                            autoCapitalize="none"
                            placeholder={this.state.textEmail}
                            autoCorrect={true}
                          />
                    <Text style={styles.textViewOverButton}>
                        Senha:
                    </Text>
                    <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 0}}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            placeholder={this.state.textSenha}
                            autoCorrect={true}
                          />
                    <Text style={styles.textViewOverButton}>
                      Confirmar Senha:
                    </Text>
                    <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 0}}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            placeholder={this.state.textConfirmeSenha}
                            autoCorrect={true}
                          />
                    <View style={styles.viewbuttonsLoginPage}>
                        <Button
                           onPress = { () => this.props.navigation.navigate('Alimentacao') }
                           title = "Registrar" / >
                    </View>
                </View>


            </View>
        );
    }
}
