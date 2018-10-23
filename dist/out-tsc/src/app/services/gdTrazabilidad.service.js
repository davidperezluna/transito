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
var logger_service_1 = require("../logger/services/logger.service");
var environment_1 = require("environments/environment");
require("rxjs/add/operator/map");
var GdTrazabilidadService = (function () {
    function GdTrazabilidadService(_http, _loogerService) {
        this._http = _http;
        this._loogerService = _loogerService;
        this.url = environment_1.environment.apiUrl + "gestiondocumental/gdtrazabilidad";
    }
    GdTrazabilidadService.prototype.index = function () {
        return this._http.get(this.url + "/").map(function (res) { return res.json(); });
    };
    GdTrazabilidadService.prototype.register = function (formData, datos, token) {
        console.log(datos);
        if (formData == null) {
            var json = JSON.stringify(datos);
            var params = "data=" + json + "&authorization=" + token;
            var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
            return this._http.post(this.url + "/new", params, { headers: headers }).map(function (res) { return res.json(); }, this._loogerService.registerLog(token, 'INSERT', json, this.url));
        }
        else {
            var json = JSON.stringify(datos);
            formData.append('data', json);
            formData.append('authorization', token);
            return this._http.post(this.url + "/new", formData).map(function (res) { return res.json(); }, this._loogerService.registerLog(token, 'INSERT', json, this.url));
        }
    };
    GdTrazabilidadService.prototype.delete = function (datos, token) {
        var params = "authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/delete", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    GdTrazabilidadService.prototype.show = function (datos, token) {
        var params = "authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/show/", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    GdTrazabilidadService.prototype.edit = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "data=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/edit", params, { headers: headers }).map(function (res) { return res.json(); }, this._loogerService.registerLog(token, 'UPDATE', json, this.url));
    };
    GdTrazabilidadService.prototype.searchByFuncionario = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "data=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/search/funcionario", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    GdTrazabilidadService.prototype.searchResponseByDocumento = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "data=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/search/response/documento", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    GdTrazabilidadService.prototype.process = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "data=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/process", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    GdTrazabilidadService.prototype.response = function (formData, datos, token) {
        if (formData == null) {
            var json = JSON.stringify(datos);
            var params = "data=" + json + "&authorization=" + token;
            var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
            return this._http.post(this.url + "/response", params, { headers: headers }).map(function (res) { return res.json(); }, this._loogerService.registerLog(token, 'UPDATE', json, this.url));
        }
        else {
            var json = JSON.stringify(datos);
            formData.append('data', json);
            formData.append('authorization', token);
            return this._http.post(this.url + "/response", formData).map(function (res) { return res.json(); }, this._loogerService.registerLog(token, 'UPDATE', json, this.url));
        }
    };
    GdTrazabilidadService.prototype.print = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "data=" + json + "&authorization=" + token;
        console.log(params);
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/print", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    return GdTrazabilidadService;
}());
GdTrazabilidadService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        logger_service_1.LoggerService])
], GdTrazabilidadService);
exports.GdTrazabilidadService = GdTrazabilidadService;
//# sourceMappingURL=gdTrazabilidad.service.js.map