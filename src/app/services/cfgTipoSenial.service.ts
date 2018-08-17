import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class CfgTipoSenialService {
	private url = environment.apiUrl + "cfgtiposenial";
	public identity;
	public token;

	constructor(private _http: Http){}

	select(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}

}