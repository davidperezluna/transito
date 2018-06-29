import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import  {Observable} from "rxjs/Observable";

@Injectable()
export class DepartamentoService {
	public url = "http://190.146.7.242/colossus-sit/web/app.php/departamento";
	public identity;
	public token;

	constructor(private _http: Http){}

	getDepartamento(){
		
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(departamento,token){
		
		let json = JSON.stringify(departamento);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteDepartamento(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showDepartamento(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	editDepartamento(departamento,token){

		let json = JSON.stringify(departamento);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	getDepartamentoSelect(){
		
		return this._http.get(this.url+"/select").map(res => res.json());
	}


	getDepartamentoPorPaisSelect(id){
		
		return this._http.get(this.url+"/"+id+"/select/departamentos/por/pais").map(res => res.json());
	}

	
	
}