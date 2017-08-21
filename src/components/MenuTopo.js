import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger
} from 'react-native-popup-menu';
import {
    Icon,
    FormLabel,
    Divider,
} from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

import styles from 'DietaViverSaudavel/src/styles/Styles.js';
import Util from 'DietaViverSaudavel/src/util/Util.js';

export default class MenuTopo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            opened: false,
        }
    }

    async sair() {
        // this.setState({opened: false});
        await AsyncStorage.removeItem(Util.USUARIO);
        this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Login'}),
            ]
        }));
        return false;
    }

    dadosPessoais() {
        this.setState({opened: false});
        this.props.navigation.navigate(
            'DadosPessoais', {
                params:{primeiraVez:false}
            }
        );
        return false;
    }

    render() {
        return (
            <Menu style={{width:25}}
                opened={this.state.opened}>
                <MenuTrigger
                    onPress={() => this.setState({opened: true})}>
                    <Icon name='ellipsis-v'
                        type='font-awesome'
                        color='white'/>
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={{backgroundColor:'#D5FFD5'}}>
                    <MenuOption style={styles.menu_option}>
                        <Icon name='user'
                            size={16}
                            type='font-awesome'
                            color='#5497FF'
                            iconStyle={{marginRight: 10}}/>
                        <Text labelStyle={styles.form_label}>Dados Pessoais</Text>
                    </MenuOption>
                    <MenuOption style={styles.menu_option}
                                onSelect={() => this.dadosPessoais() }>
                        <Icon name='key'
                            size={16}
                            type='font-awesome'
                            color='#5497FF'
                            iconStyle={{marginRight: 10}}/>
                        <Text labelStyle={styles.form_label}>Dados da Conta</Text>
                    </MenuOption>
                    <MenuOption>
                        <Divider/>
                    </MenuOption>
                    <MenuOption style={styles.menu_option}
                                onSelect={() => this.sair()}>
                        <Icon name='sign-out'
                            size={16}
                            type='font-awesome'
                            color='#5497FF'
                            iconStyle={{marginRight: 10}}/>
                        <Text labelStyle={styles.form_label}>Sair</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        );
    }
};
