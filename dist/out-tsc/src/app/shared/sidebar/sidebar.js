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
var login_service_1 = require("../../services/login.service");
//Menu Items
exports.ROUTES = [];
var SidebarComponent = (function () {
    function SidebarComponent(_LoginService) {
        this._LoginService = _LoginService;
        this.showMenu = '';
        this.showSubMenu = '';
        this.addActive = '';
        var identity = this._LoginService.getIdentity();
        this.nombreUsuario = identity.primerNombre + " " + identity.primerApellido;
    }
    SidebarComponent.prototype.ngOnInit = function () {
        /* Sparklines can also take their values from the first argument   passed to the sparkline() function */
        var myvalues2 = [
            10, 8, 5, 7, 4, 2, 8, 10, 8, 5, 6, 4, 1, 7, 4, 5, 8, 10, 8, 5, 6, 4, 4, 1, 7, 4, 5, 8, 10, 8, 5, 6, 4, 4
        ];
        $('.dynamicsparkline2').sparkline(myvalues2, { type: 'bar', width: '200px', height: '60', barColor: '#cccccc', barWidth: '3', barSpacing: 3 });
        /* Sparklines chart js  ends */
    };
    SidebarComponent.prototype.addExpandClass = function (element) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        }
        else {
            this.showMenu = element;
        }
    };
    SidebarComponent.prototype.addSubExpandClass = function (element) {
        if (element === this.showSubMenu) {
            this.showSubMenu = '0';
        }
        else {
            this.showSubMenu = element;
        }
    };
    SidebarComponent.prototype.addActiveMenu = function (element) {
        if (element === this.addActive) {
            this.addActive = '0';
        }
        else {
            this.addActive = element;
        }
    };
    return SidebarComponent;
}());
SidebarComponent = __decorate([
    core_1.Component({
        selector: 'app-sidebar-cmp',
        templateUrl: 'sidebar.html'
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService])
], SidebarComponent);
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=sidebar.js.map