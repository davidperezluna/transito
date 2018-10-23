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
var ComparendoService = (function () {
    function ComparendoService(_http) {
        this._http = _http;
        this.url = environment_1.environment.apiUrl + "comparendo";
    }
    ComparendoService.prototype.getComparendo = function () {
        return this._http.get(this.url + "/").map(function (res) { return res.json(); });
    };
    ComparendoService.prototype.register = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/new", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ComparendoService.prototype.deleteComparendo = function (token, id) {
        var params = "authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/" + id + "/delete", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ComparendoService.prototype.showComparendo = function (token, id) {
        var params = "authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/show/" + id, params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ComparendoService.prototype.editComparendo = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/edit", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ComparendoService.prototype.setComparendoArchivo = function (datoss, polca, token) {
        var json = JSON.stringify(datoss);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/" + polca + "/archivo", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ComparendoService.prototype.searchComparendosCiudadano = function (ciudadano, token) {
        var json = JSON.stringify(ciudadano);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/ciudadano/search", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    ComparendoService.prototype.searchByState = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/search/estado", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    ComparendoService.prototype.searchByParametros = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/search/parametros", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    ComparendoService.prototype.export = function () {
        return this._http.get(this.url + "/export").map(function (res) { return res.json(); });
    };
    return ComparendoService;
}());
ComparendoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ComparendoService);
exports.ComparendoService = ComparendoService;
//# sourceMappingURL=comparendo.service.js.map