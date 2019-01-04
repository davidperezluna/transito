import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class ComparendoService {
	private url = environment.apiUrl + "comparendo";
	public identity;
	public token;

	constructor(private _http: Http){}

	getComparendo(){
		
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(datos,token){
		
		let json = JSON.stringify(datos);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteComparendo(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showComparendo(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	editComparendo(datos,token){

		let json = JSON.stringify(datos);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	setComparendoArchivo(datoss,polca,token){
		let json = JSON.stringify(datoss);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/"+polca+"/archivo", params, {headers: headers})
							  .map(res => res.json());
	}
	
	searchByInfractor(datos, token) {
		let json = JSON.stringify(datos);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/search/infractor", params, { headers: headers }).map(res => res.json());
	}

	searchByState(datos, token) {
		let json = JSON.stringify(datos);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/search/estado", params, { headers: headers }).map(res => res.json());
	}

	searchByParametros(datos, token) {
		let json = JSON.stringify(datos);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/search/parametros", params, { headers: headers }).map(res => res.json());
	}

	searchByFiltros(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/search/filtros", params, { headers: headers }).map(res => res.json());
	}

	export() { 
		return this._http.get(this.url + "/export").map(res => res.json());
	}
}