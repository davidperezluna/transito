import { Injectable } from "@angular/core";
import { Http, Headers, ResponseContentType } from "@angular/http";
import { LoggerService } from "../logger/services/logger.service";
import { environment } from 'environments/environment';
import "rxjs/add/operator/map";

@Injectable()
export class FroReporteIngresosService {
    private url = environment.apiUrl + 'financiero/froreporteingresos';
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

    pdfTramiteByFecha(datos, token): any {
        /* let json = JSON.stringify(datos);
        let params = "data=" + json + "&authorization=" + token;

        let headers = new Headers(
            {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        );

        return this._http.post(this.url + "/pdf/tramite/fecha", params, { 'responseType': ResponseContentType.Blob, headers: headers }).map(res => { return new Blob([res.blob()], { type: 'application/pdf' }) }); */
        let json = JSON.stringify(datos);
        let params = "data=" + json + "&authorization=" + token;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/pdf/tramite/fecha", params, { headers: headers }).map(res => res.json()); 
    }

    pdfInfraccionByFecha(datos, token): any {
        let json = JSON.stringify(datos);
        let params = "data=" + json + "&authorization=" + token;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/pdf/infraccion/fecha", params, { headers: headers }).map(res => res.json()); 
        /* let json = JSON.stringify(datos);
        let params = "data=" + json + "&authorization=" + token;

        let headers = new Headers(
            {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        );

        return this._http.post(this.url + "/pdf/infraccion/fecha", params, { 'responseType': ResponseContentType.Blob, headers: headers }).map(res => { return new Blob([res.blob()], { type: 'application/pdf' }) }
        );  */
    }

    pdfAcuerdoPagoByFecha(datos, token): any {
        let json = JSON.stringify(datos);
        let params = "data=" + json + "&authorization=" + token;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/pdf/acuerdopago/fecha", params, { headers: headers }).map(res => res.json()); 
        /* let json = JSON.stringify(datos);
        let params = "data=" + json + "&authorization=" + token;

        let headers = new Headers(
            {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        );

        return this._http.post(this.url + "/pdf/acuerdopago/fecha", params, { 'responseType': ResponseContentType.Blob, headers: headers }).map(res => { return new Blob([res.blob()], { type: 'application/pdf' }) }
        );  */
    }

    pdfCobroCoactivoByFecha(datos, token): any {
        let json = JSON.stringify(datos);
        let params = "data=" + json + "&authorization=" + token;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/pdf/cobrocoactivo/fecha", params, { headers: headers }).map(res => res.json());
        /* let json = JSON.stringify(datos);
        let params = "data=" + json + "&authorization=" + token;

        let headers = new Headers(
            {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        );

        return this._http.post(this.url + "/pdf/cobrocoactivo/fecha", params, { 'responseType': ResponseContentType.Blob, headers: headers }).map(res => { return new Blob([res.blob()], { type: 'application/pdf' }) }
        ); */ 
    }

    pdfParqueaderoByFecha(datos, token): any {
        let json = JSON.stringify(datos);
        let params = "data=" + json + "&authorization=" + token;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/pdf/parqueadero/fecha", params, { headers: headers }).map(res => res.json());
        /* let json = JSON.stringify(datos);
        let params = "data=" + json + "&authorization=" + token;

        let headers = new Headers(
            {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        );

        return this._http.post(this.url + "/pdf/parqueadero/fecha", params, { 'responseType': ResponseContentType.Blob, headers: headers }).map(res => { return new Blob([res.blob()], { type: 'application/pdf' }) }
        );  */
    }

    pdfRetefuenteByFecha(datos, token) {
        let json = JSON.stringify(datos);
        let params = "data=" + json + "&authorization=" + token;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
            return this._http.post(this.url + "/pdf/retefuente/fecha", params, { headers: headers }).map(res => res.json());   
    }
}
