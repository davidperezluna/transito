import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import  {Observable} from "rxjs/Observable";

@Injectable()
export class AgenteTransitoService {
	public url = "http://localhost/GitHub/colossus-sit/web/app_dev.php/agentetransito";
	public identity;
	public token;

	constructor(private _http: Http){}

	getAgenteTransitoSelect(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}

	showAgenteTransito(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/show", params, {headers: headers})
							  .map(res => res.json());

	}
	
}