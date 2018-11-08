import  {Injectable} from "@angular/core";
import  {Http, Response, Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class VehiculoService {
	private url = environment.apiUrl + "app/vehiculo";
	public identity;
	public token;

	constructor(private _http: Http){} 

	getVehiculo(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(vehiculo, token){
		let json = JSON.stringify(vehiculo);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteVehiculo(token, id){
		let json = JSON.stringify(id);
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showVehiculo(token, id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show", params, {headers: headers})
							  .map(res => res.json());

	}

	showVehiculoRna(vehiculo, token){
		let json = JSON.stringify(vehiculo);
		let params = "data="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/rna", params, {headers: headers})
							  .map(res => res.json());
	}
	
	showVehiculoRnma(vehiculo, token){
		let json = JSON.stringify(vehiculo);
		let params = "data="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/rnma", params, {headers: headers})
							  .map(res => res.json());
	}

	showVehiculoRnrs(vehiculo, token){
		let json = JSON.stringify(vehiculo);
		let params = "data="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/rnrs", params, {headers: headers})
							  .map(res => res.json());
	}

	showVehiculoPlaca(token, placa){
		let json = JSON.stringify(placa);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/placa", params, {headers: headers})
							  .map(res => res.json());

	}

	showVehiculoModuloPlaca(token, datos){
		let json = JSON.stringify(datos);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/modulo/placa", params, {headers: headers})
							  .map(res => res.json());

	}

	showVehiculoParametro(token, parametros){
		let json = JSON.stringify(parametros);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/parametros", params, {headers: headers})
							  .map(res => res.json());

	}

	showVehiculoTipo(token, parametro){
		let json = JSON.stringify(parametro);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/tipo", params, {headers: headers})
							  .map(res => res.json());

	}

	editVehiculo(vehiculo, token){

		let json = JSON.stringify(vehiculo);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	editCombustibleVehiculo(datos,token){

		let json = JSON.stringify(datos);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit/combustible", params, {headers: headers})
							  .map(res => res.json());

	}

	editVehiculoColor(vehiculo, token){
 
		let json = JSON.stringify(vehiculo);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit/color", params, {headers: headers})
							  .map(res => res.json());

	}

	editVehiculoPignorado(vehiculo, token){

		let json = JSON.stringify(vehiculo);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit/pignorado", params, {headers: headers})
							  .map(res => res.json());

	}

	editSedeOperativaVehiculo(vehiculo, token){

		let json = JSON.stringify(vehiculo);
		let params = "json=" + json + "&authorization="+token;
		let headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+ "/edit/sedeOperativa", params, {headers: headers})
							  .map(res => res.json());

	}

	getVehiculoSelect(){
		return this._http.get(this.url + "/select").map(res => res.json());
	}


	filterByParameters(gestionTransportePublico, token){
		
		let json = JSON.stringify(gestionTransportePublico);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded'});
		return this._http.post(this.url + "/fin/by/parameters", params, {headers: headers})
							  .map(res => res.json());
	}

	asignacionPlaca(vehiculo, token){

		let json = JSON.stringify(vehiculo);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded'});
 			return this._http.post(this.url + "/asignacionPlaca", params, {headers: headers})
							  .map(res => res.json());

	}

	update(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/update", params, { headers: headers })
			.map(res => res.json());
	}
	
}