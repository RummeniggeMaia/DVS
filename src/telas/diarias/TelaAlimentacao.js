import React from 'react';
import { Text, ScrollView, StatusBar, View} from 'react-native';
import styles from 'DietaViverSaudavel/src/styles/Styles.js';

export default class TelaAlimentacao extends React.Component {
    static navigationOptions = {
        title: 'Alimentacao',
        headerLeft: null,
    };
    render() {
        return (
          <ScrollView
              style = {{backgroundColor: '#D5FFD5'}}
              showsVerticalScrollIndicator = {true}>

              <StatusBar backgroundColor="#00A043" barStyle="light-content" />

              <View>
                  <Text style={styles.welcome}>
                      App Dieta Vida Saudável
                  </Text>
                  <Text style={styles.instructions}>
                      Alimentação
                  </Text>
              </View>
            </ScrollView>
        );
    }
}
