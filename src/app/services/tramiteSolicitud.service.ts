import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TramiteSolicitudService {
	public url = 'http://localhost/GitHub/colossus-sit/web/app_dev.php/tramitesolicitud';
	public identity;
	public token;

	constructor(private _http: Http) { }

	getTramiteSolicitud() {
		return this._http.get(this.url + '/').map(res => res.json());
	}

	register(tramiteSolicitud, token) {
		let json = JSON.stringify(tramiteSolicitud);
		let params = 'json=' + json + '&authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/new', params, { headers: headers }).map(res => res.json());
	}

	deleteTramiteSolicitud(token, id) {
		let params = 'authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/' + id + '/delete', params, { headers: headers }).map(res => res.json());
	}

	showTramiteSolicitud(token, id) {
		let params = 'authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/show/' + id, params, { headers: headers }).map(res => res.json());
	}

	editTramiteSolicitud(tramiteSolicitud, token) {
		let json = JSON.stringify(tramiteSolicitud);
		let params = 'json=' + json + '&authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/edit', params, { headers: headers }).map(res => res.json());
	}

	getTramiteSolicitudSelect() {
		return this._http.get(this.url + '/select').map(res => res.json());
	}
}