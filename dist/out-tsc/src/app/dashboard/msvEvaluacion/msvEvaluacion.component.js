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
var msvEvaluacion_service_1 = require("../../services/msvEvaluacion.service");
var empresa_service_1 = require("../../services/empresa.service");
var msvRevision_service_1 = require("../../services/msvRevision.service");
var login_service_1 = require("../../services/login.service");
var msvCategoria_service_1 = require("../../services/msvCategoria.service");
var sweetalert2_1 = require("sweetalert2");
var MsvEvaluacionComponent = (function () {
    function MsvEvaluacionComponent(_EvaluacionService, _EmpresaService, _RevisionService, _loginService, _MsvCategoriaService) {
        this._EvaluacionService = _EvaluacionService;
        this._EmpresaService = _EmpresaService;
        this._RevisionService = _RevisionService;
        this._loginService = _loginService;
        this._MsvCategoriaService = _MsvCategoriaService;
        this.formNew = false;
        this.formEdit = false;
        this.formIndex = true;
        this.newEmpresa = false;
        this.revisionNew = false;
        this.habilitarBotonRev = false;
        this.revisionMensaje = false;
        this.revisiones = false;
        this.resumen = {};
        this.datos = { 'parametro': null,
            'parametro2': null };
    }
    MsvEvaluacionComponent.prototype.ngOnInit = function () {
        var _this = this;
        sweetalert2_1.default({
            title: 'Cargando Tabla!',
            text: 'Solo tardara unos segundos por favor espere.',
            timer: 1500,
            onOpen: function () {
                sweetalert2_1.default.showLoading();
            }
        }).then(function (result) {
            if (
            // Read more about handling dismissals
            result.dismiss === sweetalert2_1.default.DismissReason.timer) {
            }
        });
        this._EvaluacionService.getEvaluacion().subscribe(function (response) {
            _this.msvEvaluaciones = response.data;
            var timeoutId = setTimeout(function () {
                _this.iniciarTabla();
            }, 100);
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._MsvCategoriaService.getCategoria().subscribe(function (response) {
            _this.msvCategorias = response.data;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    MsvEvaluacionComponent.prototype.iniciarTabla = function () {
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
    MsvEvaluacionComponent.prototype.onNew = function () {
        this.newEmpresa = true;
        this.table.destroy();
    };
    MsvEvaluacionComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formIndex = true;
            this.newEmpresa = false;
            this.revisionNew = false;
            this.ngOnInit();
        }
    };
    MsvEvaluacionComponent.prototype.deletemsvEvaluacion = function (id) {
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
                _this._EvaluacionService.deleteEvaluacion(token, id).subscribe(function (response) {
                    sweetalert2_1.default({
                        title: 'Eliminado!',
                        text: 'Registro eliminado correctamente.',
                        type: 'success',
                        confirmButtonColor: '#15d4be',
                    });
                    _this.table.destroy();
                    _this.respuesta = response;
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
    MsvEvaluacionComponent.prototype.onKeyValidateEvaluacion = function () {
        var _this = this;
        this.revisiones = [];
        sweetalert2_1.default({
            title: 'Buscando Empresa!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: function () {
                sweetalert2_1.default.showLoading();
            }
        }).then(function (result) {
            if (
            // Read more about handling dismissals
            result.dismiss === sweetalert2_1.default.DismissReason.timer) {
            }
        });
        this.revisionMensaje = false;
        this.revisionNew = false;
        var token = this._loginService.getToken();
        this._EmpresaService.showNitOrNombre(token, this.datos).subscribe(function (response) {
            //console.log(response.data);
            if (response.code == 200) {
                _this.msj = response.msj;
                _this.isError = false;
                _this.empresas = response.data;
                _this.empresas.forEach(function (element) {
                    if (element.nombre == _this.datos.parametro) {
                        _this.miEmpresa = element;
                    }
                });
                if (_this.miEmpresa) {
                    _this.habilitarBotonRev = true;
                    console.log(_this.miEmpresa);
                }
                _this._RevisionService.showRevision(token, _this.miEmpresa.id).subscribe(function (response) {
                    if (response.code == 200) {
                        _this.msj = response.msj;
                        _this.isError = false;
                        _this.revisiones = response.data;
                        _this.isExist = true;
                        sweetalert2_1.default.close();
                    }
                    //si no existe revision coloca en true la variable para mostrar mensaje
                    if (_this.revisiones == false) {
                        _this.revisionMensaje = true;
                    }
                    (function (error) {
                        _this.errorMessage = error;
                        if (_this.errorMessage != null) {
                            console.log(_this.errorMessage);
                            alert("Error en la petición");
                        }
                    });
                });
                _this.isExist = true;
                sweetalert2_1.default.close();
            }
            if (response.code == 401) {
                _this.msj = response.msj;
                _this.isError = true;
                _this.isExist = false;
                sweetalert2_1.default.close();
            }
            if (response.code == 400) {
                _this.msj = response.msj;
                _this.isError = true;
                _this.isExist = false;
                sweetalert2_1.default.close();
            }
            (function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        });
        //let $empresaid = 
    };
    MsvEvaluacionComponent.prototype.onKeyValidateRevision = function () {
        var _this = this;
        sweetalert2_1.default({
            title: 'Buscando Fechas de Revisión!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: function () {
                sweetalert2_1.default.showLoading();
            }
        }).then(function (result) {
            if (
            // Read more about handling dismissals
            result.dismiss === sweetalert2_1.default.DismissReason.timer) {
            }
        });
        var token = this._loginService.getToken();
        console.log(this.miEmpresa.id);
        this._RevisionService.showRevision(token, this.miEmpresa.id).subscribe(function (response) {
            console.log(response.data);
            if (response.code == 200) {
                _this.msj = response.msj;
                _this.isError = false;
                _this.isExist = true;
                _this.revisiones = response.data;
                sweetalert2_1.default.close();
            }
            if (response.code == 401) {
                _this.msj = response.msj;
                _this.isError = true;
                _this.isExist = false;
                sweetalert2_1.default.close();
            }
            if (response.code == 400) {
                _this.msj = response.msj;
                _this.isError = true;
                _this.isExist = false;
                sweetalert2_1.default.close();
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
    MsvEvaluacionComponent.prototype.onNewRevision = function () {
        this.revisionNew = true;
    };
    MsvEvaluacionComponent.prototype.editmsvEvaluacion = function (msvEvaluacion) {
        this.msvEvaluacion = msvEvaluacion;
        this.formEdit = true;
        this.formIndex = false;
    };
    return MsvEvaluacionComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], MsvEvaluacionComponent.prototype, "msvCategoria", void 0);
MsvEvaluacionComponent = __decorate([
    core_1.Component({
        selector: 'app-index',
        templateUrl: './msvEvaluacion.component.html'
    }),
    __metadata("design:paramtypes", [msvEvaluacion_service_1.MsvEvaluacionService,
        empresa_service_1.EmpresaService,
        msvRevision_service_1.MsvRevisionService,
        login_service_1.LoginService,
        msvCategoria_service_1.MsvCategoriaService])
], MsvEvaluacionComponent);
exports.MsvEvaluacionComponent = MsvEvaluacionComponent;
//# sourceMappingURL=msvEvaluacion.component.js.map