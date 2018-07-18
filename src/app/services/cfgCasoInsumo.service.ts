import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { environment } from 'environments/environment';
import "rxjs/add/operator/map";

@Injectable()
export class CfgCasoInsumoService {
	private url = environment.apiUrl + "cfgCasoInsumo";
	public identity;
	public token;

	constructor(private _http: Http) { }

	getCfgCasoInsumo() {

		return this._http.get(this.url + "/").map(res => res.json());
	}

	register(cfgCasoInsumo, token) {
		let json = JSON.stringify(cfgCasoInsumo);
		let params = "json=" + json + "&authorization=" + token;
		console.log(params);
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/new", params, { headers: headers })
			.map(res => res.json());
	}

	deleteCfgCasoInsumo(token, id) {
		let json = JSON.stringify(id);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/delete", params, { headers: headers })
			.map(res => res.json());
	}

	showCfgCasoInsumo(token, id) {

		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/show/" + id, params, { headers: headers })
			.map(res => res.json());

	}

	editCfgCasoInsumo(cfgCasoInsumo, token) {

		let json = JSON.stringify(cfgCasoInsumo);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/edit", params, { headers: headers })
			.map(res => res.json());

	}

	getCfgCasoInsumoSelect() {

		return this._http.get(this.url + "/select").map(res => res.json());
	}

	getCfgCasoInsumoPorIdSelect(id) {
		return this._http.get(this.url + "/" + id + "/select/cfgCasoInsumos/por/id").map(res => res.json());
	}



} 