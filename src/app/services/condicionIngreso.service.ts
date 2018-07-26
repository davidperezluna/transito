import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class CondicionIngresoService{
	private url = environment.apiUrl + "condicioningreso";
	public identity;
	public token;

	constructor(private _http: Http){}

	getCondicionIngreso(){
		
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(condicionIngreso,token){
		
		let json = JSON.stringify(condicionIngreso);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteCondicionIngreso(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showCondicionIngreso(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	editCondicionIngreso(condicionIngreso,token){

		let json = JSON.stringify(condicionIngreso);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	getCondicionIngresoSelect(){
		
		return this._http.get(this.url+"/select").map(res => res.json());
	}
	
}