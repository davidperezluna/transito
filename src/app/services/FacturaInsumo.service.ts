import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class FacturaInsumoService {
	private url = environment.apiUrl + "facturaInsumo";
	public identity;
	public token;

	constructor(private _http: Http){}

	getFacturaInsumo(){
		
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(factura,token){
		
		let json = JSON.stringify(factura);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteFacturaInsumo(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showFacturaInsumo(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	showFacturaInsumoByNumero(token, numeroFacturaInsumo) {
		console.log(numeroFacturaInsumo);
		let json = JSON.stringify(numeroFacturaInsumo);
		let params = 'json=' + json + '&authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/show/numero', params, { headers: headers }).map(res => res.json());
	}

	editFacturaInsumo(factura,token){

		let json = JSON.stringify(factura);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	getFacturaInsumoSelect(){
		
		return this._http.get(this.url+"/select").map(res => res.json());
	}
	
}