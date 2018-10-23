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
var rnmaPreregistro_modelo_1 = require("../rnmaPreregistro.modelo");
var rnmaPreregistro_service_1 = require("../../../services/rnmaPreregistro.service");
var color_service_1 = require("../../../services/color.service");
var carroceria_service_1 = require("../../../services/carroceria.service");
var linea_service_1 = require("../../../services/linea.service");
var combustible_service_1 = require("../../../services/combustible.service");
var marca_service_1 = require("../../../services/marca.service");
var vhloCfgTipoMaquinaria_service_1 = require("../../../services/vhloCfgTipoMaquinaria.service");
var vhloCfgTipoRodaje_service_1 = require("../../../services/vhloCfgTipoRodaje.service");
var vhloCfgTipoCabina_service_1 = require("../../../services/vhloCfgTipoCabina.service");
var vhloCfgClaseMaquinaria_service_1 = require("../../../services/vhloCfgClaseMaquinaria.service");
var vhloCfgOrigenRegistro_service_1 = require("../../../services/vhloCfgOrigenRegistro.service");
var vhloCfgEmpresaGps_service_1 = require("../../../services/vhloCfgEmpresaGps.service");
var vhloCfgCondicionIngreso_service_1 = require("../../../services/vhloCfgCondicionIngreso.service");
var vhloCfgSubpartidaArancelaria_service_1 = require("../../../services/vhloCfgSubpartidaArancelaria.service");
var mpersonalFuncionario_service_1 = require("../../../services/mpersonalFuncionario.service");
var login_service_1 = require("../../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var NewRegistroMaquinariaComponent = (function () {
    function NewRegistroMaquinariaComponent(_RegistroMaquinariaService, _LoginService, _LineaService, _ColorService, _TipoMaquinariaService, _TipoRodajeService, _TipoCabinaService, _ClaseMaquinariaService, _CondicionIngresoService, _MarcaService, _CarroceriaService, _CombustibleService, _OrigenRegistroService, _EmpresaGpsService, _SubpartidaArancelariaService, _FuncionarioService) {
        this._RegistroMaquinariaService = _RegistroMaquinariaService;
        this._LoginService = _LoginService;
        this._LineaService = _LineaService;
        this._ColorService = _ColorService;
        this._TipoMaquinariaService = _TipoMaquinariaService;
        this._TipoRodajeService = _TipoRodajeService;
        this._TipoCabinaService = _TipoCabinaService;
        this._ClaseMaquinariaService = _ClaseMaquinariaService;
        this._CondicionIngresoService = _CondicionIngresoService;
        this._MarcaService = _MarcaService;
        this._CarroceriaService = _CarroceriaService;
        this._CombustibleService = _CombustibleService;
        this._OrigenRegistroService = _OrigenRegistroService;
        this._EmpresaGpsService = _EmpresaGpsService;
        this._SubpartidaArancelariaService = _SubpartidaArancelariaService;
        this._FuncionarioService = _FuncionarioService;
        this.ready = new core_1.EventEmitter();
        this.lineas = null;
        this.clasesMaquinaria = null;
    }
    NewRegistroMaquinariaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.registroMaquinaria = new rnmaPreregistro_modelo_1.RnmaPreregistro(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        this._ColorService.select().subscribe(function (response) {
            _this.colores = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._MarcaService.getMarcaSelect().subscribe(function (response) {
            _this.marcas = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._CarroceriaService.getCarroceriaSelect().subscribe(function (response) {
            _this.carrocerias = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._CombustibleService.getCombustibleSelect().subscribe(function (response) {
            _this.combustibles = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._OrigenRegistroService.select().subscribe(function (response) {
            _this.origenesRegistro = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._CondicionIngresoService.select().subscribe(function (response) {
            _this.condicionesIngreso = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._EmpresaGpsService.select().subscribe(function (response) {
            _this.empresasGps = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._TipoMaquinariaService.select().subscribe(function (response) {
            _this.tiposMaquinaria = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._TipoRodajeService.select().subscribe(function (response) {
            _this.tiposRodaje = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._TipoCabinaService.select().subscribe(function (response) {
            _this.tiposCabina = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._SubpartidaArancelariaService.select().subscribe(function (response) {
            _this.subpartidasArancelarias = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    NewRegistroMaquinariaComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    NewRegistroMaquinariaComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._LoginService.getToken();
        var identity = this._LoginService.getIdentity();
        this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(function (response) {
            if (response.status == 'success') {
                _this.registroMaquinaria.idSedeOperativa = response.data.sedeOperativa.id;
            }
            else {
                sweetalert2_1.default({
                    title: 'Alerta!',
                    text: response.message,
                    type: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
            (function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert('Error en la petición');
                }
            });
        });
        var html = 'los datos de la maquinaria a ingresar son:<br>' +
            'Placa: <b>' + this.registroMaquinaria.placa + '</b><br>' +
            'Condicon ingreso: <b>' + this.registroMaquinaria.idCondicionIngreso + '</b><br>' +
            'Motor: <b>' + this.registroMaquinaria.motor + '</b><br>' +
            'Serie: <b>' + this.registroMaquinaria.serie + '</b><br>' +
            'Chasis: <b>' + this.registroMaquinaria.chasis + '</b><br>' +
            'Fecha ingreso: <b>' + this.registroMaquinaria.fechaIngreso + '</b><br>';
        sweetalert2_1.default({
            title: 'Preregistro de maquinaria!',
            type: 'warning',
            html: html,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> Crear!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText: '<i class="fa fa-thumbs-down"></i> No crear',
            cancelButtonAriaLabel: 'Thumbs down',
        }).then(function (result) {
            if (result.value) {
                _this._RegistroMaquinariaService.register(_this.registroMaquinaria, token).subscribe(function (response) {
                    if (response.status == 'success') {
                        _this.ready.emit(true);
                        sweetalert2_1.default({
                            title: 'Perfecto!',
                            text: response.message,
                            type: 'success',
                            confirmButtonText: 'Aceptar'
                        });
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
            }
            else if (
            // Read more about handling dismissals
            result.dismiss === sweetalert2_1.default.DismissReason.cancel) {
            }
        });
    };
    NewRegistroMaquinariaComponent.prototype.onChangedMarca = function (e) {
        var _this = this;
        if (e) {
            var token = this._LoginService.getToken();
            this._LineaService.searchByMarcaSelect({ 'idMarca': e }, token).subscribe(function (response) {
                _this.lineas = response;
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        }
    };
    NewRegistroMaquinariaComponent.prototype.onChangedTipoMaquinaria = function (e) {
        var _this = this;
        if (e) {
            var token = this._LoginService.getToken();
            this._ClaseMaquinariaService.searchByTipoMaquinariaSelect({ 'idTipoMaquinaria': e }, token).subscribe(function (response) {
                _this.clasesMaquinaria = response;
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        }
    };
    return NewRegistroMaquinariaComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRegistroMaquinariaComponent.prototype, "ready", void 0);
NewRegistroMaquinariaComponent = __decorate([
    core_1.Component({
        selector: 'app-new-rnmaRegistroMaquinaria',
        templateUrl: './new.component.html'
    }),
    __metadata("design:paramtypes", [rnmaPreregistro_service_1.RnmaPreregistroService,
        login_service_1.LoginService,
        linea_service_1.LineaService,
        color_service_1.ColorService,
        vhloCfgTipoMaquinaria_service_1.VhloCfgTipoMaquinariaService,
        vhloCfgTipoRodaje_service_1.VhloCfgTipoRodajeService,
        vhloCfgTipoCabina_service_1.VhloCfgTipoCabinaService,
        vhloCfgClaseMaquinaria_service_1.VhloCfgClaseMaquinariaService,
        vhloCfgCondicionIngreso_service_1.VhloCfgCondicionIngresoService,
        marca_service_1.MarcaService,
        carroceria_service_1.CarroceriaService,
        combustible_service_1.CombustibleService,
        vhloCfgOrigenRegistro_service_1.VhloCfgOrigenRegistroService,
        vhloCfgEmpresaGps_service_1.VhloCfgEmpresaGpsService,
        vhloCfgSubpartidaArancelaria_service_1.VhloCfgSubpartidaArancelariaService,
        mpersonalFuncionario_service_1.MpersonalFuncionarioService])
], NewRegistroMaquinariaComponent);
exports.NewRegistroMaquinariaComponent = NewRegistroMaquinariaComponent;
//# sourceMappingURL=new.component.js.map