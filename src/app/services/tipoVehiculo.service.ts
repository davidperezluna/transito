import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class TipoVehiculoService {
	private url = environment.apiUrl + "tipovehiculo";
	public identity;
	public token;

	constructor(private _http: Http){}
 
	getTipoVehiculo(){
		
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(tipoDocumento,token){
		
		let json = JSON.stringify(tipoDocumento);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteTipoVehiculo(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showTipoVehiculo(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	editTipoVehiculo(tipoDocumento,token){

		let json = JSON.stringify(tipoDocumento);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	getTipoVehiculoSelect(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}
	
}