export class Components {

	constructor($http) {
		this.$http = $http
		this.$http.get('json/components.json').then((response) => {
			this.components = response.data
		})
	}

}