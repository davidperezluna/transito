import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class CfgTipoColorService {
	private url = environment.apiUrl + "cfgtipocolor";
	public identity;
	public token;

	constructor(private _http: Http){}

	select(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}
}