import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import  {Observable} from "rxjs/Observable";

@Injectable()
export class TipoEmpresaService {
	public url = "http://192.169.218.194/~sednarino/transito/backend/web/tipoEmpresa";
	public identity;
	public token;

	constructor(private _http: Http){}

	getTipoEmpresa(){
		
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(tipoDocumento,token){
		
		let json = JSON.stringify(tipoDocumento);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteTipoEmpresa(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showTipoEmpresa(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	editTipoEmpresa(tipoDocumento,token){

		let json = JSON.stringify(tipoDocumento);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	getTipoEmpresaSelect(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}
	
}