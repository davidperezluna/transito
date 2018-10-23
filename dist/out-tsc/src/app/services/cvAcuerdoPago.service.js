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
var CvAcuerdoPagoService = (function () {
    function CvAcuerdoPagoService(_http, _loogerService) {
        this._http = _http;
        this._loogerService = _loogerService;
        this.url = environment_1.environment.apiUrl + 'contravencional/cvacuerdopago';
    }
    CvAcuerdoPagoService.prototype.index = function () {
        return this._http.get(this.url + "/").map(function (res) { return res.json(); });
    };
    CvAcuerdoPagoService.prototype.register = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/new", params, { headers: headers }).map(function (res) { return res.json(); }, this._loogerService.registerLog(token, 'INSERT', json, this.url));
    };
    CvAcuerdoPagoService.prototype.delete = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/delete", params, { headers: headers }).map(function (res) { return res.json(); }, this._loogerService.registerLog(token, 'DELETE', json, this.url));
    };
    CvAcuerdoPagoService.prototype.show = function (token, id) {
        var params = "authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/" + id + "/show", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    CvAcuerdoPagoService.prototype.edit = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/edit", params, { headers: headers }).map(function (res) { return res.json(); }, this._loogerService.registerLog(token, 'UPDATE', json, this.url));
    };
    CvAcuerdoPagoService.prototype.select = function () {
        return this._http.get(this.url + "/select").map(function (res) { return res.json(); });
    };
    CvAcuerdoPagoService.prototype.calculateValue = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/calculate/value", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    CvAcuerdoPagoService.prototype.calculateDateEnd = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/calculate/date/end", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    CvAcuerdoPagoService.prototype.calculateDues = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/calculate/dues", params, { headers: headers }).map(function (res) { return res.json(); });
    };
    return CvAcuerdoPagoService;
}());
CvAcuerdoPagoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        logger_service_1.LoggerService])
], CvAcuerdoPagoService);
exports.CvAcuerdoPagoService = CvAcuerdoPagoService;
//# sourceMappingURL=cvAcuerdoPago.service.js.map