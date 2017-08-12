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
          <ScrollView
              style = {{backgroundColor: '#D5FFD5'}}
              showsVerticalScrollIndicator = {true}>

              <StatusBar backgroundColor="#00A043" barStyle="light-content" />

              <View>

                    <FormLabel>
                        Nome:
                    </FormLabel>
                    <FormInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 0}}
                            autoCapitalize="none"
                            placeholder={this.state.textNome}
                            autoCorrect={true}
                          />
                    <FormLabel>
                      Email:
                    </FormLabel>
                    <FormInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 0}}
                            autoCapitalize="none"
                            placeholder={this.state.textEmail}
                            autoCorrect={true}
                          />
                    <FormLabel>
                        Senha:
                    </FormLabel>
                    <FormInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 0}}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            placeholder={this.state.textSenha}
                            autoCorrect={true}
                          />
                    <FormLabel>
                      Confirmar Senha:
                    </FormLabel>
                    <FormInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 0}}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            placeholder={this.state.textConfirmeSenha}
                            autoCorrect={true}
                          />
                    <Button
                       onPress = { () => this.props.navigation.navigate('Alimentacao') }
                       title = "Registrar-se"
                       backgroundColor = "#5497FF"/ >
              </View>
            </ScrollView>
        );
    }
}
