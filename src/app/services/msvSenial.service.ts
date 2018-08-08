import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { environment } from 'environments/environment';
import "rxjs/add/operator/map";

import { LoggerService } from "../logger/services/logger.service";

@Injectable()
export class MsvSenialService {
	private url = environment.apiUrl + "msvsenial";
	public identity;
	public token;

	constructor(private _http: Http, private _loogerService: LoggerService) { }

	getMsvSenial() {
	    return this._http.get(this.url + "/").map(res => res.json());
    }

	searchByFull(){
		return this._http.get(this.url + "/full").map(res => res.json());
	}

	export(){
		window.location.href = this.url + "/export";
	}
	
	searchByParametros(datos,token){
		let json = JSON.stringify(datos);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/search/parametros", params, {headers: headers}).map(res => res.json());
	}

	/*register(msvSenial,token){
		let json = JSON.stringify(msvSenial);
		let params = "json="+json+"&authorization="+token;
		/*let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers}).map(
				res => res.json(),
			this._loogerService.registerLog(token,'INSERT',json,this.url)
		);*/
		//let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		//return this._http.post(this.url + "/new", params, { headers: headers })
		//	.map(res => res.json());
	//}*/
	register(formData, datos, token){
		let json = JSON.stringify(datos);
		formData.append('data', json);
		formData.append('authorization', token);

		console.log(formData);
		//let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", formData).map(res => res.json());
		/*let json = JSON.stringify(datos);
		 let params = "json="+json+"&"+formData+"&authorization="+token;
		 return this._http.post(this.url+"/new", params, {headers: headers})
		 .map(res => res.json());*/
	}

	/*register(msvSenial, token) {
		let json = JSON.stringify(msvSenial);
		let params = "json=" + json + "&authorization=" + token;
		//console.log(params);
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/new", params, { headers: headers })
			.map(res => res.json());
	}

	deleteMsvSenial(token, id) {
		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/" + id + "/delete", params, { headers: headers })
			.map(res => res.json());
	}

	showMsvSenialService(token, id) {

		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/show/" + id, params, { headers: headers })
			.map(res => res.json());

	}

	showMsvSenialPorSedeOperativa(token, id) {

		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/find/talonarios/sedeOperativa/" + id, params, { headers: headers })
			.map(res => res.json());

	}

	editMsvSenialService(msvSenial, token) {

		let json = JSON.stringify(msvSenial);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/edit", params, { headers: headers })
			.map(res => res.json());

	}

	getMsvSenialServiceSelect() {

		return this._http.get(this.url + "/select").map(res => res.json());
	}

	getMsvSenialServicePorIdSelect(id) {
		return this._http.get(this.url + "/" + id + "/select/msvSenial/por/id").map(res => res.json());
	}*/

}