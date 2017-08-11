import React from 'react';
import { Text, View, TextInput, Button} from 'react-native';
import styles from 'DietaViverSaudavel/src/styles/Boxes_style.js';

export default class TelaDadosDaConta extends React.Component {
  constructor(props) {
    super(props);
    this.state = { textNome: 'Insira o seu nome.',
                   textEmail: 'Insira o seu e-mail.'
                 };
  }
    static navigationOptions = {
        title: 'Dados da Conta',
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.box2}>
                  <Text style={styles.textViewOverButton}>
                    Nome:
                  </Text>
                  <TextInput
                          style={{height: 40, borderColor: 'gray', borderWidth: 0}}
                          autoCapitalize="none"
                          placeholder={this.state.textNome}
                        />
                  <Text style={styles.textViewOverButton}>
                    E-mail:
                  </Text>
                  <TextInput
                          style={{height: 40, borderColor: 'gray', borderWidth: 0}}
                          autoCapitalize="none"
                          placeholder={this.state.textEmail}
                        />
                  <Button
                      onPress = { () => this.props.navigation.navigate('Alimentacao') }
                      title = "Salvar Dados"
                      color = "#5497FF"/ >
                  <View style={styles.line}></View>
                  <Button
                      onPress = { () => this.props.navigation.navigate('Alimentacao') }
                      title = "Mudar Senha"
                      color = "#5497FF"/ >
                </View>
            </View>
        );
    }
}
