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
var rnrsPreregistro_modelo_1 = require("../rnrsPreregistro.modelo");
var rnrsRegistroRemolque_service_1 = require("../../../services/rnrsRegistroRemolque.service");
var login_service_1 = require("../../../services/login.service");
var carroceria_service_1 = require("../../../services/carroceria.service");
var marca_service_1 = require("../../../services/marca.service");
var linea_service_1 = require("../../../services/linea.service");
var vhloCfgOrigenRegistro_service_1 = require("../../../services/vhloCfgOrigenRegistro.service");
var vhloCfgCondicionIngreso_service_1 = require("../../../services/vhloCfgCondicionIngreso.service");
var clase_service_1 = require("../../../services/clase.service");
var sweetalert2_1 = require("sweetalert2");
var NewRegistroRemolqueComponent = (function () {
    function NewRegistroRemolqueComponent(_RegistroRemolqueService, _loginService, _LineaService, _ClaseService, _MarcaService, _CarroceriaService, _OrigenRegistroService, _CondicionIngresoService) {
        this._RegistroRemolqueService = _RegistroRemolqueService;
        this._loginService = _loginService;
        this._LineaService = _LineaService;
        this._ClaseService = _ClaseService;
        this._MarcaService = _MarcaService;
        this._CarroceriaService = _CarroceriaService;
        this._OrigenRegistroService = _OrigenRegistroService;
        this._CondicionIngresoService = _CondicionIngresoService;
        this.ready = new core_1.EventEmitter();
        this.rodajes = [
            { 'value': "cilindros", 'label': "Cilindros" }, { 'value': "neumaticos", 'label': "Neumaticos" }
        ];
        this.tiposCabina = [
            { 'value': "no_aplica", 'label': "No aplica" }
        ];
    }
    NewRegistroRemolqueComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.registroRemolque = new rnrsPreregistro_modelo_1.RegistroRemolque(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        this._CarroceriaService.getCarroceriaSelect().subscribe(function (response) {
            _this.carrocerias = response;
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
        this._OrigenRegistroService.select().subscribe(function (response) {
            _this.origenRegistros = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._CondicionIngresoService.select().subscribe(function (response) {
            _this.condicionIngresos = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._ClaseService.getClaseSelect().subscribe(function (response) {
            _this.clases = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._LineaService.select().subscribe(function (response) {
            _this.lineas = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    NewRegistroRemolqueComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    NewRegistroRemolqueComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.registroRemolque.origenRegistroId = this.origenRegistroSelected;
        this.registroRemolque.condicionIngresoId = this.condicionIngresoSelected;
        this.registroRemolque.vehiculoCarroceriaId = this.carroceriaSelected;
        this.registroRemolque.vehiculoMarcaId = this.marcaSelected;
        this.registroRemolque.vehiculoClaseId = this.claseSelected;
        this.registroRemolque.numeroEjes = this.numeroEjes;
        this.registroRemolque.alto = this.alto;
        this.registroRemolque.largo = this.largo;
        this.registroRemolque.ancho = this.ancho;
        this.registroRemolque.numeroEjes = this.numeroEjes;
        this.registroRemolque.cargaUtil = this.cargaUtil;
        this.registroRemolque.pesoVacio = this.pesoVacio;
        this.registroRemolque.referencia = this.referencia;
        this.registroRemolque.numeroFth = this.numeroFth;
        this.registroRemolque.rut = this.rut;
        var html = 'los datos de la maquinaria a ingresar son:<br>' +
            'Placa: <b>' + this.registroRemolque.vehiculoPlaca + '</b><br>' +
            'Serie: <b>' + this.registroRemolque.vehiculoSerie + '</b><br>' +
            'Carga util: <b>' + this.registroRemolque.cargaUtil + '</b><br>' +
            'Peso vacio: <b>' + this.registroRemolque.pesoVacio + '</b><br>' +
            'Referencia: <b>' + this.registroRemolque.referencia + '</b><br>';
        'Ficha tecnica: <b>' + this.registroRemolque.numeroFth + '</b><br>' +
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
                    _this._RegistroRemolqueService.register(_this.registroRemolque, token).subscribe(function (response) {
                        _this.respuesta = response;
                        console.log(_this.respuesta);
                        if (_this.respuesta.status == 'success') {
                            _this.ready.emit(true);
                            sweetalert2_1.default({
                                title: 'Perfecto!',
                                text: 'Registro exitoso!',
                                type: 'success',
                                confirmButtonText: 'Aceptar'
                            });
                        }
                        else {
                            sweetalert2_1.default({
                                title: 'Error!',
                                text: 'El vehiculo ' + _this.registroRemolque.vehiculoPlaca + ' ya se encuentra registrado',
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
    NewRegistroRemolqueComponent.prototype.changedMarca = function (e) {
        var _this = this;
        if (this.marcaSelected) {
            var token = this._loginService.getToken();
            this._LineaService.searchByMarcaSelect(this.marcaSelected, token).subscribe(function (response) {
                if (response.data[0] != null) {
                    _this.lineas = response.data;
                }
                else {
                    _this.lineas = [];
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
    NewRegistroRemolqueComponent.prototype.changedDepartamento = function (e) {
        // if (this.marcaSelected) {
        //   let token = this._loginService.getToken()
        //     this._LineaService.searchByMarcaSelect(this.marcaSelected, token).subscribe(
        //       response => {
        //         console.log(response.data[0]);
        //         if (response.data[0] != null) {
        //           this.lineas = response.data;
        //         }else{
        //           this.lineas = [];
        //         }
        //       }, 
        //       error => { 
        //         this.errorMessage = <any>error;
        //         if(this.errorMessage != null){
        //           console.log(this.errorMessage);
        //           alert("Error en la petición");
        //         }
        //       }
        //     );
        // }
    };
    return NewRegistroRemolqueComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRegistroRemolqueComponent.prototype, "ready", void 0);
NewRegistroRemolqueComponent = __decorate([
    core_1.Component({
        selector: 'app-new',
        templateUrl: './new.component.html'
    }),
    __metadata("design:paramtypes", [rnrsRegistroRemolque_service_1.RegistroRemolqueService,
        login_service_1.LoginService,
        linea_service_1.LineaService,
        clase_service_1.ClaseService,
        marca_service_1.MarcaService,
        carroceria_service_1.CarroceriaService,
        vhloCfgOrigenRegistro_service_1.VhloCfgOrigenRegistroService,
        vhloCfgCondicionIngreso_service_1.VhloCfgCondicionIngresoService])
], NewRegistroRemolqueComponent);
exports.NewRegistroRemolqueComponent = NewRegistroRemolqueComponent;
//# sourceMappingURL=new.component.js.map