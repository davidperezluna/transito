import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { environment } from 'environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class TramiteSolicitudService {
	private url = environment.apiUrl + "tramitesolicitud";
	public identity;
	public token;

	constructor(private _http: Http) { }

	getTramiteSolicitud() {
		return this._http.get(this.url + '/index').map(res => res.json());
	}

	getByModulo(moduloId) {
		let json = JSON.stringify(moduloId);
		let params = 'json=' + json;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/index', params, { headers: headers }).map(res => res.json());
	}
	
	register(tramiteSolicitud, token) {
		let json = JSON.stringify(tramiteSolicitud);
		let params = 'json=' + json + '&authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/new', params, { headers: headers }).map(res => res.json());
	}

	deleteTramiteSolicitud(token, id) {
		let params = 'authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/' + id + '/delete', params, { headers: headers }).map(res => res.json());
	}

	showTramiteSolicitud(token, id) {
		let params = 'authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url +'/'+ id+'/show', params, { headers: headers }).map(res => res.json());
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

	editTramiteSolicitud(tramiteSolicitud, token) {
		let json = JSON.stringify(tramiteSolicitud);
		let params = 'json=' + json + '&authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/edit', params, { headers: headers }).map(res => res.json());
	}

	getTramiteSolicitudSelect() {
		return this._http.get(this.url + '/select').map(res => res.json());
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
}