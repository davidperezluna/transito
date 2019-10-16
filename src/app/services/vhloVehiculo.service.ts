import { Injectable } from "@angular/core";
import  {Http, Headers, ResponseContentType} from "@angular/http";
import { LoggerService } from "../logger/services/logger.service";
import { environment } from 'environments/environment';
import { EventEmitter } from '@angular/core';
import  "rxjs/add/operator/map";

@Injectable()
export class VhloVehiculoService { 
	private url = environment.apiUrl + 'vehiculo/vhlovehiculo';
	public identity;
	public token;
	public cartData = new EventEmitter<any>();
 
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

	delete(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;	
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/delete", params, { headers: headers }).map(
			res => res.json()
		);
	}

	show(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/show", params, { headers: headers }).map(res => res.json());
	}

	edit(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/edit", params, { headers: headers }).map(
			res => res.json(),
		);
	}

	select() {
		return this._http.get(this.url + "/select").map(res => res.json());
	}

	showMaquinariaOrRemolque(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/show/maquinaria/remolque", params, { headers: headers }).map(res => res.json());
	}

	searchByFilter(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/search/filter", params, { headers: headers }).map(res => res.json());
	}

	showByParameters(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/show/parameters", params, { headers: headers }).map(res => res.json());
	}

	searchByParameters(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/search/parameters", params, { headers: headers }).map(res => res.json());
	}

	searchByPlaca(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/search/placa", params, { headers: headers }).map(res => res.json());
	}

	searchByPlacaForDevolucion(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/search/placa/devolucion", params, { headers: headers }).map(res => res.json());
	}

	update(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/update", params, { headers: headers }).map(res => res.json());
	}

	assign(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/assign", params, { headers: headers }).map(res => res.json());
	}

	validations(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/validations", params, { headers: headers }).map(res => res.json());
	}

	certificadoTradicionByFile(formData, datos, token) {
		let contentType;
		let json = JSON.stringify(datos);
		formData.append('data', json);
		formData.append('authorization', token);
		return this._http.post(this.url + "/certificado/tradicion/file", formData, { 'responseType': ResponseContentType.Blob }).map(res =>{
				contentType = res.headers.get('Content-type');
				if (contentType == 'application/json') {
					return res.json();
				} else if (contentType == 'application/pdf') {
					return new Blob([res.blob()], { type: 'application/pdf' })
				}
			} 
		);
	}
}