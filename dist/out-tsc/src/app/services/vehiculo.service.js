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
var VehiculoService = (function () {
    function VehiculoService(_http) {
        this._http = _http;
        this.url = environment_1.environment.apiUrl + "app/vehiculo";
    }
    VehiculoService.prototype.getVehiculo = function () {
        return this._http.get(this.url + "/").map(function (res) { return res.json(); });
    };
    VehiculoService.prototype.register = function (vehiculo, token) {
        var json = JSON.stringify(vehiculo);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/new", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    VehiculoService.prototype.deleteVehiculo = function (token, id) {
        var json = JSON.stringify(id);
        var params = "authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/" + id + "/delete", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    VehiculoService.prototype.showVehiculo = function (token, id) {
        var params = "authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/show/" + id, params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    VehiculoService.prototype.showVehiculoPlaca = function (token, placa) {
        var json = JSON.stringify(placa);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/placa", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    VehiculoService.prototype.showVehiculoModuloPlaca = function (token, datos) {
        var json = JSON.stringify(datos);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/modulo/placa", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    VehiculoService.prototype.showVehiculoParametro = function (token, parametros) {
        var json = JSON.stringify(parametros);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/parametros", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    VehiculoService.prototype.showVehiculoTipo = function (token, parametro) {
        var json = JSON.stringify(parametro);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/tipo", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    VehiculoService.prototype.editVehiculo = function (vehiculo, token) {
        var json = JSON.stringify(vehiculo);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/edit", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    VehiculoService.prototype.editCombustibleVehiculo = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/edit/combustible", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    VehiculoService.prototype.editVehiculoColor = function (vehiculo, token) {
        var json = JSON.stringify(vehiculo);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/edit/color", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    VehiculoService.prototype.editVehiculoPignorado = function (vehiculo, token) {
        var json = JSON.stringify(vehiculo);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/edit/pignorado", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    VehiculoService.prototype.editSedeOperativaVehiculo = function (vehiculo, token) {
        var json = JSON.stringify(vehiculo);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/edit/sedeOperativa", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    VehiculoService.prototype.getVehiculoSelect = function () {
        return this._http.get(this.url + "/select").map(function (res) { return res.json(); });
    };
    VehiculoService.prototype.filterByParameters = function (gestionTransportePublico, token) {
        var json = JSON.stringify(gestionTransportePublico);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/fin/by/parameters", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    VehiculoService.prototype.asignacionPlaca = function (vehiculo, token) {
        var json = JSON.stringify(vehiculo);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/asignacionPlaca", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    return VehiculoService;
}());
VehiculoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], VehiculoService);
exports.VehiculoService = VehiculoService;
//# sourceMappingURL=vehiculo.service.js.map