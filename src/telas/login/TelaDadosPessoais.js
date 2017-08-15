import React from 'react';
import {
    ScrollView,
    View,
    StatusBar
} from 'react-native';
import {
  FormLabel,
  FormInput,
  Button,
  Icon,
  Text
} from 'react-native-elements';
import styles from 'DietaViverSaudavel/src/styles/Style.js';
import DatePicker from 'react-native-datepicker';

export default class TelaDadosPessoais extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nascimento: "",
            peso: "",
            altura: "",
            carregou: true,
        };
    }
    static navigationOptions = {
        title: 'Dados Pessoais',
    };

    render() {
        return (
            <ScrollView
                style = {styles.scrollview}
                showsVerticalScrollIndicator = {true}>

                <View>
                    <FormLabel>
                        Antes de continuar preencha os dados:
                    </FormLabel>
                    <View style={styles.line}></View>
                    <FormLabel>
                        Nascimento:
                    </FormLabel>
                    <DatePicker
                        style={{width: 200 }}
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
                                marginLeft: 15
                            },
                            dateInput: {
                                marginLeft: 56
                            }
                        }}
                        onDateChange={(date) => {this.setState({date: date})}} />
                    <FormLabel>
                        Altura:
                    </FormLabel>
                    <FormInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 0}}
                            autoCapitalize="none"
                            placeholder={this.state.textHeight} />
                    <FormLabel>
                    Peso:
                    </FormLabel>
                    <FormInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 0}}
                        autoCapitalize="none"
                        placeholder={this.state.textWeight} />
                    <Button
                        title = "Salvar dados"
                        color = {styles.button} />
                    </View>
                </View>
            </ScrollView>
        );
    }
}
