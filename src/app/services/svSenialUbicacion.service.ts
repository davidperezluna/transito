import { Injectable, NgZone } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { environment } from 'environments/environment';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { MapsAPILoader } from '@agm/core';
import { Observable, Observer } from 'rxjs';
import "rxjs/add/operator/map";

import { LoggerService } from "../logger/services/logger.service";

@Injectable()
export class SvSenialUbicacionService extends GoogleMapsAPIWrapper {
	private url = environment.apiUrl + "seguridadvial/svsenialubicacion";
	public identity;
	public token;

	constructor(
		private _http: Http,
		private _loogerService: LoggerService,
		private __loader: MapsAPILoader, private __zone: NgZone
	) { 
		super(__loader, __zone);
	}

	index() {
	    return this._http.get(this.url + "/").map(res => res.json());
	}
	
	register(formData, datos, token) {
		if (formData == null) {
			let json = JSON.stringify(datos);
			let params = "data=" + json + "&authorization=" + token;
			let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
			return this._http.post(this.url + "/new", params, { headers: headers }).map(res => res.json());
		} else {
			let json = JSON.stringify(datos);
			formData.append('data', json);
			formData.append('authorization', token);
			return this._http.post(this.url + "/new", formData).map(res => res.json());
		}
	}

	searchByDestino(datos, token) {
		let json = JSON.stringify(datos);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/search/destino", params, { headers: headers }).map(res => res.json());
	}

	searchByFechasAndMunicipio(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/search/fechas/municipio", params, { headers: headers }).map(res => res.json());
	}

	export() {
		window.location.href = this.url + "/export";
	}

	exportInv(data) {
		let params = '';
		for (var item in data) {
			params += data[item] + '_'
		}
		window.location.href = this.url + "/exportinv/" + params.substr(0, (params.length - 1));
	}

	searchByParametros(datos, token) {
		let json = JSON.stringify(datos);
		let params = "json=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/search/parametros", params, { headers: headers }).map(res => res.json());
	}

	getLatLng(address: string) {
        console.log('Getting Coords - ', address);
        let geocoder = new google.maps.Geocoder();
        return Observable.create(observer => {
            geocoder.geocode( { 'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    observer.next(results[0].geometry.location);
                    observer.complete();                    
                } else {
                    console.log('Error - ', results, ' & Status - ', status);
                    observer.next({});
                    observer.complete();
                }
            });
        })
	}
	
	getAddress(coords: any) {
		console.log('Getting Address - ', coords);
        let geocoder = new google.maps.Geocoder();
        return Observable.create(observer => {
            geocoder.geocode( { 'location': coords }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    observer.next(results[0].formatted_address);
                    observer.complete();                    
                } else {
                    console.log('Error - ', results, ' & Status - ', status);
                    observer.next({});
                    observer.complete();
                }
            });
        })
    }
}