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
var empresa_service_1 = require("../../../services/empresa.service");
var login_service_1 = require("../../../services/login.service");
var sucursal_service_1 = require("../../../services/sucursal.service");
var municipio_service_1 = require("../../../services/municipio.service");
var tipoSociedad_service_1 = require("../../../services/tipoSociedad.service");
var sweetalert2_1 = require("sweetalert2");
var ShowComponent = (function () {
    function ShowComponent(_EmpresaService, _MunicipioService, _SucursalService, _TipoSociedadService, _loginService) {
        this._EmpresaService = _EmpresaService;
        this._MunicipioService = _MunicipioService;
        this._SucursalService = _SucursalService;
        this._TipoSociedadService = _TipoSociedadService;
        this._loginService = _loginService;
        this.ready = new core_1.EventEmitter();
        this.empresa = null;
        this.formListaSucursales = false;
        this.formNewSucursal = false;
        this.cargar = true;
    }
    ShowComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log(this.empresa);
        console.log(this.empresa);
        this._SucursalService.getSucursalEmpresa(this.empresa.id).subscribe(function (response) {
            if (response.status == "success") {
                _this.sucursales = response.data;
                _this.formListaSucursales = true;
            }
            else {
                _this.formNewSucursal = true;
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    ShowComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    ShowComponent.prototype.readySucursal = function (respuesta) {
        this.ngOnInit();
        this.formListaSucursales = false;
        this.formNewSucursal = false;
    };
    ShowComponent.prototype.onNewSucursal = function () {
        this.formListaSucursales = false;
        this.formNewSucursal = true;
    };
    ShowComponent.prototype.iniciarTabla = function () {
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
    ShowComponent.prototype.deleteSucursal = function (id) {
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
                _this._SucursalService.deleteSucursal(token, id).subscribe(function (response) {
                    sweetalert2_1.default({
                        title: 'Eliminado!',
                        text: 'Registro eliminado correctamente.',
                        type: 'success',
                        confirmButtonColor: '#15d4be',
                    });
                    // this.table.destroy();
                    _this.respuesta = response;
                    _this.formListaSucursales = false;
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
    return ShowComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ShowComponent.prototype, "ready", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ShowComponent.prototype, "empresa", void 0);
ShowComponent = __decorate([
    core_1.Component({
        selector: 'sucursal-show',
        templateUrl: './show.component.html'
    }),
    __metadata("design:paramtypes", [empresa_service_1.EmpresaService,
        municipio_service_1.MunicipioService,
        sucursal_service_1.SucursalService,
        tipoSociedad_service_1.TipoSociedadService,
        login_service_1.LoginService])
], ShowComponent);
exports.ShowComponent = ShowComponent;
//# sourceMappingURL=show.component.js.map