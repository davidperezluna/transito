import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class UserEmpresaTransporteService {
	private url = environment.apiUrl + "usuario/userempresatransporte";
	public identity;
	public token;

	constructor(private _http: Http){}

	index(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(datos,token){
		let json = JSON.stringify(datos);
		let params = "data="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers}).map(res => res.json());
	}

	delete(datos, token){
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/delete", params, {headers: headers}).map(res => res.json());
	}

	show(datos, token){
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/", params, {headers: headers}).map(res => res.json());
	}

	edit(datos,token){
		let json = JSON.stringify(datos);
		let params = "data="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers}).map(res => res.json());
	}
    
	select(){
        return this._http.get(this.url+"/select").map(res => res.json());
	}
    
    searchByNit(datos,token){
        let json = JSON.stringify(datos);
        let params = "data="+json+"&authorization="+token;
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
                return this._http.post(this.url+"/search/nit", params, {headers: headers}).map(res => res.json());
    }
    
    searchByModalidadAndClase(datos,token){
        let json = JSON.stringify(datos);
        let params = "data="+json+"&authorization="+token;
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
                return this._http.post(this.url+"/search/modalidad/clase", params, {headers: headers}).map(res => res.json());
    }
    
    registerRangoCupos(datos,token){
        let json = JSON.stringify(datos);
        let params = "data="+json+"&authorization="+token;
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url +"/new/rango/cupos", params, {headers: headers}).map(res => res.json());
    }
}