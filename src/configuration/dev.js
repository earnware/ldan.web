import {AureliaFactory} from '../construction/aurelia-factory';
import {AureliaServiceLocatorChain} from '../commons/aurelia-service-locator-chain';
import {Factory} from '../construction/factory';
import hello from 'hellojs';
import {HelloJsSignInChainLink} from '../core/authentication/chain-links/hellojs-sign-in-chainlink';
import {HelloJsSignOutChainLink} from '../core/authentication/chain-links/hellojs-sign-out-chainlink';
import {HelloJsStateChainLink} from '../core/state/state';
import {HttpClient} from 'aurelia-http-client';
import {NativeSignInChainLink} from '../core/authentication/chain-links/native-sign-in-chainlink';
import {NativeSignOutChainLink} from '../core/authentication/chain-links/native-sign-out-chainlink';
import {State} from '../core/state/state';

export function configure(aurelia) {
	aurelia.use
		.standardConfiguration()
		.developmentLogging()
		.plugin('aurelia-validation');

	aurelia.container.registerTransient(AureliaServiceLocatorChain, AureliaServiceLocatorChain);
	aurelia.container.registerTransient(HelloJsSignInChainLink, HelloJsSignInChainLink);
	aurelia.container.registerTransient(HelloJsSignOutChainLink, HelloJsSignOutChainLink);
	aurelia.container.registerTransient(NativeSignInChainLink, NativeSignInChainLink);
	aurelia.container.registerTransient(NativeSignOutChainLink, NativeSignOutChainLink);
	aurelia.container.registerTransient(HelloJsStateChainLink, HelloJsStateChainLink);
	aurelia.container.registerSingleton(Factory, AureliaFactory);
	aurelia.container.registerSingleton(State, State);
	
	let http = aurelia.container.get(HttpClient);
	http
		.configure(config => {
			config.withBaseUrl('https://YOUR-AWS-PRODUCTION-BASE-URL-HERE')
		});
			
	aurelia.container.registerInstance(HttpClient, http);
	
	hello.init({
		facebook: "YOUR-FACEBOOK-APP-CLIENT-ID",
		google: "YOUR-GOOGLE-APP-CLIENT-ID",
	}, {redirect_uri: 'http://YOUR-REDIRECT-URI', scope: 'email', force: false});			
	
	aurelia.start().then(function() {		
		let state = aurelia.container.get(State);	
		state
			.loadState()
			.then(function(ctx){
				
				if (state.user)
					aurelia.setRoot();
				else
					aurelia.setRoot('view-models/welcome');
			});	
	});
		
	
}