import {observable} from 'mobx';

class Action {
	startTime: number = 0;
	@observable selectedAction: string | null = null;

	constructor(start: number) {
		this.startTime = start;
	}
}

class Model {
	@observable selectedPosition = 0;
	positions = ['sitting', 'standing'];
	@observable selectedLocation = 0;
	locations = ['pocket', 'jacket'];
	@observable selectedTalking = 0;
	talking = ['yes', 'no'];

	selectableActions = ['Single cough', 'Short laughing', 'Multiple coughs', 'Clear throat'];
	@observable actions = [new Action(10), new Action(20), new Action(30), new Action(40), new Action(50)];
}
export default new Model();
