import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { LoggerService } from "../logger/services/logger.service";
import "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class VhloCfgTipoVehiculoService {
    private url = environment.apiUrl + 'vehiculo/vhlocfgtipovehiculo';
    public identity;
    public token;

    constructor(
        private _http: Http,
        private _loogerService: LoggerService
    ) { }

    index() {
        return this._http.get(this.url + "/").map(res => res.json());
    }

    register(tipo, token) {
        let json = JSON.stringify(tipo);
        let params = "data=" + json + "&authorization=" + token;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/new", params, { headers: headers }).map(
            res => res.json().
            this._loogerService.registerLog(token, 'INSERT', json, this.url)
        );
    }

    delete(datos, token) {
        let json = JSON.stringify(datos);
        let params = "data=" + json + "&authorization=" + token;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/delete", params, { headers: headers }).map(
            res => res.json(),
            this._loogerService.registerLog(token, 'DELETE', json, this.url)
        );
    }

    show(datos, token) {
        let json = JSON.stringify(datos);
        let params = "data=" + json + "&authorization=" + token;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + '/show', params, { headers: headers }).map(res => res.json());
    }

    edit(datos, token) {
        let json = JSON.stringify(datos);
        let params = "data=" + json + "&authorization=" + token;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/edit", params, { headers: headers }).map(
            res => res.json(),
            this._loogerService.registerLog(token, 'UPDATE', json, this.url)
        );
    }

    select() {
        return this._http.get(this.url + "/select").map(res => res.json());
    }

    selectByModulo(datos, token) {
        let json = JSON.stringify(datos);
        let params = "data=" + json + "&authorization=" + token;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + '/select/modulo', params, { headers: headers }).map(res => res.json());
    }
}
