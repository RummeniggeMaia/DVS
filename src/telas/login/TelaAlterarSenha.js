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
import MenuTopo from 'DietaViverSaudavel/src/components/MenuTopo';

export default class TelaAlterarSenha extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            senhaAtual: "",
            novaSenha: "",
            confirmarSenha: "",
            carregou: true
        };
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: `Alterar senha`,
            headerRight: <MenuTopo navigation={navigation}/>
        }
    }

    async alterarSenha() {
        if (!this.validar()) {
            return;
        }
        let usuario = await AsyncStorage.getItem(Util.USUARIO);
        usuario = JSON.parse(usuario);
        this.setState({carregou: false});
        let senhaAtual = hash.sha256().update(this.state.senhaAtual).digest('hex');
        let novaSenha = hash.sha256().update(this.state.novaSenha).digest('hex');
        await fetch(Util.SERVIDOR_URL_LOGIN, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: usuario.email,
                senha_atual: senhaAtual,
                nova_senha: novaSenha,
                facebook_id: usuario.facebook_id,
                func: "alterar_senha"
            })
        }).then((response) => response.json())
        .then((responseJson) =>{
            if (responseJson.resp.status == "ok") {
                usuario.senha = novaSenha;
                let res = true;
                AsyncStorage.setItem(Util.USUARIO, JSON.stringify(usuario)).catch((error) => {
                    res = false;
                });
                if (res) {
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate(
                                {
                                    routeName: 'Alimentacao',
                                    params:{nome: usuario.nome}
                                }
                            )
                        ],
                    });
                    this.props.navigation.dispatch(resetAction);
                } else {
                    Alert.alert("Falha ao alterar senha", "Dados não foram salvos.");
                }
            } else if (responseJson.resp.status == "err_3") {
                Alert.alert("Falha ao alterar senha", "Senha atual não corresponde.");
            }
        }).catch((error) => {
            Alert.alert("Falha ao alterar senha", "Falha no servidor.");
        }).done(() => {
            this.setState({carregou: true});
        });
    }

    validar () {
        if (this.state.novaSenha === "" || this.state.confirmarSenha === "") {
            Alert.alert("Falha ao alterar senha!", "Insira uma senha e confirme.");
            return false;
        } else if (this.state.novaSenha !== this.state.confirmarSenha) {
            Alert.alert("Falha ao alterar senha!", "Senhas não coincidem.");
            return false;
        } else if (this.state.novaSenha.length < 4) {
            Alert.alert("Falha ao alterar senha!", "Senha muito curta!");
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

                <FormLabel labelStyle={styles.form_label}> Senha atual: </FormLabel>
                <FormInput
                        style={styles.form_input}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        placeholder="Insira a senha atual"
                        autoCorrect={false}
                        onChangeText={(senhaAtual) => this.setState({senhaAtual})}/>
                <FormLabel labelStyle={styles.form_label}> Senha: </FormLabel>
                <FormInput
                        style={styles.form_input}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        placeholder="Insira a senha"
                        autoCorrect={false}
                        onChangeText={(novaSenha) => this.setState({novaSenha})}/>

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
                    onPress = {() => {this.alterarSenha()}}
                    title = "Alterar senha"/>
            </ScrollView>
        );
    }
}
