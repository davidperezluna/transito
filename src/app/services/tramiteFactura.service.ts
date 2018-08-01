import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class TramiteFacturaService {
	private url = environment.apiUrl + "tramitefactura";
	public identity;
	public token;

	constructor(private _http: Http){}

	getTramiteFactura(idFactura){
		return this._http.get(this.url +"/"+idFactura+"/index").map(res => res.json());
	}

	register(tramiteFactura, token){
		let json = JSON.stringify(tramiteFactura);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers}).map(res => res.json());
	}

	deleteTramiteFactura(token, id){
		let params = 'authorization=' + token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url + "/" + id + "/delete", params, {headers: headers}).map(res => res.json());
	}

	showTramiteFactura(token, id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url + "/" + id + '/show', params, {headers: headers}).map(res => res.json());
	}

	editTramiteFactura(tramiteFactura, token){
		let json = JSON.stringify(tramiteFactura);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post(this.url + "/edit", params, {headers: headers}).map(res => res.json());
	}

	getTramiteFacturaSelect(idFactura){
		return this._http.get(this.url + "/"+idFactura+"/select").map(res => res.json());
	}

	getTramiteShowFactura(datos){
		let json = JSON.stringify(datos);
		let params = 'json=' + json;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/show/factura", params, { headers: headers }).map(res => res.json());
	}
}