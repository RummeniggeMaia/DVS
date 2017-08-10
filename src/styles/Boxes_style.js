import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF'
  },
  textInputLoginPage: {
    paddingBottom:10
  },
  viewbuttonsLoginPage: {
    paddingBottom:10
  },
  viewbuttonsRegisterPage: {
    paddingBottom:10
  },
  welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
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
      fontWeight:'bold',
      color: '#333333',
      marginLeft: 6,
  },
  //cabecalho
	box1: {
		flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
		backgroundColor: '#8BC34A'
	},
	//logo
	box2: {
		flex: 1,
    padding: 30,
		backgroundColor: '#ccf5ff'
	},
	//conteudo
	box3: {
		flex: 1,
		backgroundColor: '#ffffff'
	},
});
