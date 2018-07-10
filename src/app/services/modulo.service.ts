import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class ModuloService {
	private url = environment.apiUrl + "modulo";
	public identity;
	public token;

	constructor(private _http: Http){}

	getModulo(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(modulo,token){
		let json = JSON.stringify(modulo);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers}).map(res => res.json());
	}

	deleteModulo(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers}).map(res => res.json());
	}

	showModulo(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers}).map(res => res.json());
	}

	editModulo(modulo,token){
		let json = JSON.stringify(modulo);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post(this.url+"/edit",params,{headers: headers}).map(res => res.json());
	}
	
	getModuloSelect() {
		return this._http.get(this.url + "/select").map(res => res.json());
	}
}