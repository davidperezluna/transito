import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from 'environments/environment';
import { LoggerService } from "../logger/services/logger.service";
import 'rxjs/add/operator/map';

@Injectable()
export class FroTrteSolicitudRnaService {
	private url = environment.apiUrl + "tramitesolicitud";
	public identity;
	public token;

	constructor(
		private _http: Http,
		private _loogerService: LoggerService
	) { }

	index() {
		return this._http.get(this.url + "/").map(res => res.json());
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
			res => res.json(),
			this._loogerService.registerLog(token, 'DELETE', json, this.url)
		);
	}

	show(token, id) {
		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/" + id + "/show", params, { headers: headers })
			.map(res => res.json());
	}

	edit(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/edit", params, { headers: headers }).map(
			res => res.json(),
			this._loogerService.registerLog(token, 'UPDATE', json, this.url)
		);
	}

	select() {
		return this._http.get(this.url + "/select").map(res => res.json());
	}

	getByModulo(moduloId) {
		let json = JSON.stringify(moduloId);
		let params = 'json=' + json;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/index', params, { headers: headers }).map(res => res.json());
	}

	showTramiteSolicitudByTamiteFactura(token, id) {
		let params = 'authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url +'/'+ id+'/show/tramiteSolicitud', params, { headers: headers }).map(res => res.json());
	}

	showTramiteSolicitudByTamiteFacturaFormulario(datos, token) {
		let json = JSON.stringify(datos);
		let params = 'data=' + json + '&authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/tramiteSolicitud/search/idFactura/formulario', params, { headers: headers }).map(res => res.json());
	}

	getTramiteSolicitudByIdVehiculo(token,idVehiculo) {
		let json = JSON.stringify(idVehiculo);
		let params = 'json=' + json + '&authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/byvehiculoorder',params,{ headers: headers }).map(res => res.json());
	}

	byIdVehiculo(token,idVehiculo) {
		let json = JSON.stringify(idVehiculo);
		let params = 'json=' + json + '&authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/byidvehiculo',params,{ headers: headers }).map(res => res.json());
	}

	getTramiteSolicitudByIdVehiculoAndDate(token,datos) {
		let json = JSON.stringify(datos);
		let params = 'json=' + json + '&authorization=' + token;		
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/byvehiculoanddate',params,{ headers: headers }).map(res => res.json());
	}

	getTramiteReporte() {
		return this._http.get(this.url + '/reporte').map(res => res.json());
	}

	getReporteFecha(token,datos) {
		let json = JSON.stringify(datos);
		let params = 'json=' + json + '&authorization=' + token;		
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/reportefecha',params,{ headers: headers }).map(res => res.json());
	}

	searchMatriculaCancelada(datos, token) {
		let json = JSON.stringify(datos);
		let params = 'data=' + json + '&authorization=' + token;		
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/search/matricula/cancelada',params,{ headers: headers }).map(res => res.json());
	}

	searchByModuloAndFilter(datos, token) {
		let json = JSON.stringify(datos);
		let params = 'data=' + json + '&authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/search/modulo/filter', params, { headers: headers }).map(res => res.json());
	}
}