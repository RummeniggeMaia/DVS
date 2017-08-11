import React from 'react';
import { Text, View, TextInput, Button} from 'react-native';
import styles from 'DietaViverSaudavel/src/styles/Boxes_style.js';
import DatePicker from 'react-native-datepicker'

export default class TelaDadosPessoais extends React.Component {
  constructor(props) {
    super(props);
    this.state = { textHeight: 'Insira a sua altura.',
                   textWeight: 'Insira o seu peso.',
                   date:"31/01/1991"
                 };
  }
    static navigationOptions = {
        title: 'Dados Pessoais',
    };
    render() {
        return (
            <View style={styles.container}>
            <View style={styles.box2}>
              <Text style={styles.instructionsCenter}>
                  Antes de continuar preencha os dados:
              </Text>
              <View style={styles.line}></View>
              <Text style={styles.textViewOverButton}>
                Nascimento:
              </Text>
              <DatePicker
                  style={{width: 200}}
                  date={this.state.date}
                  mode="date"
                  placeholder="selecione"
                  format="DD/MM/YYYY"
                  minDate="1900-01-01"
                  maxDate="2017-10-08"
                  confirmBtnText="Confirmar"
                  cancelBtnText="Cancelar"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(date) => {this.setState({date: date})}}
                />
              <Text style={styles.textViewOverButton}>
                Altura:
              </Text>
              <TextInput
                      style={{height: 40, borderColor: 'gray', borderWidth: 0}}
                      autoCapitalize="none"
                      placeholder={this.state.textHeight}
                    />
              <Text style={styles.textViewOverButton}>
                Peso:
              </Text>
              <TextInput
                      style={{height: 40, borderColor: 'gray', borderWidth: 0}}
                      autoCapitalize="none"
                      placeholder={this.state.textWeight}
                    />
              <Button
                  onPress = { () => this.props.navigation.navigate('Alimentacao') }
                  title = "Prosseguir"
                  color = "#5497FF"/ >
             </View>
            </View>
        );
    }
}
