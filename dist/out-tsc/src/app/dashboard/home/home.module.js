"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var home_component_1 = require("./home.component");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var ng2_charts_1 = require("ng2-charts");
var home_component_2 = require("./home.component");
var HomeModule = (function () {
    function HomeModule() {
    }
    return HomeModule;
}());
HomeModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, ng2_charts_1.ChartsModule, ng2_bootstrap_1.Ng2BootstrapModule.forRoot()],
        declarations: [home_component_1.HomeComponent, home_component_2.TimelineComponent, home_component_2.ChatComponent, home_component_2.NotificationComponent, home_component_2.LineChartComponent],
        exports: [home_component_1.HomeComponent, home_component_2.TimelineComponent, home_component_2.ChatComponent, home_component_2.NotificationComponent, home_component_2.LineChartComponent]
    })
], HomeModule);
exports.HomeModule = HomeModule;
//# sourceMappingURL=home.module.js.map