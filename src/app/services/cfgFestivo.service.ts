import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import  {Observable} from "rxjs/Observable";

@Injectable()
export class cfgFestivoService {
	public url = "http://localhost/GitHub/colossus-sit/web/app_dev.php/cfgFestivo";
	public identity;
	public token;

	constructor(private _http: Http){}

	getFestivo(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(tipoFestivo,token){ 
		
		let json = JSON.stringify(tipoFestivo);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers}).map(res => res.json());
	}

	deleteFestivo(token,id){

		let json = JSON.stringify(id);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showFestivo(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/show", params, {headers: headers})
							  .map(res => res.json());
	}

	// tslint:disable-next-line:one-line
	editFestivo(tipoFestivo,token){
		let json = JSON.stringify(tipoFestivo);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post(this.url+"/edit", params, {headers: headers}).map(res => res.json());
	}

	getFestivoSelect(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}
}