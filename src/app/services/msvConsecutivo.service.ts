import  {Injectable} from "@angular/core";
import  {Http, Headers} from "@angular/http";
import { LoggerService } from "../logger/services/logger.service";
import { environment } from 'environments/environment';
import  "rxjs/add/operator/map";

@Injectable()
export class MsvConsecutivoService {
	private url = environment.apiUrl + 'msvtconsecutivo';
	public identity;
	public token;

	constructor(
		private _http: Http,
		private _loogerService: LoggerService
	){}

	index(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(comparendo,token){
		let json = JSON.stringify(comparendo);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers}).map(
			res => res.json(),
			this._loogerService.registerLog(token,'INSERT',json,this.url)
		);
	}

	delete(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	show(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/show", params, {headers: headers})
							  .map(res => res.json());
	}

	edit(comparendo,token){
		let json = JSON.stringify(comparendo);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post(this.url+"/edit", params, {headers: headers}).map(
			res => res.json(),
			this._loogerService.registerLog(token,'UPDATE',json,this.url)
		);
	}

	select(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}

	search(datos,token){
		let json = JSON.stringify(datos);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post(this.url+"/search", params, {headers: headers}).map(res => res.json());
	}

	record(datos,token){
		let json = JSON.stringify(datos);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post(this.url+"/record/funcionario", params, {headers: headers}).map(res => res.json());
	}

	showBySedeConsecutivo(token, datos) {
		let json = JSON.stringify(datos);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/sede/consecutivo", params, { headers: headers })
			.map(res => res.json());

	}

	showBySede(token, datos) {
		let json = JSON.stringify(datos);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/operativasede", params, { headers: headers })
			.map(res => res.json());

	}
}