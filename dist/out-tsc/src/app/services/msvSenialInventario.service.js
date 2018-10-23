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
var MsvSenialInventarioService = (function () {
    function MsvSenialInventarioService(_http) {
        this._http = _http;
        this.urlBodega = environment_1.environment.apiUrl + "seguridadvial/svsenialinventariobodega";
        this.urlSenialBodega = environment_1.environment.apiUrl + "seguridadvial/svsenial";
        this.urlMunicipio = environment_1.environment.apiUrl + "seguridadvial/svsenialinventariomunicipio";
        this.urlSenialMunicipio = environment_1.environment.apiUrl + "seguridadvial/svsenialubicacion";
    }
    MsvSenialInventarioService.prototype.index = function () {
        return this._http.get(this.urlBodega + "/").map(function (res) { return res.json(); });
    };
    MsvSenialInventarioService.prototype.registerSenialBodega = function (formData, datos, token) {
        if (formData == null) {
            var json = JSON.stringify(datos);
            var params = "json=" + json + "&authorization=" + token;
            var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
            return this._http.post(this.urlSenialBodega + "/new", params, { headers: headers }).map(function (res) { return res.json(); });
        }
        else {
            var json = JSON.stringify(datos);
            formData.append('json', json);
            formData.append('authorization', token);
            console.log(formData);
            return this._http.post(this.urlSenialBodega + "/new", formData).map(function (res) { return res.json(); });
        }
    };
    MsvSenialInventarioService.prototype.registerSenialMunicipio = function (formData, datos, token) {
        if (formData == null) {
            var json = JSON.stringify(datos);
            var params = "json=" + json + "&authorization=" + token;
            var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
            return this._http.post(this.urlMunicipio + "/new", params, { headers: headers }).map(function (res) { return res.json(); });
        }
        else {
            var json = JSON.stringify(datos);
            formData.append('json', json);
            formData.append('authorization', token);
            return this._http.post(this.urlMunicipio + "/new", formData).map(function (res) { return res.json(); });
        }
    };
    MsvSenialInventarioService.prototype.edit = function (formData, datos, token) {
        if (formData == null) {
            var json = JSON.stringify(datos);
            var params = "data=" + json + "&authorization=" + token;
            var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
            return this._http.post(this.urlBodega + "/edit", params, { headers: headers }).map(function (res) { return res.json(); });
        }
        else {
            var json = JSON.stringify(datos);
            formData.append('data', json);
            formData.append('authorization', token);
            console.log(formData);
            return this._http.post(this.urlBodega + "/edit", formData).map(function (res) { return res.json(); });
        }
    };
    MsvSenialInventarioService.prototype.searchByTipoSenialInBodega = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.urlBodega + "/search/tiposenial", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    MsvSenialInventarioService.prototype.searchByTipoSenialInMunicipio = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.urlMunicipio + "/search/tiposenial", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    MsvSenialInventarioService.prototype.searchByFull = function () {
        return this._http.get(this.urlBodega + "/full").map(function (res) { return res.json(); });
    };
    MsvSenialInventarioService.prototype.export = function () {
        window.location.href = this.urlBodega + "/export";
    };
    MsvSenialInventarioService.prototype.exportInv = function (data) {
        var params = '';
        for (var item in data) {
            params += data[item] + '_';
        }
        window.location.href = this.urlBodega + "/exportinv/" + params.substr(0, (params.length - 1));
    };
    MsvSenialInventarioService.prototype.searchByParametros = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.urlBodega + "/search/parametros", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    return MsvSenialInventarioService;
}());
MsvSenialInventarioService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], MsvSenialInventarioService);
exports.MsvSenialInventarioService = MsvSenialInventarioService;
//# sourceMappingURL=msvSenialInventario.service.js.map