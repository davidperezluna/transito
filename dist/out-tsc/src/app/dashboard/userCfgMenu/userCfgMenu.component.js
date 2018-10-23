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
var userCfgMenu_service_1 = require("../../services/userCfgMenu.service");
var login_service_1 = require("../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var UserCfgMenuComponent = (function () {
    function UserCfgMenuComponent(_UserCfgMenuService, _loginService) {
        this._UserCfgMenuService = _UserCfgMenuService;
        this._loginService = _loginService;
        this.menus = null;
        this.formNew = false;
        this.formEdit = false;
        this.formIndex = true;
    }
    UserCfgMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        sweetalert2_1.default({
            title: 'Cargando Tabla!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: function () {
                sweetalert2_1.default.showLoading();
            }
        });
        this._UserCfgMenuService.index().subscribe(function (response) {
            _this.menus = response.data;
            var timeoutId = setTimeout(function () {
                _this.iniciarTabla();
            }, 100);
            sweetalert2_1.default.close();
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    UserCfgMenuComponent.prototype.iniciarTabla = function () {
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
    UserCfgMenuComponent.prototype.onNew = function () {
        this.formNew = true;
        this.formIndex = false;
        this.table.destroy();
    };
    UserCfgMenuComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    };
    UserCfgMenuComponent.prototype.onDelete = function (id) {
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
                _this._UserCfgMenuService.delete({ 'id': id }, token).subscribe(function (response) {
                    sweetalert2_1.default({
                        title: 'Eliminado!',
                        text: 'Registro eliminado correctamente.',
                        type: 'success',
                        confirmButtonColor: '#15d4be',
                    });
                    _this.table.destroy();
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
    UserCfgMenuComponent.prototype.onEdit = function (menu) {
        this.menu = menu;
        this.formEdit = true;
        this.formIndex = false;
    };
    return UserCfgMenuComponent;
}());
UserCfgMenuComponent = __decorate([
    core_1.Component({
        selector: 'app-index',
        templateUrl: './UserCfgMenu.component.html'
    }),
    __metadata("design:paramtypes", [userCfgMenu_service_1.UserCfgMenuService,
        login_service_1.LoginService])
], UserCfgMenuComponent);
exports.UserCfgMenuComponent = UserCfgMenuComponent;
//# sourceMappingURL=userCfgMenu.component.js.map