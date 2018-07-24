import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { environment } from 'environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class RncLicenciaConduccionService {
	private url = environment.apiUrl + "licenciaconduccion";
	public identity;
	public token;

	constructor(private _http: Http) { }

	index() {
		return this._http.get(this.url + "/").map(res => res.json());
	}

	register(datos, token) {
		let json = JSON.stringify(datos);
		let params = 'json=' + json + '&authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/new', params, { headers: headers }).map(res => res.json());
	}

	delete(token, id) {
		let params = 'authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/delete', params, { headers: headers }).map(res => res.json());
	}

	show(token, id) {
		let params = 'authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/show', params, { headers: headers }).map(res => res.json());
	}

	edit(datos, token) {
		let json = JSON.stringify(datos);
		let params = 'json=' + json + '&authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/edit', params, { headers: headers }).map(res => res.json());
	}

	select() {
		return this._http.get(this.url + '/select').map(res => res.json());
	}

	recordByCiudadanoId(datos, token) {
		let json = JSON.stringify(datos);
		let params = 'json=' + json + '&authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/record/ciudadano/id', params, { headers: headers }).map(res => res.json());
	}
}