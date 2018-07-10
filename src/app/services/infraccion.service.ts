import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class InfraccionService {
	private url = environment.apiUrl + "infraccion";
	public identity;
	public token;

	constructor(private _http: Http) { }

	getInfraccion() {
		return this._http.get(this.url + "/").map(res => res.json());
	}

	register(infraccion, token) {
		let json = JSON.stringify(infraccion);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/new", params, { headers: headers }).map(res => res.json());
	}

	deleteInfraccion(token, id) {
		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/" + id + "/delete", params, { headers: headers }).map(res => res.json());
	}

	showInfraccion(token, id) {
		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/show/" + id, params, { headers: headers }).map(res => res.json());
	}

	// tslint:disable-next-line:one-line
	editInfraccion(infraccion, token) {
		let json = JSON.stringify(infraccion);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/edit", params, { headers: headers }).map(res => res.json());
	}

	getInfraccionSelect() {
		return this._http.get(this.url + "/select").map(res => res.json());
	}
}