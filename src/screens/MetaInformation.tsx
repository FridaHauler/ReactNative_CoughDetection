import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import {observer} from 'mobx-react-lite';
import {StackNavigationProps} from '../screens';
import Model from '../model/Model';
import styles, {AppTheme} from '../styles';

const MetaInformation = observer(({navigation}: StackNavigationProps) => {
	return (
		<View style={styles.container}>
			<ScrollView>
				<View style={styles.insideContainer}>
					<Text style={[styles.title, styles.marginBottom]}>Please define meta information</Text>

					<View style={styles.middlePanel}>
						<View style={styles.marginBottom}>
							<Text style={styles.title}>Position</Text>
							<SegmentedControl
								values={Model.positions}
								selectedIndex={Model.selectedPosition}
								tintColor={AppTheme.colors.primary}
								textColor={AppTheme.colors.text}
								activeTextColor={AppTheme.colors.text}
								style={styles.segmentedControl}
								onChange={(event) => {
									Model.selectedPosition = event.nativeEvent.selectedSegmentIndex;
								}}
							/>
						</View>
						<View style={styles.marginBottom}>
							<Text style={styles.title}>Mobile location</Text>
							<SegmentedControl
								values={Model.locations}
								selectedIndex={Model.selectedLocation}
								tintColor={AppTheme.colors.primary}
								textColor={AppTheme.colors.text}
								activeTextColor={AppTheme.colors.text}
								style={styles.segmentedControl}
								onChange={(event) => {
									Model.selectedLocation = event.nativeEvent.selectedSegmentIndex;
								}}
							/>
						</View>
						<View style={styles.marginBottom}>
							<Text style={styles.title}>Talking between actions?</Text>
							<SegmentedControl
								values={Model.talking}
								selectedIndex={Model.selectedTalking}
								tintColor={AppTheme.colors.primary}
								textColor={AppTheme.colors.text}
								activeTextColor={AppTheme.colors.text}
								style={styles.segmentedControl}
								onChange={(event) => {
									Model.selectedTalking = event.nativeEvent.selectedSegmentIndex;
								}}
							/>
						</View>
					</View>
				</View>
			</ScrollView>
			<TouchableOpacity
				style={styles.continueButton}
				onPress={() => {
					navigation.navigate('StartRecording');
				}}>
				<Text style={styles.continueButtonText}>Continue</Text>
			</TouchableOpacity>
		</View>
	);
});
export default MetaInformation;
