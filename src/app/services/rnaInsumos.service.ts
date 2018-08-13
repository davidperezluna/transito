import  {Injectable} from "@angular/core";
import  {Http, Headers} from "@angular/http";
import { LoggerService } from "../logger/services/logger.service";
import { environment } from 'environments/environment';
import  "rxjs/add/operator/map";

@Injectable()
export class RnaInsumoService {
	private url = environment.apiUrl + "insumo";
	public identity;
	public token;

	constructor( 
		private _http: Http,
		private _loogerService: LoggerService
	){}

	indexSustrato(){
		return this._http.get(this.url+"/sustrato").map(res => res.json());
	}

	indexInsumo(){
		return this._http.get(this.url+"/insumo").map(res => res.json());
	}

	register(smlmv,token){
		let json = JSON.stringify(smlmv);
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
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers}).map(
			res => res.json()
		);
	}

	show(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/show", params, {headers: headers})
							  .map(res => res.json());
	}

	edit(smlmv,token){
		let json = JSON.stringify(smlmv);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post(this.url+"/edit", params, {headers: headers}).map(
			 res => res.json(),
			 this._loogerService.registerLog(token,'UPDATE',json,this.url)
		);
	}

	showNombre(token, numero) {
		let params = 'authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/showInsumo/numero/' + numero, params, { headers: headers }).map(res => res.json());
	}

	select(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}
}