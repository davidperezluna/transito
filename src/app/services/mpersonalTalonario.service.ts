import  {Injectable} from "@angular/core";
import  {Http, Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { LoggerService } from "../logger/services/logger.service";

@Injectable()
export class MpersonalTalonarioService {
	public url = "http://localhost/GitHub/colossus-sit/web/app_dev.php/mpersonaltalonario";
	public identity;
	public token;

	constructor(
		private _http: Http,
		private _loogerService: LoggerService
	){}

	index(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(talonario,token){
		let json = JSON.stringify(talonario);
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

	edit(talonario,token){
		let json = JSON.stringify(talonario);
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
}