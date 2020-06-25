import React from 'react';
import {StackNavigationProps} from '../screens';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import styles from '../styles';
import Model from '../model/Model';
import {observer} from 'mobx-react-lite';

const Actions = observer(({navigation}: StackNavigationProps) => {
	return (
		<View style={styles.container}>
			<ScrollView>
				<View style={styles.insideContainer}>
					<Text style={[styles.title, styles.marginBottom]}>Please define the actions</Text>
					<View style={styles.middlePanel}>
						<View style={styles.selectorItemsContainer}>
							<Text style={styles.selectorTimeText}>0 sec</Text>
							<Image style={styles.selectorTimeImage} source={require('../assets/icons/timeline-clock-outline.png')} />
							<Text style={styles.selectorText}>START RECORDING</Text>
						</View>

						{Model.actions.map((action) => {
							return (
								<View style={styles.selectorItemsContainer} key={action.triggerStart}>
									<Text style={styles.selectorTimeText}>{action.triggerStart} sec</Text>
									<Image style={styles.selectorTimeImage} source={require('../assets/icons/timeline-clock.png')} />
									<TouchableOpacity
										style={styles.selectorButton}
										onPress={() => {
											navigation.navigate('ActionsSelector', {action});
										}}>
										{action.selectedAction ? (
											<Text style={styles.selectorButtonText}>{action.selectedAction}</Text>
										) : (
											<Text style={styles.selectorButtonTextDisabled}>select item</Text>
										)}
										<Image style={styles.selectorButtonImage} source={require('../assets/icons/menu-down.png')} />
									</TouchableOpacity>
								</View>
							);
						})}

						<View style={styles.selectorItemsContainer}>
							<Text style={styles.selectorTimeText}>{Model.maxRecordingTime} sec</Text>
							<Image style={styles.selectorTimeImage} source={require('../assets/icons/timeline-clock-outline.png')} />
							<Text style={styles.selectorText}>AUTOMATIC STOP</Text>
						</View>
					</View>
				</View>
			</ScrollView>

			<TouchableOpacity
				style={
					Model.actions.some((x) => x.selectedAction == null) ? styles.continueButtonDisabled : styles.continueButton
				}
				disabled={Model.actions.some((x) => x.selectedAction == null)}
				onPress={() => {
					navigation.navigate('MetaInformation');
				}}>
				<Text style={styles.continueButtonText}>Continue</Text>
			</TouchableOpacity>
		</View>
	);
});
export default Actions;
