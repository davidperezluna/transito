import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import  {Observable} from "rxjs/Observable";
import { environment } from 'environments/environment';

@Injectable()
export class MgdRemitenteService {
	private url = environment.apiUrl + "mgdremitente";
	public identity;
	public token;

	constructor(private _http: Http){}

	getRemitente(){
		return this._http.get(this.url+"/").map(res => res.json());
	} 

	register(formData, datos, token){
		if(formData == null){
			let json = JSON.stringify(datos);
			let params = "data="+json+"&authorization="+token;
			let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
			return this._http.post(this.url+"/new", params, {headers: headers}).map(res => res.json());
		}else {
			let json = JSON.stringify(datos);
			formData.append('data', json);
			formData.append('authorization', token);
			return this._http.post(this.url+"/new", formData).map(res => res.json());
		}
	}

	deleteRemitente(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showRemitente(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"show/", params, {headers: headers})
							  .map(res => res.json());

	}

	editRemitente(remitente,token){
		let json = JSON.stringify(remitente);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	buscarRemitente(datos,token){
		let json = JSON.stringify(datos);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/search", params, {headers: headers})
							  .map(res => res.json());
	}
}