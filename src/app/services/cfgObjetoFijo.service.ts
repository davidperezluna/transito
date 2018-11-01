import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { environment } from 'environments/environment';
import "rxjs/add/operator/map";

@Injectable()
export class CfgObjetoFijoService {
	private url = environment.apiUrl + "cfgobjetofijo";
	public identity;
	public token;

	constructor(private _http: Http) { }

	getCfgObjetoFijo() {

		return this._http.get(this.url + "/").map(res => res.json());
	}

	register(cfgObjetoFijo, token) {
		let json = JSON.stringify(cfgObjetoFijo);
		let params = "json=" + json + "&authorization=" + token;
		console.log(params);
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/new", params, { headers: headers })
			.map(res => res.json());
	}

	deleteCfgObjetoFijo(token, id) {
		let json = JSON.stringify(id);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/delete", params, { headers: headers })
			.map(res => res.json());
	}

	showCfgObjetoFijo(id, token) {

		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/show/" + id, params, { headers: headers })
			.map(res => res.json());

	}

	editCfgObjetoFijo(cfgObjetoFijo, token) {

		let json = JSON.stringify(cfgObjetoFijo);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/edit", params, { headers: headers })
			.map(res => res.json());

	}

	getObjetoFijoSelect() {
		return this._http.get(this.url + "/select").map(res => res.json());
	}




} 