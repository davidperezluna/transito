import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType } from '@angular/http';
import { environment } from 'environments/environment';
import { LoggerService } from "../logger/services/logger.service";
import 'rxjs/add/operator/map';

@Injectable()
export class FroTrteSolicitudService {
	private url = environment.apiUrl + "financiero/frotrtesolicitud";
	public identity;
	public token;

	constructor(
		private _http: Http,
		private _loogerService: LoggerService
	) { }

	index() {
		return this._http.get(this.url + '/index').map(res => res.json());
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

	searchByModuloAndFilter(datos, token) {
		let json = JSON.stringify(datos);
		let params = 'data=' + json + '&authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/search/modulo/filter', params, { headers: headers }).map(res => res.json());
	}

	showByTamiteFactura(datos, token) {
		let json = JSON.stringify(datos);
		let params = 'data=' + json + '&authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/show/tramitefactura', params, { headers: headers }).map(res => res.json());
	}

	searchMatriculaCancelada(datos, token) {
		let json = JSON.stringify(datos);
		let params = 'data=' + json + '&authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/search/matricula/cancelada', params, { headers: headers }).map(res => res.json());
	}

	validations(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/validations", params, { headers: headers }).map(res => res.json());
	}

	searchByTamiteAndDates(datos, token) {
		let json = JSON.stringify(datos);
		let params = 'data=' + json + '&authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/search/tramite/dates', params, { headers: headers }).map(res => res.json());
	}

	searchByCambioServicio(datos, token) {
		let json = JSON.stringify(datos);
		let params = 'data=' + json + '&authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/search/cambio/servicio', params, { headers: headers }).map(res => res.json());
	}
	
	calcularFechaVencimiento() {
		return this._http.get(this.url + '/calcular/fecha/vencimiento').map(res => res.json());
	}

	createFile(datos, token) {
		let json = JSON.stringify(datos);
		let params = 'data=' + json + '&authorization=' + token;

		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/create/file', params, { headers: headers }).map(res => res.json());
	}

	/* createFile(datos, token): any {
		let contentType;
		
		let json = JSON.stringify(datos);
		
		let formData = new FormData();
		
		formData.append('data', json);
		formData.append('authorization', token);
		
		return this._http.post(this.url + "/create/file", formData, { 'responseType': ResponseContentType.Blob }).map(res => {
			contentType = res.headers.get('Content-type');
			return new Blob([res.blob()], { type: 'text/html; charset=utf-8' })
		});
	} */

	pdfExpedicionTarjetaOperacion(datos, token): any {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;

		let headers = new Headers(
			{
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		);

		return this._http.post(this.url + "/pdf/expedicion/tarjeta/operacion", params, { 'responseType': ResponseContentType.Blob, headers: headers }).map(res => { return new Blob([res.blob()], { type: 'application/pdf' }) }
		);

	}
}