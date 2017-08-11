import React from 'react';
import { ScrollView, View, StatusBar } from 'react-native';
import {
    FormLabel,
    FormInput,
    Button,
    Icon,
    SocialIcon,
    Text
} from 'react-native-elements';
import styles from 'DietaViverSaudavel/src/styles/Styles';

export default class TelaLogin extends React.Component {

    constructor(props) {
      super(props);
      this.state = { textLogin: 'Insira seu login.',
                     textPassword: 'Insira sua senha.'
                   };
    }
    static navigationOptions = {
        title: 'Login',
    };

    render() {
        return (
            <ScrollView
                style = {{backgroundColor: '#D5FFD5'}}
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
                        style = {{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 0 }}
                        autoCapitalize="none"
                        placeholder={this.state.textLogin}
                        autoCorrect={true} />
                    <FormLabel>Senha:</FormLabel>
                    <FormInput
                        autoCapitalize="none"
                        secureTextEntry={true}
                        placeholder={this.state.textPassword} />
                    <Button
                        onPress = { () => this.props.navigation.navigate('Alimentacao') }
                        title = "Login"
                        backgroundColor = "#5497FF"/>
                    <SocialIcon
                        title='Facebook'
                        button
                        type='facebook' />
                    <Text style={ styles.link }>
                        Registrar-se
                    </Text>
                    <Text style={ styles.link }>
                        Esqueceu a senha?
                    </Text>
                </View>
            </ScrollView>
        );
    }
}
