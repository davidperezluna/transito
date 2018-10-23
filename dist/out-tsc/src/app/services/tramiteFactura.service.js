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
require("rxjs/add/operator/map");
var environment_1 = require("environments/environment");
var TramiteFacturaService = (function () {
    function TramiteFacturaService(_http) {
        this._http = _http;
        this.url = environment_1.environment.apiUrl + "tramitefactura";
    }
    TramiteFacturaService.prototype.getTramiteFactura = function (idFactura) {
        return this._http.get(this.url + "/" + idFactura + "/index").map(function (res) { return res.json(); });
    };
    TramiteFacturaService.prototype.register = function (tramiteFactura, token) {
        var json = JSON.stringify(tramiteFactura);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/new", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    TramiteFacturaService.prototype.deleteTramiteFactura = function (token, id) {
        var params = 'authorization=' + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/" + id + "/delete", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    TramiteFacturaService.prototype.showTramiteFactura = function (token, id) {
        var params = "authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/" + id + '/show', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    TramiteFacturaService.prototype.editTramiteFactura = function (tramiteFactura, token) {
        var json = JSON.stringify(tramiteFactura);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/edit", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    TramiteFacturaService.prototype.getTramiteFacturaSelect = function (idFactura) {
        return this._http.get(this.url + "/" + idFactura + "/select").map(function (res) { return res.json(); });
    };
    TramiteFacturaService.prototype.getTramitesByFacturaSelect = function (idFactura) {
        return this._http.get(this.url + "/" + idFactura + "/tramites/by/factura/select").map(function (res) { return res.json(); });
    };
    TramiteFacturaService.prototype.getTramiteShowFactura = function (datos) {
        var json = JSON.stringify(datos);
        var params = 'json=' + json;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/show/factura", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    return TramiteFacturaService;
}());
TramiteFacturaService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TramiteFacturaService);
exports.TramiteFacturaService = TramiteFacturaService;
//# sourceMappingURL=tramiteFactura.service.js.map