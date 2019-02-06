import { Component, OnInit, Output, Input, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { SvSenialUbicacionService } from '../../../services/svSenialUbicacion.service';
import { SvCfgSenialService } from '../../../services/svCfgSenial.service';
import { SvCfgSenialEstadoService } from '../../../services/svCfgSenialEstado.service';
import { SvCfgSenialConectorService } from '../../../services/svCfgSenialConector.service';
import { MunicipioService } from '../../../services/municipio.service';
import { SvSenialBodegaService } from '../../../services/svSenialBodega.service';
import { LoginService } from '../../../services/login.service';
import { SvSenialUbicacion } from './newSenialUbicacion.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-new-senial-municipio',
    templateUrl: './newSenialUbicacion.component.html'
})
export class NewSenialUbicacionComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() datos: any = null;

    public file: any = new FormData();

    public errorMessage;

    public seniales: any;
    public bodegas: any;
    public estados: any;

    public senial: any = null;
    public municipio: any = null;

    public formEdit = false;
    public formIndex = true;
    public senialUbicacion: SvSenialUbicacion;

    zoom: number = 15;
    lat: number = 1.2246233;
    lng: number = -77.2808208;

    markers: marker[] = [
        {
            lat: 51.673858,
            lng: 7.815982,
            label: 'A',
            draggable: true
        },
        {
            lat: 51.373858,
            lng: 7.215982,
            label: 'B',
            draggable: false
        },
        {
            lat: 51.723858,
            lng: 7.895982,
            label: 'C',
            draggable: true
        }
    ]

    public data = {
        'senialUbicacion':null,
        'markers':[]
    }

    constructor(
        private _SvSenialUbicacionService: SvSenialUbicacionService,
        private _SenialService: SvCfgSenialService,
        private _EstadoService: SvCfgSenialEstadoService,
        private _MunicipioService: MunicipioService,
        private _BodegaService: SvSenialBodegaService,
        private _LoginService: LoginService,
    ) {
        this.senialUbicacion = new SvSenialUbicacion(null, null, null, null, null, null, null, null, null);
    }

    ngOnInit() {
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

        let token = this._LoginService.getToken();

        this._SenialService.selectByTipo({ 'idTipoSenial': this.datos.idTipoSenial }, token).subscribe(
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

        this._MunicipioService.showMunicipio(token, this.datos.idMunicipio).subscribe(
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
    }

    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`)
    }

    mapClicked($event: MouseEvent) {
        this.markers.push({
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            draggable: true
        });
    }

    markerDragEnd(m: marker, $event: MouseEvent) {
        console.log('dragEnd', m, $event);
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onChangedSenial(e) {
        if (e) {
            let token = this._LoginService.getToken();

            this._BodegaService.selectProveedorBySenial({ 'idSenial': e }, token).subscribe(
                response => {
                    if (response) {
                        this.bodegas = response;
                    } else {
                        swal({
                            title: 'Error!',
                            text: 'No tiene existencias en bodega para esa señal',
                            type: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                    }
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
    }

    onSearchGeo() {
        /*var geocoder = new google.maps.Geocoder();
        var address = document.getElementById('address')['value'];
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                this.map.setCenter(results[0].geometry.location);

                google.maps.event.addListener(this.map, 'click', function (event) {
                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({
                        'latLng': event.latLng
                    }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[0]) {
                                //results[0].formatted_address;
                            }
                        }
                    });

                });
            } else {
                swal({
                    title: 'Atención!',
                    text: 'La búsqueda no tuvo exito.',
                    type: 'warning',
                    confirmButtonText: 'Aceptar'
                });
            }
        });*/
    }

    onEnviar() {
        let token = this._LoginService.getToken();

        this.senialUbicacion.idMunicipio = this.municipio.id;

        this._SvSenialUbicacionService.register(this.file, this.senialUbicacion, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.ready.emit(true);
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                } else {
                    swal({
                        title: 'Error!',
                        text: response.message,
                        type: 'error',
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
}

// just an interface for type safety.
interface marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}