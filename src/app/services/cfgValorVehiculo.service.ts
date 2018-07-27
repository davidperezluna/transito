import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class CfgValorVehiculoService {
	private url = environment.apiUrl + "cfgValorVehiculo";
	public identity;
	public token;

	constructor(private _http: Http){}

	getCfgValorVehiculo(){
		
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(cfgValorVehiculo,token){
		
		let json = JSON.stringify(cfgValorVehiculo);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteCfgValorVehiculo(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showCfgValorVehiculo(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	editCfgValorVehiculo(cfgValorVehiculo,token){

		let json = JSON.stringify(cfgValorVehiculo);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	getCfgValorVehiculoSelect(){
		
		return this._http.get(this.url+"/select").map(res => res.json());
	}
	
}