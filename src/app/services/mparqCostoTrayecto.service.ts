import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import  {Observable} from "rxjs/Observable";

@Injectable()
export class MparqCostoTrayectoService {
	public url = "http://localhost/GitHub/colossus-sit/web/app_dev.php/mparqcostotrayecto";
	public identity;
	public token;

	constructor(private _http: Http){}

	getCostoTrayecto(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(tipoCorrespondencia,token){ 
		
		let json = JSON.stringify(tipoCorrespondencia);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers}).map(res => res.json());
	}

	deleteCostoTrayecto(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showCostoTrayecto(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/show", params, {headers: headers})
							  .map(res => res.json());
	}

	// tslint:disable-next-line:one-line
	editCostoTrayecto(tipoCorrespondencia,token){
		let json = JSON.stringify(tipoCorrespondencia);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post(this.url+"/edit", params, {headers: headers}).map(res => res.json());
	}

	getCostoTrayectoSelect(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}
}