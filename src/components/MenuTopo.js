import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import Menu,{
    MenuOptions,
    MenuOption,
    MenuTrigger
} from 'react-native-menu';

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
        this.props.navigation.navigate(
            'DadosPessoais', {
                params:{primeiraVez:false}
            }
        );
        return false;
    }

    dadosConta() {
        this.props.navigation.navigate('DadosConta');
        return false;
    }

    funcaoMenu(valorMenu) {
        if (valorMenu == 0) {
            this.dadosPessoais();
        } else if (valorMenu == 1) {
            this.dadosConta();
        } else if (valorMenu == 2) {
            this.sair();
        }
    }

    async verificarUsuario() {
        let usuario = await AsyncStorage.getItem(Util.USUARIO);
        if (usuario == null) {
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Login'})
                ]
            });
            this.props.navigation.dispatch(resetAction);
        }
    }

    componentDidMount() {
        this.verificarUsuario();
    }

    render() {
        const renderTouchable = () => <TouchableOpacity/>;
        return (
            <Menu style={{width:25}}
                onSelect={(value) => this.funcaoMenu(value)}>
                <MenuTrigger renderTouchable={renderTouchable}>
                    <Icon name='ellipsis-v'
                        type='font-awesome'
                        color='white'/>
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={{backgroundColor:'#D5FFD5'}}>
                    <MenuOption
                            style={styles.menu_option}
                            value={0}
                            renderTouchable={renderTouchable}>

                        <Icon name='user'
                            size={16}
                            type='font-awesome'
                            color='#5497FF'
                            iconStyle={{marginRight: 10}}/>
                        <Text labelStyle={styles.form_label}>Dados Pessoais</Text>
                    </MenuOption>
                    <MenuOption style={styles.menu_option}
                                value={1}
                                renderTouchable={renderTouchable}>
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
                                value={2}
                                renderTouchable={renderTouchable}>
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
