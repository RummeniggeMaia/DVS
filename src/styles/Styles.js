import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#D5FFD5',
    },
    text_link: {
        color:'blue',
        fontSize: 12,
        paddingLeft:10
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    form_input: {
        flex: 1,
        height: 40,
    },
    indicator: {
        flex: 1,
        backgroundColor: '#D5FFD5',
    },
    scrollview: {
        backgroundColor: '#D5FFD5',
        padding: 10
    },
    button: {
        backgroundColor: "#5497FF",
        padding: 10,
    },
    form_label: {
        color: 'black',
        fontSize: 12,
    },
    text_label: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
    }
});
