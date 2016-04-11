import {ApiAuthentication} from '../api/api-authentication';
import {AureliaServiceLocatorChain} from '../../commons/aurelia-service-locator-chain';
import {Chain} from '../../commons/chain';
import {Factory} from '../../construction/factory';
import hello from 'hellojs'
import {inject} from 'aurelia-framework';
import {json} from 'aurelia-http-client';

@inject(Factory)
export class State {
		 
	constructor(factory) {
		this.factory = factory;
	}
		 
	 loadState() {
		let chain = this.factory.create(AureliaServiceLocatorChain);
		let self = this;
		
		return chain
			.addNew(HelloJsStateChainLink)
			.addNew(CatchAllStateChainLink)
			.process({})
			.then(function(ctx) {
				self.user = ctx.user;
				return ctx.user;
			});			
	 }
}

export class CatchAllStateChainLink extends Chain {
	process(context) {
		return new Promise(function(resolve, reject){
			resolve(context);
		});
	}
}

@inject(ApiAuthentication)
export class HelloJsStateChainLink extends Chain {

	constructor(api) {
		super();		
		this.api = api
	}	
	
	process(context) {
		let self = this;
		let helloStorage = localStorage.getItem('hello');
		
		if (helloStorage && helloStorage != '{}') {
			let helloAuth = JSON.parse(helloStorage);
			helloAuth = helloAuth[Object.keys(helloAuth)[0]];
			
			if (helloAuth.access_token) {				
				return hello(helloAuth.network)
					.login()
					.then(function(auth) {
						return hello(helloAuth.network)
							.api('me')						
							.then(function(response) {	
								let loginMessage = {
									network: auth.authResponse.network,
									clientId: auth.authResponse.client_id,
									accessToken: auth.authResponse.access_token,
									email: response.email,
									firstName: response.first_name,
									lastName: response.last_name,
									thumbnail: response.thumbnail
								};
														
								return self.api
									.login(loginMessage)
									.then(function(user){
										context.user = user;
										return context;
									});
							});						
					}, function(reason){
						console.log(reason);
						return context;
 					});
			}	
		}
		
		return this.processNextChainLink(context);
	}
	
}