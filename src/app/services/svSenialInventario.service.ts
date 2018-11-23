import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { environment } from 'environments/environment';
import "rxjs/add/operator/map";

@Injectable()
export class SvSenialInventarioService {
	private urlBodega = environment.apiUrl + "seguridadvial/svsenialinventariobodega";
	private urlSenialBodega = environment.apiUrl + "seguridadvial/svsenial";
	private urlSenialMunicipio = environment.apiUrl + "seguridadvial/svsenialubicacion";
	public identity;
	public token;

	constructor(private _http: Http) { }

	index() {
	    return this._http.get(this.urlBodega + "/").map(res => res.json());
    }

	registerSenialBodega(formData, datos, token){
		if(formData == null){
			let json = JSON.stringify(datos);
			let params = "json="+json+"&authorization="+token;
			let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
			return this._http.post(this.urlSenialBodega+"/new", params, {headers: headers}).map(res => res.json());
		}else {
			let json = JSON.stringify(datos);
			formData.append('json', json);
			formData.append('authorization', token);

			console.log(formData);
			return this._http.post(this.urlSenialBodega + "/new", formData).map(res => res.json());
		}
	}

	registerSenialMunicipio(formData, datos, token) {
		if (formData == null) {
			let json = JSON.stringify(datos);
			let params = "json=" + json + "&authorization=" + token;
			let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
			return this._http.post(this.urlSenialMunicipio + "/new", params, { headers: headers }).map(res => res.json());
		} else {
			let json = JSON.stringify(datos);
			formData.append('json', json);
			formData.append('authorization', token);
			return this._http.post(this.urlSenialMunicipio + "/new", formData).map(res => res.json());
		}
	}

	edit(formData, datos, token){
		if(formData == null){
			let json = JSON.stringify(datos);
			let params = "data=" + json + "&authorization=" + token;
			let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
			return this._http.post(this.urlBodega + "/edit", params, {headers: headers}).map(res => res.json());
		}else {
			let json = JSON.stringify(datos);
			 formData.append('data', json);
			 formData.append('authorization', token);

			 console.log(formData);
			 return this._http.post(this.urlBodega+"/edit", formData).map(res => res.json());
		}
	}

	searchByTipoSenialInBodega(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.urlBodega + "/search/tiposenial", params, { headers: headers }).map(res => res.json());
	}

	searchByTipoSenialInMunicipio(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.urlSenialMunicipio + "/search/tiposenial", params, { headers: headers }).map(res => res.json());
	}

	searchByFull() {
		return this._http.get(this.urlBodega + "/full").map(res => res.json());
	}

	export() {
		window.location.href = this.urlBodega + "/export";
	}

	exportInv(data) {
		let params = '';
		for (var item in data) {
			params += data[item] + '_'
		}
		window.location.href = this.urlBodega + "/exportinv/" + params.substr(0, (params.length - 1));
	}

	searchByParametros(datos, token) {
		let json = JSON.stringify(datos);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.urlBodega + "/search/parametros", params, { headers: headers }).map(res => res.json());
	}

}