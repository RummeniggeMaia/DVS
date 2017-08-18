import React from 'react';
import { ScrollView, View, StatusBar, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import {
    FormLabel,
    FormInput,
    Button,
    Icon,
    SocialIcon,
    Text
} from 'react-native-elements';
import FBSDK, {LoginManager, LoginButton, AccessToken } from 'react-native-fbsdk';
import styles from 'DietaViverSaudavel/src/styles/Styles';
import PropTypes from 'prop-types';
//import FormLogin from 'DietaViverSaudavel/src/components/FormLogin';

export default class TelaLogin extends React.Component {


  constructor(props) {
    super(props);
    this.state = { textLogin: 'Insira seu login.',
                   login: '',
                   password: '',
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
                      <FormLabel>Login:</FormLabel>
                      <FormInput
                          style = {{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 0 }}
                          autoCapitalize="none"
                          onChangeText={(text) => this.setState({login})}
                          placeholder={this.state.textLogin}
                           />
                      <FormLabel>Senha:</FormLabel>
                      <FormInput
                      style = {{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 0}}
                          autoCapitalize="none"
                          secureTextEntry={true}
                          onChangeText={(text) => this.setState({password})}
                          placeholder={this.state.textPassword} />
                 <View>
                </View>
                  <Button
                      onPress = { () => this.props.navigation.navigate('Registro') }
                      title = "Login"
                      backgroundColor = "#5497FF"/>
                  <SocialIcon
                      title='Facebook'
                      button
                      type='facebook' />
                  <LoginButton
                        publishPermissions={["publish_actions"]}
                        onLoginFinished={
                          (error, result) => {
                            if (error) {
                              alert("login has error: " + result.error);
                            } else if (result.isCancelled) {
                              alert("login is cancelled.");
                            } else {
                              AccessToken.getCurrentAccessToken().then(
                                (data) => {
                                  alert(data.accessToken.toString())
                                }
                              )
                            }
                          }
                        }
                        onLogoutFinished={() => alert("logout.")}/>
                  <Text style={ styles.link }>
                      Registrar-se
                  </Text>
                  <Text style={ styles.link }>
                      Esqueceu a senha?
                  </Text>
            </ScrollView>
        );
    }
}
