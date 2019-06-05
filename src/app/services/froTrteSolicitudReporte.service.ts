import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { EventEmitter } from '@angular/core';
import { LoggerService } from "../logger/services/logger.service";
import { environment } from 'environments/environment';
import  "rxjs/add/operator/map";

@Injectable()
export class FroTrteSolicitudReporteService { 
    private url = environment.apiUrl + 'financiero/frotrtesolicitudreporte';
	public identity;
	public token;
	public cartData = new EventEmitter<any>();
 
	constructor(
		private _http: Http,
		private _loogerService: LoggerService
    ){}
    
	searchByPlaca(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/search/placa", params, { headers: headers }).map(res => res.json());
	}
    
	searchPropietariosActualesByPlaca(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/search/propietarios/actuales/placa", params, { headers: headers }).map(res => res.json());
	}
}