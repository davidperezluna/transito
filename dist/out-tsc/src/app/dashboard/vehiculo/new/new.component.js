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
var vehiculo_modelo_1 = require("../vehiculo.modelo");
var NewComponent = /** @class */ (function () {
    function NewComponent() {
        this.ready = new core_1.EventEmitter();
    }
    NewComponent.prototype.ngOnInit = function () {
        this.vehiculo = new vehiculo_modelo_1.Vehiculo(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    };
    NewComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    NewComponent.prototype.onEnviar = function () {
        console.log(this.vehiculo);
        swal({
            title: 'Eliminado!',
            text: 'Su registro ha sido eliminado.',
            type: 'success',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false
        });
        this.ready.emit(true);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NewComponent.prototype, "ready", void 0);
    NewComponent = __decorate([
        core_1.Component({
            selector: 'app-new',
            templateUrl: './new.component.html'
        }),
        __metadata("design:paramtypes", [])
    ], NewComponent);
    return NewComponent;
}());
exports.NewComponent = NewComponent;
//# sourceMappingURL=new.component.js.map