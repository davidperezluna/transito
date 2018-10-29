import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { environment } from 'environments/environment';
import "rxjs/add/operator/map";

@Injectable()
export class CfgClaseAccidenteService {
	private url = environment.apiUrl + "cfgclaseaccidente";
	public identity;
	public token;

	constructor(private _http: Http) { }

	getCfgClaseAccidente() {

		return this._http.get(this.url + "/").map(res => res.json());
	}

	register(cfgClaseAccidente, token) {
		let json = JSON.stringify(cfgClaseAccidente);
		let params = "json=" + json + "&authorization=" + token;
		console.log(params);
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/new", params, { headers: headers })
			.map(res => res.json());
	}

	deleteCfgClaseAccidente(token, id) {
		let json = JSON.stringify(id);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/delete", params, { headers: headers })
			.map(res => res.json());
	}

	show(id, token) {

		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/" + id + "/show", params, { headers: headers })
			.map(res => res.json());
	}

	editCfgClaseAccidente(cfgClaseAccidente, token) {

		let json = JSON.stringify(cfgClaseAccidente);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/edit", params, { headers: headers })
			.map(res => res.json());

	}

	getClaseAccidenteSelect() {
		return this._http.get(this.url + "/select").map(res => res.json());
	}

} 