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

import hash from 'hash.js';
import styles from 'DietaViverSaudavel/src/styles/Styles.js';

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
        if (!this.state.login || !this.state.senha) {
            return;
        }
        let senha = this.state.senha;
        if (!autoLogin) {
            senha = hash.sha256().update(senha).digest('hex');
        }
        this.setState({carregou: false});
        await fetch('http://192.168.0.104/dvs/logar.php', {
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
                    nome: this.state.nome,
                    email: this.state.email,
                    senha: senha,
                    nascimento: responseJson.resp.user.nascimento,
                    peso: responseJson.resp.user.peso,
                    altura: responseJson.resp.user.altura,
                });
                let res = daoLocal.salvarDados("dvs_user", usuario);
                if (res) {
                    this.props.navigation.navigate('Alimentacao');
                } else {
                    Alert.alert("Falha durante login", "Não pode salvar dados.");
                }
            } else {
                Alert.alert("Falha durante login", "Credenciais inválidas.");
            }
        }).catch((error) => {
            Alert.alert("Falha durante login", "Login não pode ser realizado.");
//            alert(JSON.stringify(error));
        }).done(() => {
            this.setState({carregou: true});
        });
    }
    
    async verificarUsuario() {
        let usuario = await AsyncStorage.getItem("dvs_user");
        usuario = JSON.parse(usuario);
        this.state.login = usuario['email'];
        this.state.senha = usuario['senha'];
        this.logar(true);
    }
    
    //Verifica se já tem um usuario logado e efetua o login automaticamente.
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
                    <SocialIcon
                        title='Facebook'
                        button
                        type='facebook' />
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
