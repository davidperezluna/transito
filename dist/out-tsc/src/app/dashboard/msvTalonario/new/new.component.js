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
var msvTalonario_service_1 = require("../../../services/msvTalonario.service");
var login_service_1 = require("../../../services/login.service");
var sedeOperativa_service_1 = require("../../../services/sedeOperativa.service");
var sweetalert2_1 = require("sweetalert2");
var msvTalonario_modelo_1 = require("../msvTalonario.modelo");
var NewComponent = (function () {
    function NewComponent(_msvTalonarioService, _loginService, _sedeOperativaService) {
        this._msvTalonarioService = _msvTalonarioService;
        this._loginService = _loginService;
        this._sedeOperativaService = _sedeOperativaService;
        this.ready = new core_1.EventEmitter();
        this.formNew = false;
        this.formN = false;
        this.formEdit = false;
        this.comparendoForm = false;
        this.formIndex = true;
        this.table = null;
        this.sedeOperativaSuccess = false;
        this.validado = false;
        this.sedeOperativaReady = false;
        this.msvTalonarioReady = false;
    }
    NewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.msvTalonario = new msvTalonario_modelo_1.MsvTalonario(null, null, null, null, null, null);
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
        this._sedeOperativaService.getSedeOperativaSelect().subscribe(function (response) {
            _this.sedesOperativas = response;
            _this.sedeOperativaSuccess = false;
            _this.formN = true;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    NewComponent.prototype.iniciarTabla = function () {
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
    NewComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    NewComponent.prototype.onNew = function () {
        this.formNew = false;
        this.formN = false;
        this.formIndex = false;
        if (this.table) {
            this.table.destroy();
        }
    };
    NewComponent.prototype.myFunc = function () {
        console.log("asd");
    };
    NewComponent.prototype.onCalcularTotal = function () {
        var ini, fin, total;
        ini = this.msvTalonario.rangoini;
        fin = this.msvTalonario.rangofin;
        total = (fin - ini);
        if (total < 0) {
            total = 0;
        }
        this.msvTalonario.total = total;
    };
    /*ready(isCreado: any) {
      if (isCreado) {
        this.formNew = false;
        this.formN = false;
        this.formEdit = false;
        this.formIndex = false;
        this.ngOnInit();
      }
    }*/
    NewComponent.prototype.deleteMsvTalonario = function (id) {
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
                _this._msvTalonarioService.deleteMsvTalonario(token, id).subscribe(function (response) {
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
    NewComponent.prototype.editMsvTalonario = function (msvTalonario) {
        this.msvTalonario = msvTalonario;
        this.formEdit = true;
        this.formIndex = false;
    };
    NewComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.msvTalonario.rangoini = this.msvTalonario.rangoini;
        this.msvTalonario.rangofin = this.msvTalonario.rangofin;
        this.msvTalonario.total = this.msvTalonario.total;
        this.msvTalonario.fechaAsignacion = this.msvTalonario.fechaAsignacion;
        this.msvTalonario.nResolucion = this.msvTalonario.nResolucion;
        this.msvTalonario.sedeOperativaId = this.sedeOperativaSelected;
        this._msvTalonarioService.register(this.msvTalonario, token).subscribe(function (response) {
            //console.log(response);
            _this.respuesta = response;
            console.log(_this.respuesta);
            if (_this.respuesta.status == 'success') {
                _this.ready.emit(true);
                sweetalert2_1.default({
                    title: 'Perfecto!',
                    text: 'El registro se ha agregado con exito',
                    type: 'success',
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
    NewComponent.prototype.changedSedeOperativa = function (e) {
        var _this = this;
        this.validado = false;
        if (e) {
            var token = this._loginService.getToken();
            this._sedeOperativaService.showSedeOperativa(token, e).subscribe(function (response) {
                _this.sedeOperativa = response;
                _this.sedeOperativaReady = true;
                //          this.msvTalonario.rangoini = this.sedeOperativa.data.
                //this.comparendo.numeroOrden = this.sedeOperativa.data.codigoDivipo;
                console.log(_this.sedeOperativa);
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
            this._msvTalonarioService.showMsvTalonarioPorSedeOperativa(token, e).subscribe(function (response) {
                _this.sedeOperativaSuccess = true;
                if (response.status == "success") {
                    _this.msvTalonario = response.data;
                    _this.msvTalonarioReady = true;
                    _this.msvTalonario.fechaAsignacion = _this.msvTalonario.fechaAsignacion;
                    //this.comparendo.numeroOrden = this.sedeOperativa.data.codigoDivipo;
                    console.log(_this.msvTalonario);
                }
                else if (response.status == "vacio") {
                    _this.msvTalonario = new msvTalonario_modelo_1.MsvTalonario(0, 0, 0, "", "", 0);
                }
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        }
    };
    return NewComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewComponent.prototype, "ready", void 0);
NewComponent = __decorate([
    core_1.Component({
        selector: 'app-new',
        templateUrl: './new.component.html'
    }),
    __metadata("design:paramtypes", [msvTalonario_service_1.MsvTalonarioService,
        login_service_1.LoginService,
        sedeOperativa_service_1.SedeOperativaService])
], NewComponent);
exports.NewComponent = NewComponent;
//# sourceMappingURL=new.component.js.map