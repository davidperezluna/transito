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
var GdDocumentoService = (function () {
    function GdDocumentoService(_http, _loogerService) {
        this._http = _http;
        this._loogerService = _loogerService;
        this.url = environment_1.environment.apiUrl + 'gestiondocumental/gddocumento';
    }
    GdDocumentoService.prototype.index = function () {
        return this._http.get(this.url + "/").map(function (res) { return res.json(); });
    };
    GdDocumentoService.prototype.register = function (formData, datos, token) {
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
    GdDocumentoService.prototype.delete = function (datos, token) {
        var params = "authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/delete", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    GdDocumentoService.prototype.show = function (datos, token) {
        var params = "authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/show/", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    GdDocumentoService.prototype.edit = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "data=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/edit", params, { headers: headers }).map(function (res) { return res.json(); }, this._loogerService.registerLog(token, 'UPDATE', json, this.url));
    };
    GdDocumentoService.prototype.search = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "data=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/search", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    GdDocumentoService.prototype.assign = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "data=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/assign", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    GdDocumentoService.prototype.print = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "data=" + json + "&authorization=" + token;
        console.log(params);
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/print", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    GdDocumentoService.prototype.template = function (formData, token) {
        formData.append('authorization', token);
        return this._http.post(this.url + "/template", formData).map(function (res) { return res.json(); });
    };
    return GdDocumentoService;
}());
GdDocumentoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        logger_service_1.LoggerService])
], GdDocumentoService);
exports.GdDocumentoService = GdDocumentoService;
//# sourceMappingURL=gdDocumento.service.js.map