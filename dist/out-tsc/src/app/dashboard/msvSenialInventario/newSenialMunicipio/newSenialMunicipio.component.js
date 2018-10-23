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
/// <reference types="@types/googlemaps" />
var core_1 = require("@angular/core");
var msvSenialInventario_service_1 = require("../../../services/msvSenialInventario.service");
var msvSenial_service_1 = require("../../../services/msvSenial.service");
var cfgSvSenialEstado_service_1 = require("../../../services/cfgSvSenialEstado.service");
var cfgSvConector_service_1 = require("../../../services/cfgSvConector.service");
var municipio_service_1 = require("../../../services/municipio.service");
var login_service_1 = require("../../../services/login.service");
var newSenialMunicipio_modelo_1 = require("./newSenialMunicipio.modelo");
var sweetalert2_1 = require("sweetalert2");
var NewSenialMunicipioComponent = (function () {
    function NewSenialMunicipioComponent(_MsvSenialInventarioService, _MsvSenialService, _ConectorService, _EstadoService, _MunicipioService, _LoginService) {
        var _this = this;
        this._MsvSenialInventarioService = _MsvSenialInventarioService;
        this._MsvSenialService = _MsvSenialService;
        this._ConectorService = _ConectorService;
        this._EstadoService = _EstadoService;
        this._MunicipioService = _MunicipioService;
        this._LoginService = _LoginService;
        this.ready = new core_1.EventEmitter();
        this.tipoSenialSelected = null;
        this.municipioSelected = null;
        this.file = new FormData();
        this.municipio = null;
        this.senial = null;
        this.formEdit = false;
        this.formIndex = true;
        //Loading script
        this.loadScriptLoadingPromise();
        //Loading other components
        this.onReady().then(function () {
            _this.geocoder = new google.maps.Geocoder();
        });
    }
    NewSenialMunicipioComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.senialMunicipio = new newSenialMunicipio_modelo_1.MsvSenialMunicipio(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        var token = this._LoginService.getToken();
        this._MunicipioService.showMunicipio(token, this.municipioSelected).subscribe(function (response) {
            _this.municipio = response.data;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._MsvSenialService.selectByTipoSenial({ 'idTipoSenial': this.tipoSenialSelected }, token).subscribe(function (response) {
            _this.seniales = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._ConectorService.select().subscribe(function (response) {
            _this.conectores = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._EstadoService.select().subscribe(function (response) {
            _this.estados = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    NewSenialMunicipioComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    NewSenialMunicipioComponent.prototype.onCloseGeo = function () {
        document.getElementById("geo")['style']['visibility'] = "hidden";
        document.getElementById("address")['style']['visibility'] = "hidden";
        document.getElementById("searchAddress")['style']['visibility'] = "hidden";
    };
    NewSenialMunicipioComponent.prototype.onGetAddress = function () {
        this.initMap(this.mapRef.nativeElement, {
            center: { lat: 1.2246233, lng: -77.2808208 },
            zoom: 14,
            scrollwheel: true,
            disableDoubleClickZoom: false,
            rotateControl: true,
            scaleControl: true,
            disableDefaultUI: true,
            zoomControl: true,
            gestureHandling: 'greedy'
        });
        document.getElementById("geo")['style']['visibility'] = "visible";
        document.getElementById("address")['style']['visibility'] = "visible";
        document.getElementById("searchAddress")['style']['visibility'] = "visible";
        document.getElementById("map")['style']['pointer-events'] = "auto";
        document.getElementById("address").removeAttribute('readonly');
    };
    NewSenialMunicipioComponent.prototype.onSearchGeo = function () {
        var map = new google.maps.Map(this.mapRef.nativeElement, {
            center: { lat: 1.2246233, lng: -77.2808208 },
            zoom: 14,
            scrollwheel: true,
            disableDoubleClickZoom: false,
            rotateControl: true,
            scaleControl: true,
            disableDefaultUI: true,
            zoomControl: true,
            gestureHandling: 'greedy'
        });
        var geocoder = new google.maps.Geocoder();
        var address = document.getElementById('address')['value'];
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: map,
                    animation: google.maps.Animation.BOUNCE,
                    draggable: true
                });
                google.maps.event.addListener(map, 'click', function (event) {
                    var newLatLng = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
                    marker.setPosition(newLatLng);
                    document.getElementsByName("latitud")[0]['value'] = event.latLng.lat();
                    document.getElementsByName("longitud")[0]['value'] = event.latLng.lng();
                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({
                        'latLng': event.latLng
                    }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[0]) {
                                document.getElementById("address")['value'] = results[0].formatted_address;
                                document.getElementsByName("direccion")[0]['value'] = results[0].formatted_address;
                            }
                        }
                    });
                });
            }
            else {
                alert('La búsqueda no tuvo éxito.');
            }
        });
    };
    NewSenialMunicipioComponent.prototype.onReady = function () {
        return this.scriptLoadingPromise;
    };
    NewSenialMunicipioComponent.prototype.initMap = function (mapHtmlElement, options) {
        var _this = this;
        return this.onReady().then(function () {
            _this.map = new google.maps.Map(mapHtmlElement, options);
            var marker = new google.maps.Marker({
                position: { lat: 4.624335, lng: -74.063644 },
                map: _this.map,
                animation: google.maps.Animation.BOUNCE,
                draggable: true
            });
            //Obtiene las coordenadas cuando se realiza clic sobre el mapa
            google.maps.event.addListener(_this.map, 'click', function (event) {
                var newLatLng = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
                marker.setPosition(newLatLng);
                document.getElementsByName("latitud")[0]['value'] = event.latLng.lat();
                document.getElementsByName("longitud")[0]['value'] = event.latLng.lng();
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({
                    'latLng': event.latLng
                }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            document.getElementById("address")['value'] = results[0].formatted_address;
                            document.getElementsByName("direccion")[0]['value'] = results[0].formatted_address;
                        }
                    }
                });
            });
            return _this.map;
        });
    };
    NewSenialMunicipioComponent.prototype.loadScriptLoadingPromise = function () {
        var script = window.document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        var callbackName = 'initMap';
        script.src = getScriptSrc(callbackName);
        this.scriptLoadingPromise = new Promise(function (resolve, reject) {
            window[callbackName] = function () { resolve(); };
            script.onerror = function (error) { reject(error); };
        });
        window.document.body.appendChild(script);
    };
    NewSenialMunicipioComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._LoginService.getToken();
        this.senialMunicipio.idEstado = this.estadoSelected;
        this.senialMunicipio.idSenial = this.senialSelected;
        this.senialMunicipio.idConector = this.conectorSelected;
        this.senialMunicipio.idMunicipio = this.municipioSelected;
        this.senialMunicipio.idTipoSenial = this.tipoSenialSelected;
        this._MsvSenialInventarioService.registerSenialMunicipio(this.file, this.senialMunicipio, token).subscribe(function (response) {
            if (response.status == 'success') {
                _this.ready.emit(true);
                sweetalert2_1.default({
                    title: 'Perfecto!',
                    text: response.message,
                    type: 'success',
                    confirmButtonText: 'Aceptar'
                });
            }
            (function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        });
    };
    NewSenialMunicipioComponent.prototype.onFileChange = function (event) {
        if (event.target.files.length > 0) {
            var fileSelected = event.target.files[0];
            this.file.append('file', fileSelected);
        }
    };
    NewSenialMunicipioComponent.prototype.onChangeSenial = function (value) {
        var _this = this;
        if (value) {
            var token = this._LoginService.getToken();
            this._MsvSenialService.show({ 'idSenial': value }, token).subscribe(function (response) {
                _this.senial = response.data;
                _this.senialMunicipio.valor = _this.senial.valor;
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert('Error en la petición');
                }
            });
        }
    };
    return NewSenialMunicipioComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewSenialMunicipioComponent.prototype, "ready", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewSenialMunicipioComponent.prototype, "tipoSenialSelected", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewSenialMunicipioComponent.prototype, "municipioSelected", void 0);
__decorate([
    core_1.ViewChild('map'),
    __metadata("design:type", core_1.ElementRef)
], NewSenialMunicipioComponent.prototype, "mapRef", void 0);
NewSenialMunicipioComponent = __decorate([
    core_1.Component({
        selector: 'app-new-senial-municipio',
        templateUrl: './newSenialMunicipio.component.html'
    }),
    __metadata("design:paramtypes", [msvSenialInventario_service_1.MsvSenialInventarioService,
        msvSenial_service_1.MsvSenialService,
        cfgSvConector_service_1.CfgSvConectorService,
        cfgSvSenialEstado_service_1.CfgSvSenialEstadoService,
        municipio_service_1.MunicipioService,
        login_service_1.LoginService])
], NewSenialMunicipioComponent);
exports.NewSenialMunicipioComponent = NewSenialMunicipioComponent;
//Replace this by anything without an ID_KEY
var getScriptSrc = function (callbackName) {
    return "https://maps.googleapis.com/maps/api/js?key=AIzaSyCZLRPtun19mn3xqSZi08dPp-1R4P2A2B4&callback=" + callbackName;
};
//# sourceMappingURL=newSenialMunicipio.component.js.map