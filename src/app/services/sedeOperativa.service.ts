import  {Injectable} from '@angular/core';
import  {Http, Response,Headers} from '@angular/http';
import { environment } from 'environments/environment';
import  'rxjs/add/operator/map';

@Injectable()
export class SedeOperativaService {
	private url = environment.apiUrl + "sedeoperativa";
	public identity;
	public token;

	constructor(private _http: Http){}

	getSedeOperativa() {

		return this._http.get(this.url + "/").map(res => res.json());
	}

	register(sedeOperativa, token) {
		let json = JSON.stringify(sedeOperativa);
		let params = "json=" + json + "&authorization=" + token;
		console.log(params);
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/new", params, { headers: headers })
			.map(res => res.json());
	}

	deleteSedeOperativa(token, id) {
		let json = JSON.stringify(id);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/" + id + "/delete", params, { headers: headers })
			.map(res => res.json());
	}

	editSedeOperativa(sedeOperativa, token) {

		let json = JSON.stringify(sedeOperativa);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/edit", params, { headers: headers })
			.map(res => res.json());

	}

	getSedeOperativaSelect(){
		return this._http.get(this.url + '/select').map(res => res.json());
	}

	showSedeOperativa(token,id){
		let params = 'authorization='+token;
		let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
		return this._http.post(this.url + '/' + id + '/show', params, {headers: headers}).map(res => res.json());
	}
}