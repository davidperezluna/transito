import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class TramiteService {
	private url = environment.apiUrl + "tramite";
	public identity;
	public token;

	constructor(private _http: Http) { }

	getTramite() {
		return this._http.get(this.url + "/").map(res => res.json());
	}

	register(tramite, token) {
		let json = JSON.stringify(tramite);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/new", params, { headers: headers }).map(res => res.json());
	}

	deleteTramite(token, id) {
		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/" + id + "/delete", params, { headers: headers }).map(res => res.json());
	}

	showTramite(token, id) {
		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/show/" + id, params, { headers: headers }).map(res => res.json());
	}

	// tslint:disable-next-line:one-line
	editTramite(tramite, token) {
		let json = JSON.stringify(tramite);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/edit", params, { headers: headers }).map(res => res.json());
	}

	getTramiteSelect() {
		return this._http.get(this.url + "/select").map(res => res.json());
	}

	getTramitePorModuloSelect(id){
		return this._http.get(this.url+"/"+id+"/select/tramites/por/modulo").map(res => res.json());
	}
} 