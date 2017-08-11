import React from 'react';
import { Text, View, TextInput, Button} from 'react-native';
import styles from 'DietaViverSaudavel/src/styles/Boxes_style.js';

export default class TelaRecuperarSenha extends React.Component {
  constructor(props) {
    super(props);
    this.state = { textEmail: 'Insira seu E-mail.'
                 };
  }
    static navigationOptions = {
        title: 'Recuperar Senha',
    };
    render() {
        return (
            <View style={styles.container}>
              <View style={styles.box2}>
                <Text style={styles.instructionsCenter}>
                    Insira o teu e-mail para recuperar a senha da sua conta.
                </Text>
                <View style={styles.line}></View>
                <Text style={styles.textViewOverButton}>
                  E-mail:
                </Text>
                <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 0}}
                        autoCapitalize="none"
                        placeholder={this.state.email}
                        autoCorrect={true}
                      />
                      <Button
                          onPress = { () => this.props.navigation.navigate('Alimentacao') }
                          title = "Enviar"
                          color = "#5497FF"/ >
                </View>
            </View>
        );
    }
}
