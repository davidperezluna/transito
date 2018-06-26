import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import  {Observable} from "rxjs/Observable";

@Injectable()
export class UsuarioService {
	public url = "http://localhost/GitHub/colossus-sit/web/app_dev.php/usuario";
	public identity;
	public token;

	constructor(private _http: Http){}

	getUsuarios(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(usuario,token){
		
		let json = JSON.stringify(usuario);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteUsuario(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showUsuario(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	editUsuario(usuario,token){

		let json = JSON.stringify(usuario);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	getUsuariosClase(calseId,token){


		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/clase/"+calseId, params, {headers: headers})
							  .map(res => res.json());

    }
    
    getUsuarioSelect(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}
	
}