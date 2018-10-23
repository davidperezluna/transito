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
var CfgPlacaService = (function () {
    function CfgPlacaService(_http) {
        this._http = _http;
        this.url = environment_1.environment.apiUrl + "cfgplaca";
    }
    CfgPlacaService.prototype.getCfgPlaca = function () {
        return this._http.get(this.url + "/").map(function (res) { return res.json(); });
    };
    CfgPlacaService.prototype.register = function (cfgPlaca, token) {
        var json = JSON.stringify(cfgPlaca);
        var params = "json=" + json + "&authorization=" + token;
        console.log(params);
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/new", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    CfgPlacaService.prototype.deleteCfgPlaca = function (token, id) {
        var json = JSON.stringify(id);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/delete", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    CfgPlacaService.prototype.liberarCfgPlaca = function (token, id) {
        var json = JSON.stringify(id);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/liberar/placa", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    CfgPlacaService.prototype.showCfgPLaca = function (token, id) {
        var params = "authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/show/" + id, params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    CfgPlacaService.prototype.editCfgPlaca = function (cfgPLaca, token) {
        var json = JSON.stringify(cfgPLaca);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/edit", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    CfgPlacaService.prototype.getCfgPlacaSelect = function () {
        return this._http.get(this.url + "/select").map(function (res) { return res.json(); });
    };
    CfgPlacaService.prototype.getCfgPlacaPorIdSelect = function (id) {
        return this._http.get(this.url + "/" + id + "/select/cfgPlacas/por/id").map(function (res) { return res.json(); });
    };
    CfgPlacaService.prototype.getCfgPlacaPorSedeOperativa = function (token, id) {
        console.log(id);
        var params = "authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/select/placas/por/sedeOperativa/" + id, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    return CfgPlacaService;
}());
CfgPlacaService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CfgPlacaService);
exports.CfgPlacaService = CfgPlacaService;
//# sourceMappingURL=cfgPlaca.service.js.map