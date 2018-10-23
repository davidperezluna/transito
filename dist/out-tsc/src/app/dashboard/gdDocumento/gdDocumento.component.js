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
var gdDocumento_service_1 = require("../../services/gdDocumento.service");
var login_service_1 = require("../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var GdDocumentoComponent = (function () {
    function GdDocumentoComponent(_DocumentoService, _loginService) {
        this._DocumentoService = _DocumentoService;
        this._loginService = _loginService;
        this.documentos = null;
        this.documentosPendientes = null;
        this.formNew = false;
        this.formEdit = false;
        this.formIndex = false;
        this.formPrint = false;
        this.formShow = false;
        this.formAssign = false;
        this.formSearch = true;
        this.table = null;
        this.peticionario = {
            'idTipoPeticionario': null,
            'identificacion': null,
            'entidadNombre': null,
            'numeroOficio': null
        };
    }
    GdDocumentoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.peticionario.idTipoPeticionario = 'Persona';
        if (this.table) {
            this.table.destroy();
        }
        this.formIndex = false;
        this.formNew = false;
        this.formEdit = false;
        this.formShow = false;
        this.formPrint = false;
        this.formAssign = false;
        this._DocumentoService.index().subscribe(function (response) {
            if (response.status == 'success') {
                _this.documentosPendientes = response.data;
                _this.formAssign = true;
                var timeoutId = setTimeout(function () {
                    _this.iniciarTabla();
                }, 100);
            }
            (function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        });
        sweetalert2_1.default({
            title: '<i>Para Tener En Cuenta</i>',
            type: 'info',
            html: '<p style="text-align:justify;"><b>- DERECHO DE PETICIÓN EN INTERÉS GENERAL Y PARTICULAR:</b>' +
                ' El que tiene toda persona para presentar solicitudes respetuosas ante las autoridades consagrado en el articulo' +
                '23 de la constitucion política como derecho fundamental. Termino de respuesta 15 días</p>' +
                '<p style="text-align:justify;"><b>- DERECHO DE PETICIÓN DE INFORMACIÓN:</b> Petición para que el funcionario de a conocer como ha actuado en un caso determinado o permita el ' +
                'examen de los documentos públicos o expida copia de los mismos. Termino para Resolver 10 días </p>',
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> OK!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
            cancelButtonAriaLabel: 'Thumbs down',
        });
    };
    GdDocumentoComponent.prototype.iniciarTabla = function () {
        $('#dataTables-example').DataTable({
            responsive: true,
            pageLength: 8,
            sPaginationType: 'full_numbers',
            oLanguage: {
                oPaginate: {
                    sFirst: '<<',
                    sPrevious: '<',
                    sNext: '>',
                    sLast: '>>'
                }
            }
        });
        this.table = $('#dataTables-example').DataTable();
    };
    GdDocumentoComponent.prototype.onNew = function () {
        this.formIndex = false;
        this.formEdit = false;
        this.formShow = false;
        this.formPrint = false;
        this.formAssign = false;
        this.formNew = true;
    };
    GdDocumentoComponent.prototype.onShow = function (documento) {
        this.documento = documento;
        this.formIndex = false;
        this.formNew = false;
        this.formEdit = false;
        this.formPrint = false;
        this.formAssign = false;
        this.formShow = true;
    };
    GdDocumentoComponent.prototype.onPrint = function (documento) {
        this.documento = documento;
        if (this.documento) {
            this.formIndex = false;
            this.formNew = false;
            this.formEdit = false;
            this.formShow = false;
            this.formAssign = false;
            this.formPrint = true;
        }
    };
    GdDocumentoComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            this.ngOnInit();
        }
    };
    GdDocumentoComponent.prototype.onReadyDocument = function (documento) {
        this.documento = documento;
        if (this.documento) {
            this.ngOnInit();
            this.formSearch = true;
        }
    };
    GdDocumentoComponent.prototype.onSearch = function () {
        var _this = this;
        sweetalert2_1.default({
            title: 'Buscando registros!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: function () {
                sweetalert2_1.default.showLoading();
            }
        });
        var token = this._loginService.getToken();
        this._DocumentoService.search(this.peticionario, token).subscribe(function (response) {
            if (response.status == 'success') {
                _this.ngOnInit();
                _this.formIndex = true;
                _this.formAssign = false;
                _this.documentos = response.data;
                if (_this.table) {
                    _this.table.destroy();
                }
                var timeoutId = setTimeout(function () {
                    _this.iniciarTabla();
                }, 100);
                sweetalert2_1.default({
                    title: 'Perfecto',
                    type: 'info',
                    text: response.message,
                    showCloseButton: true,
                });
            }
            else {
                sweetalert2_1.default({
                    title: 'Alerta',
                    type: 'warning',
                    text: response.message,
                    showCloseButton: true,
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
    GdDocumentoComponent.prototype.delete = function (id) {
        var _this = this;
        sweetalert2_1.default({
            title: '¿Estás seguro?',
            text: "¡Se eliminara este registro!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15d4be',
            cancelButtonColor: '#ff6262',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then(function (result) {
            if (result.value) {
                var token = _this._loginService.getToken();
                _this._DocumentoService.delete(token, id).subscribe(function (response) {
                    sweetalert2_1.default({
                        title: 'Eliminado!',
                        text: 'Registro eliminado correctamente.',
                        type: 'success',
                        confirmButtonColor: '#15d4be',
                    });
                    _this.table.destroy();
                    _this.ngOnInit();
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
            }
        });
    };
    GdDocumentoComponent.prototype.edit = function (documento) {
        this.documento = documento;
        this.formEdit = true;
    };
    return GdDocumentoComponent;
}());
GdDocumentoComponent = __decorate([
    core_1.Component({
        selector: 'app-index',
        templateUrl: './gdDocumento.component.html'
    }),
    __metadata("design:paramtypes", [gdDocumento_service_1.GdDocumentoService,
        login_service_1.LoginService])
], GdDocumentoComponent);
exports.GdDocumentoComponent = GdDocumentoComponent;
//# sourceMappingURL=gdDocumento.component.js.map