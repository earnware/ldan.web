import {Container} from 'aurelia-dependency-injection';
import {Factory} from './factory';

export class AureliaFactory extends Factory {
	
	constructor() {
		super();
		this.container = Container.instance;
	}
	
	create(key) {
		return this.container.get(key);
	}
} 