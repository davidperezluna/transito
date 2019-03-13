import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { environment } from 'environments/environment';
import "rxjs/add/operator/map";

@Injectable()
export class MsvTalonarioService {
	private url = environment.apiUrl + "msvtalonario";
	public identity;
	public token;

	constructor(private _http: Http) { }

	index() {
		return this._http.get(this.url + "/").map(res => res.json());
	}

	register(msvTalonario, token) {
		let json = JSON.stringify(msvTalonario);
		let params = "json=" + json + "&authorization=" + token;
		//console.log(params);
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/new", params, { headers: headers })
			.map(res => res.json());
	}

	deleteMsvTalonario(token, id) {
		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/" + id + "/delete", params, { headers: headers })
			.map(res => res.json());
	}

	showMsvTalonario(token, id) {

		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/show/" + id, params, { headers: headers })
			.map(res => res.json());

	}

	showMsvTalonarioPorOrganismoTransito(token, id) {

		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/find/talonarios/sedeOperativa/" + id, params, { headers: headers })
			.map(res => res.json());

	}

	editMsvTalonario(msvTalonario, token) {

		let json = JSON.stringify(msvTalonario);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/edit", params, { headers: headers })
			.map(res => res.json());

	}

	getMsvTalonarioSelect() {

		return this._http.get(this.url + "/select").map(res => res.json());
	}

	getMsvTalonarioPorIdSelect(id) {
		return this._http.get(this.url + "/" + id + "/select/msvtalonario/por/id").map(res => res.json());
	}

}