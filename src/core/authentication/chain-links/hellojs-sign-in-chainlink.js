import {ApiAuthentication} from '../../api/api-authentication';
import {Chain} from '../../../commons/chain';
import hello from 'hellojs';
import {inject} from 'aurelia-framework';

@inject(ApiAuthentication)
export class HelloJsSignInChainLink extends Chain {
	
	constructor(api) {
		super();
		this.api = api;
	}
	
	process(context) {
		
		let self = this;
		
		if (context.message.network != 'native') {
		
			return hello(context.message.network)
				.login()
				.then(function(auth) {		
					return hello(auth.network)
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
				});
		}
		
		return this.processNextChainLink(context);
	}
}