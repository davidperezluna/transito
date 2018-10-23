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
var logger_service_1 = require("../logger/services/logger.service");
var environment_1 = require("environments/environment");
var MpersonalFuncionarioService = (function () {
    function MpersonalFuncionarioService(_http, _loogerService) {
        this._http = _http;
        this._loogerService = _loogerService;
        this.url = environment_1.environment.apiUrl + "mpersonalfuncionario";
    }
    MpersonalFuncionarioService.prototype.index = function () {
        return this._http.get(this.url + "/").map(function (res) { return res.json(); });
    };
    MpersonalFuncionarioService.prototype.register = function (funcionario, token) {
        var json = JSON.stringify(funcionario);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/new", params, { headers: headers }).map(function (res) { return res.json(); }, this._loogerService.registerLog(token, 'INSERT', json, this.url));
    };
    MpersonalFuncionarioService.prototype.delete = function (token, id) {
        var params = "authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/delete", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    MpersonalFuncionarioService.prototype.show = function (token, id) {
        var params = "authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/" + id + "/show", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    MpersonalFuncionarioService.prototype.edit = function (funcionario, token) {
        var json = JSON.stringify(funcionario);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/edit", params, { headers: headers }).map(function (res) { return res.json(); }, this._loogerService.registerLog(token, 'UPDATE', json, this.url));
    };
    MpersonalFuncionarioService.prototype.select = function () {
        return this._http.get(this.url + "/select").map(function (res) { return res.json(); });
    };
    MpersonalFuncionarioService.prototype.selectAgentes = function () {
        return this._http.get(this.url + "/select/agentes").map(function (res) { return res.json(); });
    };
    MpersonalFuncionarioService.prototype.selectContratistas = function () {
        return this._http.get(this.url + "/select/contratistas").map(function (res) { return res.json(); });
    };
    MpersonalFuncionarioService.prototype.searchByParametros = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/search/parametros", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    MpersonalFuncionarioService.prototype.searchLogin = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/search/login", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    MpersonalFuncionarioService.prototype.searchEmpresa = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/search/empresa", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    MpersonalFuncionarioService.prototype.searchCiudadano = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/search/ciudadano", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    MpersonalFuncionarioService.prototype.recordTimes = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/record/times", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    MpersonalFuncionarioService.prototype.recordProrrogas = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/record/prorrogas", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    return MpersonalFuncionarioService;
}());
MpersonalFuncionarioService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        logger_service_1.LoggerService])
], MpersonalFuncionarioService);
exports.MpersonalFuncionarioService = MpersonalFuncionarioService;
//# sourceMappingURL=mpersonalFuncionario.service.js.map