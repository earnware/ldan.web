import {AureliaServiceLocatorChain} from '../../commons/aurelia-service-locator-chain';
import {Factory} from '../../construction/factory';
import hello from 'hellojs';
import {HelloJsSignInChainLink} from './chain-links/hellojs-sign-in-chainlink';
import {HelloJsSignOutChainLink} from './chain-links/hellojs-sign-out-chainlink';
import {NativeRegisterChainLink} from './chain-links/native-register-chainlink';
import {NativeSignInChainLink} from './chain-links/native-sign-in-chainlink';
import {NativeSignOutChainLink} from './chain-links/native-sign-out-chainlink';
import {inject} from 'aurelia-framework';

@inject(Factory)
export class Authority {	
	
	constructor(factory) {		
		this.factory = factory;		
	}	
	
	register(registrationMessage) {
		let chain = this.factory.create(AureliaServiceLocatorChain);		
		return chain
			.addNew(NativeRegisterChainLink)
			.process({message: registrationMessage})
			.then(function(ctx){
				return ctx.user;
			});		
	}
	
	signIn(signInMessage) {
		let chain = this.factory.create(AureliaServiceLocatorChain);
		
		return chain
			.addNew(HelloJsSignInChainLink)		
			.addNew(NativeSignInChainLink)
			.process({message: signInMessage})
			.then(function(ctx){
				return ctx.user;
			});						
	}
	
	signOut(signOutMessage) {
		let chain = this.factory.create(AureliaServiceLocatorChain);
		
		return chain
			.addNew(NativeSignOutChainLink)
			.addNew(HelloJsSignOutChainLink)
			.process({message: signOutMessage})
			.then(function(ctx){
				return ctx;
			})
	}
}