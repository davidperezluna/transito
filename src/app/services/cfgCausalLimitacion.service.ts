import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class CfgCausalLimitacionService {
	private url = environment.apiUrl + "cfgCausalLimitacion";
	public identity;
	public token;

	constructor(private _http: Http){}

	getCausalLimitacion(){
		
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(causalLimitacion,token){
		
		let json = JSON.stringify(causalLimitacion);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteCausalLimitacion(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showCausalLimitacion(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	editCausalLimitacion(causalLimitacion,token){

		let json = JSON.stringify(causalLimitacion);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	getCausalLimitacionSelect(){
		
		return this._http.get(this.url+"/select").map(res => res.json());
	}
	
}