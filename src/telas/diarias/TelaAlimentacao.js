import React from 'react';
import {
    Text,
    View,
    AsyncStorage,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import styles from 'DietaViverSaudavel/src/styles/Styles.js';
import MenuTopo from 'DietaViverSaudavel/src/components/MenuTopo';
import Util from 'DietaViverSaudavel/src/util/Util.js';

export default class TelaAlimentacao extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: `Bem-vindo ${navigation.state.params.nome}`,
            headerRight: <MenuTopo navigation={navigation}/>
        }
    }

    // async verificarUsuario() {
    //     let usuario = await AsyncStorage.getItem(Util.USUARIO);
    //     if (usuario == null) {
    //         const resetAction = NavigationActions.reset({
    //             index: 0,
    //             actions: [
    //                 NavigationActions.navigate({ routeName: 'Login'})
    //             ]
    //         });
    //         this.props.navigation.dispatch(resetAction);
    //     } else {
    //
    //     }
    // }
    //
    // componentDidMount() {
    //     this.verificarUsuario();
    // }

    render() {
        return (
            <ScrollView
                style={styles.scrollview}
                showsVerticalScrollIndicator = {true}>

                <List>
                    <ListItem title="Café da manhã"/>
                    <ListItem title="Almoço"/>
                    <ListItem title="Café da tarde"/>
                    <ListItem title="Janta"/>
                </List>
            </ScrollView>
        );
    }
}
