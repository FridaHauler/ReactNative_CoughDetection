import {StyleSheet} from 'react-native';
import {Theme} from '@react-navigation/native/lib/typescript/src/types';

export const AppTheme: Theme = {
	dark: true,
	colors: {
		primary: 'rgb(234, 35, 105)',
		background: 'rgb(75, 76, 80)',
		card: 'rgb(75, 76, 80)',
		text: 'rgb(255, 255, 255)',
		border: 'rgb(199, 199, 204)',
	},
};

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
		flexDirection: 'column',
		justifyContent: 'space-between',
		flex: 1,
		backgroundColor: AppTheme.colors.background,
		color: AppTheme.colors.text,
	},
	insideContainer: {
		paddingHorizontal: 20,
		paddingTop: 30,
		paddingBottom: 40,
	},
	centerContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	selectorItemsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginVertical: 10,
	},
	selectorContainer: {
		paddingHorizontal: 10,
		paddingTop: 10,
		paddingBottom: 40,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		height: '100%',
		backgroundColor: AppTheme.colors.background,
		color: AppTheme.colors.text,
	},
	selectorTimeText: {
		color: AppTheme.colors.text,
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'right',
		width: 65,
	},
	selectorTimeImage: {
		width: 30,
		height: 30,
		marginHorizontal: 20,
	},
	selectorButton: {
		backgroundColor: AppTheme.colors.background,
		flexDirection: 'row',
		borderWidth: 0.8,
		borderColor: AppTheme.colors.primary,
		borderRadius: 10,
		paddingVertical: 8,
		alignItems: 'center',
		justifyContent: 'flex-end',
		flex: 1,
	},
	selectorButtonImage: {
		width: 30,
		height: 30,
		marginHorizontal: 5,
	},
	selectorButtonText: {
		color: AppTheme.colors.text,
		fontSize: 17,
		textAlign: 'right',
	},
	selectorButtonTextDisabled: {
		color: 'darkgray',
		fontSize: 14,
		textAlign: 'right',
	},
	selectorText: {
		color: AppTheme.colors.text,
		fontWeight: 'bold',
		fontSize: 18,
		flex: 1,
		textAlign: 'center',
	},
	selectorItems: {
		backgroundColor: AppTheme.colors.background,
		flexDirection: 'row',
		alignItems: 'stretch',
		paddingVertical: 20,
		paddingHorizontal: 10,
		justifyContent: 'space-between',
	},
	selectorItemText: {
		color: AppTheme.colors.text,
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'left',
		marginLeft: 10,
	},
	selectorItemImage: {
		width: 20,
		height: 20,
	},
	selectorItemTopRuler: {
		borderTopColor: AppTheme.colors.primary,
		borderTopWidth: 0.8,
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
		marginBottom: 15,
		marginTop: 40,
		marginHorizontal: 15,
	},
	continueButtonDisabled: {
		backgroundColor: AppTheme.colors.background,
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
		color: AppTheme.colors.text,
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
		color: AppTheme.colors.text,
		fontSize: 38,
		fontWeight: 'bold',
		textAlign: 'center',
		textTransform: 'uppercase',
	},
	text: {
		color: AppTheme.colors.text,
		fontSize: 18,
		textAlign: 'justify',
	},
	textParagraph: {
		color: AppTheme.colors.text,
		fontSize: 18,
		marginTop: 20,
		textAlign: 'justify',
	},
	title: {
		color: AppTheme.colors.text,
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 5,
	},
	segmentedControl: {
		color: AppTheme.colors.text,
		marginTop: 5,
		height: 35,
		borderColor: AppTheme.colors.text,
		borderWidth: 0.8,
		backgroundColor: AppTheme.colors.background,
	},
	middlePanel: {
		alignItems: 'stretch',
		justifyContent: 'space-evenly',
		flex: 1,
	},
	recordingText: {
		color: AppTheme.colors.text,
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	totalTime: {
		color: AppTheme.colors.text,
		fontSize: 86,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	secondaryTime: {
		color: AppTheme.colors.text,
		fontSize: 62,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	recordingStatusContainer: {
		borderWidth: 6,
		borderColor: AppTheme.colors.primary,
		borderRadius: 20,
		paddingHorizontal: 15,
		paddingVertical: 15,
		marginVertical: 20,
	},
	recordingStatusText: {
		color: AppTheme.colors.text,
		fontSize: 42,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	recordedValidateContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	recordedValidateButtons: {
		backgroundColor: 'darkgray',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: 'lightgray',
		borderRadius: 100,
		height: 60,
		width: 60,
	},
	marginTop: {
		marginTop: 40,
	},
	marginBottom: {
		marginBottom: 40,
	},
});
export default styles;
