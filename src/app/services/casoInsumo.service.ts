import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class CasoInsumoService {
	private url = environment.apiUrl + "casoinsumo";
	public identity;
	public token;

	constructor(private _http: Http){}

	getCasoInsumo(){ 
		
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(color,token){
		
		let json = JSON.stringify(color);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteCasoInsumo(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showCasoInsumo(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	editCasoInsumo(color,token){

		let json = JSON.stringify(color);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	getCasoInsumoInsumoSelect(){ 
		return this._http.get(this.url+"/select/insumo").map(res => res.json());
	} 

	getCasoInsumoSustratoSelect(){ 
		return this._http.get(this.url+"/select/sustrato").map(res => res.json());
	}
	
}