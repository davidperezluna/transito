import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { LoggerService } from "../logger/services/logger.service";
import { environment } from 'environments/environment';
import "rxjs/add/operator/map";

@Injectable()
export class SvCfgControlViaService {
    private url = environment.apiUrl + 'seguridadvial/svcfgcontrolvia';
    public identity;
    public token;

    constructor(
        private _http: Http,
        private _loogerService: LoggerService
    ) { }

    indexSemaforo() {
        return this._http.get(this.url + "/").map(res => res.json());
    }
    indexSenialVertical() {
        return this._http.get(this.url + "/senialvertical").map(res => res.json());
    }
    indexSenialHorizontal() {
        return this._http.get(this.url + "/senialhorizontal").map(res => res.json());
    }
    indexReductorVelocidad() {
        return this._http.get(this.url + "/reductorvelocidad").map(res => res.json());
    }

    register(datos, token) {
        let json = JSON.stringify(datos);
        let params = "json=" + json + "&authorization=" + token;
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

    show(token, id) {
        let params = "authorization=" + token;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/" + id + "/show", params, { headers: headers })
            .map(res => res.json());
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

    getControlViaSelect() {
        return this._http.get(this.url + "/select").map(res => res.json());
    }

    getControlViaSemaforoSelect() {
        return this._http.get(this.url + "/select/semaforo").map(res => res.json());
    }

    getControlViaDelineadorPisoSelect() {
        return this._http.get(this.url + "/select/delineadorpiso").map(res => res.json());
    }
}
