import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { environment } from 'environments/environment';
import "rxjs/add/operator/map";

@Injectable()
export class CfgGravedadService {
	private url = environment.apiUrl + "cfggravedad";
	public identity;
	public token;

	constructor(private _http: Http) { }

	getCfgGravedad() {

		return this._http.get(this.url + "/").map(res => res.json());
	}

	register(cfgGravedad, token) {
		let json = JSON.stringify(cfgGravedad);
		let params = "json=" + json + "&authorization=" + token;
		console.log(params);
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/new", params, { headers: headers })
			.map(res => res.json());
	}

	deleteCfgGravedad(token, id) {
		let json = JSON.stringify(id);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/delete", params, { headers: headers })
			.map(res => res.json());
	}

	showCfgGravedad(token, id) {

		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/show/" + id, params, { headers: headers })
			.map(res => res.json());

	}

	editCfgGravedad(cfgGravedad, token) {

		let json = JSON.stringify(cfgGravedad);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/edit", params, { headers: headers })
			.map(res => res.json());

	}

	getGravedadSelect() {
		return this._http.get(this.url + "/select").map(res => res.json());
	}




} 