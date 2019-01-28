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

	getMsvRegistroIpat() {

		return this._http.get(this.url + "/").map(res => res.json());
	}

	register(datos, token) {
		let json = JSON.stringify(datos);
		let params = "json=" + json + "&authorization=" + token;
		//console.log(params);
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/new", params, { headers: headers })
			.map(res => res.json());
	}

	deleteMsvRegistroIpat(token, id) {
		let json = JSON.stringify(id);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/" + id + "/delete", params, { headers: headers })
			.map(res => res.json());
	}

	editMsvRegistroIpat(msvRegistroIpat, token) {

		let json = JSON.stringify(msvRegistroIpat);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/edit", params, { headers: headers })
			.map(res => res.json());

	}

	getMsvRegistroIpatSelect(){
		return this._http.get(this.url + '/select').map(res => res.json());
	}

	showMsvRegistroIpat(token,id){
		let params = 'authorization='+token;
		let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
		return this._http.post(this.url + '/' + id + '/show', params, {headers: headers}).map(res => res.json());
	}

	getBuscarConductor(datos, token) {
		let json = JSON.stringify(datos);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/get/datos/conductor", params, { headers: headers }).map(
			res => res.json()
		);
	}

	getBuscarVehiculo(datos, token) {
		let json = JSON.stringify(datos);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/get/datos/vehiculo", params, { headers: headers }).map(
			res => res.json()
		);
	}

	getBuscarAgente(datos, token) {
		let json = JSON.stringify(datos);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/get/datos/agente", params, { headers: headers }).map(
			res => res.json()
		);
	}

	getBuscarVictima(datos, token) {
		let json = JSON.stringify(datos);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/get/datos/victima", params, { headers: headers }).map(
			res => res.json()
		);
	}

	getBuscarTestigo(datos, token) {
		let json = JSON.stringify(datos);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/get/datos/testigo", params, { headers: headers }).map(
			res => res.json()
		);
	}

	getBuscarLicenciaConductor(datos, token) {
		let json = JSON.stringify(datos);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/get/datos/licenciaconduccion", params, { headers: headers }).map(
			res => res.json()
		);
	}

	export() {
		return this._http.get(this.url + "/export").map(res => res.json());
	}

	buscarIpat(datos, token) {
		let json = JSON.stringify(datos);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/buscaripat", params, { headers: headers }).map(
			res => res.json()
		);
	}

	getCorrespondio(datos, token){
		let json = JSON.stringify(datos);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/getCorrespondio", params, { headers: headers }).map(
			res => res.json()
		);
	}

	registerCiudadanoIpat(datos, token) {
		let json = JSON.stringify(datos);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/newCiudadanoIpat", params, { headers: headers })
			.map(res => res.json());
	}

	registerVictimaIpat(datos, token) {
		let json = JSON.stringify(datos);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/newVictimaIpat", params, { headers: headers })
			.map(res => res.json());
	}

	registerVehiculoIpat(datos, token) {
		let json = JSON.stringify(datos);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/newVehiculoIpat", params, { headers: headers })
			.map(res => res.json());
	}
}