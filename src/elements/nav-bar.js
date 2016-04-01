import {Aurelia} from 'aurelia-framework';
import {Authority} from '../core/authentication/authority';
import {bindable} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {State} from '../core/state/state';

@inject(Aurelia, Authority, State)
export class NavBar {

	@bindable router = null;

	constructor(aurelia, authority, state){
		this.aurelia = aurelia;
		this.authority = authority;
		this.state = state;										
	}	  
	
	triggerSignOutRequest(){
		var self = this;
		this.authority
			.signOut({network: this.state.user.network})
			.then(function(){
				self.aurelia.setRoot('view-models/welcome');
			})
	}	  	
}