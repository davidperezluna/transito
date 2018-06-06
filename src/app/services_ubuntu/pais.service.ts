import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import  {Observable} from "rxjs/Observable";

@Injectable()
export class PaisService {
	public url = "http://190.146.7.242/colossus-sit/web/app.php/pais";
	public identity;
	public token;

	constructor(private _http: Http){}

	getPais(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(pais,token){
		let json = JSON.stringify(pais);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers}).map(res => res.json());
	}

	deletePais(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers}).map(res => res.json());
	}

	showPais(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+'/show', params, {headers: headers}).map(res => res.json());
	}

	// tslint:disable-next-line:one-line
	editPais(pais,token){
		let json = JSON.stringify(pais);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post(this.url+"/edit", params, {headers: headers}).map(res => res.json());
	}

	getPaisSelect(){
		return this._http.get(this.url+"/select/pais").map(res => res.json());
	}
}