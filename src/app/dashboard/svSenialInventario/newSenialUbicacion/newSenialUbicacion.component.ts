import { Component, OnInit, Output, Input, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { SvSenialUbicacionService } from '../../../services/svSenialUbicacion.service';
import { SvCfgSenialService } from '../../../services/svCfgSenial.service';
import { SvCfgSenialEstadoService } from '../../../services/svCfgSenialEstado.service';
import { SvCfgSenialLineaService } from '../../../services/svCfgSenialLinea.service';
import { SvCfgSenialUnidadMedidaService } from '../../../services/svCfgSenialUnidadMedida.service';
import { MunicipioService } from '../../../services/municipio.service';
import { SvSenialBodegaService } from '../../../services/svSenialBodega.service';
import { SvCfgSenialProveedorService } from '../../../services/svCfgSenialProveedor.service';
import { LoginService } from '../../../services/login.service';
import { SvSenialUbicacion } from './newSenialUbicacion.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-new-senial-municipio',
    styles: [`
        agm-map {
        height: 500px;
        }
    `],
    templateUrl: './newSenialUbicacion.component.html'
})
export class NewSenialUbicacionComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() datos: any = null;

    public file: any = new FormData();

    public errorMessage;

    public seniales: any;
    public bodegas: any = null;
    public proveedores: any = null;
    public estados: any;
    public unidadesMedida: any = null;
    public lineas: any = null;
    public demarcacion: boolean = false;

    public senial: any = null;
    public municipio: any = null;
    public address: any = null;

    public formEdit = false;
    public formIndex = true;
    public senialUbicacion: SvSenialUbicacion;
    
    public zoom: number = 15;
    public lat: number = 1.2246233;
    public lng: number = -77.2808208;
    public map: any;
    public markers: marker[] = [];
    public arrayDemarcaciones: any = [];

    public demarcacionNew = {
        'cantidad': null,
        'anchoLinea': null,
        'metraje': null,
        'total': null,
        'tramoVial': null,
        'idLinea': null,
        'idUnidadMedida': null
    }

    constructor(
        private _SvSenialUbicacionService: SvSenialUbicacionService,
        private _SenialService: SvCfgSenialService,
        private _EstadoService: SvCfgSenialEstadoService,
        private _LineaService: SvCfgSenialLineaService,
        private _UnidadMedidaService: SvCfgSenialUnidadMedidaService,
        private _MunicipioService: MunicipioService,
        private _BodegaService: SvSenialBodegaService,
        private _ProveedorService: SvCfgSenialProveedorService,
        private _LoginService: LoginService,
    ) {
        this.senialUbicacion = new SvSenialUbicacion(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
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

    onCancelar() {
        this.ready.emit(true);
    }

    onChangedSenial(e) {
        if (e) {
            let token = this._LoginService.getToken();

            this._SenialService.show({ 'id': e }, token).subscribe(
                response => {
                    if (response.status == 'success') {
                        this.senial = response.data;

                        if (this.senial.tipoSenial.id == 1) {
                            this._LineaService.select().subscribe(
                                response => {
                                    if (response) {
                                        this.lineas = response;
                                    } else {
                                        this.lineas = null;
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

                            this._UnidadMedidaService.select().subscribe(
                                response => {
                                    if (response) {
                                        this.unidadesMedida = response;
                                    } else {
                                        this.unidadesMedida = null;
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
                    } else {
                        swal({
                            title: 'Error!',
                            text: response.message,
                            type: 'error',
                            confirmButtonText: 'Aceptar'
                        });

                        this.senial = null;
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

            if (this.demarcacion) {
                this._ProveedorService.select().subscribe(
                    response => {
                        if (response) {
                            this.proveedores = response;
                        } else {
                            swal({
                                title: 'Error!',
                                text: 'No tiene proveedores registrados',
                                type: 'error',
                                confirmButtonText: 'Aceptar'
                            });

                            this.proveedores = null;
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
            } else {
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

                            this.bodegas = null;
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
    }

    onCalcularTotal() {
        let cantidad, anchoLinea, metraje;
        cantidad = this.demarcacionNew.cantidad;
        anchoLinea = this.demarcacionNew.anchoLinea;
        metraje = this.demarcacionNew.metraje;

        if (cantidad == 0 || anchoLinea == 0 || metraje == 0) {
            swal({
                title: 'Alerta!',
                text: 'La cantidad y/o el ancho de línea y/o  el metraje no pueden estar en 0',
                type: 'error',
                confirmButtonText: 'Aceptar'
            });
            this.demarcacionNew.total = 0;
        } else {
            this.demarcacionNew.total = cantidad * (anchoLinea * metraje);
        }
    }

    onAddDemarcacion() {
        this.arrayDemarcaciones.push(
            {
                'cantidad': this.demarcacionNew.cantidad,
                'anchoLinea': this.demarcacionNew.anchoLinea,
                'metraje': this.demarcacionNew.metraje,
                'total': this.demarcacionNew.total,
                'tramoVial': this.demarcacionNew.tramoVial,
                'idLinea': this.senialUbicacion.idSenial,
                'idUnidadMedida': this.seniales.idUnidadMedida
            }
        );
    }

    onRemoveDemarcacion(demarcacion) {
        this.arrayDemarcaciones = this.arrayDemarcaciones.filter(h => h !== demarcacion);
    }

    mapReady(map) {
        this.map = map;
    }

    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`)
    }

    onRightClick(index: number) {
        /*var marker = this.markers[index]; // find the marker by given id
        marker.setMap(null);*/
        //this.markers.splice(index, 1);
        console.log('clicked right the marker:'+this.markers[index]);
    }

    getAddressLocation($event, callback){
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ 'location': $event.coords }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    //let timeoutId = setTimeout(() => {
                        return callback(null, results[0].formatted_address);
                    //}, 1000);
                }else{
                    return callback('Sin resultados', null);
                }
            }
        });
    }

    getAddress(address) {
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                return results[0].geometry.location;
            } else {
                return null;
            }
        });
    }

    mapClicked($event: MouseEvent) {
        if (this.senialUbicacion.cantidad > 0) {
            var address;

            address = this.getAddressLocation($event, (error, result) => (error) ? console.error(error) : console.log(result));
            
            if (this.markers.length < this.senialUbicacion.cantidad) {
                this.markers.push({
                    lat: $event.coords.lat,
                    lng: $event.coords.lng,
                    draggable: true,
                    label: address
                });
            } else {
                swal({
                    title: 'Atención!',
                    text: 'El número de georeferenciaciones no puede ser mayor a la cantidad a asignar al municipio,',
                    type: 'warning',
                    confirmButtonText: 'Aceptar'
                });
            }
        }
    }

    markerDragEnd(m: marker, $event: MouseEvent) {
        console.log('dragEnd', m, $event);
    }

    onSearchGeo() {
        var address = document.getElementById('address')['value'];
        var LatLng;

        LatLng = this.getAddress(address);

        if (LatLng) {
            this.lat = Number(LatLng.lat());
            this.lng = Number(LatLng.lng());
        }else{
            swal({
                title: 'Atención!',
                text: 'La búsqueda no tuvo exito.',
                type: 'warning',
                confirmButtonText: 'Aceptar'
            });
        }
    }

    onEnviar() {
        let token = this._LoginService.getToken();

        this.senialUbicacion.idMunicipio = this.municipio.id;
        this.senialUbicacion.markers = this.markers;
        this.senialUbicacion.demarcaciones = this.arrayDemarcaciones;

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