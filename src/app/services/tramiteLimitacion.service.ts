import  {Injectable} from '@angular/core';
import  {Http, Response,Headers} from '@angular/http';
import { environment } from 'environments/environment';
import  'rxjs/add/operator/map';

@Injectable()
export class TramiteLimitacionService {
	private url = environment.apiUrl + "limitacionDatos";
	public identity;
	public token;

	constructor(private _http: Http){}

	getTramiteLimitacion() {

		return this._http.get(this.url + "/").map(res => res.json());
	}

	register(tramiteLimitacion, token) {
		let json = JSON.stringify(tramiteLimitacion);
		let params = "json=" + json + "&authorization=" + token;
		console.log(params);
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/new", params, { headers: headers })
			.map(res => res.json());
	}

	deleteTramiteLimitacion(token, id) {
		let json = JSON.stringify(id);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/" + id + "/delete", params, { headers: headers })
			.map(res => res.json());
	}

	editTramiteLimitacion(tramiteLimitacion, token) {

		let json = JSON.stringify(tramiteLimitacion);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/edit", params, { headers: headers })
			.map(res => res.json());

	}

	getTramiteLimitacionSelect(){
		return this._http.get(this.url + '/select').map(res => res.json());
	}

	showTramiteLimitacion(token,id){
		let params = 'authorization='+token;
		let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
		return this._http.post(this.url + '/' + id + '/show', params, {headers: headers}).map(res => res.json());
	}
}