"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
        /* Resposnsive Utility hide menu */
        if ($(window).width() >= 1440 && $('body').hasClass('no-menu-show') !== true) {
            if ($('body').hasClass('left-menu-only') === true) {
                $('body').removeClass('menuclose');
            }
            else if ($('body').hasClass('horizontal-menu') === true) {
                $('body').addClass('menuclose-right');
            }
            else {
                $('body').removeClass('menuclose ');
            }
        }
        else {
            if ($('body').hasClass('left-menu-only') === true) {
                $('body').addClass('menuclose');
            }
            else {
                $('body').addClass('menuclose ');
            }
        }
        /* Card fullscreeen button script */
        $('.fullscreen-btn').on('click', function () {
            $(this).closest('.full-screen-container').toggleClass('fullscreen');
            $('body').toggleClass('fullscreen');
        });
        $(window).on('resize', function () {
            if ($(window).width() >= 1440 && $('body').hasClass('no-menu-show') !== true) {
                $('body').removeClass('menuclose ');
            }
            else {
                $('body').addClass('menuclose menuclose-right');
            }
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map