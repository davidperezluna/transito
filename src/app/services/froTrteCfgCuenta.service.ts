import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class FroTrteCfgCuentaService {
	private url = environment.apiUrl + "financiero/frotrtecfgcuenta";
	public identity;
	public token;

	constructor(private _http: Http){}
	FroTrteCfg
	index(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(cuenta,token){
		
		let json = JSON.stringify(cuenta);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	delete(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	show(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url + "/" + id + "/show", params, { headers: headers })
			.map(res => res.json());

	}

	edit(cuenta,token){

		let json = JSON.stringify(cuenta);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());
	}

	select() {
		return this._http.get(this.url + "/select").map(res => res.json());
	}
	
}