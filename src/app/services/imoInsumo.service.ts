import  {Injectable} from "@angular/core";
import  {Http, Headers, ResponseContentType} from "@angular/http";
import { LoggerService } from "../logger/services/logger.service";
import { environment } from 'environments/environment';
import  "rxjs/add/operator/map";
import { TestComponentRenderer } from "@angular/core/testing";

@Injectable()
export class ImoInsumoService {
	private url = environment.apiUrl + "insumo/imoinsumo";
	public identity;
	public token;

	constructor( 
		private _http: Http,
		private _loogerService: LoggerService
	){}

	indexSustrato(){
		return this._http.get(this.url+"/sustrato").map(res => res.json());
	}

	indexInsumo(){
		return this._http.get(this.url+"/insumo").map(res => res.json());
	}

	register(smlmv,token){
		let json = JSON.stringify(smlmv);
		let params = "data="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers}).map(
			res => res.json(),
			this._loogerService.registerLog(token,'INSERT',json,this.url)
		);
	}

	isExistencia(datos){
		let json = JSON.stringify(datos);
		let params = "data="+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/isExistencia", params, {headers: headers}).map(res => res.json(),);
	}
	
	reasignacionSustrato(datos){
		let json = JSON.stringify(datos);
		let params = "data="+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/reasignacion/sustrato", params, {headers: headers}).map(
			res => res.json(),
		);
	}

	searchByLote(datos, token){
		let json = JSON.stringify(datos);
		let params = "data="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url +"/search/lote", params, {headers: headers}).map(
			res => res.json(),
		);
	}

	delete(datos, token){
		let json = JSON.stringify(datos);
		let params = "data="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/delete", params, {headers: headers}).map(
			res => res.json()
		);
	}

	show(token,id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/show", params, {headers: headers}).map(res => res.json());
	}

	pdfActaInsumo(datos, token): any{
		let json = JSON.stringify(datos);
		let params = "data="+json+"&authorization="+token;

		let headers = new Headers(
			{
				'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
			}
		);

		return this._http.post(this.url+"/pdf/acta/insumos", params, { 'responseType': ResponseContentType.Blob, headers: headers }).map(res => 
			{ return new Blob([res.blob()], { type: 'application/pdf' }) }
		); 
	}
 
	edit(datos, token){
		let json = JSON.stringify(datos);
		let params = "data="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post(this.url+"/edit", params, {headers: headers}).map(
			 res => res.json(),
			 this._loogerService.registerLog(token,'UPDATE',json,this.url)
		);
	}

	select(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}

	showUltimoSustratoDisponible(datos){
		let json = JSON.stringify(datos);
		let params = "data="+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/ultimo/sustrato/disponible", params, {headers: headers}).map(
			res => res.json(),
		);
	}

	searchByNumeroAndModulo(datos, token){
		let json = JSON.stringify(datos);
		let params = "data="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/search/numero/modulo", params, {headers: headers}).map(
			res => res.json(),
		);
	}

	searchFirstInsumoByModulo(datos, token){
		let json = JSON.stringify(datos);
		let params = "data="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/search/first/insumo/modulo", params, {headers: headers}).map(
			res => res.json(),
		);
	}

	searchFirstNumeroTarjetaControl(datos, token){
		let json = JSON.stringify(datos);
		let params = "data="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/search/first/numero/tarjeta/control", params, {headers: headers}).map(
			res => res.json(),
		);
	}
}