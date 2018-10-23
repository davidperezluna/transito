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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var core_1 = require("@angular/core");
var comparendo_service_1 = require("../../services/comparendo.service");
var login_service_1 = require("../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var ComparendoComponent = (function () {
    function ComparendoComponent(_ComparendoService, _LoginService) {
        this._ComparendoService = _ComparendoService;
        this._LoginService = _LoginService;
        this.valido = true;
    }
    ComparendoComponent.prototype.ngOnInit = function () {
        var _this = this;
        sweetalert2_1.default({
            title: '¿Cual es la fuente del archivo?',
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'SSTTDN',
            cancelButtonText: 'SETRA DENAR'
        }).then(function (result) {
            if (result.value) {
                _this.ngAbrirInput(1);
            }
            else if (result.dismiss === sweetalert2_1.default.DismissReason.cancel) {
                _this.ngAbrirInput(0);
            }
        });
    };
    ComparendoComponent.prototype.ngAbrirInput = function (polca) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var files, reader_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sweetalert2_1.default({
                            title: 'Seleccione el atchivo .txt',
                            input: 'file',
                            inputAttributes: {
                                'accept': 'txt/*',
                                'aria-label': 'Upload your profile picture'
                            }
                        })];
                    case 1:
                        files = (_a.sent()).value;
                        if (files) {
                            this.txt = [];
                            reader_1 = new FileReader();
                            reader_1.readAsBinaryString(files);
                            reader_1.onload = function (e) {
                                var txt = reader_1.result;
                                var allTextLines = txt.split(/\r\n|\n/);
                                for (var i = 0; i < allTextLines.length; i++) {
                                    var data = allTextLines[i].split(',');
                                    if (data.length < 19) {
                                        _this.valido = false;
                                    }
                                    else {
                                        if (data[0] != '') {
                                            _this.txt.push(data);
                                        }
                                    }
                                }
                                if (_this.valido) {
                                    var token = _this._LoginService.getToken();
                                    _this._ComparendoService.setComparendoArchivo(_this.txt, polca, token).subscribe(function (response) {
                                        if (response.status == 'success') {
                                            sweetalert2_1.default('Archivo cargado con exito');
                                            console.log(response);
                                        }
                                    }, function (error) {
                                        _this.errorMessage = error;
                                        if (_this.errorMessage != null) {
                                            console.log(_this.errorMessage);
                                            alert("Error en la petición");
                                        }
                                    });
                                }
                                else {
                                    _this.valido = true;
                                    sweetalert2_1.default('Formato de archivo no valido');
                                    sweetalert2_1.default({
                                        title: 'Error',
                                        text: "Formato de archivo no valido!",
                                        type: 'error',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Subir otro archivo!'
                                    }).then(function (result) {
                                        if (result.value) {
                                            _this.ngOnInit();
                                        }
                                    });
                                }
                            };
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return ComparendoComponent;
}());
ComparendoComponent = __decorate([
    core_1.Component({
        selector: 'app-index',
        templateUrl: './comparendo.component.html'
    }),
    __metadata("design:paramtypes", [comparendo_service_1.ComparendoService,
        login_service_1.LoginService])
], ComparendoComponent);
exports.ComparendoComponent = ComparendoComponent;
//# sourceMappingURL=comparendo.component.js.map