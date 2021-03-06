import { Injectable } from "@angular/core";
import { Http, Headers, ResponseContentType } from "@angular/http";
import { LoggerService } from "../logger/services/logger.service";
import { environment } from 'environments/environment';
import  "rxjs/add/operator/map";

@Injectable()
export class GdDocumentoService {
	private url = environment.apiUrl + 'gestiondocumental/gddocumento';
	public identity;
	public token;

	constructor(
		private _http: Http,
		private _loogerService: LoggerService
	){}

	index(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(datos, token) {	
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/new", params, { headers: headers }).map(
			res => res.json(),
			this._loogerService.registerLog(token, 'INSERT', json, this.url)
		);
	}
	
	delete(datos, token){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/delete", params, {headers: headers}).map(res => res.json());
	}

	show(datos, token){
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show", params, {headers: headers}).map(res => res.json());
	}

	edit(datos,token){
		let json = JSON.stringify(datos);
		let params = "data="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url + "/edit", params, { headers: headers }).map(
			res => res.json(),
			this._loogerService.registerLog(token, 'UPDATE', json, this.url)
		);
	}

	search(datos, token){
		let json = JSON.stringify(datos);
		let params = "data="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/search", params, {headers: headers}).map(res => res.json());
	}

	searchByState(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/search/state", params, { headers: headers }).map(res => res.json());
	}
	
	update(formData, datos, token) { 
		let json = JSON.stringify(datos);
		formData.append('data', json);
		formData.append('authorization', token);
		return this._http.post(this.url + "/update", formData).map(
			res => res.json(),
			this._loogerService.registerLog(token, 'UPDATE', json, this.url)
		);
	}

	finish(formData, datos, token) { 
		let json = JSON.stringify(datos);
		formData.append('data', json);
		formData.append('authorization', token);
		return this._http.post(this.url + "/finish", formData).map(
			res => res.json(),
			this._loogerService.registerLog(token, 'UPDATE', json, this.url)
		);
	}

	exit(formData, datos, token) {	
		let json = JSON.stringify(datos);
		formData.append('data', json);
		formData.append('authorization', token);
		return this._http.post(this.url + "/exit", formData).map(
			res => res.json(),
			this._loogerService.registerLog(token, 'UPDATE', json, this.url)
		);
	}


	assign(datos, token){	
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/assign", params, { headers: headers }).map(
			res => res.json(),
			this._loogerService.registerLog(token, 'UPDATE', json, this.url)
		);
	}
	
	print(datos, token){
		let json = JSON.stringify(datos);
		let params = "data="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/print", params, {headers: headers}).map(res => res.json());
	}

	template(formData, token) {
		formData.append('authorization', token);
		return this._http.post(this.url + "/template", formData).map(
			res => res.json()
		);
	}

	report(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/report", params, { headers: headers }).map(res => res.json());
	}
}