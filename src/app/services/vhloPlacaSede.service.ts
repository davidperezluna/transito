import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { LoggerService } from "../logger/services/logger.service";
import "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class VhloPlacaSedeService {
    private url = environment.apiUrl + 'vehiculo/vhloplacasede';
    public identity;
    public token;

    constructor(
        private _http: Http,
        private _loogerService: LoggerService
    ) { }

    index() {
        return this._http.get(this.url + "/").map(res => res.json());
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
        let params = "data=" + json + "&authorization=" + token;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/delete", params, { headers: headers }).map(
            res => res.json(),
            this._loogerService.registerLog(token, 'DELETE', json, this.url)
        );
    }

    show(id, token) {
        let params = "authorization=" + token;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/"+ id + "/show", params, { headers: headers })
            .map(res => res.json());
    }

    edit(datos, token) {
        let json = JSON.stringify(datos);
        let params = "data=" + json + "&authorization=" + token;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/edit", params, { headers: headers }).map(
            res => res.json()
        );
    }

    select() {
        return this._http.get(this.url + "/select").map(res => res.json());
    }

    searchByOrganismoTransito(datos, token) {
        let json = JSON.stringify(datos);
        let params = "data=" + json + "&authorization=" + token;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/search/organismotransito", params, { headers: headers }).map(res => res.json());
    }

    searchByOrganismoTransitoAndServicio(datos, token) {
        let json = JSON.stringify(datos);
        let params = "data=" + json + "&authorization=" + token;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/search/organismotransito/servicio", params, { headers: headers }).map(res => res.json());
    }

    searchRequestByOrganismoTransito(datos, token) {
        let json = JSON.stringify(datos);
        let params = "data=" + json + "&authorization=" + token;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/search/request/organismotransito", params, { headers: headers }).map(res => res.json());
    }

    make(datos, token) {
        let json = JSON.stringify(datos);
        let params = "data=" + json + "&authorization=" + token;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/make", params, { headers: headers }).map(res => res.json());
    }
}
