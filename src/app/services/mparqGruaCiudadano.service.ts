import  {Injectable} from "@angular/core";
import  {Http, Response, Headers} from "@angular/http";
import { environment } from 'environments/environment';
import  "rxjs/add/operator/map";

@Injectable()
export class MparqGruaCiudadanoService {
	private url = environment.apiUrl + 'mparqgruaciudadano';
	public identity;
	public token;

	constructor(private _http: Http){}

	index(gruaId){
		return this._http.get(this.url+"/"+gruaId+"/index").map(res => res.json());
	}

	register(gruaCiudadano,token){
		let json = JSON.stringify(gruaCiudadano);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers}).map(res => res.json());
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
		return this._http.post(this.url+"/"+id+"/show", params, {headers: headers})
							  .map(res => res.json());
	}

	// tslint:disable-next-line:one-line
	edit(gruaCiudadano,token){
		let json = JSON.stringify(gruaCiudadano);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post(this.url+"/edit", params, {headers: headers}).map(res => res.json());
	}

	select(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}
}