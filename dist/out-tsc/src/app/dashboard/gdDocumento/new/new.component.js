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
var router_1 = require("@angular/router");
var gdDocumento_modelo_1 = require("../gdDocumento.modelo");
var gdRemitente_modelo_1 = require("../gdRemitente.modelo");
var gdMedidaCautelar_modelo_1 = require("../gdMedidaCautelar.modelo");
var gdVehiculo_modelo_1 = require("../gdVehiculo.modelo");
var gdRemitente_service_1 = require("../../../services/gdRemitente.service");
var gdDocumento_service_1 = require("../../../services/gdDocumento.service");
var gdCfgTipoCorrespondencia_service_1 = require("../../../services/gdCfgTipoCorrespondencia.service");
var gdCfgMedioCorrespondencia_service_1 = require("../../../services/gdCfgMedioCorrespondencia.service");
var tipoIdentificacion_service_1 = require("../../../services/tipoIdentificacion.service");
var clase_service_1 = require("../../../services/clase.service");
var login_service_1 = require("../../../services/login.service");
var ciudadano_service_1 = require("../../../services/ciudadano.service");
var sweetalert2_1 = require("sweetalert2");
var NewComponent = (function () {
    function NewComponent(_CiudadanoService, _TipoIdentificacionService, _RemitenteService, _TipoCorrespondenciaService, _MedioCorrespondenciaService, _DocumentoService, _ClaseService, _loginService, router) {
        this._CiudadanoService = _CiudadanoService;
        this._TipoIdentificacionService = _TipoIdentificacionService;
        this._RemitenteService = _RemitenteService;
        this._TipoCorrespondenciaService = _TipoCorrespondenciaService;
        this._MedioCorrespondenciaService = _MedioCorrespondenciaService;
        this._DocumentoService = _DocumentoService;
        this._ClaseService = _ClaseService;
        this._loginService = _loginService;
        this.router = router;
        this.ready = new core_1.EventEmitter();
        this.onShow = new core_1.EventEmitter();
        this.peticionario = null;
        this.editable = false;
        this.formNewDocumento = true;
        this.formNewRemitente = false;
        this.formNewCiudadano = false;
        this.ciudadano = null;
        this.file = null;
        this.datosRegistro = {
            'peticionario': null,
            'remitente': null,
            'documento': null,
            'medidaCautelar': null,
            'vehiculo': null,
        };
    }
    NewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.remitente = new gdRemitente_modelo_1.GdRemitente(null, null, null, null, null, null, null, null, null, null);
        this.documento = new gdDocumento_modelo_1.GdDocumento(null, null, null, null, null, null, null, null, null, null, null, null, null);
        this.medidaCautelar = new gdMedidaCautelar_modelo_1.GdMedidaCautelar(null, null, null, null, null, null, null, null);
        this.vehiculo = new gdVehiculo_modelo_1.GdVehiculo(null, null, null, null);
        this.prohibicion = false;
        this.date = new Date();
        $('#summernote').summernote({
            placeholder: 'Registre los detalles de la llegada del documento',
            tabsize: 2,
            height: 300
        });
        this._TipoIdentificacionService.getTipoIdentificacionSelect().subscribe(function (response) {
            _this.tiposIdentificacion = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._TipoCorrespondenciaService.select().subscribe(function (response) {
            _this.tiposCorrespondencia = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._MedioCorrespondenciaService.select().subscribe(function (response) {
            _this.mediosCorrespondencia = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    NewComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    NewComponent.prototype.onSearchCiudadano = function () {
        var _this = this;
        sweetalert2_1.default({
            title: 'Buscando registros!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: function () {
                sweetalert2_1.default.showLoading();
            }
        });
        var token = this._loginService.getToken();
        this._CiudadanoService.searchByIdentificacion({ 'numeroIdentificacion': this.peticionario.identificacion }, token).subscribe(function (response) {
            if (response.status == 'success') {
                _this.ciudadano = response.data;
                _this.formNewCiudadano = false;
                _this.formNewDocumento = true;
                sweetalert2_1.default({
                    title: 'Perfecto!',
                    text: response.message,
                    type: 'success'
                });
            }
            else {
                _this.ciudadano = null;
                _this.formNewCiudadano = true;
                _this.formNewDocumento = false;
                sweetalert2_1.default({
                    title: 'Atención!',
                    text: response.message,
                    type: 'warning'
                });
            }
            (function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        });
    };
    NewComponent.prototype.onSearchRemitente = function () {
        var _this = this;
        sweetalert2_1.default({
            title: 'Buscando registros!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: function () {
                sweetalert2_1.default.showLoading();
            }
        });
        var token = this._loginService.getToken();
        this._RemitenteService.searchByIdentificacion({ 'identificacion': this.remitente.identificacion }, token).subscribe(function (response) {
            if (response.status == 'success') {
                _this.formNewRemitente = false;
                _this.remitente = response.data;
                _this.remitente.idTipoIdentificacion = response.data.tipoIdentificacion.id;
                sweetalert2_1.default.close();
            }
            else {
                _this.formNewRemitente = true;
                sweetalert2_1.default({
                    title: 'Atención!',
                    text: response.message,
                    type: 'warning'
                });
            }
            (function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        });
    };
    NewComponent.prototype.onRegister = function () {
        var _this = this;
        this.datosRegistro.remitente = this.remitente;
        this.datosRegistro.peticionario = this.ciudadano;
        this.datosRegistro.documento = this.documento;
        var token = this._loginService.getToken();
        this._DocumentoService.register(this.file, this.datosRegistro, token).subscribe(function (response) {
            if (response.status == 'success') {
                sweetalert2_1.default({
                    title: 'Perfecto!',
                    text: response.message,
                    type: 'success',
                    confirmButtonText: 'Aceptar'
                });
                _this.onShow.emit(response.data);
            }
            else {
                sweetalert2_1.default({
                    title: 'Error!',
                    text: response.message,
                    type: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
            (function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        });
    };
    NewComponent.prototype.onCrearProhibicion = function () {
        var _this = this;
        this._ClaseService.getClaseSelect().subscribe(function (response) {
            _this.clases = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this.datosRegistro.medidaCautelar = this.medidaCautelar;
        sweetalert2_1.default({
            title: 'Perfecto',
            text: "¡Medida cautelar registrada, ingrese al menos un vehiculo!",
            type: 'info',
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> OK!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
            cancelButtonAriaLabel: 'Thumbs down',
        });
    };
    NewComponent.prototype.onCrearVehiculo = function () {
        this.datosRegistro.vehiculo.push({
            'lugar': this.vehiculo.lugar,
            'placa': this.vehiculo.placa,
            'claseId': this.claseSelected
        });
        sweetalert2_1.default({
            title: 'Perfecto',
            text: "¡Vehiculo resgistrado!",
            type: 'info',
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> OK!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
            cancelButtonAriaLabel: 'Thumbs down',
        });
    };
    NewComponent.prototype.onChangedTipoCorrespondencia = function (event) {
        var _this = this;
        if (event !== undefined) {
            var token = this._loginService.getToken();
            this._TipoCorrespondenciaService.show({ 'idTipoCorrespondencia': event }, token).subscribe(function (response) {
                response = response;
                if (response.status == 'success') {
                    _this.prohibicion = response.data.prohibicion;
                    _this.editable = response.data.editable;
                    _this.documento.vigencia = response.data.diasVigencia;
                }
                (function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
            });
        }
    };
    NewComponent.prototype.onFileChange = function (event) {
        if (event.target.files.length > 0) {
            var fileSelected = event.target.files[0];
            this.file = new FormData();
            this.file.append('file', fileSelected);
        }
    };
    NewComponent.prototype.onReadyCiudadano = function (ciudadano) {
        if (ciudadano === void 0) { ciudadano = null; }
        this.formNewCiudadano = false;
        this.formNewDocumento = true;
        if (ciudadano) {
            this.ciudadano = ciudadano;
        }
    };
    return NewComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewComponent.prototype, "ready", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewComponent.prototype, "onShow", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewComponent.prototype, "peticionario", void 0);
NewComponent = __decorate([
    core_1.Component({
        selector: 'app-new',
        templateUrl: './new.component.html'
    }),
    __metadata("design:paramtypes", [ciudadano_service_1.CiudadanoService,
        tipoIdentificacion_service_1.TipoIdentificacionService,
        gdRemitente_service_1.GdRemitenteService,
        gdCfgTipoCorrespondencia_service_1.GdCfgTipoCorrespondenciaService,
        gdCfgMedioCorrespondencia_service_1.GdCfgMedioCorrespondenciaService,
        gdDocumento_service_1.GdDocumentoService,
        clase_service_1.ClaseService,
        login_service_1.LoginService,
        router_1.Router])
], NewComponent);
exports.NewComponent = NewComponent;
//# sourceMappingURL=new.component.js.map