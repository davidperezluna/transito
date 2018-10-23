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
var SucursalService = (function () {
    function SucursalService(_http) {
        this._http = _http;
        this.url = environment_1.environment.apiUrl + "sucursal";
    }
    SucursalService.prototype.getSucursal = function () {
        return this._http.get(this.url + "/").map(function (res) { return res.json(); });
    };
    SucursalService.prototype.register = function (sucursal, token) {
        var json = JSON.stringify(sucursal);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/new", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    SucursalService.prototype.deleteSucursal = function (token, id) {
        var params = "authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/" + id + "/delete", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    SucursalService.prototype.showSucursal = function (token, id) {
        var params = "authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/show/" + id, params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    SucursalService.prototype.showNit = function (token, nit) {
        var json = JSON.stringify(nit);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/show/nit", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    SucursalService.prototype.editSucursal = function (sucursal, token) {
        var json = JSON.stringify(sucursal);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/edit", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    SucursalService.prototype.getSucursalEmpresa = function (id) {
        return this._http.get(this.url + "/" + id + "/sucursales/por/empresa").map(function (res) { return res.json(); });
    };
    return SucursalService;
}());
SucursalService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], SucursalService);
exports.SucursalService = SucursalService;
//# sourceMappingURL=sucursal.service.js.map