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
var FacturaInfraccionService = (function () {
    function FacturaInfraccionService(_http) {
        this._http = _http;
        this.url = environment_1.environment.apiUrl + "facturainfraccion";
    }
    FacturaInfraccionService.prototype.getFacturaInfraccion = function () {
        return this._http.get(this.url + "/").map(function (res) { return res.json(); });
    };
    FacturaInfraccionService.prototype.register = function (factura, token) {
        var json = JSON.stringify(factura);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/new", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    FacturaInfraccionService.prototype.imprimir = function (factura, token) {
        var json = JSON.stringify(factura);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/imprimir/factura", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    FacturaInfraccionService.prototype.deleteFacturaInfraccion = function (token, id) {
        var params = "authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/" + id + "/delete", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    FacturaInfraccionService.prototype.showFacturaInfraccion = function (token, id) {
        var params = "authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/show/" + id, params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    FacturaInfraccionService.prototype.showFacturaInfraccionById = function (token, id) {
        var json = JSON.stringify(id);
        var params = 'json=' + json + '&authorization=' + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + '/show/id', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    FacturaInfraccionService.prototype.showFacturaInfraccionByVehiculo = function (token, vehiculo) {
        var json = JSON.stringify(vehiculo);
        var params = 'json=' + json + '&authorization=' + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + '/show/factura/vehiculo', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    FacturaInfraccionService.prototype.editFacturaInfraccion = function (factura, token) {
        var json = JSON.stringify(factura);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/edit", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    FacturaInfraccionService.prototype.getFacturaInfraccionSelect = function () {
        return this._http.get(this.url + "/select").map(function (res) { return res.json(); });
    };
    FacturaInfraccionService.prototype.searchByNumero = function (token, datos) {
        var json = JSON.stringify(datos);
        var params = 'json=' + json + '&authorization=' + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + '/search/numero', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    return FacturaInfraccionService;
}());
FacturaInfraccionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], FacturaInfraccionService);
exports.FacturaInfraccionService = FacturaInfraccionService;
//# sourceMappingURL=facturaInfraccion.service.js.map