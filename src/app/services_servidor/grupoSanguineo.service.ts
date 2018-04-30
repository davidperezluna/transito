import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import  {Observable} from "rxjs/Observable";

@Injectable()
export class GrupoSanguineoService {
	public url = "http://192.169.218.194/~sednarino/transito/backend/web/gruposanguineo";
	public identity;
	public token;

	constructor(private _http: Http){}

	getGrupoSanguineo(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(grupoSanguineo,token){
		let json = JSON.stringify(grupoSanguineo);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers}).map(res => res.json());
	}

	deleteGrupoSanguineo(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers}).map(res => res.json());
	}

	showGrupoSanguineo(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers}).map(res => res.json());
	}

	// tslint:disable-next-line:one-line
	editGrupoSanguineo(grupoSanguineo,token){
		let json = JSON.stringify(grupoSanguineo);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post(this.url+"/edit", params, {headers: headers}).map(res => res.json());
	}

	getGrupoSanguineoSelect(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}
}