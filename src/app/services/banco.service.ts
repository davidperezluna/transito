import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import { LoggerService } from "../logger/services/logger.service";
import { environment } from 'environments/environment';
import  "rxjs/add/operator/map";

@Injectable()
export class BancoService {
	private url = environment.apiUrl + "banco";
	public identity;
	public token;

	constructor(
		private _http: Http,
		private _loogerService: LoggerService
	){}

	getBanco(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(banco,token){
		let json = JSON.stringify(banco);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers}).map(
			res => res.json(),
			this._loogerService.registerLog(token,'INSERT',json,this.url)
		);
	}

	deleteBanco(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers}).map(res => res.json());
	}

	showBanco(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	editBanco(banco,token){

		let json = JSON.stringify(banco);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	getBancoSelect(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}

	showAcreedorNombre(token, nombreAcreedor) {
		let json = JSON.stringify(nombreAcreedor);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/nombre", params, { headers: headers }).map(res => res.json());
	}
	
}