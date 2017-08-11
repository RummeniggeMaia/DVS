import {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        flexDirection: 'column',
        backgroundColor: '#D5FFD5'
    },
    textInputLoginPage: {
        paddingBottom: 10
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    facebook_button: {
        backgroundColor: '#3b5998',
        marginTop: 5,
        padding: 10,
    },
    facebook_button_label: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Klavika Bold',
    },
    textViewOverButton: {
        textAlign: 'left',
        fontWeight: 'bold',
        color: '#333333',
        marginLeft: 6,
    },
    //cabecalho
    box1: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5497FF'
    },
    //logo
    box2: {
        flex: 1,
        padding: 10,
        backgroundColor: '#D5FFD5'
    },
    //conteudo
    box3: {
        flex: 1,
        backgroundColor: '#ffffff'
    }
});
