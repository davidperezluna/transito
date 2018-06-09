import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import  {Observable} from "rxjs/Observable";

@Injectable()
export class RepresentanteEmpresaService {
	public url = "http://localhost/GitHub/colossus-sit/web/app_dev.php/representanteempresa";
	public identity;
	public token;

	constructor(private _http: Http){}

	getRepresentanteEmpresa(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(representanteEmpresa,token){
		
		let json = JSON.stringify(representanteEmpresa);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteRepresentanteEmpresa(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showRepresentanteEmpresa(empresaId,token){
		console.log(empresaId);

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+'/'+empresaId+"/show", params, {headers: headers})
							  .map(res => res.json());

	}

	showNit(token,nit){

		let json = JSON.stringify(nit);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/nit", params, {headers: headers})
		.map(res => res.json())					  
 
	}

	editRepresentanteEmpresa(representanteEmpresa,token){

		let json = JSON.stringify(representanteEmpresa);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	getRepresentanteEmpresaSelect(){
		
		return this._http.get(this.url+"/select").map(res => res.json());
	}
	
}