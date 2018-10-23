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
var MsvSenialService = (function () {
    function MsvSenialService(_http, _loogerService) {
        this._http = _http;
        this._loogerService = _loogerService;
        this.url = environment_1.environment.apiUrl + "seguridadvial/svsenial";
    }
    MsvSenialService.prototype.index = function () {
        return this._http.get(this.url + "/").map(function (res) { return res.json(); });
    };
    MsvSenialService.prototype.register = function (formData, datos, token) {
        var json = JSON.stringify(datos);
        formData.append('json', json);
        formData.append('authorization', token);
        return this._http.post(this.url + "/new", formData).map(function (res) { return res.json(); });
    };
    MsvSenialService.prototype.show = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/show", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    MsvSenialService.prototype.searchBySenial = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "data=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/bysenial", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    MsvSenialService.prototype.searchByFull = function () {
        return this._http.get(this.url + "/full").map(function (res) { return res.json(); });
    };
    MsvSenialService.prototype.export = function () {
        window.location.href = this.url + "/export";
    };
    MsvSenialService.prototype.exportInv = function (data) {
        var params = '';
        for (var item in data) {
            params += data[item] + '_';
        }
        window.location.href = this.url + "/exportinv/" + params.substr(0, (params.length - 1));
    };
    MsvSenialService.prototype.searchByParametros = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/search/parametros", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    MsvSenialService.prototype.select = function () {
        return this._http.get(this.url + "/select").map(function (res) { return res.json(); });
    };
    MsvSenialService.prototype.selectByTipoSenial = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/select/tiposenial", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    return MsvSenialService;
}());
MsvSenialService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, logger_service_1.LoggerService])
], MsvSenialService);
exports.MsvSenialService = MsvSenialService;
//# sourceMappingURL=msvSenial.service.js.map