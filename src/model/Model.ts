import {observable} from 'mobx';

export class Action {
	triggerStart: number = 0;
	@observable selectedAction: string | null = null;
	startTime: number = 0;
	recorderAudio = {};
	recorderGyro = {};

	constructor(start: number) {
		this.triggerStart = start;
	}
}

class Model {
	@observable selectedPosition = 0;
	positions = ['sitting', 'standing'];
	@observable selectedLocation = 0;
	locations = ['pocket', 'jacket'];
	@observable selectedTalking = 0;
	talking = ['yes', 'no'];

	@observable selectableActions = ['Single cough', 'Short laughing', 'Multiple coughs', 'Clear throat'];
	@observable actions = [new Action(10), new Action(20), new Action(30), new Action(40), new Action(50)];
}
export default new Model();
