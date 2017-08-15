import React from 'react';
import {
	View,
	Alert,
	ActivityIndicator,
	ScrollView,
    AsyncStorage} from 'react-native';
import {
  FormLabel,
  FormInput,
  Button,
  Icon,
  Text
} from 'react-native-elements';

import hash from 'hash.js';
import styles from 'DietaViverSaudavel/src/styles/Styles.js';

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
		await fetch('http://192.168.0.104/dvs/registrar.php', {
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
                let res = this.salvarUsuario(usuario);
                if (res) {
                    this.props.navigation.navigate('DadosPessoais');
                } else {
                    Alert.alert("Falha no registro", "Não pode salvar dados.");
                }
			}
		}).catch((error) => {
			Alert.alert("Falha no registro", JSON.stringify(error));
		}).done(() => {
            this.setState({carregou: true});
        });
	}

    async salvarUsuario(usuario) {
        await AsyncStorage.setItem("dvs_user", usuario, (error) => {
            if (error == null) {
                return true;
            } else {
                Alert.alert("Dados do usuário não foram salvos.");
                return false;
            }
        });
    }

	async validar () {
		if (this.state.nome === "") {
			Alert.alert("Falha no registro!", "Insira um nome.");
			return false;
		}
		if (this.state.email === "") {
			Alert.alert("Falha no registro!", "Insira um email.");
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

                <FormLabel>Nome:</FormLabel>
                <FormInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 0}}
                        autoCapitalize="none"
                        placeholder="Insira o seu nome"
                        autoCorrect={true}
                        onChangeText={(nome) => this.setState({nome})}/>
                <FormLabel> Email: </FormLabel>
                <FormInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 0}}
                        autoCapitalize="none"
                        placeholder="Insira o seu e-mail"
                        autoCorrect={true}
                        onChangeText={(email) => this.setState({email})}/>
                <Text style={styles.textViewOverButton}>
                    Senha:
                </Text>
                <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 0}}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        placeholder="Insira a senha"
                        autoCorrect={false}
						onChangeText={(senha) => this.setState({senha})}/>
                <FormLabel> Confirmar Senha:</FormLabel>
                <FormInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 0}}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        placeholder={"Confirme a senha"}
                        autoCorrect={false}
                        onChangeText={(confirmarSenha) => this.setState({confirmarSenha})}/>
                <Button
                    onPress = {() => {this.registrar()}}
                    title = "Registrar-se"
                    style={styles.button}/>
            </ScrollView>
        );
    }
}
