import {Chain} from '../../../commons/chain';

export class NativeSignInChainLink extends Chain {
	process(context) {
		
		if (context.message.network === 'native') {
			return new Promise(function(resolve, reject){
				// do something awesome and resolve
				
				context.user = {
					"userId":1,
					"network": "native",
					"clientId": "100",
					"accessToken": "accesstoken",
					"email": "kgarcia@earnware.com",
					"firstName": "Keith (Native)",
					"lastName": "Garcia",
					"thumbnail": "https://graph.facebook.com/10205322301437878/picture"					
				};
				
				resolve(context);				
			});
		}
		
		return this.processNextChainLink(context);
	}
}