import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class VehiculoService {
	private url = environment.apiUrl + "vehiculo";
	public identity;
	public token;

	constructor(private _http: Http){}

	getVehiculo(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	indexRna(){
		return this._http.get(this.url+"/rna").map(res => res.json());
	}

	register(vehiculo,token){
		
		let json = JSON.stringify(vehiculo);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteVehiculo(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showVehiculo(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	showVehiculoPlaca(token,placa){
		let json = JSON.stringify(placa);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/placa", params, {headers: headers})
							  .map(res => res.json());

	}

	editVehiculo(vehiculo,token){

		let json = JSON.stringify(vehiculo);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	editSedeOperativaVehiculo(vehiculo,token){

		let json = JSON.stringify(vehiculo);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit/sedeOperativa", params, {headers: headers})
							  .map(res => res.json());

	}

	getVehiculoSelect(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}


	filterByParameters(gestionTransportePublico,token){
		
		let json = JSON.stringify(gestionTransportePublico);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/fin/by/parameters", params, {headers: headers})
							  .map(res => res.json());
	}

	asignacionPlaca(vehiculo,token){

		let json = JSON.stringify(vehiculo);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/asignacionPlaca", params, {headers: headers})
							  .map(res => res.json());

	}
	
}