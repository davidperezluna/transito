import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import  {Observable} from "rxjs/Observable";

@Injectable()
export class MgdTipoCorrespondenciaService {
	public url = "http://localhost/GitHub/colossus-sit/web/app_dev.php/mgdtipocorrespondencia";
	public identity;
	public token;

	constructor(private _http: Http){}

	getTipoCorrespondencia(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(tipoCorrespondencia,token){ 
		
		let json = JSON.stringify(tipoCorrespondencia);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers}).map(res => res.json());
	}

	deleteTipoCorrespondencia(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showTipoCorrespondencia(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/show", params, {headers: headers})
							  .map(res => res.json());
	}

	// tslint:disable-next-line:one-line
	editTipoCorrespondencia(tipoCorrespondencia,token){
		let json = JSON.stringify(tipoCorrespondencia);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post(this.url+"/edit", params, {headers: headers}).map(res => res.json());
	}

	getTipoCorrespondenciaSelect(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}
}