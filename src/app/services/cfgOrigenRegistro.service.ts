import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class CfgOrigenRegistroService{
	private url = environment.apiUrl + "cfgorigenregistro";
	public identity;
	public token;

	constructor(private _http: Http){}

	getCfgOrigenRegistro(){
		
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(cfgOrigenRegistro,token){
		
		let json = JSON.stringify(cfgOrigenRegistro);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteCfgOrigenRegistro(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showColor(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	editCfgOrigenRegistro(cfgOrigenRegistro,token){

		let json = JSON.stringify(cfgOrigenRegistro);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}


	getCfgOrigenRegistroSelect(){
		
		return this._http.get(this.url+"/select").map(res => res.json());
	}
	
}