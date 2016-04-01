import {Chain} from '../../../commons/chain';
import hello from 'hellojs';

export class HelloJsSignOutChainLink extends Chain {
	
	process(context) {
		if (context.message.network != 'native') {
			return hello(context.message.network).logout();
		}
		
		return this.processNextChainLink(context);
	}
}