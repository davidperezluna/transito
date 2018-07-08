import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import  {Observable} from "rxjs/Observable";

@Injectable()
export class AlertaService {
	public url = "http://localhost/GitHub/colossus-sit/web/app_dev.php/alerta";
	public identity;
	public token;

	constructor(private _http: Http){}

	getAlerta(){
		
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(alerta,token){
		
		let json = JSON.stringify(alerta);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteAlerta(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showAlerta(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	editAlerta(alerta,token){

		let json = JSON.stringify(alerta);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	getAlertaSelect(){
		
		return this._http.get(this.url+"/select").map(res => res.json());
	}

	getAlertaPorModuloSelect(id){
		return this._http.get(this.url+"/"+id+"/select/alertas/por/modulo").map(res => res.json());
	}
	
}