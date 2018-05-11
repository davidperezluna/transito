import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import  {Observable} from "rxjs/Observable";

@Injectable()
export class TipoSociedadService {
	public url = "http://localhost/GitHub/colossus-sit/web/app_dev.php/tipoSociedad";
	public identity;
	public token;

	constructor(private _http: Http){}
 
	getTipoSociedad(){
		
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(tipoDocumento,token){
		
		let json = JSON.stringify(tipoDocumento);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteTipoSociedad(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showTipoSociedad(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	editTipoSociedad(tipoDocumento,token){

		let json = JSON.stringify(tipoDocumento);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	getTipoSociedadSelect(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}
	
}