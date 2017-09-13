import React from 'react';
import {
    ScrollView,
    View,
    StatusBar,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    AsyncStorage,
    Image,
} from 'react-native';
import {
    FormLabel,
    FormInput,
    Button,
    Icon,
    SocialIcon,
    Text,
} from 'react-native-elements';

import { NavigationActions } from 'react-navigation';
import FBSDK, {
    LoginManager,
    LoginButton,
    AccessToken,
    GraphRequestManager,
    GraphRequest
} from 'react-native-fbsdk';
import hash from 'hash.js';
import PropTypes from 'prop-types';

import styles from 'DietaViverSaudavel/src/styles/Styles.js';
import Util from 'DietaViverSaudavel/src/util/Util.js';

export default class TelaLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nome: "",
            email: "",
            senha: "",
            facebook_id: "",
            sexo: "",
            carregou: true,
        };
    }

    static navigationOptions = {
        title: 'Dieta Viver Saudável',
    };

    async logar(autoLogin = false) {
        if (!this.validar()) {
            return;
        }
        let navegou = false;
        let senha = this.state.senha;
        if (!autoLogin) {
            senha = hash.sha256().update(senha).digest('hex');
        }
        this.setState({carregou: false});
        await fetch(Util.SERVIDOR_URL_LOGIN, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                senha: senha,
                facecbook_id: this.state.facecbook_id,
                func: "logar"
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.resp.status == "ok") {
                let usuario = JSON.stringify({
                    nome: responseJson.resp.user.nome,
                    email: this.state.email,
                    senha: senha,
                    nascimento: responseJson.resp.user.nascimento,
                    peso: responseJson.resp.user.peso,
                    altura: responseJson.resp.user.altura,
                    facebook_id: this.state.facebook_id,
                    sexo: responseJson.resp.user.sexo,
                });
                let res = true;
                AsyncStorage.setItem(Util.USUARIO, usuario).catch((error) => {
                    res = false;
                });
                if (res) {
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({
                                routeName: 'Alimentacao',
                                params:{nome: responseJson.resp.user.nome}
                            })
                        ]
                    });
                    this.props.navigation.dispatch(resetAction);
                    navegou = true;
                } else {
                    Alert.alert("Falha durante login", "Não pode salvar dados.");
                }
            } else {
                Alert.alert("Falha durante login", "Credenciais inválidas.");
            }
        }).catch((error) => {
            Alert.alert("Falha durante login", "Problemas no servidor.");
        }).done(() => {
            if (!navegou)
                this.setState({carregou: true});
        });
    }

    async salvarDadosFacebook(result) {
        if (!result['verified']) {
            Alert.alert('Conta de Facebook não verificada!');
            return;
        }
        this.setState({facebook_id: result['id']});
        this.setState({nome: result['name']});
        this.setState({email: result['email']});
        if (result['gender'] == 'male') {
            this.setState({sexo: 'M'});
        } else if (result['gender'] == 'female') {
            this.setState({sexo: 'F'});
        } else {
            this.setState({sexo: 'I'});
        }
        this.setState({carregou: false});
        await fetch(Util.SERVIDOR_URL_LOGIN, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: this.state.nome,
                email: this.state.email,
                facebook_id: this.state.facebook_id,
                sexo: this.state.sexo,
                func: "verficiar_facebook"
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            let routeName, params;
            if (responseJson.resp.status == "ok") {
                routeName = "Alimentacao";
                params = {nome: this.state.nome};
            } else if (responseJson.resp.status == "ok_2") {
                routeName = "DadosPessoais";
                params = {primeiraVez: true};
            } else {
                throw responseJson.resp.status;
            }
            let usuario = JSON.stringify({
                nome: this.state.nome,
                email: this.state.email,
                facebook_id: this.state.facebook_id,
                sexo: this.state.sexo,
            });
            let res = true;
            AsyncStorage.setItem(Util.USUARIO, usuario).catch((error) => {
                res = false;
            });
            if (res) {
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: routeName,
                            params: params,
                        })
                    ]
                });
                this.props.navigation.dispatch(resetAction);
            } else {
                throw "Não pode salvar dados.";
            }
        }).catch((error) => {
            Alert.alert("Falha durante login facebook", "Login não pode ser realizado.");
            //LoginManager.getInstance().logout(() => {Alert.alert('Saindo do Facebook')});
            LoginManager.logOut();
            this.setState({carregou: true});
        });
    }

    async verificarUsuario() {
        let usuario = await AsyncStorage.getItem(Util.USUARIO);
        usuario = JSON.parse(usuario);
        if (usuario != null) {
            if (usuario.facebook_id) {
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: 'Alimentacao',
                            params:{nome: usuario.nome}
                        })
                    ]
                });
                this.props.navigation.dispatch(resetAction);
            } else {
                this.state.email = usuario['email'];
                this.state.senha = usuario['senha'];
                this.logar(true);
            }
        }
    }

    validar() {
        if (!this.state.email || !this.state.senha) {
            return false;
        }
        if (this.state.email.length < 4 || this.state.senha.length < 4) {
            return false;
        }
        return true;
    }

    componentDidMount() {
        this.verificarUsuario();
    }
    render() {
        if (!this.state.carregou) {
            return <ActivityIndicator style={styles.indicator}/>
        }
        return (
           <ScrollView
               style={styles.scrollview}
               showsVerticalScrollIndicator = {true}>

               <StatusBar backgroundColor="#00A043" barStyle="light-content" />

                <View style={styles.logo}>
                    <Image style={{width: 50, height: 50}}
                        source={require('DietaViverSaudavel/src/imgs/logo.png')} />
                </View>
                <View>
                    <FormLabel labelStyle={styles.form_label}>Login:</FormLabel>
                    <FormInput
                        style = {styles.form_input}
                        autoCapitalize="none"
                        placeholder='Insira seu e-mail.'
                        keyboardType = 'email-address'
                        onChangeText={(email) => this.setState({email})}/>
                    <FormLabel labelStyle={styles.form_label}>Senha:</FormLabel>
                    <FormInput
                        style = {styles.form_input}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        placeholder='Insira sua senha.'
                        onChangeText={(senha) => this.setState({senha})}/>
                    <Button
                        title = "Login"
                        buttonStyle={styles.button}
                        onPress={() => this.logar() } />
                    <LoginButton
                        title="Facebook"
                        style={styles.facebook_login}
                        publishPermissions={["publish_actions"]}
                        onLoginFinished={
                            (error, result) => {
                                if (error) {
                                    alert("Erro durante o login: ");
                                } else if (result.isCancelled) {
                                    alert("login cancelado.");
                                } else {
                                    AccessToken.getCurrentAccessToken().then((data) => {
                                        let accessToken = data.accessToken;
                                        // alert(accessToken.toString());
                                        const responseInfoCallback = (error, result) => {
                                            if (error) {
                                                console.log(error);
                                                alert('Erro ao buscar dados ' + error.toString());
                                            } else {
                                                console.log(result);
                                                console.log(result['first_name']);
                                                try {
                                                    this.salvarDadosFacebook(result);
                                                } catch (error) {
                                                    console.log('Erro ao salvar dados de login do Facebook.');
                                                }
                                            }
                                        }
                                        const infoRequest = new GraphRequest(
                                            '/me', {
                                                accessToken: accessToken,
                                                parameters: {
                                                    fields: {
                                                        string: 'id, email, name, gender, verified'
                                                    }
                                                }
                                            },
                                            responseInfoCallback
                                        );
                                    // Start the graph request.
                                    new GraphRequestManager().addRequest(infoRequest).start();
                                })
                            }
                        }
                    }
                    onLogoutFinished={() => alert("logout.")} />
                    <Text
                        style={ styles.text_link }
                        onPress = { () => this.props.navigation.navigate('Registro') }>
                        Registrar-se
                    </Text>
                    <Text style={styles.text_link}
                        onPress = { () => this.props.navigation.navigate('RecuperarSenha') }>
                        Esqueceu a senha?
                    </Text>
                </View>
            </ScrollView>
        );
    }
}
