import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import  {Observable} from "rxjs/Observable";

@Injectable()
export class TipoDocumentoService {
	public url = "http://190.146.7.242/colossus-sit/web/app.php/tipodocumento";
	public identity;
	public token;

	constructor(private _http: Http){}

	getTipoDocumento(){
		
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(tipoDocumento,token){
		let json = JSON.stringify(tipoDocumento);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteTipoDocumento(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showTipoDocumento(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	editTipoDocumento(tipoDocumento,token){
		let json = JSON.stringify(tipoDocumento);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	getTipoDocumentoSelect(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}
	
}