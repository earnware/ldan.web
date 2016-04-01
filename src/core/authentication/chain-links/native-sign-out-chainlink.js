import {Chain} from '../../../commons/chain';

export class NativeSignOutChainLink extends Chain {
	process(context) {
		if (context.message.network === 'native') {
			return new Promise(function(resolve, reject){
				// do something awesome and resolve
				resolve();				
			});
		}
		
		return this.processNextChainLink(context);
	}
}