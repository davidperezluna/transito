"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var environment_1 = require("environments/environment");
require("rxjs/add/operator/map");
var TramiteSolicitudService = (function () {
    function TramiteSolicitudService(_http) {
        this._http = _http;
        this.url = environment_1.environment.apiUrl + "tramitesolicitud";
    }
    TramiteSolicitudService.prototype.getTramiteSolicitud = function () {
        return this._http.get(this.url + '/index').map(function (res) { return res.json(); });
    };
    TramiteSolicitudService.prototype.getByModulo = function (moduloId) {
        var json = JSON.stringify(moduloId);
        var params = 'json=' + json;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + '/index', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    TramiteSolicitudService.prototype.register = function (tramiteSolicitud, token) {
        var json = JSON.stringify(tramiteSolicitud);
        var params = 'json=' + json + '&authorization=' + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + '/new', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    TramiteSolicitudService.prototype.deleteTramiteSolicitud = function (token, id) {
        var params = 'authorization=' + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + '/' + id + '/delete', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    TramiteSolicitudService.prototype.showTramiteSolicitud = function (token, id) {
        var params = 'authorization=' + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + '/' + id + '/show', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    TramiteSolicitudService.prototype.showTramiteSolicitudByTamiteFactura = function (token, id) {
        var params = 'authorization=' + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + '/' + id + '/show/tramiteSolicitud', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    TramiteSolicitudService.prototype.editTramiteSolicitud = function (tramiteSolicitud, token) {
        var json = JSON.stringify(tramiteSolicitud);
        var params = 'json=' + json + '&authorization=' + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + '/edit', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    TramiteSolicitudService.prototype.getTramiteSolicitudSelect = function () {
        return this._http.get(this.url + '/select').map(function (res) { return res.json(); });
    };
    TramiteSolicitudService.prototype.getTramiteSolicitudByIdVehiculo = function (token, idVehiculo) {
        var json = JSON.stringify(idVehiculo);
        var params = 'json=' + json + '&authorization=' + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + '/byvehiculoorder', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    TramiteSolicitudService.prototype.byIdVehiculo = function (token, idVehiculo) {
        var json = JSON.stringify(idVehiculo);
        var params = 'json=' + json + '&authorization=' + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + '/byidvehiculo', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    TramiteSolicitudService.prototype.getTramiteSolicitudByIdVehiculoAndDate = function (token, datos) {
        var json = JSON.stringify(datos);
        var params = 'json=' + json + '&authorization=' + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + '/byvehiculoanddate', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    TramiteSolicitudService.prototype.getTramiteReporte = function () {
        return this._http.get(this.url + '/reporte').map(function (res) { return res.json(); });
    };
    TramiteSolicitudService.prototype.getReporteFecha = function (token, datos) {
        var json = JSON.stringify(datos);
        var params = 'json=' + json + '&authorization=' + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + '/reportefecha', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    return TramiteSolicitudService;
}());
TramiteSolicitudService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TramiteSolicitudService);
exports.TramiteSolicitudService = TramiteSolicitudService;
//# sourceMappingURL=tramiteSolicitud.service.js.map