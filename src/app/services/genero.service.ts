import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

@Injectable()
export class GeneroService {
	public url = "http://localhost/GitHub/colossus-sit/web/app_dev.php/genero";
	public identity;
	public token;

	constructor(private _http: Http) { }

	getGenero() {
		return this._http.get(this.url + "/").map(res => res.json());
	}

	register(genero, token) {

		let json = JSON.stringify(genero);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/new", params, { headers: headers }).map(res => res.json());
	}

	deleteGenero(token, id) {

		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/" + id + "/delete", params, { headers: headers })
			.map(res => res.json());
	}

	showGenero(token, id) {

		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/show/" + id, params, { headers: headers })
			.map(res => res.json());

	}

	// tslint:disable-next-line:one-line
	editGenero(genero, token) {
		let json = JSON.stringify(genero);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/edit", params, { headers: headers }).map(res => res.json());
	}

	getGeneroSelect() {
		return this._http.get(this.url + "/select").map(res => res.json());
	}
}