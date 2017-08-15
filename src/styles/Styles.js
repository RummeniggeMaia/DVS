import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#D5FFD5',
    },
    link: {
        color:'blue',
        paddingLeft:15
    },
    logo: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5497FF',
        padding: 30
    },
    form_input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 0
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
        backgroundColor = "#5497FF",
        padding: 10,
    }
});
