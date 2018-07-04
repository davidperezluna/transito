import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import  {Observable} from "rxjs/Observable";

@Injectable()
export class msvEvaluacionService {
	public url = "http://190.146.7.242/colossus-sit/web/app.php/msvEvaluacion";
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
}