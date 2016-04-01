export class Pipeline {
	filters = [];

	add(filter) {
		this.filters.push(filter);
		return this;
	}
	
	process(context) {
		for(let filter of this.filters) {
			filter.process(context);
		}
	}
}