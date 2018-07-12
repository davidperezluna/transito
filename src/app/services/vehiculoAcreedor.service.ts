import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class VehiculoAcreedorService {
	private url = environment.apiUrl + "vehiculoacreedor";
	public identity;
	public token;

	constructor(private _http: Http){}

	getAcreedor(){
		
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(datos2, token){
		let json = JSON.stringify(datos2);
		console.log(json);
		
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteAcreedor(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showAcreedor(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	editAcreedor(vehiculoAcreedor,token){

		let json = JSON.stringify(vehiculoAcreedor);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	getClaseSelect(){
		
		return this._http.get(this.url+"/select").map(res => res.json());
	}

	getClasePorModuloSelect(id){
		return this._http.get(this.url+"/"+id+"/select/clases/por/modulo").map(res => res.json());
	}
	
}