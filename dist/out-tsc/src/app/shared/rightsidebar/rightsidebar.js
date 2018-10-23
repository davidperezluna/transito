"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var RightsidebarComponent = (function () {
    function RightsidebarComponent() {
        this.showMenu = '';
        this.showSubMenu = '';
    }
    RightsidebarComponent.prototype.addExpandClass = function (element) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        }
        else {
            this.showMenu = element;
        }
    };
    RightsidebarComponent.prototype.addSubExpandClass = function (element) {
        if (element === this.showSubMenu) {
            this.showSubMenu = '0';
        }
        else {
            this.showSubMenu = element;
        }
    };
    RightsidebarComponent.prototype.ngOnInit = function () {
        /*cicular progress sidebar home page */
        $('.progress_profile').circleProgress({
            fill: { gradient: ['#2ec7cb', '#6c8bef'] },
            lineCap: 'butt'
        });
        /*cicular progress sidebar home page  ends */
    };
    return RightsidebarComponent;
}());
RightsidebarComponent = __decorate([
    core_1.Component({
        selector: 'app-rightsidebar-cmp',
        templateUrl: 'rightsidebar.html'
    })
], RightsidebarComponent);
exports.RightsidebarComponent = RightsidebarComponent;
//# sourceMappingURL=rightsidebar.js.map