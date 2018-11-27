import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { environment } from 'environments/environment';
import "rxjs/add/operator/map";

@Injectable()
export class SvSenialBodegaService {
	private url = environment.apiUrl + "seguridadvial/svsenialbodega";
	public identity;
	public token;

	constructor(private _http: Http) { }

	index() {
	    return this._http.get(this.url + "/").map(res => res.json());
    }

	register(formData, datos, token){
		if(formData == null){
			let json = JSON.stringify(datos);
			let params = "data="+json+"&authorization="+token;
			let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
			return this._http.post(this.url+"/new", params, {headers: headers}).map(res => res.json());
		}else {
			let json = JSON.stringify(datos);
			formData.append('data', json);
			formData.append('authorization', token);
			return this._http.post(this.url + "/new", formData).map(res => res.json());
		}
	}

	edit(formData, datos, token){
		if(formData == null){
			let json = JSON.stringify(datos);
			let params = "data=" + json + "&authorization=" + token;
			let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
			return this._http.post(this.url + "/edit", params, {headers: headers}).map(res => res.json());
		}else {
			let json = JSON.stringify(datos);
			 formData.append('data', json);
			 formData.append('authorization', token);

			 console.log(formData);
			 return this._http.post(this.url+"/edit", formData).map(res => res.json());
		}
	}
}