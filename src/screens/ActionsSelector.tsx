import React from 'react';
import {StackNavigationProps} from '../screens';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from '../styles';
import Model from '../model/Model';
import {observer} from 'mobx-react-lite';

const ActionsSelector = observer(({navigation, route}: StackNavigationProps) => {
	const action = route.params.action;
	return (
		<View style={styles.selectorContainer}>
			{Model.selectableActions.map((selectable) => {
				return (
					<View style={styles.selectorItemTopRuler} key={selectable}>
						<TouchableOpacity
							style={styles.selectorItems}
							onPress={() => {
								action.selectedAction = selectable;
								navigation.goBack();
							}}>
							<Text style={styles.selectorItemText}>{selectable}</Text>
							{action.selectedAction === selectable ? (
								<Image style={styles.selectorItemImage} source={require('../assets/icons/check.png')} />
							) : (
								<View />
							)}
						</TouchableOpacity>
					</View>
				);
			})}
			<View style={styles.selectorItemTopRuler} />
		</View>
	);
});
export default ActionsSelector;
