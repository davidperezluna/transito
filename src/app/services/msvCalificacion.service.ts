import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class MsvCalificacionService {
	private url = environment.apiUrl + 'msvcalificacion';
	public identity;
	public token;

	constructor(private _http: Http){}

	getCalificacion(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(revision,token){ 
		
		let json = JSON.stringify(revision);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers}).map(res => res.json());
	}

	deleteCalificacion(token,id){

		let json = JSON.stringify(id);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showCalificacion(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/show", params, {headers: headers})
							  .map(res => res.json());
	}

	// tslint:disable-next-line:one-line
	newCalificacion(token,calificacion,id){
		let json = JSON.stringify(calificacion);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post(this.url+"/"+id+"/new", params, {headers: headers}).map(res => res.json());
	}

	getCalificacionSelect(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}
}