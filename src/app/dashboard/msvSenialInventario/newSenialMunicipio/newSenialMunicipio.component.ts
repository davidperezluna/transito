/// <reference types="@types/googlemaps" />
import { Component, OnInit, Output, Input, EventEmitter, ElementRef, ViewChild } from '@angular/core'; 
import { MsvSenialInventarioService } from '../../../services/msvSenialInventario.service';
import { MsvSenialService } from '../../../services/msvSenial.service';
import { CfgSvSenialEstadoService } from '../../../services/cfgSvSenialEstado.service';
import { CfgSvConectorService } from '../../../services/cfgSvConector.service';
import { MunicipioService } from '../../../services/municipio.service';
import { LoginService } from '../../../services/login.service';
import { MsvSenialMunicipio } from './newSenialMunicipio.modelo';
import swal from 'sweetalert2';
declare var $: any;
import { } from "googlemaps";
declare var google: any;

@Component({
    selector: 'app-new-senial-municipio',
    templateUrl: './newSenialMunicipio.component.html'
})
export class NewSenialMunicipioComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() tipoSenialSelected: any = null;
    @Input() municipioSelected: any = null;

    public file: any = new FormData();

    @ViewChild('map') mapRef: ElementRef;
    private map: google.maps.Map;
    private geocoder: google.maps.Geocoder;
    private scriptLoadingPromise: Promise<void>;

    public errorMessage;
    public id;
    public municipio: any = null;

    public seniales: any;
    public senialSelected: any;
    public senial: any = null;

    public conectores: any;
    public conectorSelected: any;

    public estados: any;
    public estadoSelected: any;

    public formEdit = false;
    public formIndex = true;
    public senialMunicipio: MsvSenialMunicipio;

    constructor(
        private _MsvSenialInventarioService: MsvSenialInventarioService,
        private _MsvSenialService: MsvSenialService,
        private _ConectorService: CfgSvConectorService,
        private _EstadoService: CfgSvSenialEstadoService,
        private _MunicipioService: MunicipioService,
        private _LoginService: LoginService,
    ) {
        //Loading script
        this.loadScriptLoadingPromise();
        //Loading other components
        this.onReady().then(() => {
            this.geocoder = new google.maps.Geocoder();
        });
     }

    ngOnInit() {   
        this.senialMunicipio = new MsvSenialMunicipio(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);

        let token = this._LoginService.getToken();

        this._MunicipioService.showMunicipio(token, this.municipioSelected).subscribe(
            response => {
                this.municipio = response.data;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        
        this._MsvSenialService.selectByTipoSenial({'idTipoSenial': this.tipoSenialSelected}, token).subscribe(
            response => {
                this.seniales = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );

        this._ConectorService.select().subscribe(
            response => {
                this.conectores = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );

        this._EstadoService.select().subscribe(
            response => {
                this.estados = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
    }
    
    onCancelar() {
        this.ready.emit(true);
    }

    onCloseGeo() {
        document.getElementById("geo")['style']['visibility'] = "hidden";
        document.getElementById("address")['style']['visibility'] = "hidden";
        document.getElementById("searchAddress")['style']['visibility'] = "hidden";
    }

    onGetAddress() {
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
    }

    onSearchGeo() {
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
            } else {
                alert('La búsqueda no tuvo éxito.');
            }
        });
    }

    onReady(): Promise<void> {
        return this.scriptLoadingPromise;
    }

    initMap(mapHtmlElement: HTMLElement, options: google.maps.MapOptions): Promise<google.maps.Map> {
        return this.onReady().then(() => {
            this.map = new google.maps.Map(mapHtmlElement, options);

            var marker = new google.maps.Marker({
                position: { lat: 4.624335, lng: -74.063644 },
                map: this.map,
                animation: google.maps.Animation.BOUNCE,
                draggable: true
            });

            //Obtiene las coordenadas cuando se realiza clic sobre el mapa
            google.maps.event.addListener(this.map, 'click', function (event) {
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

            return this.map;

        });
    }

    loadScriptLoadingPromise() {
        const script = window.document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        const callbackName: string = 'initMap';
        script.src = getScriptSrc(callbackName);
        this.scriptLoadingPromise = new Promise<void>((resolve: Function, reject: Function) => {
            (<any>window)[callbackName] = () => { resolve(); };

            script.onerror = (error: Event) => { reject(error); };
        });
        window.document.body.appendChild(script);
    }

    onEnviar() {
        let token = this._LoginService.getToken();

        this.senialMunicipio.idEstado = this.estadoSelected;
        this.senialMunicipio.idSenial= this.senialSelected;
        this.senialMunicipio.idConector = this.conectorSelected;
        this.senialMunicipio.idMunicipio = this.municipioSelected;
        this.senialMunicipio.idTipoSenial = this.tipoSenialSelected;

        this._MsvSenialInventarioService.registerSenialMunicipio(this.file, this.senialMunicipio, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.ready.emit(true);
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                }
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }

            }
        );
    }

    onFileChange(event) {
        if (event.target.files.length > 0) {
            const fileSelected: File = event.target.files[0];
            this.file.append('file', fileSelected);
        }
    }

    onChangeSenial(value) {
        if (value) {
            let token = this._LoginService.getToken();
    
            this._MsvSenialService.show({ 'idSenial': value }, token).subscribe(
                response => {
                    this.senial = response.data;
                    this.senialMunicipio.valor = this.senial.valor;
                },
                error => {
                    this.errorMessage = <any>error;
    
                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert('Error en la petición');
                    }
                }
            );
        }
    }
}



//Replace this by anything without an ID_KEY
const getScriptSrc = (callbackName) => {
    return `https://maps.googleapis.com/maps/api/js?key=AIzaSyCZLRPtun19mn3xqSZi08dPp-1R4P2A2B4&callback=${callbackName}`;
}