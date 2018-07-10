import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import { environment } from 'environments/environment';
import  "rxjs/add/operator/map";

@Injectable()
export class TramiteTrasladoService {
	private url = environment.apiUrl + "tramitetraslado";
	public identity;
	public token;

	constructor(private _http: Http){}

	getTraslado(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(tramiteTraslado,token){ 
		
		let json = JSON.stringify(tramiteTraslado);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers}).map(res => res.json());
	}

	deleteTraslado(token,id){

		let json = JSON.stringify(id);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showTraslado(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/show", params, {headers: headers})
							  .map(res => res.json());
	}

	// tslint:disable-next-line:one-line
	editTraslado(tipoTraslado,token){
		let json = JSON.stringify(tipoTraslado);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post(this.url+"/edit", params, {headers: headers}).map(res => res.json());
	}

	getTrasladoSelect(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}
}