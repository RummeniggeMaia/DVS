import React from 'react';
import {
    ScrollView,
    View,
    StatusBar,
    Alert,
    AsyncStorage,
} from 'react-native';
import {
    FormLabel,
    FormInput,
    Button,
    Icon,
    Text,
} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { NavigationActions } from 'react-navigation';

import styles from 'DietaViverSaudavel/src/styles/Styles.js';
import Util from 'DietaViverSaudavel/src/util/Util.js';
import MenuTopo from 'DietaViverSaudavel/src/components/MenuTopo';

export default class TelaDadosPessoais extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nome: "",
            email: "",
            carregou: true,
        };
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: `Dados da conta`,
            headerRight: <MenuTopo navigation={navigation}/>
        }
    }

    async salvarDadosConta() {
        if (!this.validar()) {
            return;
        }
        let navegou = false;
        this.setState({carregou: false});
        let usuario = await AsyncStorage.getItem(Util.USUARIO);
        if (usuario != null) {
            usuario = JSON.parse(usuario);
        }
        await fetch(Util.SERVIDOR_URL_LOGIN, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                nome: this.state.nome,
                facebook_id: usuario.facebook_id,
                func: "salvar_dados_conta"
            })
        }).then((response) => response.json())
        .then((responseJson) =>{
            if (responseJson.resp.status == "ok") {
                usuario.nome = this.state.nome;
                usuario.email = this.state.email;
                let res = true;
                AsyncStorage.setItem(Util.USUARIO, JSON.stringify(usuario)).catch((error) => {
                    res = false;
                });
                if (res) {
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({
                                routeName: 'Alimentacao',
                                params:{nome: usuario.nome}
                            })
                        ],
                    });
                    this.props.navigation.dispatch(resetAction);
                    let navegou = true;
                } else {
                    Alert.alert("Erro", "Não pode salvar dados da conta.");
                }
            } else if (responseJson.resp.status == "err_2") {
                Alert.alert("Erro", "Sessão expirada.");
            }
        }).catch((error) => {
            Alert.alert("Falha no registro", "Falha no servidor.");
        }).done(() => {
            if (!navegou)
                this.setState({carregou: true});
        });
    }

    async carregarForm() {
        let usuario = await AsyncStorage.getItem(Util.USUARIO);
        if (usuario != null) {
            usuario = JSON.parse(usuario);
            this.setState({nome: usuario.nome});
            this.setState({email: usuario.email});
        }
    }
    componentDidMount() {
        this.carregarForm();
    }

    validar() {
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
        return true;
    }

    render() {
        return (
            <ScrollView
                style = {styles.scrollview}
                showsVerticalScrollIndicator = {true}>

                <View>
                    <FormLabel labelStyle={styles.form_label}> E-mail: </FormLabel>
                    <FormInput
                            style={styles.form_input}
                            autoCapitalize="none"
                            editable={true}
                            placeholder="Inserir e-mail"
                            keyboardType='email-address'
                            onChangeText={(email) => this.setState({email})}
                            defaultValue={this.state.email}/>
                    <FormLabel labelStyle={styles.form_label}> Nome: </FormLabel>
                    <FormInput
                            style={styles.form_input}
                            autoCapitalize='words'
                            placeholder="Inserir nome"
                            onChangeText={(nome) => this.setState({nome})}
                            defaultValue={this.state.nome}/>
                    <Button
                            title='Salvar dados'
                            buttonStyle={styles.button}
                            onPress = {() => this.salvarDadosConta()} />
                    <Button
                        title = 'Alterar senha'
                        buttonStyle={styles.button}
                        onPress = {() => this.props.navigation.navigate('AlterarSenha')} />
                </View>
            </ScrollView>
        );
    }
}
