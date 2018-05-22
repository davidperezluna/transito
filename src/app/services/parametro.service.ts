import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import  {Observable} from "rxjs/Observable";

@Injectable()
export class ParametroService {
	public url = "http://localhost/GitHub/colossus-sit/web/app_dev.php/parametro";
	public identity;
	public token;

	constructor(private _http: Http){}

	getParametro(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(parametro,token){
		let json = JSON.stringify(parametro);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers}).map(res => res.json());
	}

	deleteParametro(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers}).map(res => res.json());
	}

	showParametro(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+'/show', params, {headers: headers}).map(res => res.json());
	}

	// tslint:disable-next-line:one-line
	editParametro(parametro,token){
		let json = JSON.stringify(parametro);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post(this.url+"/edit", params, {headers: headers}).map(res => res.json());
	}

	getParametroSelect(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}
}