import 'bootstrap';

export class App {
	configureRouter(config, router) {
		config.title = 'LDAN';
		config.map([
			{ route: ['', 'dashboard'], name: 'dashboard', moduleId: './view-models/dashboard', nav: true, title:'Dashboard', settings: {menu: 'root', iconClass: 'fa-dashboard'} },
			{ route: ['charts'], name: 'charts', moduleId: './view-models/charts', nav: true, title:'Charts', settings: {menu: 'root', iconClass: 'fa-bar-chart'} },
			{ route: ['tables'], name: 'tables', moduleId: './view-models/tables', nav: true, title:'Tables', settings: {menu: 'root', iconClass: 'fa-table'} },
			{ route: ['forms'], name: 'forms', moduleId: './view-models/forms', nav: true, title:'Forms', settings: {menu: 'root', iconClass: 'fa-edit'} }
		]);
		
		config.mapUnknownRoutes('');
		this.router = router;
	}	
}