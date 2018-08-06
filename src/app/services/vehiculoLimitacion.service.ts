import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class VehiculoLimitacionService {
	private url = environment.apiUrl + "vehiculoLimitacion";
	public identity;
	public token;

	constructor(private _http: Http){}

	getVehiculoLimitacion(datos){
		let json = JSON.stringify(datos);
		console.log(json);

		let params = "json=" + json;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/", params, { headers: headers })
			.map(res => res.json());
	}

	register(datos, token){
		let json = JSON.stringify(datos);
		console.log(json);
		
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteVehiculoLimitacion(datos,token){

		let json = JSON.stringify(datos);
		
		let params = "json="+json+"&authorization="+token;
		console.log(params);
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showVehiculoLimitacion(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	editVehiculoLimitacion(vehiculoLimitacion,token){

		let json = JSON.stringify(vehiculoLimitacion);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}


	getTramiteLimitacionPlaca(placa, token) {

		let json = JSON.stringify(placa);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/limitacion/placaestado", params, { headers: headers })
			.map(res => res.json());

	}

	levantarLimitacion(vehiculoLimitacionId, token) {

		let json = JSON.stringify(vehiculoLimitacionId);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/levantar/limitacion", params, { headers: headers })
			.map(res => res.json());

	}
	
}