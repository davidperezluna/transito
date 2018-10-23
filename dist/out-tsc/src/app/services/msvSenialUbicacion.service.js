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
var logger_service_1 = require("../logger/services/logger.service");
var MsvSenialUbicacionService = (function () {
    function MsvSenialUbicacionService(_http, _loogerService) {
        this._http = _http;
        this._loogerService = _loogerService;
        this.url = environment_1.environment.apiUrl + "seguridadvial/svsenialubicacion";
    }
    MsvSenialUbicacionService.prototype.index = function () {
        return this._http.get(this.url + "/").map(function (res) { return res.json(); });
    };
    MsvSenialUbicacionService.prototype.register = function (formData, datos, token) {
        var json = JSON.stringify(datos);
        formData.append('data', json);
        formData.append('authorization', token);
        console.log(formData);
        return this._http.post(this.url + "/new", formData).map(function (res) { return res.json(); });
    };
    MsvSenialUbicacionService.prototype.searchByDestino = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/search/destino", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    MsvSenialUbicacionService.prototype.export = function () {
        window.location.href = this.url + "/export";
    };
    MsvSenialUbicacionService.prototype.exportInv = function (data) {
        var params = '';
        for (var item in data) {
            params += data[item] + '_';
        }
        window.location.href = this.url + "/exportinv/" + params.substr(0, (params.length - 1));
    };
    MsvSenialUbicacionService.prototype.searchByParametros = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/search/parametros", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    return MsvSenialUbicacionService;
}());
MsvSenialUbicacionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, logger_service_1.LoggerService])
], MsvSenialUbicacionService);
exports.MsvSenialUbicacionService = MsvSenialUbicacionService;
//# sourceMappingURL=msvSenialUbicacion.service.js.map