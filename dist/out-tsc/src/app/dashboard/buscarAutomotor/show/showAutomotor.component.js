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
var login_service_1 = require("../../../services/login.service");
var vehiculo_service_1 = require("../../../services/vehiculo.service");
var tramiteSolicitud_service_1 = require("../../../services/tramiteSolicitud.service");
var ciudadanoVehiculo_service_1 = require("../../../services/ciudadanoVehiculo.service");
var ShowAutomotorComponent = (function () {
    function ShowAutomotorComponent(_loginService, _VehiculoService, _TramiteSolicitudService, _CiudadanoVehiculoService) {
        this._loginService = _loginService;
        this._VehiculoService = _VehiculoService;
        this._TramiteSolicitudService = _TramiteSolicitudService;
        this._CiudadanoVehiculoService = _CiudadanoVehiculoService;
        this.cerrarForm = new core_1.EventEmitter();
        this.regrabacionSerie = "NO";
        this.regrabacionMotor = "NO";
        this.regrabacionChasis = "NO";
        this.vehiculoMaquinaria = "Maquinaria";
        this.vehiculoPesado = "Pesado";
        this.oculto = false;
        this.isCiudadano = false;
        this.isEmpresa = false;
    }
    ShowAutomotorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pesado = false;
        this.maquinaria = false;
        var token = this._loginService.getToken();
        this.sedeOperativa = this.vehiculo.sedeOperativa.nombre;
        this.placa = this.vehiculo.placa.numero;
        if (this.vehiculo.estado == true) {
            this.estado = "Activo";
        }
        this._CiudadanoVehiculoService.showPropietarioByIdVehiculo(token, this.vehiculo.id).subscribe(function (response) {
            _this.numeroTarjeta = response.data.licenciaTransito;
        });
        /*this._TramiteSolicitudService.byIdVehiculo(token,this.vehiculo.id).subscribe(
          response=>{
            this.vehiculoDatosTramite = response.data;
                    
            this.vehiculoDatosTramite.forEach(element => {
              if(element.tramiteFactura.tramitePrecio.tramite.id == 22){
                  this.regrabacionMotor = "SI";
              }
              else if(element.tramiteFactura.tramitePrecio.tramite.id == 23){
                  this.regrabacionChasis = "SI";
              }
              else if(element.tramiteFactura.tramitePrecio.tramite.id == 9){
                  this.regrabacionSerie = "SI";
              }
            });
          }
        );*/
        this._VehiculoService.showVehiculoTipo(token, this.vehiculo.id).subscribe(function (response) {
            _this.tipoVehiculo = response.data;
            if (response.msj == _this.vehiculoPesado) {
                _this.numeroEjes = _this.tipoVehiculo.numeroEjes;
                _this.numeroFichas = "Carroceria: " + _this.tipoVehiculo.fichaTecnicaHomologacionCarroceria + "/Chasis: " + _this.tipoVehiculo.fichaTecnicaHomologacionChasis;
                _this.pesado = true;
            }
            else if (response.msj == _this.vehiculoMaquinaria) {
                _this.pesoBruto = _this.tipoVehiculo.tonelaje;
                _this.numeroEjes = _this.tipoVehiculo.numeroEjes;
                _this.maquinaria = true;
            }
        });
        this._CiudadanoVehiculoService.showCiudadanoVehiculoId(token, this.vehiculo.placa.numero).subscribe(function (response) {
            _this.propietariosVehiculo = response.data;
            _this.propietariosVehiculo.forEach(function (element) {
                if (element.ciudadano) {
                    _this.isCiudadano = true;
                }
                if (element.empresa) {
                    _this.isEmpresa = true;
                }
            });
        });
        this.numeroTarjeta = this.vehiculo.placa.numero;
        this.estadoTarjeta = this.vehiculo.placa.numero;
        this.acta = this.vehiculo.placa.numero;
        this.numeroActa = this.vehiculo.placa.numero;
        this.fechaDeclaracion = this.vehiculo.fechaManifiesto;
        this.declaracion = this.vehiculo.placa.numero;
        this.reposicion = this.vehiculo.placa.numero;
        this.origenRegistro = this.vehiculo.placa.numero;
        this.clase = this.vehiculo.clase.nombre;
        this.marca = this.vehiculo.linea.marca.nombre;
        this.linea = this.vehiculo.linea.nombre;
        this.modelo = this.vehiculo.modelo;
        this.color = this.vehiculo.color.nombre;
        this.tipoServicio = this.vehiculo.servicio.nombre;
        this.cilindraje = this.vehiculo.cilindraje;
        this.numeroSerie = this.vehiculo.serie;
        this.numeroMotor = this.vehiculo.motor;
        this.numeroChasis = this.vehiculo.chasis;
        this.combustible = this.vehiculo.combustible.nombre;
    };
    ShowAutomotorComponent.prototype.onCancelar = function () {
        this.cerrarForm.emit(false);
    };
    return ShowAutomotorComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ShowAutomotorComponent.prototype, "vehiculo", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ShowAutomotorComponent.prototype, "cerrarForm", void 0);
ShowAutomotorComponent = __decorate([
    core_1.Component({
        selector: 'app-vehiculo-show',
        templateUrl: './showAutomotor.component.html'
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        vehiculo_service_1.VehiculoService,
        tramiteSolicitud_service_1.TramiteSolicitudService,
        ciudadanoVehiculo_service_1.CiudadanoVehiculoService])
], ShowAutomotorComponent);
exports.ShowAutomotorComponent = ShowAutomotorComponent;
//# sourceMappingURL=showAutomotor.component.js.map