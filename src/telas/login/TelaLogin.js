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
            email: "",
            senha: "",
            carregou: true,
        };
    }

    static navigationOptions = {
        title: 'Login',
    };

    async logar(autoLogin = false) {
        if (!this.state.email || !this.state.senha) {
            return;
        }
        let senha = this.state.senha;
        if (!autoLogin) {
            senha = hash.sha256().update(senha).digest('hex');
        }
        this.setState({carregou: false});
        await fetch(Util.SERVIDOR_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                senha: senha,
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
                } else {
                    Alert.alert("Falha durante login", "Não pode salvar dados.");
                }
            } else {
                Alert.alert("Falha durante login", "Credenciais inválidas.");
            }
        }).catch((error) => {
            Alert.alert("Falha durante login", "Login não pode ser realizado.");
        }).done(() => {
            if (this.isMounted)
                this.setState({carregou: true});
        });
    }

    async verificarUsuario() {
        let usuario = await AsyncStorage.getItem(Util.USUARIO);
        if (usuario != null) {
            usuario = JSON.parse(usuario);
            this.state.email = usuario['email'];
            this.state.senha = usuario['senha'];
            this.logar(true);
        }
    }

    //Verifica se já tem um usuario logado e efetua o login automaticamente.
    componentDidMount() {
        this.verificarUsuario();
    }

    componentWillUnmount() {
        this.setState({carregou: true});
    }

    async saveInfo(result){
        console.log("result");
        AsyncStorage.setItem('first_name', result['first_name']);
        AsyncStorage.setItem('last_name', result['last_name']);
        try{
            let a = await AsyncStorage.getItem('first_name');
            console.log(a)

            const navigateAction = NavigationActions.navigate({
                routeName: 'Alimentacao',
                params: {},
                action: NavigationActions.navigate({ routeName: 'Alimentacao'})
            })

            this.props.navigation.dispatch(navigateAction)
            console.log("dps do navigator")
        }catch(erro){
        }
    }

    getAllInfo(result) {
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                stores.map((result, i, store) => {
                    // get at each store's key/value so you can work with it
                    let key = store[i][0];
                    let value = store[i][1];
                });
            });
        });
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
                                    alert("login has error: " + result.error);
                                } else if (result.isCancelled) {
                                    alert("login is cancelled.");
                                } else {
                                    AccessToken.getCurrentAccessToken().then((data) => {
                                        let accessToken = data.accessToken;
                                        alert(accessToken.toString());
                                        const responseInfoCallback = (error, result) => {
                                            if (error) {
                                                console.log(error)
                                                alert('Error fetching data: ' + error.toString());
                                            } else {
                                                console.log(result)
                                                console.log(result['first_name'])
                                                try {
                                                  console.log("Aqui!")
                                                  this.saveInfo(result);
                                                } catch (error) {
                                                // Error saving data
                                                }
                                                alert('Success fetching data: ' + result.toString());
                                            }
                                        }
                                        const infoRequest = new GraphRequest(
                                            '/me', {
                                                accessToken: accessToken,
                                                parameters: {
                                                    fields: {
                                                        string: 'email,name,first_name,middle_name,last_name'
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
