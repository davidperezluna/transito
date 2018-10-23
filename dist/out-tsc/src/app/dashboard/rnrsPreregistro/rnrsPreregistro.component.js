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
var rnrsRegistroRemolque_service_1 = require("../../services/rnrsRegistroRemolque.service");
var login_service_1 = require("../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var RnrsPreregistroComponent = (function () {
    function RnrsPreregistroComponent(_RegistroRemolqueService, _loginService) {
        this._RegistroRemolqueService = _RegistroRemolqueService;
        this._loginService = _loginService;
        this.formIndex = true;
        this.formNew = false;
        this.formEdit = false;
    }
    RnrsPreregistroComponent.prototype.ngOnInit = function () {
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
        this.formEdit = false;
        this.formNew = false;
        this._RegistroRemolqueService.index().subscribe(function (response) {
            console.log(response.data);
            _this.registrosRemolque = response.data;
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
    };
    RnrsPreregistroComponent.prototype.iniciarTabla = function () {
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
    RnrsPreregistroComponent.prototype.onNew = function () {
        this.formIndex = false;
        this.formNew = true;
        this.table.destroy();
    };
    RnrsPreregistroComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            this.formNew = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    };
    RnrsPreregistroComponent.prototype.editRemolque = function (registroRemolque) {
        this.registroRemolque = registroRemolque;
        this.formIndex = false;
        this.formEdit = true;
    };
    RnrsPreregistroComponent.prototype.deleteRemolque = function (id) {
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
                _this._RegistroRemolqueService.deleteRegistroRemolque(token, id).subscribe(function (response) {
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
    return RnrsPreregistroComponent;
}());
RnrsPreregistroComponent = __decorate([
    core_1.Component({
        selector: 'app-index',
        templateUrl: './rnrsPreregistro.component.html'
    }),
    __metadata("design:paramtypes", [rnrsRegistroRemolque_service_1.RegistroRemolqueService,
        login_service_1.LoginService])
], RnrsPreregistroComponent);
exports.RnrsPreregistroComponent = RnrsPreregistroComponent;
//# sourceMappingURL=rnrsPreregistro.component.js.map