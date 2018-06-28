import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

@Injectable()
export class CfgPlacaService {
	public url = "http://localhost/GitHub/colossus-sit/web/app_dev.php/cfgplaca";
	public identity;
	public token;

	constructor(private _http: Http) { }

	getCfgPlaca() {

		return this._http.get(this.url + "/").map(res => res.json());
	}

	register(cfgPlaca, token) {
		let json = JSON.stringify(cfgPlaca);
		let params = "json=" + json + "&authorization=" + token;
		console.log(params);
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/new", params, { headers: headers })
			.map(res => res.json());
	}

	deleteCfgPlaca(token, id) {
		let json = JSON.stringify(id);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/delete", params, { headers: headers })
			.map(res => res.json());
	}

	showCfgPLaca(token, id) {

		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/show/" + id, params, { headers: headers })
			.map(res => res.json());

	}

	editCfgPlaca(cfgPLaca, token) {

		let json = JSON.stringify(cfgPLaca);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/edit", params, { headers: headers })
			.map(res => res.json());

	}

	getCfgPlacaSelect() {

		return this._http.get(this.url + "/select").map(res => res.json());
	}

	getCfgPlacaPorIdSelect(id) {
		return this._http.get(this.url + "/" + id + "/select/cfgPlacas/por/id").map(res => res.json());
	}

}