/// <reference types="@types/googlemaps" />
import { Component, OnInit, Output, Input, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { SvSenialInventarioService } from '../../../services/svSenialInventario.service';
import { SvSenialUbicacionService } from '../../../services/svSenialUbicacion.service';
import { CfgMunicipioService } from '../../../services/cfgMunicipio.service';
import { LoginService } from '../../../services/login.service';
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

    public uploadUrl = environment.uploadUrl;
    public inventarios: any = null;
    public inventario: any = null;
    public municipio: any = null;
    public formRecord: any = true;
    public formGeo: any = false;

    public errorMessage;
    public table: any = null;
    public markers: any = [];

    public zoom: number = 15;
    public lat: number = 1.2246233;
    public lng: number = -77.2808208;

    constructor(
        private _SenialInventarioService: SvSenialInventarioService,
        private _SenialUbicacionService: SvSenialUbicacionService,
        private _MunicipioService: CfgMunicipioService,
        private _loginService: LoginService
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
                if (response.status == 'success') {
                    this.inventarios = response.data;

                    let timeoutId = setTimeout(() => {
                        this.iniciarTabla();
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
    }

    iniciarTabla() {
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
            
            this.markers.push(
                {
                    lat: element.lat,
                    lng: element.lng,
                },
            )
        });
    }
}