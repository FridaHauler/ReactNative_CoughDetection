import {StyleSheet} from 'react-native';
import {AppTheme} from './utils';

const styles = StyleSheet.create({
	loadingContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		backgroundColor: AppTheme.colors.background,
	},
	loadingSplashImage: {
		width: 250,
		height: 250,
	},
	loadingText: {
		marginTop: 40,
		fontSize: 28,
		fontWeight: '600',
		color: AppTheme.colors.text,
	},
	container: {
		marginHorizontal: 20,
		paddingVertical: 30,
		flexDirection: 'column',
		justifyContent: 'space-between',
		height: '100%',
		backgroundColor: AppTheme.colors.background,
		color: AppTheme.colors.text,
	},
	centerContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	continueButton: {
		backgroundColor: AppTheme.colors.primary,
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'lightgray',
		borderRadius: 10,
		paddingVertical: 12,
		paddingHorizontal: 12,
		justifyContent: 'center',
		marginVertical: 15,
		marginHorizontal: 15,
	},
	continueButtonText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 18,
	},
	startButton: {
		backgroundColor: AppTheme.colors.primary,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: 'lightgray',
		borderRadius: 100,
		height: 200,
		width: 200,
	},
	startText: {
		color: 'white',
		fontSize: 38,
		fontWeight: 'bold',
		textAlign: 'center',
		textTransform: 'uppercase',
	},
	text: {
		color: 'white',
		fontSize: 18,
		textAlign: 'justify',
	},
	textParagraph: {
		color: 'white',
		fontSize: 18,
		marginTop: 20,
		textAlign: 'justify',
	},
	title: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 5,
	},
	segmentedControl: {
		marginTop: 5,
		height: 35,
		borderColor: AppTheme.colors.primary,
		borderWidth: 1,
		backgroundColor: AppTheme.colors.background,
	},
	middlePanel: {
		alignItems: 'stretch',
		justifyContent: 'space-evenly',
		flex: 1,
	},
});
export default styles;
