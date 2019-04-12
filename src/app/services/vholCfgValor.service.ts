import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class VhloValorService {
	private url = environment.apiUrl + "vehiculo/vhlocfgvalor";
	public identity;
	public token;

	constructor(private _http: Http){}

	get(){
		
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(vhloCfgValor,token){
		
		let json = JSON.stringify(vhloCfgValor);
		let params = "data="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	upload(token,array){
		
		let json = JSON.stringify(array);
		let params = "data="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new/upload", params, {headers: headers})
							  .map(res => res.json());
	}

	delete(token,id){ 

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	show(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	edit(vhloCfgValor,token){

		let json = JSON.stringify(vhloCfgValor);
		let params = "data="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	getCfgValorVehiculoVehiculo(datos,token){
		let json = JSON.stringify(datos);
		let params = "data="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/show/vehiculo", params, {headers: headers})
							  .map(res => res.json());
	}

	getCfgValorVehiculoSelect(){
		
		return this._http.get(this.url+"/select").map(res => res.json());
	}
	
}