import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class FacturaInfraccionService {
	private url = environment.apiUrl + "facturainfraccion";
	public identity;
	public token;

	constructor(private _http: Http){}

	getFacturaInfraccion(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(factura,token){
		
		let json = JSON.stringify(factura);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	imprimir(factura,token){
		
		let json = JSON.stringify(factura);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/imprimir/factura", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteFacturaInfraccion(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showFacturaInfraccion(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	showFacturaInfraccionById(token, id) {
		let json = JSON.stringify(id);
		let params = 'json=' + json + '&authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/show/id', params, { headers: headers }).map(res => res.json());
	}

	showFacturaInfraccionByVehiculo(token, vehiculo) {
		let json = JSON.stringify(vehiculo);
		let params = 'json=' + json + '&authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/show/factura/vehiculo', params, { headers: headers }).map(res => res.json());
	}

	editFacturaInfraccion(factura,token){

		let json = JSON.stringify(factura);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	getFacturaInfraccionSelect(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}

	searchByNumero(token, datos) {
		let json = JSON.stringify(datos);
		let params = 'json=' + json + '&authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/search/numero', params, { headers: headers }).map(res => res.json());
	}
	
}