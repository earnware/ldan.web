import {ApiAuthentication} from '../../api/api-authentication';
import {Chain} from '../../../commons/chain';
import {inject} from 'aurelia-framework';

@inject(ApiAuthentication)
export class NativeRegisterChainLink extends Chain {
	
	constructor(api) {
		super();
		this.api = api;
	}
	
	process(context) {
		
		if (context.message.network === 'native') {
			return new Promise(function(resolve, reject){
				context.user = {
					"authToken": "registration auth token",
					"clientId": "1",
					"userId": "1",
					"network": "native",
					"accessToken": "accesstoken",
					"email": "kgarcia@earnware.com",
					"firstName": "Keith (Native Registration)",
					"lastName": "Garcia",
					"thumbnail": "https://graph.facebook.com/10205322301437878/picture"					
				};
				
				resolve(context);
			});
			
			// do something awesome and resolve
			// return self.api
			// 	.register(context.message)
			// 	.then(function(user){
			// 		context.user = user;
			// 		return context;
			// 	});
		}
		
		return this.processNextChainLink(context);
	}
}