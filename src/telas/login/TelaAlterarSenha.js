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
    this.state = { senhaAtual: "",
                   confirmarSenha: "",
                   senhaNova: "",
                   carregou: true
                 };
  }
    static navigationOptions = {
        title: 'Alterar Senha',
    };

    async alterarSenha() {

        if (!this.validar()) {
            return;
        }
        this.setState({carregou: false});
        let senha = hash.sha256().update(this.state.senhaAtual).digest('hex');
        let novaSenha = hash.sha256().update(this.state.senhaNova).digest('hex');
        let usuarioNome = AsyncStorage.getItem(Util.USUARIO).then("nome");
        let usuarioEmail = AsyncStorage.getItem(Util.USUARIO).then("email");

        await fetch(Util.SERVIDOR_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: usuarioNome,
                email: usuarioEmail,
                senha: senhaAtual,
                novaSenha: novaSenha,
                func: "alterar_senha"
            })
        }).then((response) => response.json())
        .then((responseJson) =>{
            if (responseJson.resp.status == "ok") {
                let usuario = JSON.stringify({
                    nome: usuarioNome;
                    email: usuarioEmail;
                    senha: novaSenha
                });
                let res = true;
                AsyncStorage.setItem(Util.USUARIO, usuario).catch((error) => {
                    res = false;
                });
                if (res) {
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate(
                                {
                                    routeName: 'DadosPessoais',
                                    params:{primeiraVez: true}
                                }
                            )
                        ],
                    });
                    this.props.navigation.dispatch(resetAction);
                } else {
                    Alert.alert("Falha no registro", "Não pode salvar dados.");
                }
            }
        }).catch((error) => {
            Alert.alert("Falha no registro", "Falha no servidor.");
        }).done(() => {
            this.setState({carregou: true});
        });
    }

    validar () {
        if (this.state.senhaAtual === "") {
            Alert.alert("Falha no registro!", "Insira uma senha.");
            return false;
        }
        if (this.state.confirmarSenha === "") {
            Alert.alert("Falha no registro!", "Repita a nova senha.");
            return false;
        }
        if (this.state.senhaNova === "") {
            Alert.alert("Falha no registro!", "Insira a senha nova.");
            return false;
        }
        if (this.state.senhaAtual === "" || this.state.confirmarSenha === "") {
            Alert.alert("Falha no registro!", "Insira uma senha.");
            return false;
        } else if (this.state.senhaNova !== this.state.confirmarSenha) {
            Alert.alert("Falha no registro!", "Senhas não coincidem.");
            return false;
        }
        return true;
    }

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
                          placeholder={this.state.senhaAtual}
                        />
                  <FormLabel>
                    Nova Senha:
                  </FormLabel>
                  <FormInput
                          style={{height: 40, borderColor: 'gray', borderWidth: 0}}
                          autoCapitalize="none"
                          secureTextEntry={true}
                          placeholder={this.state.senhaNova}
                        />
                  <FormLabel>
                    Repetir Senha:
                  </FormLabel>
                  <FormInput
                          style={{height: 40, borderColor: 'gray', borderWidth: 0}}
                          autoCapitalize="none"
                          secureTextEntry={true}
                          placeholder={this.state.confirmarSenha}
                        />
                  <Button
                      onPress = { () => this.props.navigation.navigate('Alimentacao') }
                      title = "Salvar Dados"
                      backgroundColor = "#5497FF"/ >
                  <View style={styles.line}></View>
                  <Button
                      onPress = { () => this.props.navigation.navigate('Alimentacao') }
                      title = "Alterar Senha"
                      backgroundColor = "#5497FF"/ >
            </View>
          </ScrollView>
        );
    }
}
