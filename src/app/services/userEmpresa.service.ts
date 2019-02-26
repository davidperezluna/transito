import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class UserEmpresaService {
	private url = environment.apiUrl + "usuario/userempresa";
	public identity;
	public token;

	constructor(private _http: Http){}

	index(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(empresa,token){
		
		let json = JSON.stringify(empresa);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
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

	edit(empresa,token){

		let json = JSON.stringify(empresa);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());
	}

	select(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}

	selectTransportePublico(){
		return this._http.get(this.url+"/select/trasporte/publico").map(res => res.json());
	}

	indexByAlcaldia() {
		return this._http.get(this.url + "/index/empresaAlcaldia").map(res => res.json());
	}

	showByNit(token, nit) {
		let json = JSON.stringify(nit);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/show/empresa", params, { headers: headers }).map(res => res.json())
	}

	showByNitOrNombre(datos, token) {
		let json = JSON.stringify(datos);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/show/nitnombre", params, { headers: headers }).map(res => res.json())
	}

	
}