import  {Injectable} from "@angular/core";
import  {Http, Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { LoggerService } from "../logger/services/logger.service";
import { environment } from 'environments/environment';

@Injectable()
export class MpersonalFuncionarioService {
	private url = environment.apiUrl + "mpersonalfuncionario";
	public identity;
	public token;

	constructor(
		private _http: Http,
		private _loogerService: LoggerService
	){}

	index(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(funcionario,token){
		let json = JSON.stringify(funcionario);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers}).map(
			res => res.json(),
			this._loogerService.registerLog(token,'INSERT',json,this.url)
		);
	}

	delete(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	show(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/show", params, {headers: headers})
							  .map(res => res.json());
	}

	edit(funcionario,token){
		let json = JSON.stringify(funcionario);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post(this.url+"/edit", params, {headers: headers}).map(
			res => res.json(),
			this._loogerService.registerLog(token,'UPDATE',json,this.url)
		);
	}

	select(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}

	selectAgentes(){
		return this._http.get(this.url+"/select/agentes").map(res => res.json());
	}

	selectContratistas(){
		return this._http.get(this.url+"/select/contratistas").map(res => res.json());
	}

	searchByParametros(datos,token){
		let json = JSON.stringify(datos);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post(this.url+"/search/parametros", params, {headers: headers}).map(res => res.json());
	}

	searchLogin(datos,token){
		let json = JSON.stringify(datos);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post(this.url+"/search/login", params, {headers: headers}).map(res => res.json());
	}

	searchEmpresa(datos,token){
		let json = JSON.stringify(datos);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post(this.url+"/search/empresa", params, {headers: headers}).map(res => res.json());
	}

	searchCiudadano(datos,token){
		let json = JSON.stringify(datos);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post(this.url+"/search/ciudadano", params, {headers: headers}).map(res => res.json());
	}

	recordTimes(datos, token) {
		let json = JSON.stringify(datos);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/record/times", params, { headers: headers }).map(res => res.json());
	}
}