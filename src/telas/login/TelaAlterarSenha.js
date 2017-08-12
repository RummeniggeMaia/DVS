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

export default class TelaAlterarSenha extends React.Component {
  constructor(props) {
    super(props);
    this.state = { textSenhaAtual: 'Insira sua senha atual.',
                   textRepetirSenha: 'Repita sua senha.',
                   textNovaSenha: 'Insira sua nova senha.'
                 };
  }
    static navigationOptions = {
        title: 'Alterar Senha',
    };
    render() {
        return (
          <ScrollView
              style = {{backgroundColor: '#D5FFD5'}}
              showsVerticalScrollIndicator = {true}>

              <StatusBar backgroundColor="#00A043" barStyle="light-content" />
                <View>
                  <FormLabel>
                    Senha Atual:
                  </FormLabel>
                  <FormInput
                          style={{height: 40, borderColor: 'gray', borderWidth: 0}}
                          autoCapitalize="none"
                          secureTextEntry={true}
                          placeholder={this.state.textSenhaAtual}
                        />
                  <FormLabel>
                    Nova Senha:
                  </FormLabel>
                  <FormInput
                          style={{height: 40, borderColor: 'gray', borderWidth: 0}}
                          autoCapitalize="none"
                          secureTextEntry={true}
                          placeholder={this.state.textNovaSenha}
                        />
                  <FormLabel>
                    Repetir Senha:
                  </FormLabel>
                  <FormInput
                          style={{height: 40, borderColor: 'gray', borderWidth: 0}}
                          autoCapitalize="none"
                          secureTextEntry={true}
                          placeholder={this.state.textRepetirSenha}
                        />
                  <Button
                      onPress = { () => this.props.navigation.navigate('Alimentacao') }
                      title = "Salvar Dados"
                      backgroundColor = "#5497FF"/ >
                  <View style={styles.line}></View>
                  <Button
                      onPress = { () => this.props.navigation.navigate('Alimentacao') }
                      title = "Mudar Senha"
                      backgroundColor = "#5497FF"/ >
            </View>
          </ScrollView>
        );
    }
}
