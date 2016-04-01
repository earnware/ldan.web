import {Chain} from './chain';
import {Factory} from '../construction/factory';
import {inject} from 'aurelia-framework';

@inject(Factory)
export class AureliaServiceLocatorChain extends Chain {
	
	constructor(factory) {
		super();
		this.factory = factory;
	}
	
	addNew(chainLink) {
		if (this.successor) {
			this.successor.add(this.factory.create(chainLink));
			return this;
		}
		
		this.successor = this.factory.create(chainLink);
		return this;
	}
}