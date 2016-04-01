export class UserRepository {	
	
	saveRemoteUser(msg) {
		
		return new Promise(function(resolve, reject){
			
			var user = {
				userId: 1,
				network: msg.network,
				clientId: msg.clientId,
				email: msg.email,
				firstName: msg.firstName,
				lastName: msg.lastName,
				thumbnail: msg.thumbnail
			};
			
			resolve(user);	
		});
	}
}