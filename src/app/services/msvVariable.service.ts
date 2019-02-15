import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class MsvVariableService {
	private url = environment.apiUrl + 'msvvariable';
	public identity;
	public token;

	constructor(private _http: Http){}

	index(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	getVariableByParametroId(token,idParametro) {
		let json = JSON.stringify(idParametro);
		let params = 'json=' + json + '&authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/getByCategoriaId',params,{ headers: headers }).map(res => res.json());
	}

	register(revision,token){ 
		
		let json = JSON.stringify(revision);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers}).map(res => res.json());
	}

	deleteVariable(id, token){

		let json = JSON.stringify(id);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showVariable(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/show", params, {headers: headers})
							  .map(res => res.json());
	}

	// tslint:disable-next-line:one-line
	editVariable(datos,token){
		let json = JSON.stringify(datos);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post(this.url+"/edit", params, {headers: headers}).map(res => res.json());
	}

	getVariableSelect(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}
}