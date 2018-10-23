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
var mpersonalHorario_modelo_1 = require("../mpersonalHorario.modelo");
var mpersonalHorario_service_1 = require("../../../services/mpersonalHorario.service");
var mpersonalFuncionario_service_1 = require("../../../services/mpersonalFuncionario.service");
var login_service_1 = require("../../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var TimeComponent = (function () {
    function TimeComponent(_HorarioService, _FuncionarioService, _loginService) {
        this._HorarioService = _HorarioService;
        this._FuncionarioService = _FuncionarioService;
        this._loginService = _loginService;
        this.ready = new core_1.EventEmitter();
        this.funcionario = null;
        this.horarios = null;
    }
    TimeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.horario = new mpersonalHorario_modelo_1.MpersonalHorario(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        var token = this._loginService.getToken();
        this._FuncionarioService.recordTimes(this.funcionario, token).subscribe(function (response) {
            _this.horarios = response.data;
            setTimeout(function () {
                _this.iniciarTabla();
            }, 100);
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    TimeComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    TimeComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.horario.funcionarioId = this.funcionario.id;
        this.semana = [];
        if (this.horario.lunes) {
            this.semana.push({ '1': 'Lunes' });
        }
        if (this.horario.martes) {
            this.semana.push({ '2': 'Martes' });
        }
        if (this.horario.miercoles) {
            this.semana.push({ 3: 'Miercoles' });
        }
        if (this.horario.jueves) {
            this.semana.push({ 4: 'Jueves' });
        }
        if (this.horario.viernes) {
            this.semana.push({ 5: 'Viernes' });
        }
        if (this.horario.sabado) {
            this.semana.push({ 6: 'Sabado' });
        }
        if (this.horario.domingo) {
            this.semana.push({ 0: 'Domingo' });
        }
        this.horario.dias = this.semana;
        this._HorarioService.register(this.horario, token).subscribe(function (response) {
            if (response.status == 'success') {
                if (_this.agregar == 'true') {
                    sweetalert2_1.default({
                        title: 'Perfecto!',
                        text: 'Registro exitoso!',
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                }
                else {
                    _this.ready.emit(true);
                    sweetalert2_1.default({
                        title: 'Perfecto!',
                        text: 'Registro exitoso!',
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                }
            }
            else {
                sweetalert2_1.default({
                    title: 'Error!',
                    text: 'El funcionario ya se encuentra registrado',
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
    TimeComponent.prototype.iniciarTabla = function () {
        $('#dataTables-example').DataTable({
            responsive: true,
            pageLength: 8,
            sPaginationType: 'full_numbers',
            dom: 'Bfrtip',
            buttons: [
                'pdf'
            ],
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
    return TimeComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TimeComponent.prototype, "ready", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TimeComponent.prototype, "funcionario", void 0);
TimeComponent = __decorate([
    core_1.Component({
        selector: 'app-time',
        templateUrl: './time.component.html'
    }),
    __metadata("design:paramtypes", [mpersonalHorario_service_1.MpersonalHorarioService,
        mpersonalFuncionario_service_1.MpersonalFuncionarioService,
        login_service_1.LoginService])
], TimeComponent);
exports.TimeComponent = TimeComponent;
//# sourceMappingURL=time.component.js.map