import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import  {Observable} from "rxjs/Observable";
import { environment } from 'environments/environment';

@Injectable()
export class DefaultService {
	private url = environment.apiUrl + "default";
	public identity;
	public token;

	constructor(private _http: Http){}

	pdfLicenciaTransito(token,datos){
		let json = JSON.stringify(datos);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/pdf/certificadoTradicion", params, {headers: headers})
							  .map(res => res.json());

	}
	
}