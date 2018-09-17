import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { environment } from 'environments/environment';
import "rxjs/add/operator/map";

import { LoggerService } from "../logger/services/logger.service";

@Injectable()
export class MsvSenialService {
	private url = environment.apiUrl + "seguridadvial/svsenial";
	public identity;
	public token;

	constructor(private _http: Http, private _loogerService: LoggerService) { }

	index() {
	    return this._http.get(this.url + "/").map(res => res.json());
    }

	searchBySenial(datos, token){
		let json = JSON.stringify(datos);
		let params = "data="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/bysenial", params, {headers: headers}).map(res => res.json());
	}

	searchByFull(){
		return this._http.get(this.url + "/full").map(res => res.json());
	}

	export(){
		window.location.href = this.url + "/export";
	}

	exportInv(data){
		let params = '';
		for (var item in data) {
			params += data[item] + '_'
		}
		window.location.href = this.url + "/exportinv/" + params.substr(0, (params.length - 1));
	}
	
	searchByParametros(datos,token){
		let json = JSON.stringify(datos);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/search/parametros", params, {headers: headers}).map(res => res.json());
	}

	register(formData, datos, token){
		let json = JSON.stringify(datos);
		formData.append('data', json);
		formData.append('authorization', token);

		console.log(formData);
		return this._http.post(this.url+"/new", formData).map(res => res.json());
	}

	select() {
		return this._http.get(this.url + "/select").map(res => res.json());
	}

	selectByTipoSenial(datos, token) {
		let json = JSON.stringify(datos);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/select/tiposenial", params, { headers: headers }).map(res => res.json());
	}
}