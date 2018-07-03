import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import  {Observable} from "rxjs/Observable";

@Injectable()
export class ConceptoParametroService {
	public url = "http://localhost/GitHub/colossus-sit/web/app_dev.php/conceptoparametro";
	public identity;
	public token;

	constructor(private _http: Http){}

	getConceptoParametro(){
		
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(conceptoParametro,token){
		
		let json = JSON.stringify(conceptoParametro);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteConceptoParametro(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showConceptoParametro(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	showConceptoParametroTramitePrecio(token,id){
		 
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/tramitePrecio/concepto", params, {headers: headers})
							  .map(res => res.json());

	} 

	editConceptoParametro(conceptoParametro,token){

		let json = JSON.stringify(conceptoParametro);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	getConceptoParametroSelect(){
		return this._http.get(this.url+"/select/concepto").map(res => res.json());
	} 
	
}