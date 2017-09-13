import React from 'react';
import {
    View,
    TextInput,
    Alert,
    ActivityIndicator,
    ScrollView,
    AsyncStorage
 } from 'react-native';
import {
    FormLabel,
    FormInput,
    Button,
    Icon,
} from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

import hash from 'hash.js';
import styles from 'DietaViverSaudavel/src/styles/Styles.js';
import Util from 'DietaViverSaudavel/src/util/Util.js';

export default class TelaRegistro extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nome: "",
            email: "",
            senha: "",
            confirmarSenha: "",
            carregou: true
        };
    }

    static navigationOptions = {
        title: 'Registrar-se',
    };

    async registrar() {
        if (!this.validar()) {
            return;
        }
        this.setState({carregou: false});
        let senha = hash.sha256().update(this.state.senha).digest('hex');
        await fetch(Util.SERVIDOR_URL_LOGIN, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: this.state.nome,
                email: this.state.email,
                senha: senha,
                func: "registrar"
            })
        }).then((response) => response.json())
        .then((responseJson) =>{
            if (responseJson.resp.status == "ok") {
                let usuario = JSON.stringify({
                    nome: this.state.nome,
                    email: this.state.email,
                    senha: senha
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
        if (this.state.nome === "") {
            Alert.alert("Falha no registro!", "Insira um nome.");
            return false;
        } else if (this.state.nome.length < 4) {
            Alert.alert("Falha no registro!", "Nome muito curto.");
            return false;
        }
        if (this.state.email === "") {
            Alert.alert("Falha no registro!", "Insira um email.");
            return false;
        } else if (!this.state.email.match("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$")) {
            Alert.alert("Falha no registro!", "E-mail inválido.");
            return false;
        }
        if (this.state.senha === "" || this.state.confirmarSenha === "") {
            Alert.alert("Falha no registro!", "Insira uma senha.");
            return false;
        } else if (this.state.senha !== this.state.confirmarSenha) {
            Alert.alert("Falha no registro!", "Senhas não coincidem.");
            return false;
        }
        return true;
    }

    render() {
        if (!this.state.carregou) {
            return <ActivityIndicator style={styles.indicator}/>
        }
        return (
            <ScrollView style={styles.scrollview}
                showsVerticalScrollIndicator = {true}>

                <FormLabel labelStyle={styles.form_label}>Nome:</FormLabel>
                <FormInput
                        style={styles.form_input}
                        autoCapitalize="none"
                        placeholder="Insira o seu nome"
                        autoCorrect={true}
                        onChangeText={(nome) => this.setState({nome})}/>
                <FormLabel labelStyle={styles.form_label}> E-mail: </FormLabel>
                <FormInput
                        style={styles.form_input}
                        autoCapitalize="none"
                        placeholder="Insira o seu e-mail"
                        autoCorrect={true}
                        keyboardType = 'email-address'
                        onChangeText={(email) => this.setState({email})}/>
                <FormLabel labelStyle={styles.form_label}> Senha: </FormLabel>
                <FormInput
                        style={styles.form_input}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        placeholder="Insira a senha"
                        autoCorrect={false}
                        onChangeText={(senha) => this.setState({senha})}/>

                <FormLabel labelStyle={styles.form_label}>Confirmar Senha:</FormLabel>
                <FormInput
                        style={ styles.form_input }
                        autoCapitalize="none"
                        secureTextEntry={true}
                        placeholder={"Confirme a senha"}
                        autoCorrect={false}
                        onChangeText={(confirmarSenha) => this.setState({confirmarSenha})}/>
                <Button
                    buttonStyle={styles.button}
                    onPress = {() => {this.registrar()}}
                    title = "Registrar-se"/>
            </ScrollView>
        );
    }
}
