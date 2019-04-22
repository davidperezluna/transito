import  {Injectable} from '@angular/core';
import  {Http, Response,Headers} from '@angular/http';
import { environment } from 'environments/environment';
import  'rxjs/add/operator/map';

@Injectable()
export class MsvRegistroIpatService {
	private url = environment.apiUrl + "seguridadvial/svregistroipat";
	public identity;
	public token;

	constructor(private _http: Http){}

	index() {
		return this._http.get(this.url + "/").map(res => res.json());
	}

	register(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/new", params, { headers: headers })
			.map(res => res.json());
	}

	delete(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/delete", params, { headers: headers })
			.map(res => res.json());
	}

	edit(datos, token) {

		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/edit", params, { headers: headers })
			.map(res => res.json());

	}

	select(){
		return this._http.get(this.url + '/select').map(res => res.json());
	}

	show(datos, token){
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
		return this._http.post(this.url + '/show', params, {headers: headers}).map(res => res.json());
	}

	getBuscarConductor(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/get/datos/conductor", params, { headers: headers }).map(
			res => res.json()
		);
	}

	getBuscarVehiculo(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/get/datos/vehiculo", params, { headers: headers }).map(
			res => res.json()
		);
	}

	getBuscarAgente(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/get/datos/agente", params, { headers: headers }).map(
			res => res.json()
		);
	}

	getBuscarVictima(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/get/datos/victima", params, { headers: headers }).map(
			res => res.json()
		);
	}

	getBuscarTestigo(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/get/datos/testigo", params, { headers: headers }).map(
			res => res.json()
		);
	}

	getBuscarLicenciaConductor(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/get/datos/licenciaconduccion", params, { headers: headers }).map(
			res => res.json()
		);
	}

	buscarIpat(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/buscaripat", params, { headers: headers }).map(
			res => res.json()
		);
	}

	getCorrespondio(datos, token){
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/getCorrespondio", params, { headers: headers }).map(
			res => res.json()
		);
	}

	cargarIpats(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/cargar/ipats", params, { headers: headers }).map(
			res => res.json()
		);
	}
}