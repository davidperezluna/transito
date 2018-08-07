import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { environment } from 'environments/environment';
import "rxjs/add/operator/map";

@Injectable()
export class CfgChoqueConService {
	private url = environment.apiUrl + "cfgchoquecon";
	public identity;
	public token;

	constructor(private _http: Http) { }

	getCfgChoqueCon() {

		return this._http.get(this.url + "/").map(res => res.json());
	}

	register(cfgChoqueCon, token) {
		let json = JSON.stringify(cfgChoqueCon);
		let params = "json=" + json + "&authorization=" + token;
		console.log(params);
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/new", params, { headers: headers })
			.map(res => res.json());
	}

	deleteCfgChoqueCon(token, id) {
		let json = JSON.stringify(id);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/delete", params, { headers: headers })
			.map(res => res.json());
	}

	showCfgChoqueCon(token, id) {

		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/show/" + id, params, { headers: headers })
			.map(res => res.json());

	}

	editCfgChoqueCon(cfgChoqueCon, token) {

		let json = JSON.stringify(cfgChoqueCon);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/edit", params, { headers: headers })
			.map(res => res.json());

	}

	getChoqueConSelect() {
		return this._http.get(this.url + "/select").map(res => res.json());
	}




} 