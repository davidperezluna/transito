import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import { environment } from 'environments/environment';
import  "rxjs/add/operator/map";

@Injectable()
export class MgdDocumentoService {
	private url = environment.apiUrl + 'mgddocumento';
	public identity;
	public token;

	constructor(private _http: Http){}

	getDocumento(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(documento,token){
		let json = JSON.stringify(documento);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteDocumento(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showDocumento(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"show/", params, {headers: headers})
							  .map(res => res.json());
	}

	editDocumento(documento,token){
		let json = JSON.stringify(documento);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());
	}

	buscarDocumentos(datos,token){
		let json = JSON.stringify(datos);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/search", params, {headers: headers})
							  .map(res => res.json());
	}

	assign(datos, token){
		let json = JSON.stringify(datos);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/assign", params, {headers: headers})
							  .map(res => res.json());
	}
	
	process(datos, token){
		let json = JSON.stringify(datos);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/process", params, {headers: headers})
							  .map(res => res.json());
	}

	response(datos, token){
		let json = JSON.stringify(datos);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/response", params, {headers: headers})
							  .map(res => res.json());
	}

	print(datos, token){
		let json = JSON.stringify(datos);
		let params = "json="+json+"&authorization="+token;
		console.log(params);
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/print", params, {headers: headers})
							  .map(res => res.json());
	}
}