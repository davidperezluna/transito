import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import  {Observable} from "rxjs/Observable";

@Injectable()
export class CiudadanoService {
	public url = "http://190.146.7.242/colossus-sit/web/app.php/ciudadano";
	public identity;
	public token;

	constructor(private _http: Http){}

	getCiudadano(){
		
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(ciudadano,token){
		
		let json = JSON.stringify(ciudadano);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteCiudadano(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showCiudadano(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	editCiudadano(ciudadano,token){
		let json = JSON.stringify(ciudadano);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers}).map(res => res.json());
	}

	showCiudadanoCedula(token,ciudadano){
		let json = JSON.stringify(ciudadano);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/cedula", params, {headers: headers}).map(res => res.json());
	}
	getCiudadanoSelect(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}
	isCiudadano(datos,token){
		
		let json = JSON.stringify(datos);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/isCiudadano/tipoIde/Ide", params, {headers: headers})
							  .map(res => res.json());
	}
}