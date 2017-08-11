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
    instructionsCenter: {
      textAlign: 'center',
      color: '#000000',
      paddingBottom: 5
    },
    instructions: {
        textAlign: 'left',
        color: '#333333',
        marginBottom: 2,
        paddingTop: 5,
        paddingBottom: 0,
        paddingLeft: 5
    },
    textViewOverButton: {
        textAlign: 'left',
        fontWeight: 'bold',
        color: '#333333',
        marginLeft: 6,
    },
    line: {
      paddingBottom: 10,
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
    },
});
