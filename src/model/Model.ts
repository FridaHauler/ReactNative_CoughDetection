import {observable} from 'mobx';
class action {
	startTime: number = 0;
	title: string | null = null;
}
class Model {
	@observable selectedPosition = 0;
	positions = ['sitting', 'standing'];
	@observable selectedLocation = 0;
	locations = ['pocket', 'jacket'];
	@observable selectedTalking = 0;
	talking = ['yes', 'no'];


}
export default new Model();




