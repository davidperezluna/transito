import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import  {Observable} from "rxjs/Observable";
import { environment } from 'environments/environment';

@Injectable()
export class SvCaracterizacionService {
	private url = environment.apiUrl + 'seguridadvial/svcaracterizacion';
	public identity;
	public token;

	constructor(private _http: Http){}

	getCaracterizacion(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(caracterizacion,token){ 
		
		let json = JSON.stringify(caracterizacion);
		let params = "data="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers}).map(res => res.json());
	}

	deleteCaracterizacion(token,id){

		let json = JSON.stringify(id);
		let params = "data="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showCaracterizacion(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/show", params, {headers: headers})
							  .map(res => res.json());
	}

	// tslint:disable-next-line:one-line
	editCaracterizacion(caracterizacion,token){
		let json = JSON.stringify(caracterizacion);
		let params = "data="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post(this.url+"/edit", params, {headers: headers}).map(res => res.json());
	}

	getCaracterizacionSelect(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}

	getBuscarRegistros(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/get/datos/registros", params, { headers: headers }).map(
			res => res.json()
		);
	}

	getBuscarEmpresa(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/get/datos/empresa", params, { headers: headers }).map(
			res => res.json()
		);
	}
}