import  {Injectable} from "@angular/core";
import  { Http, Headers, ResponseContentType } from "@angular/http";
import { environment } from 'environments/environment';
import  "rxjs/add/operator/map";

@Injectable()
export class ImoAsignacionService {
	private url = environment.apiUrl + "insumo/imoasignacion";
	public identity;
	public token;

	constructor(private _http: Http){}

	index(){
		return this._http.get(this.url+"/reasignacion").map(res => res.json());
	}

	register(datos,token){
		let json = JSON.stringify(datos);
		let params = "data="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers}).map(res => res.json());
	}

	delete(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers}).map(res => res.json());
	}

	show(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers}).map(res => res.json());
	}

	showTrazabilidad(token, id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/trazabilidad/"+id, params, {headers: headers}).map(res => res.json());
	}

	// tslint:disable-next-line:one-line
	edit(datos,token){
		let json = JSON.stringify(datos);
		let params = "data="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post(this.url+"/edit", params, {headers: headers}).map(res => res.json());
	}

	select(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}

	printReasignacion(datos, token): any{
		let json = JSON.stringify(datos);
		let params = "data="+json+"&authorization="+token;

		let headers = new Headers(
			{
				'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
			}
		);

		return this._http.post(this.url+"/pdf/acta/reasignacion", params, { 'responseType': ResponseContentType.Blob, headers: headers }).map(res => 
			{ return new Blob([res.blob()], { type: 'application/pdf' }) }
		); 
	}
}