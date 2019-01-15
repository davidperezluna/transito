import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class SucursalService {
	private url = environment.apiUrl + "sucursal";
	public identity;
	public token;

	constructor(private _http: Http){}

	getSucursal(){
		
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(sucursal,token){
		
		let json = JSON.stringify(sucursal);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteSucursal(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showSucursal(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	showNit(token,nit){

		let json = JSON.stringify(nit);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/nit", params, {headers: headers})
		.map(res => res.json())					  
 
	}

	editSucursal(sucursal,token){

		let json = JSON.stringify(sucursal);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	getSucursalEmpresa(id){
		return this._http.get(this.url+"/"+id+"/sucursales/por/empresa").map(res => res.json());
	}
	
}