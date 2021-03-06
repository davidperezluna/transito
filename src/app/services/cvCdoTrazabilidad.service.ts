import  {Injectable} from "@angular/core";
import  {Http, Headers} from "@angular/http";
import { LoggerService } from "../logger/services/logger.service";
import { environment } from 'environments/environment';
import  "rxjs/add/operator/map";

@Injectable()
export class CvCdoTrazabilidadService {
	private url = environment.apiUrl + 'contravencional/cvcdotrazabilidad';
	public identity;
	public token;

	constructor(
		private _http: Http,
		private _loogerService: LoggerService
	){}

	index(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/new", params, { headers: headers }).map(
			res => res.json(),
			this._loogerService.registerLog(token, 'INSERT', json, this.url)
		);
	}

	delete(datos, token) {
		let json = JSON.stringify(datos);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/delete", params, { headers: headers }).map(
			res => res.json(),
			this._loogerService.registerLog(token, 'DELETE', json, this.url)
		);
	}

	show(datos, token) {
		let json = JSON.stringify(datos);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/show", params, { headers: headers }).map(
			res => res.json()
		);
	}

	edit(datos, token) {
		let json = JSON.stringify(datos);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/edit", params, { headers: headers }).map(
			res => res.json(),
			this._loogerService.registerLog(token, 'UPDATE', json, this.url)
		);
	}

	select() {
		return this._http.get(this.url + "/select").map(res => res.json());
    }
    
	updateDocumento(datos, token) {
        let json = JSON.stringify(datos);
        let formData = new FormData();
		formData.append('data', json);
		formData.append('authorization', token);
        //let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/update/documento", formData).map(
            res => res.json(),
            this._loogerService.registerLog(token, 'UPDATE', json, this.url)
        );
	}
	
	searchBienes(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/search/bienes", params, { headers: headers }).map(
			res => res.json()
		);
	}

	registerBien(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/new/bien", params, { headers: headers }).map(
			res => res.json(),
			this._loogerService.registerLog(token, 'INSERT', json, this.url)
		);
	}

	updateBienes(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;	
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/update/bienes", params, { headers: headers }).map(
			res => res.json(),
			this._loogerService.registerLog(token, 'UPDATE', json, this.url)
		);
	}

	updateFolios(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;	
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/update/folios", params, { headers: headers }).map(
			res => res.json(),
			this._loogerService.registerLog(token, 'UPDATE', json, this.url)
		);
	}

	updateInventarioDocumental(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;	
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/update/inventario/documental", params, { headers: headers }).map(
			res => res.json(),
			this._loogerService.registerLog(token, 'INSERT', json, this.url)
		);
	}
}