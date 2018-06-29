import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import  {Observable} from "rxjs/Observable";

@Injectable()
export class CfgAuditoriaService {
	public url = "http://localhost/GitHub/colossus-sit/web/cfgauditoria";
	public identity;
	public token;

	constructor(private _http: Http){}

	index(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(auditoria,token){ 
		
		let json = JSON.stringify(auditoria);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers}).map(res => res.json());
	}

	delete(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	show(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/show", params, {headers: headers})
							  .map(res => res.json());
	}

	// tslint:disable-next-line:one-line
	edit(auditoria,token){
		let json = JSON.stringify(auditoria);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post(this.url+"/edit", params, {headers: headers}).map(res => res.json());
	}
}