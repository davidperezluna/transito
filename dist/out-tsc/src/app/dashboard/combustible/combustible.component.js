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
var combustible_service_1 = require("../../services/combustible.service");
var login_service_1 = require("../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var CombustibleComponent = /** @class */ (function () {
    function CombustibleComponent(_CombustibleService, _loginService) {
        this._CombustibleService = _CombustibleService;
        this._loginService = _loginService;
        this.formNew = false;
        this.formEdit = false;
        this.formIndex = true;
    }
    CombustibleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._CombustibleService.getCombustible().subscribe(function (response) {
            _this.combustibles = response.data;
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
    CombustibleComponent.prototype.iniciarTabla = function () {
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
    CombustibleComponent.prototype.onNew = function () {
        this.formNew = true;
        this.formIndex = false;
        this.table.destroy();
    };
    CombustibleComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    };
    CombustibleComponent.prototype.deleteCombustible = function (id) {
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
                _this._CombustibleService.deleteCombustible(token, id).subscribe(function (response) {
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
    CombustibleComponent.prototype.editCombustible = function (combustible) {
        this.combustible = combustible;
        this.formEdit = true;
        this.formIndex = false;
    };
    CombustibleComponent = __decorate([
        core_1.Component({
            selector: 'app-index',
            templateUrl: './combustible.component.html'
        }),
        __metadata("design:paramtypes", [combustible_service_1.CombustibleService,
            login_service_1.LoginService])
    ], CombustibleComponent);
    return CombustibleComponent;
}());
exports.CombustibleComponent = CombustibleComponent;
//# sourceMappingURL=combustible.component.js.map