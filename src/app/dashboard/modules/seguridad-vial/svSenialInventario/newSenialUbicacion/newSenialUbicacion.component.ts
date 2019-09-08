import { Component, OnInit, Output, Input, EventEmitter, NgZone, ElementRef, ViewChild } from '@angular/core';
import { MouseEvent, MapsAPILoader } from '@agm/core';
import { SvSenialUbicacion } from './newSenialUbicacion.modelo';
import { SvSenialUbicacionService } from '../../../../../services/svSenialUbicacion.service';
import { SvCfgSenialService } from '../../../../../services/svCfgSenial.service';
import { SvCfgSenialEstadoService } from '../../../../../services/svCfgSenialEstado.service';
import { SvCfgSenialLineaService } from '../../../../../services/svCfgSenialLinea.service';
import { SvCfgSenialUnidadMedidaService } from '../../../../../services/svCfgSenialUnidadMedida.service';
import { SvSenialBodegaService } from '../../../../../services/svSenialBodega.service';
import { SvCfgSenialProveedorService } from '../../../../../services/svCfgSenialProveedor.service';
import { CfgMunicipioService } from '../../../../../services/cfgMunicipio.service';
import { LoginService } from '../../../../../services/login.service';
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
    @Output() mapReady: EventEmitter<any> = new EventEmitter<any>();
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
    public fileSelected: any = null;
    
    public formEdit = false;
    public formIndex = true;
    public senialUbicacion: SvSenialUbicacion;
    
    public address: any = null;
    public zoom: number = 15;
    public lat: number = 1.2246233;
    public lng: number = -77.2808208;
    public map: any;
    public markers: marker[] = [];
    public arrayDemarcaciones: any = [];
    public geocoder: any;
    public LatLng: any;

    public demarcacionNew = {
        'cantidad': null,
        'area': null,
        'ancho': null,
        'largo': null,
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
        private _MunicipioService: CfgMunicipioService,
        private _BodegaService: SvSenialBodegaService,
        private _ProveedorService: SvCfgSenialProveedorService,
        private _LoginService: LoginService,
        private __zone: NgZone
    ) {
        this.senialUbicacion = new SvSenialUbicacion(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    }

    ngOnInit() {
        swal({
            title: 'Cargando formulario!',
            text: 'Solo tardará unos segundos, por favor espere.',
            onOpen: () => {
                swal.showLoading();
            }
        });

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

        this._LineaService.select().subscribe(
            response => {
                if (response) {
                    this.lineas = response;
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

        this._MunicipioService.show({ 'id': this.datos.idMunicipio }, token).subscribe(
            response => {
                if(response.code == 200){
                    this.municipio = response.data;

                    if (this.datos.idTipoSenial != 1) {
                        this.address = this.municipio.nombre + ", Nariño";

                        let timeoutId = setTimeout(() => {
                            this.onSearchGeo();
                        }, 1000);
                    }

                    swal.close();

                }else{
                    this.municipio = null;

                    swal({
                        title: 'Error!',
                        text: 'No tiene proveedores registrados',
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

    initGeocoder() {
        this.geocoder = new google.maps.Geocoder();

        this.onSearchGeo();
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onChangedSenial(e) {
        if (e) {
            let token = this._LoginService.getToken();

            this._SenialService.show({ 'id': e }, token).subscribe(
                response => {
                    if (response.code == 200) {
                        this.senial = response.data;
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

    onChangedLinea() {
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
    }

    onCalcularTotalLinea() {
        let cantidad, ancho, largo;
        cantidad = this.demarcacionNew.cantidad;
        ancho = this.demarcacionNew.ancho;
        largo = this.demarcacionNew.largo;

        if (ancho == 0 || largo == 0 || cantidad == 0) {
            swal({
                title: 'Alerta!',
                text: 'El ancho de línea y/o el largo no pueden estar en 0',
                type: 'error',
                confirmButtonText: 'Aceptar'
            });
            this.demarcacionNew.total = 0;
        } else {
            this.demarcacionNew.total = (ancho * largo) * cantidad;
        }
    }

    onCalcularTotalArea() {
        let cantidad, area;
        cantidad = this.demarcacionNew.cantidad;
        area = this.demarcacionNew.area;

        if (cantidad == 0 || area == 0) {
            swal({
                title: 'Alerta!',
                text: 'La cantidad y/o area no pueden estar en 0',
                type: 'error',
                confirmButtonText: 'Aceptar'
            });
            this.demarcacionNew.total = 0;
        } else {
            this.demarcacionNew.total = cantidad * area;
        }
    }

    onAddDemarcacion() {
        this.arrayDemarcaciones.push(
            {
                'cantidad': this.demarcacionNew.cantidad,
                'ancho': this.demarcacionNew.ancho,
                'largo': this.demarcacionNew.largo,
                'area': this.demarcacionNew.area,
                'total': this.demarcacionNew.total,
                'tramoVial': this.demarcacionNew.tramoVial,
                'idLinea': this.senialUbicacion.idSenial,
                'idUnidadMedida': this.seniales.idUnidadMedida
            }
        );

        swal({
            title: 'Perfecto!',
            text: 'Demarcación agregada.',
            type: 'info',
            confirmButtonText: 'Aceptar'
        });

        this.demarcacionNew.cantidad = null;
        this.demarcacionNew.area = null;
        this.demarcacionNew.ancho = null;
        this.demarcacionNew.largo = null;
        this.demarcacionNew.total = null;
        this.demarcacionNew.tramoVial = null;
    }

    onRemoveDemarcacion(demarcacion) {
        this.arrayDemarcaciones = this.arrayDemarcaciones.filter(h => h !== demarcacion);
    }

    mapLoad(map) {
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

    mapClicked($event: MouseEvent) {
        if (this.senialUbicacion.cantidad > 0) {
            if (this.markers.length < this.senialUbicacion.cantidad) {
                this._SvSenialUbicacionService.getAddress($event.coords).subscribe(
                    result => {
                        this.__zone.run(() => {    
                            this.address = result;

                            this.markers.push({
                                lat: $event.coords.lat,
                                lng: $event.coords.lng,
                                draggable: true,
                                label: result + "<br>(" + this.senial.tipoSenial.nombre + ")" + "<br>(" + this.senial.nombre + ")"
                            });
                        });
                    },
                    error => console.log(error),
                    () => console.log('Geocoding completed!')
                );
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
        if (this.address) {
            this._SvSenialUbicacionService.getLatLng(this.address).subscribe(
                result => {
                    this.__zone.run(() => {    
                        this.lat = result.lat();
                        this.lng = result.lng();
                    });
                },
                error => console.log(error),
                () => console.log('Geocoding completed!')
            );
        }else{
            swal({
                title: 'Error!',
                text: 'La ubicación no ha sido diligenciada.',
                type: 'error',
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
                if (response.code == 200) {
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