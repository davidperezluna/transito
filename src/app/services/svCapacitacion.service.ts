import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { LoggerService } from "../logger/services/logger.service";
import { environment } from 'environments/environment';
import "rxjs/add/operator/map";

@Injectable()
export class SvCapacitacionService {
    private url = environment.apiUrl + 'seguridadvial/svcapacitacion';
    public identity;
    public token;

    constructor(
        private _http: Http,
        private _loogerService: LoggerService
    ) { }

    index() {
        return this._http.get(this.url + "/").map(res => res.json());
    }

    register(formData, datos, token) {
        if (formData == null) {
            let json = JSON.stringify(datos);
            let params = "data=" + json + "&authorization=" + token;
            let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
            return this._http.post(this.url + "/new", params, { headers: headers }).map(
                res => res.json(),
            );
        } else {
            let json = JSON.stringify(datos);
            formData.append('data', json);
            formData.append('authorization', token);
            return this._http.post(this.url + "/new", formData).map(
                res => res.json(),
            );
        }
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
        return this._http.post(this.url + "/show", params, { headers: headers })
            .map(res => res.json());
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

    buscarCapacitacionByCiudadano(datos, token){ 
        let json = JSON.stringify(datos);
        let params = "data=" + json + "&authorization=" + token;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/buscar/capacitacionbyciudadano", params, { headers: headers }).map(
            res => res.json()
        );
    }

    cargarCapacitados(datos, token) {
        let json = JSON.stringify(datos);
        let params = "data=" + json + "&authorization=" + token;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/cargar/capacitados", params, { headers: headers }).map(
            res => res.json()
        ); 
    }

    showByCapacitacion(datos, token) {
        let json = JSON.stringify(datos);
        let params = "data=" + json + "&authorization=" + token;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/show/capacitacion", params, { headers: headers }).map(
            res => res.json()
        ); 
    }

    buscarCapacitaciones(datos, token) {
        let json = JSON.stringify(datos);
        let params = "data=" + json + "&authorization=" + token;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/search/capacitaciones", params, { headers: headers }).map(
            res => res.json()
        ); 
    }
}
