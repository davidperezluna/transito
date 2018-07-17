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

	register(datos, token){
		let json = JSON.stringify(datos);
		console.log(json);
		
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteAcreedor(datos,token){

		let json = JSON.stringify(datos);
		
		let params = "json="+json+"&authorization="+token;
		console.log(params);
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/delete", params, {headers: headers})
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

	showAcreedorCiudadano(token, ciudadanoId) {
		let json = JSON.stringify(ciudadanoId);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/search/acreedor", params, { headers: headers })
			.map(res => res.json());

	}

	showAcreedorEmpresa(token, empresaId) {
		let json = JSON.stringify(empresaId);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/search/acreedor/empresa", params, { headers: headers })
			.map(res => res.json());

	}
	
}