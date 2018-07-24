import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class CfgTipoProcesoService {
	private url = environment.apiUrl + "cfgTipoProceso";
	public identity;
	public token;

	constructor(private _http: Http){}

	getTipoProceso(){
		
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(cfgTipoProceso,token){
		
		let json = JSON.stringify(cfgTipoProceso);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteTipoProceso(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showTipoProceso(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	editTipoProceso(cfgTipoProceso,token){

		let json = JSON.stringify(cfgTipoProceso);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	getTipoProcesoSelect(){
		
		return this._http.get(this.url+"/select").map(res => res.json());
	}
	
}