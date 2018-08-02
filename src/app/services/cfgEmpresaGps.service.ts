import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class CfgEmpresaGpsService{
	private url = environment.apiUrl + "cfgempresagps";
	public identity;
	public token;

	constructor(private _http: Http){}

	getCfgEmpresaGps(){
		
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(cfgEmpresaGps,token){
		
		let json = JSON.stringify(cfgEmpresaGps);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteCfgEmpresaGps(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showCfgEmpresaGps(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	editCfgEmpresaGps(cfgEmpresaGps,token){

		let json = JSON.stringify(cfgEmpresaGps);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	getCfgEmpresaGpsSelect(){
		
		return this._http.get(this.url+"/select").map(res => res.json());
	}
	
}