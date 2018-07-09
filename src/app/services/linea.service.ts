import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class LineaService {
	private url = environment.apiUrl + "linea";
	public identity;
	public token;

	constructor(private _http: Http){}

	getLinea(){
		
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(linea,token){
		
		let json = JSON.stringify(linea);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteLinea(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showLinea(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	editLinea(linea,token){

		let json = JSON.stringify(linea);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	getLineasMar(marcaId,token){

		let params = "&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/lin/mar/"+marcaId, {headers: headers})
							  .map(res => res.json());

	}

	getLineaSelect(){
		
		return this._http.get(this.url+"/select").map(res => res.json());
	}
	
}