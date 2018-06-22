import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import  {Observable} from "rxjs/Observable";

@Injectable()
export class MgdPeticionarioService {
	public url = "http://localhost/GitHub/colossus-sit/web/app_dev.php/mgdpeticionario";
	public identity;
	public token;

	constructor(private _http: Http){}

	getPeticionario(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(peticionario,token){
		let json = JSON.stringify(peticionario);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deletePeticionario(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showPeticionario(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"show/", params, {headers: headers})
							  .map(res => res.json());

	}

	editPeticionario(peticionario,token){

		let json = JSON.stringify(peticionario);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	buscarPeticionario(datos,token){
		let json = JSON.stringify(datos);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/search", params, {headers: headers})
							  .map(res => res.json());
	}
		
}