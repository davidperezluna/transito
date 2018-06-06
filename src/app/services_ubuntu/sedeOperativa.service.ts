import  {Injectable} from '@angular/core';
import  {Http, Response,Headers} from '@angular/http';
import  'rxjs/add/operator/map';
import  {Observable} from 'rxjs/Observable';

@Injectable()
export class SedeOperativaService {
	public url = 'http://190.146.7.242/colossus-sit/web/app.php/sedeoperativa';
	public identity;
	public token;

	constructor(private _http: Http){}

	getSedeOperativaSelect(){
		return this._http.get(this.url + '/select').map(res => res.json());
	}

	showSedeOperativa(token,id){
		let params = 'authorization='+token;
		let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
		return this._http.post(this.url + '/' + id + '/show', params, {headers: headers}).map(res => res.json());
	}
}