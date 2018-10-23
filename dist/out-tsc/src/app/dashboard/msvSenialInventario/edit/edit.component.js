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
var cfgPlaca_service_1 = require("../../../services/cfgPlaca.service");
var login_service_1 = require("../../../services/login.service");
var EditComponent = (function () {
    // public tipoIdentificacion: Array<any>
    function EditComponent(_CfgPlacaService, _loginService) {
        this._CfgPlacaService = _CfgPlacaService;
        this._loginService = _loginService;
        this.ready = new core_1.EventEmitter();
        this.talonario = null;
        this.sedeOperativaSuccess = false;
        this.talonarioReady = false;
        this.validado = false;
        this.sedeOperativaReady = false;
        //   this.tipoIdentificacion = [
        //     {value: 'CC', label: 'Cédula de ciudadanía'},
        //     {value: 'TE', label: 'Tarjeta de extranjería'},
        //     {value: 'CE', label: 'Cédula de extranjería'},
        //     {value: 'P', label: 'Pasaporte'},
        // ];
    }
    EditComponent.prototype.ngOnInit = function () {
        /*this._sedeOperativaService.getSedeOperativaSelect().subscribe(
          response => {
            this.sedesOperativas = response;
            setTimeout(() => {
              this.sedeOperativaSelected = [this.talonario.sedeOperativa.id];
            });
          },
          error => {
            this.errorMessage = <any>error;
    
            if (this.errorMessage != null) {
              console.log(this.errorMessage);
              alert("Error en la petición");
            }
          }
        );
      }
    
    
      onCancelar() {
        this.ready.emit(true);
      }
    
      onEnviar() {
        let token = this._loginService.getToken();
        this.talonario.sedeOperativaId = this.sedeOperativaSelected;
        this._msvTalonarioService.register(this.talonario, token).subscribe(
          response => {
            //console.log(response);
            this.respuesta = response;
            console.log(this.respuesta);
            if (this.respuesta.status == 'success') {
              this.ready.emit(true);
              swal({
                title: 'Perfecto!',
                text: 'El registro se ha modificado con exito',
                type: 'success',
                confirmButtonText: 'Aceptar'
              })
            }
            error => {
              this.errorMessage = <any>error;
    
              if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
    
          });
      }
    
      onCalcularTotal() {
        let ini, fin, total;
    
        ini = this.talonario.rangoini;
        fin = this.talonario.rangofin;
        total = (fin - ini);
    
        if (total < 0) {
          total = 0;
        }
        this.talonario.total = total;
    
      }
    
      changedSedeOperativa(e) {
    
        this.validado = false;
        if (e) {
          let token = this._loginService.getToken();
          this._sedeOperativaService.showSedeOperativa(token, e).subscribe(
            response => {
              this.sedeOperativa = response;
              this.sedeOperativaReady = true;
              //          this.msvTalonario.rangoini = this.sedeOperativa.data.
              //this.comparendo.numeroOrden = this.sedeOperativa.data.codigoDivipo;
              console.log(this.sedeOperativa);
            },
            error => {
              this.errorMessage = <any>error;
    
              if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );
    
          this._msvTalonarioService.showMsvTalonarioPorSedeOperativa(token, e).subscribe(
            response => {
              this.sedeOperativaSuccess = true;
              if (response.status == "success") {
    
                this.talonario = response.data;
    
                this.talonarioReady = true;
                this.talonario.fechaAsignacion = this.talonario.fechaAsignacion;
    
                //this.comparendo.numeroOrden = this.sedeOperativa.data.codigoDivipo;
                console.log(this.talonario);
              }
              else if (response.status == "vacio") {
                this.talonario = new MsvTalonario(0, 0, 0, "", "", 0);
              }
            },
            error => {
              this.errorMessage = <any>error;
    
              if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );
        }*/
    };
    return EditComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], EditComponent.prototype, "ready", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditComponent.prototype, "talonario", void 0);
EditComponent = __decorate([
    core_1.Component({
        selector: 'app-edit',
        templateUrl: './edit.component.html'
    }),
    __metadata("design:paramtypes", [cfgPlaca_service_1.CfgPlacaService,
        login_service_1.LoginService])
], EditComponent);
exports.EditComponent = EditComponent;
//# sourceMappingURL=edit.component.js.map