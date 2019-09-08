import { Component, OnInit, Output, Input, EventEmitter, NgZone, ElementRef, ViewChild } from '@angular/core';
import { MouseEvent, MapsAPILoader } from '@agm/core';
import { SvSenialInventarioService } from '../../../../../services/svSenialInventario.service';
import { SvSenialUbicacionService } from '../../../../../services/svSenialUbicacion.service';
import { CfgMunicipioService } from '../../../../../services/cfgMunicipio.service';
import { LoginService } from '../../../../../services/login.service';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-record',
    styles: [`
        agm-map {
        height: 500px;
        }
    `],
    templateUrl: './record.component.html'
})
export class RecordComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() senial: any = null;
    @Input() datos: any = null;
    public errorMessage;

    public uploadUrl = environment.uploadUrl;
    public inventarios: any = null;
    public inventario: any = null;
    public municipio: any = null;
    public formRecord: any = true;
    public formGeo: any = false;

    public table: any = null;

    public address: any = null;
    public zoom: number = 15;
    public lat: number = 1.2246233;
    public lng: number = -77.2808208;
    public map: any;
    public markers: marker[] = [];
    public arrayDemarcaciones: any = [];
    public geocoder: any;
    public LatLng: any;

    constructor(
        private _SenialInventarioService: SvSenialInventarioService,
        private _SenialUbicacionService: SvSenialUbicacionService,
        private _MunicipioService: CfgMunicipioService,
        private _loginService: LoginService,
        private __zone: NgZone
    ) {  }

    ngOnInit() {
        swal({
            title: 'Cargando ubicaciones!',
            text: 'Solo tardará unos segundos, por favor espere.',
            onOpen: () => {
                swal.showLoading();
            }
        });

        let token = this._loginService.getToken();

        this._SenialInventarioService.searchBySenialAndTipoDestino({ 'idSenial': this.senial.id, 'tipoDestino': this.datos.tipoDestino }, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.inventarios = response.data;

                    let timeoutId = setTimeout(() => {
                        this.onInitTable();
                    }, 100);

                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });

                    swal.close();
                } else {
                    swal({
                        title: 'Alerta!',
                        text: response.message,
                        type: 'warning',
                        confirmButtonText: 'Aceptar'
                    });

                    this.inventarios = null;
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

        if (this.datos.idMunicipio) {
            this._MunicipioService.show({ 'id': this.datos.idMunicipio },token).subscribe(
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
    }

    onInitTable() {
        if (this.table) {
            this.table.empty();
            this.table.destroy();
        }

        this.table = $('#dataTables-example').DataTable({
            responsive: true,
            pageLength: 8,
            sPaginationType: 'full_numbers',
            oLanguage: {
                oPaginate: {
                    sFirst: '<i class="fa fa-step-backward"></i>',
                    sPrevious: '<i class="fa fa-chevron-left"></i>',
                    sNext: '<i class="fa fa-chevron-right"></i>',
                    sLast: '<i class="fa fa-step-forward"></i>'
                }
            },
        });
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onLocation(inventario) {
        this.formRecord = false;
        this.formGeo = true;

        inventario.geolocalizacion.forEach((element: any, key: any) => {
            console.log(element);

            this.markers.push({
                lat: element.lat,
                lng: element.lng,
                draggable: false,
                label: null
            });
        });
    }

    onSearchGeo() {
        if (this.address) {
            this._SenialUbicacionService.getLatLng(this.address).subscribe(
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
}

// just an interface for type safety.
interface marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}