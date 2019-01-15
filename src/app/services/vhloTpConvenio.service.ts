import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class VhloTpConvenioService {
	private url = environment.apiUrl + "vehiculo/vhlotpconvenio";
	public identity;
	public token;

	constructor(private _http: Http){}

	getVhloTpConvenio(){
		
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(vhlotpconvenio,token){
		
		let json = JSON.stringify(vhlotpconvenio);
		let params = "data="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteVhloTpConvenio(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showVhloTpConvenio(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	showNit(token,nit){

		let json = JSON.stringify(nit);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/nit", params, {headers: headers})
		.map(res => res.json())					  
 
	}

	editVhloTpConvenio(vhlotpconvenio,token){

		let json = JSON.stringify(vhlotpconvenio);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	getVhloTpConvenioEmpresa(id){
		return this._http.get(this.url+"/"+id+"/convenios/por/empresa").map(res => res.json());
	}
	
}