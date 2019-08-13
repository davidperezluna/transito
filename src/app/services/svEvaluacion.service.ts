import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import  {Observable} from "rxjs/Observable";
import { environment } from 'environments/environment';

@Injectable()
export class SvEvaluacionService {
	private url = environment.apiUrl + 'msvevaluacion';
	public identity;
	public token;

	constructor(private _http: Http){}

	getEvaluacion(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(evaluacion,token){ 
		
		let json = JSON.stringify(evaluacion);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers}).map(res => res.json());
	}

	deleteEvaluacion(token,id){

		let json = JSON.stringify(id);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showEvaluacion(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/show", params, {headers: headers})
							  .map(res => res.json());
	}

	// tslint:disable-next-line:one-line
	editEvaluacion(evaluacion,token){
		let json = JSON.stringify(evaluacion);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post(this.url+"/edit", params, {headers: headers}).map(res => res.json());
	}

	getEvaluacionSelect(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}
	
	findAvalByEvaluacion(datos, token) {
		let json = JSON.stringify(datos);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/find/aval/evaluacion", params, { headers: headers }).map(
			res => res.json()
			);
	}
	getAvalPDF(){
		return this._http.get(this.url +"/aval/pdf").map(res => res.json());
	}

	showCalificacionByEvaluacion(datos, token){
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/show/calificacion/evaluacion", params, { headers: headers }).map(res => res.json());
	}
}