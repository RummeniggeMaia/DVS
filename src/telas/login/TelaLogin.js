import React from 'react';
import { ScrollView, View, StatusBar, TouchableOpacity, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import {
    FormLabel,
    FormInput,
    Button,
    Icon,
    SocialIcon,
    Text
} from 'react-native-elements';
import FBSDK, {LoginManager, LoginButton, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk';
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

    async saveInfo(result){
      console.log("result")
      AsyncStorage.setItem('first_name', result['first_name']);
      AsyncStorage.setItem('last_name', result['last_name']);
      try{
         let a = await AsyncStorage.getItem('first_name');
         console.log(a)
      }catch(erro){

      }
    }

    getAllInfo(result){
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
                                    '/me',
                                    {
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
