import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#D5FFD5',
    },
    text_link: {
        color:'blue',
        fontSize: 14,
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
    form_input_mask: {
        flex: 1,
        height: 40,
        marginLeft: 10,
        marginRight: 10,
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
        marginBottom: 5,
    },
    form_label: {
        color: 'black',
        fontSize: 12,
    },
    text_label: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
    },
    menu_option: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    facebook_login: {
        padding: 20,
        marginLeft:14,
        marginRight:14,
        marginTop:10,
        marginBottom:10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
});
