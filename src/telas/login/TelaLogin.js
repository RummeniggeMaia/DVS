import React from 'react';
import {
    ScrollView,
    View,
    StatusBar,
    AsyncStorage,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView
} from 'react-native';
import {
    FormLabel,
    FormInput,
    Button,
    Icon,
    SocialIcon,
    Text
} from 'react-native-elements';
import hash from 'hash.js';
import styles from 'DietaViverSaudavel/src/styles/Styles';

export default class TelaLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            login: "",
            senha: "",
			carregou: true,
        };
    }

    static navigationOptions = {
        title: 'Login',
    };

	async usuarioLogado() {
        await AsyncStorage.getItem("dvs_user", (error, result) => {
            if (error != null || result == null) {
                return null;
            } else {
                return JSON.parse(result);
            }
        });
    }

    async logar(autoLogin = false) {
		if (!this.state.login || !this.state.senha) return;
        this.setState({carregou: false});
        let senha = this.state.senha;
        if (!autoLogin) {
            senha = hash.sha256().update(this.state.senha).digest('hex');
        }
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
        			senha: senha
        		});
                let res = this.salvarUsuario(usuario);
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
		}).done(() => {
            this.setState({carregou: true});
        });
    }

    //Verifica se já tem um usuario logado e efetua o login automaticamente.
	componentDidMount() {
        let usuario = this.usuarioLogado();
        if (usuario != null) {
            this.state.login = usuario.login;
            this.state.senha = usuario.senha;
            this.logar(true);
        }
	}

    render() {
		if (!this.state.carregou) {
			return <ActivityIndicator style={styles.indicator}/>
		}
        return (

           <ScrollView
               style = {styles.scrollview}
               showsVerticalScrollIndicator = {true}>

               <StatusBar backgroundColor="#00A043" barStyle="light-content" />

                <View style={styles.logo}>
                  <Text>
                      (LOGO) App Dieta Viver Saudável
                  </Text>
                </View>
                <View>
                    <FormLabel>Login:</FormLabel>
                    <FormInput
                        value={this.state.login}
                        style = {styles.form_input}
                        autoCapitalize="none"
                        placeholder='Insira seu e-mail.'
                        keyboardType = 'email-address'
                        onChangeText={(login) => this.setState({login})}/>
                    <FormLabel>Senha:</FormLabel>
                    <FormInput
                        style = {styles.form_input}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        placeholder='Insira sua senha.'
                        onChangeText={(senha) => this.setState({senha})}/>
                    <Button
                        title = "Login"
                        backgroundColor = "#5497FF"
                        onPress={() => this.logar() } />
                    <SocialIcon
                        title='Facebook'
                        button
                        type='facebook' />
                    <Text
                        style={ styles.link }
                        onPress = { () => this.props.navigation.navigate('Registro') }>
                        Registrar-se
                    </Text>
                    <Text style={styles.link}
                        onPress = { () => this.props.navigation.navigate('RecuperarSenha') }>
                        Esqueceu a senha?
                    </Text>
                </View>
            </ScrollView>
        );
    }
}
