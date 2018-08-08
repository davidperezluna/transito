import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { environment } from 'environments/environment';
import "rxjs/add/operator/map";

@Injectable()
export class MsvInventarioSenialService {
	private url = environment.apiUrl + "msvinventariosenial";
	public identity;
	public token;

	constructor(private _http: Http) { }

	getMsvInventarioSenial() {
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
	/*register(msvInventarioSenial, token) {
		let json = JSON.stringify(msvInventarioSenial);
		let params = "json=" + json + "&authorization=" + token;
		//console.log(params);
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/new", params, { headers: headers })
			.map(res => res.json());
	}

	deleteMsvInventarioSenial(token, id) {
		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/" + id + "/delete", params, { headers: headers })
			.map(res => res.json());
	}

	showMsvInventarioSenialService(token, id) {

		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/show/" + id, params, { headers: headers })
			.map(res => res.json());

	}

	showMsvInventarioSenialPorSedeOperativa(token, id) {

		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/find/talonarios/sedeOperativa/" + id, params, { headers: headers })
			.map(res => res.json());

	}

	editMsvInventarioSenialService(msvInventarioSenial, token) {

		let json = JSON.stringify(msvInventarioSenial);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/edit", params, { headers: headers })
			.map(res => res.json());

	}

	getMsvInventarioSenialServiceSelect() {

		return this._http.get(this.url + "/select").map(res => res.json());
	}

	getMsvInventarioSenialServicePorIdSelect(id) {
		return this._http.get(this.url + "/" + id + "/select/msvInventarioSenial/por/id").map(res => res.json());
	}*/

}