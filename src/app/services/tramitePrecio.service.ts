import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import  {Observable} from "rxjs/Observable";

@Injectable()
export class TramitePrecioService {
	public url = "http://localhost/GitHub/colossus-sit/web/app_dev.php/tramiteprecio";
	public identity;
	public token;

	constructor(private _http: Http){}

	getTramitePrecio() {
		return this._http.get(this.url + "/").map(res => res.json());
	}

	register(tramite, token) {
		let json = JSON.stringify(tramite);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/new", params, { headers: headers }).map(res => res.json());
	}

	deleteTramitePrecio(token, id) {
		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/" + id + "/delete/tramite/precio", params, { headers: headers }).map(res => res.json());
	}

	showTramitePrecio(token, id) {
		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/show/" + id, params, { headers: headers }).map(res => res.json());
	}
 
	editTramitePrecio(tramiteprecio,token){

		let json = JSON.stringify(tramiteprecio);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	getTramitePrecioSelect() {
		return this._http.get(this.url + "/select").map(res => res.json());
	}
	
}