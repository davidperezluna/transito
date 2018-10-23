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
var VehiculoLimitacionService = (function () {
    function VehiculoLimitacionService(_http) {
        this._http = _http;
        this.url = environment_1.environment.apiUrl + "vehiculoLimitacion";
    }
    VehiculoLimitacionService.prototype.getVehiculoLimitacion = function (datos) {
        var json = JSON.stringify(datos);
        console.log(json);
        var params = "json=" + json;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    VehiculoLimitacionService.prototype.register = function (datos, token) {
        var json = JSON.stringify(datos);
        console.log(json);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/new", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    VehiculoLimitacionService.prototype.deleteVehiculoLimitacion = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "json=" + json + "&authorization=" + token;
        console.log(params);
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/delete", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    VehiculoLimitacionService.prototype.showVehiculoLimitacion = function (token, id) {
        var params = "authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/show/" + id, params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    VehiculoLimitacionService.prototype.editVehiculoLimitacion = function (vehiculoLimitacion, token) {
        var json = JSON.stringify(vehiculoLimitacion);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/edit", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    VehiculoLimitacionService.prototype.getTramiteLimitacionPlaca = function (placa, token) {
        var json = JSON.stringify(placa);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/limitacion/placaestado", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    VehiculoLimitacionService.prototype.levantarLimitacion = function (vehiculoLimitacionId, token) {
        var json = JSON.stringify(vehiculoLimitacionId);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/levantar/limitacion", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    return VehiculoLimitacionService;
}());
VehiculoLimitacionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], VehiculoLimitacionService);
exports.VehiculoLimitacionService = VehiculoLimitacionService;
//# sourceMappingURL=vehiculoLimitacion.service.js.map