import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class MsvCategoriaService {
	private url = environment.apiUrl + 'msvcategoria';
	public identity;
	public token;

	constructor(private _http: Http){}

	getCategoria(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	getCategoriaById(token,idCategoria) {
		let json = JSON.stringify(idCategoria);
		let params = 'json=' + json + '&authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/getById',params,{ headers: headers }).map(res => res.json());
	}

	register(revision,token){ 
		
		let json = JSON.stringify(revision);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers}).map(res => res.json());
	}

	deleteCategoria(token,id){

		let json = JSON.stringify(id);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showCategoria(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/show", params, {headers: headers})
							  .map(res => res.json());
	}

	// tslint:disable-next-line:one-line
	editCategoria(revision,token){
		let json = JSON.stringify(revision);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post(this.url+"/edit", params, {headers: headers}).map(res => res.json());
	}

	getCategoriaSelect(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}
}