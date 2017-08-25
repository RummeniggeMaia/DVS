import React from 'react';
import {
    ScrollView,
    View,
} from 'react-native';
import {
    FormLabel,
    FormInput,
    Button,
} from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

import styles from 'DietaViverSaudavel/src/styles/Styles.js';
import Util from 'DietaViverSaudavel/src/util/Util.js';

export default class TelaRecuperarSenha extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            carregou: true,
        };
    }

    static navigationOptions = {
        title: 'Recuperar senha',
    };

    render() {
        return (
            <ScrollView
                style = {styles.scrollview}
                showsVerticalScrollIndicator = {true}>

                <View>
                    <FormLabel labelStyle={styles.text_label}>
                        Inserir e-mail para recuperar senha da conta:
                    </FormLabel>

                    <FormLabel labelStyle={styles.form_label}> E-Mail: </FormLabel>
                    <FormInput
                            style={styles.form_input}
                            autoCapitalize="none"
                            placeholder="e-mail para recuperação"
                            keyboardType='email-address'
                            onChangeText={(email) => this.setState({email})}
                            defaultValue={this.state.altura}/>
                    <Button
                        title = 'Prosseguir'
                        buttonStyle={styles.button}
                        onPress = {() => alert('to do')} />
                </View>
            </ScrollView>
        );
    }
}
