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
var CfgCasoInsumoService = (function () {
    function CfgCasoInsumoService(_http) {
        this._http = _http;
        this.url = environment_1.environment.apiUrl + "casoinsumo";
    }
    CfgCasoInsumoService.prototype.getCfgCasoInsumo = function () {
        return this._http.get(this.url + "/").map(function (res) { return res.json(); });
    };
    CfgCasoInsumoService.prototype.register = function (cfgCasoInsumo, token) {
        var json = JSON.stringify(cfgCasoInsumo);
        var params = "json=" + json + "&authorization=" + token;
        console.log(params);
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/new", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    CfgCasoInsumoService.prototype.deleteCfgCasoInsumo = function (token, id) {
        var json = JSON.stringify(id);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/delete", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    CfgCasoInsumoService.prototype.showCfgCasoInsumo = function (token, id) {
        var params = "authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/show/" + id, params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    CfgCasoInsumoService.prototype.editCfgCasoInsumo = function (cfgCasoInsumo, token) {
        var json = JSON.stringify(cfgCasoInsumo);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/edit", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    CfgCasoInsumoService.prototype.getCasoInsumoInsumoSelect = function () {
        return this._http.get(this.url + "/select/insumo").map(function (res) { return res.json(); });
    };
    CfgCasoInsumoService.prototype.getCasoInsumoSustratoSelect = function () {
        return this._http.get(this.url + "/select/sustrato").map(function (res) { return res.json(); });
    };
    return CfgCasoInsumoService;
}());
CfgCasoInsumoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CfgCasoInsumoService);
exports.CfgCasoInsumoService = CfgCasoInsumoService;
//# sourceMappingURL=cfgCasoInsumo.service.js.map