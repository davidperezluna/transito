import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import  {Observable} from "rxjs/Observable";

@Injectable()
export class ComparendoService {
	public url = "http://localhost/GitHub/colossus-sit/web/app_dev.php/comparendo";
	public identity;
	public token;

	constructor(private _http: Http){}

	getComparendo(){
		
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(comparendo,token){
		
		let json = JSON.stringify(comparendo);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteComparendo(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showComparendo(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	editComparendo(comparendo,token){

		let json = JSON.stringify(comparendo);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	getComparendoSelect(){
		
		return this._http.get(this.url+"/select").map(res => res.json());
	}
	
}