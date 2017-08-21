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


export default class TelaDadosPessoais extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nascimento: "01/01/1990",
            peso: "",
            altura: "",
            carregou: true,
        };
    }

    static navigationOptions = {
        title: 'Dados Pessoais',
    };

    async salvarDadosPessoais() {
        this.setState({carregou: false});
        let usuario = await AsyncStorage.getItem(Util.USUARIO);
        if (usuario != null) {
            usuario = JSON.parse(usuario);
        }
        await fetch(Util.SERVIDOR_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: usuario['email'],
                senha: usuario['senha'],
                nascimento: this.state.nascimento,
                peso: this.state.peso,
                altura: this.state.altura,
                func: "salvar_dados"
            })
        }).then((response) => response.json())
        .then((responseJson) =>{
            if (responseJson.resp.status == "ok") {
                usuario['nascimento'] = this.state.nascimento;
                usuario['peso'] = this.state.peso;
                usuario['altura'] = this.state.altura;
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
                                    routeName: 'Alimentacao',
                                    params: {nome: usuario['nome']}
                                }
                            )
                        ],
                    });
                    this.props.navigation.dispatch(resetAction);
                } else {
                    Alert.alert("Erro", "Não pode salvar dados.");
                }
            } else if (responseJson.resp.status == "err_2") {
                Alert.alert("Erro", "Sessão expirada.");
            }
        }).catch((error) => {
            Alert.alert("Falha no registro", "Falha no servidor.");
        }).done(() => {
            this.setState({carregou: true});
        });
    }

    async carregarForm() {
        let usuario = await AsyncStorage.getItem(Util.USUARIO);
        if (usuario != null) {
            usuario = JSON.parse(usuario);
            this.setState({nascimento: usuario.nascimento});
            this.setState({peso: usuario.peso});
            this.setState({altura: usuario.altura});
        }
    }
    componentDidMount() {
        this.carregarForm();
    }

    render() {
        const {params} = this.props.navigation.state;
        const headerContinuar =  <FormLabel labelStyle={styles.text_label}>
                                    Antes de continuar preencha os dados:
                                </FormLabel>;
        return (
            <ScrollView
                style = {styles.scrollview}
                showsVerticalScrollIndicator = {true}>

                <View>
                    {params.primeiraVez ? headerContinuar : <FormLabel />}

                    <FormLabel labelStyle={styles.form_label}> Nascimento: </FormLabel>
                    <DatePicker
                        style={{width:250}}
                        date={this.state.nascimento}
                        mode="date"
                        placeholder="selecione..."
                        format="DD/MM/YYYY"
                        confirmBtnText="Confirmar"
                        cancelBtnText="Cancelar"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 15
                            },
                            dateInput: {
                                marginLeft: 56,
                            }
                        }}
                        onDateChange={(date) => {this.setState({nascimento: date})}} />
                    <FormLabel labelStyle={styles.form_label}> Altura: </FormLabel>
                    <FormInput 
                            style={styles.form_input}
                            autoCapitalize="none"
                            placeholder="Inserir sua altura"
                            keyboardType='numeric'
                            onEndEditing={(altura) => this.setState({altura})}
                        on/>
                    <FormLabel labelStyle={styles.form_label}>Peso:</FormLabel>
                    <FormInput
                        style={styles.form_input}
                        autoCapitalize="none"
                        placeholder="Inserir seu peso"
                        keyboardType='numeric'
                        onEndEditing={(peso) => this.setState({peso})}/>
                    <Button
                        title = {params.primeiraVez ? 'Prosseguir' : 'Salvar dados'}
                        buttonStyle={styles.button}
                        onPress = {() => this.salvarDadosPessoais()} />
                </View>
            </ScrollView>
        );
    }
}
