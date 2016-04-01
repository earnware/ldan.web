import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
import {json} from 'aurelia-http-client';

@inject(HttpClient)
export class ApiAuthentication {
	constructor(http){
		this.http = http;
	}
	
	login(loginMessage) {
		return this
			.http			
			.createRequest('login')
			.asPost()					
			.withHeader('Content-Type', 'application/json')
			.withContent(JSON.stringify({
				network: loginMessage.network,
				clientId: loginMessage.clientId,
				accessToken: loginMessage.accessToken,
				email: loginMessage.email,
				firstName: loginMessage.firstName,
				lastName: loginMessage.lastName,
				thumbnail: loginMessage.thumbnail}))
			.send()
			.then(function(r){
				return JSON.parse(r.response);
			});		
	}
	
	register(registerMessage) {
		return this
			.http			
			.createRequest('register')
			.asPost()					
			.withHeader('Content-Type', 'application/json')
			.withContent(JSON.stringify({
				email: registerMessage.email,
				firstName: registerMessage.firstName,
				lastName: registerMessage.lastName,
				password: registerMessage.password}))
			.send()
			.then(function(r){
				return JSON.parse(r.response);
			});		
	}	
}