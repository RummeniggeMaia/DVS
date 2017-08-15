import React from 'react';
import { ScrollView, View, StatusBar } from 'react-native';
import {
  FormLabel,
  FormInput,
  Button,
  Icon,
  Text
} from 'react-native-elements';
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
          <ScrollView
              style = {{backgroundColor: '#D5FFD5'}}
              showsVerticalScrollIndicator = {true}>

              <StatusBar backgroundColor="#00A043" barStyle="light-content" />

                  <View>
                      <FormLabel>
                          Insira o teu e-mail para recuperar a senha da sua conta.
                      </FormLabel>
                      <View style={styles.line}></View>
                      <FormLabel>
                        E-mail:
                      </FormLabel>
                      <FormInput
                              style={{height: 40, borderColor: 'gray', borderWidth: 0}}
                              autoCapitalize="none"
                              placeholder={this.state.email}
                              autoCorrect={true}
                            />
                      <Button
                          onPress = { () => this.props.navigation.navigate('Alimentacao') }
                          title = "Enviar"
                          backgroundColor = "#5497FF"/ >
                  </View>
              </ScrollView>
        );
    }
}
