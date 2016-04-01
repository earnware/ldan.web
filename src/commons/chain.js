
export class Chain {
	
	successor = null;
	
	add(chainLink) {		
		if (this.successor) {
			this.successor.add(chainLink);
			return this;
		}
		
		this.successor = chainLink;
		return this;
	}
	
	processNextChainLink(context) {
		
		if (this.successor)
			return this.successor.process(context);
		
		return new Promise(function(resolve, reject) {
			reject('no successor defined.');
		});
	}
	
	process(context) {
		return this.processNextChainLink(context);
	}
}