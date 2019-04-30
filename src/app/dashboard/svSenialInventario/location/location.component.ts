import { Component, OnInit, NgZone, Output, Input, EventEmitter } from '@angular/core';
import { MouseEvent, MapsAPILoader } from '@agm/core';
import { SvSenialUbicacionService } from '../../../services/svSenialUbicacion.service';
import { CfgMunicipioService } from '../../../services/cfgMunicipio.service';
import { SvCfgSenialTipoService } from '../../../services/svCfgSenialTipo.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-location',
    styles: [`
        agm-map {
        height: 600px;
        }
    `],
    templateUrl: './location.component.html'
})
export class LocationComponent implements OnInit {
    public errorMessage;
    
    public formSearch = true;
    public formGeo = false;
    public table: any = null;
    
    public ubicaciones: any = null;
    public municipios: any = null;
    public tiposSenial: any = null;
    public municipio: any = null;
    public address: any = null;

    public zoom: number = 15;
    public lat: number = 1.2246233;
    public lng: number = -77.2808208;
    public markers: marker[] = [];

    public filtros = {
        'fechaInicial': null,
        'fechaFinal': null,
        'idMunicipio': null,
        'idTipoSenial': null,
    };

    constructor(
        private _SenialUbicacionService: SvSenialUbicacionService,
        private _MunicipioService : CfgMunicipioService,
        private _TipoSenialService: SvCfgSenialTipoService,
        private _LoginService: LoginService,
        private __zone: NgZone
    ) { }

    ngOnInit() {
        this._TipoSenialService.select().subscribe(
                response => {
                    this.tiposSenial = response;
                },
                error => {
                this.errorMessage = <any>error;

                if(this.errorMessage != null){
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );

        let token = this._LoginService.getToken();

        this._MunicipioService.selectByDepartamento({'idDepartamento':21}, token).subscribe(
            response => {
                this.municipios = response;
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

    onSearchGeo() {
        if (this.address) {
            this._SenialUbicacionService.getLatLng(this.address).subscribe(
                result => {
                    this.__zone.run(() => {    
                        this.lat = result.lat();
                        this.lng = result.lng();
                    });

                    let timeoutId = setTimeout(() => {
                        this.onInitMarkers(this.ubicaciones);
                    }, 100);
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

    onChangedMunicipio(e){
        if (e) {
            let token = this._LoginService.getToken();

            this._MunicipioService.show({ 'id': e }, token).subscribe(
                response => {
                    if(response.code == 200){
                        this.municipio = response.data;    
                    }else{
                        this.municipio = null;
                    }

                    swal.close();
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

    onSearch(){
        swal({
            title: 'Buscando registros!',
            text: 'Solo tardará unos segundos, por favor espere.',
            onOpen: () => {
                swal.showLoading();
            }
        });

        let token = this._LoginService.getToken();

        this._SenialUbicacionService.searchByFechasAndMunicipio(this.filtros, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.address = this.municipio.nombre + ", Nariño";
                    this.ubicaciones = response.data;
    
                    let timeoutId = setTimeout(() => {
                        this.onSearchGeo();
                    }, 1000);

                    this.formGeo = true;

                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });

                    swal.close();
                } else {
                    this.ubicaciones = null;
                    this.formGeo = false;

                    swal({
                        title: 'Alerta!',
                        text: response.message,
                        type: 'warning',
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

    onInitMarkers(ubicaciones:any) {
        ubicaciones.forEach((ubicacion: any, keyUbicacion: any) => {
            ubicacion.geolocalizacion.forEach((element: any, key: any) => {
                console.log(element);
    
                this.markers.push({
                    lat: element.lat,
                    lng: element.lng,
                    draggable: false,
                    label: element.label
                });
            });
        });
    }

    onCancelar() {
        this.formSearch = true;
        this.formGeo = false;
    }
}

interface marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}