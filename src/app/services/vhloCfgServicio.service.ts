import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class VhloCfgServicioService {
	private url = environment.apiUrl + "vehiculo/vhlocfgservicio";
	public identity;
	public token;

	constructor(private _http: Http){}

	getServicio(){
		
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(servicio,token){
		
		let json = JSON.stringify(servicio);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteServicio(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showServicio(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	editServicio(servicio,token){

		let json = JSON.stringify(servicio);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	getServicioSelect(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}
	
}