import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import  {Observable} from "rxjs/Observable";

@Injectable()
export class FacturaService {
	public url = "http://localhost/GitHub/colossus-sit/web/app_dev.php/factura";
	public identity;
	public token;

	constructor(private _http: Http){}

	getFactura(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(factura,token){
		
		let json = JSON.stringify(factura);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteFactura(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showFactura(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	showFacturaById(token, id) {
		let json = JSON.stringify(id);
		let params = 'json=' + json + '&authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/show/id', params, { headers: headers }).map(res => res.json());
	}

	
	showFacturaByVehiculo(token, vehiculo) {
		let json = JSON.stringify(vehiculo);
		let params = 'json=' + json + '&authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/show/factura/vehiculo', params, { headers: headers }).map(res => res.json());
	}

	editFactura(factura,token){

		let json = JSON.stringify(factura);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	getFacturaSelect(){
		
		return this._http.get(this.url+"/select").map(res => res.json());
	}
	
}