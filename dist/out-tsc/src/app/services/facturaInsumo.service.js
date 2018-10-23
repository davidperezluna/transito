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
var FacturaInsumoService = (function () {
    function FacturaInsumoService(_http) {
        this._http = _http;
        this.url = environment_1.environment.apiUrl + "facturaInsumo";
    }
    FacturaInsumoService.prototype.getFacturaInsumo = function () {
        return this._http.get(this.url + "/").map(function (res) { return res.json(); });
    };
    FacturaInsumoService.prototype.register = function (factura, token) {
        var json = JSON.stringify(factura);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/new", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    FacturaInsumoService.prototype.deleteFacturaInsumo = function (token, id) {
        var params = "authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/" + id + "/delete", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    FacturaInsumoService.prototype.showFacturaInsumo = function (token, id) {
        var params = "authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/show/" + id, params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    FacturaInsumoService.prototype.showFacturaInsumoByNumero = function (token, numeroFacturaInsumo) {
        console.log(numeroFacturaInsumo);
        var json = JSON.stringify(numeroFacturaInsumo);
        var params = 'json=' + json + '&authorization=' + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + '/show/numero', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    FacturaInsumoService.prototype.editFacturaInsumo = function (factura, token) {
        var json = JSON.stringify(factura);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/edit", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    FacturaInsumoService.prototype.getFacturaInsumoSelect = function () {
        return this._http.get(this.url + "/select").map(function (res) { return res.json(); });
    };
    return FacturaInsumoService;
}());
FacturaInsumoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], FacturaInsumoService);
exports.FacturaInsumoService = FacturaInsumoService;
//# sourceMappingURL=facturaInsumo.service.js.map