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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var clase_service_1 = require("../../services/clase.service");
var login_service_1 = require("../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var ClaseComponent = /** @class */ (function () {
    function ClaseComponent(_ClaseService, _loginService) {
        this._ClaseService = _ClaseService;
        this._loginService = _loginService;
        this.formNew = false;
        this.formEdit = false;
        this.formIndex = true;
    }
    ClaseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._ClaseService.getClase().subscribe(function (response) {
            _this.clases = response.data;
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
    ClaseComponent.prototype.iniciarTabla = function () {
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
    ClaseComponent.prototype.onNew = function () {
        this.formNew = true;
        this.formIndex = false;
        this.table.destroy();
    };
    ClaseComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    };
    ClaseComponent.prototype.deleteClase = function (id) {
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
                _this._ClaseService.deleteClase(token, id).subscribe(function (response) {
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
    ClaseComponent.prototype.editClase = function (clase) {
        this.clase = clase;
        this.formEdit = true;
        this.formIndex = false;
    };
    ClaseComponent = __decorate([
        core_1.Component({
            selector: 'app-index',
            templateUrl: './clase.component.html'
        }),
        __metadata("design:paramtypes", [clase_service_1.ClaseService,
            login_service_1.LoginService])
    ], ClaseComponent);
    return ClaseComponent;
}());
exports.ClaseComponent = ClaseComponent;
//# sourceMappingURL=clase.component.js.map