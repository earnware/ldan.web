import {Aurelia} from 'aurelia-framework';
import {Authority} from '../core/authentication/authority';
import {inject} from 'aurelia-framework';
import {State} from '../core/state/state';
import {Validation} from 'aurelia-validation';

@inject (Aurelia, Authority, State, Validation, Validation)
export class Welcome {
	
	heading = 'Welcome';
	
	constructor(aurelia, authority, state, registrationValidation, signInValidation) {
		this.aurelia = aurelia;
		this.authority = authority;		
		this.state = state;		
		this.processing = false;		
		
		this.signInValidation = signInValidation.on(this)
			.ensure('lEmail')
				.isNotEmpty()
				.isEmail()
			.ensure('lPassword')
				.isNotEmpty();
		
		this.registrationValidation = registrationValidation.on(this)
			.ensure('rFirstName')
				.isNotEmpty()
				.hasMinLength(3)
			.ensure('rLastName')
				.isNotEmpty()
				.hasMinLength(3)
			.ensure('rEmail')
				.isNotEmpty()
				.isEmail()
			.ensure('rPassword')
				.isNotEmpty()
			.ensure('rPasswordConfirmation', (config) => {config.computedFrom(['rPassword'])})
				.isEqualTo(() => {return this.rPassword}, 'the entered password');
	}
	
	triggerRemoteSignInRequest(network){
		var self = this;
		self.processing = true;
		
		this.authority
			.signIn({network: network})
			.then(function(user){
				self.processing = false;					
				self.state.user = user;
				self.aurelia.setRoot();				
			}, function(reason){
				self.processing = false;
				console.log(reason);
			});     
	}
	
	signIn() {
		var self = this; 
		
		this.signInValidation.validate().then(() => {
			this.authority.signIn({
				email: this.lEmail, 
				password: this.lPassword, 
				rememberMe: this.lRememberMe,
				network: 'native'
			}).then(function(user){
				self.reset();
				self.state.user = user;
				self.aurelia.setRoot();								
			});   
		}).catch(e => {
			console.log(e);
		});		
	}
	
	signInReset() {
		this.lEmail = '';
		this.lPassword = '';
		this.lRememberMe = '';
		this.signInValidation.clear();
	}
	
	register() {
		var self = this;
		
		this.registrationValidation.validate().then(() => {
			this.authority.register({
				firstName: this.rFirstName,
				lastName: this.rLastName,
				email: this.rEmail,
				password: this.rPassword,
				network: 'native'
			}).then(function(user){
				self.reset();
				self.state.user = user;
				self.aurelia.setRoot();
			});
		}).catch(e => {
			console.log(e);
		});
	}
	
	registerReset() {
		this.rFirstName = '';
		this.rLastName = '';
		this.rEmail = '';
		this.rPassword = '';
		this.rPasswordConfirmation = '';
		this.registrationValidation.clear();
	}
	
	reset() {
		this.signInReset();
		this.registerReset();
	}
}