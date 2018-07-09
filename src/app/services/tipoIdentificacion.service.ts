import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class TipoIdentificacionService {
	private url = environment.apiUrl + "tipoidentificacion";
	public identity;
	public token;

	constructor(private _http: Http){}

	getTipoIdentificacion(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(tipoIdentificacion,token){ 
		
		let json = JSON.stringify(tipoIdentificacion);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers}).map(res => res.json());
	}

	deleteTipoIdentificacion(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showTipoIdentificacion(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	// tslint:disable-next-line:one-line
	editTipoIdentificacion(tipoIdentificacion,token){
		let json = JSON.stringify(tipoIdentificacion);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post(this.url+"/edit", params, {headers: headers}).map(res => res.json());
	}

	getTipoIdentificacionSelect(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}
}