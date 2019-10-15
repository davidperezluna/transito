import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { VhloDevolucionRadicado } from '../vhloDevolucionRadicado.modelo';

import { VhloDevolucionRadicadoService } from '../../../../../services/vhloDevolucionRadicado.service';
import { CfgOrganismoTransitoService } from '../../../../../services/cfgOrganismoTransito.service';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-new-vhlodevolucionradicado',
    templateUrl: './new.component.html',
    providers: [DatePipe]
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() propietarios: any = null;
    public devolucion: VhloDevolucionRadicado;

    public organismosTransitoNacional: any;

    public table: any = null;
    public errorMessage;

    public datos = {
        'idOrganismoTransito': null,
        'fechaIngreso': null,
        'numeroGuiaLlegada': null,
        'empresaEnvio': null
    };

    constructor(
        private _VhloDevolucionRadicadoService: VhloDevolucionRadicadoService,
        private _OrganismoTransitoService: CfgOrganismoTransitoService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this.devolucion = new VhloDevolucionRadicado(null, null, null, null, null, null);

        this.devolucion.numeroLicenciaTransito = this.vehiculo.numeroLicenciaRadicado;
        
        var datePiper = new DatePipe('en-US');
        var date = new Date();
        
        date.setTime(this.vehiculo.fechaRegistroRadicado.timestamp * 1000);
        
        this.vehiculo.fechaRegistroRadicado = datePiper.transform(
            date, 'yyyy-MM-dd'
            );
        
        this.datos.fechaIngreso = this.vehiculo.fechaRegistroRadicado;
        this.datos.numeroGuiaLlegada = this.vehiculo.numeroGuiaRadicado;
        this.datos.empresaEnvio = this.vehiculo.empresaEnvioRadicado;

        this._OrganismoTransitoService.select().subscribe(
            response => {
                this.organismosTransitoNacional = response;
                setTimeout(() => {
                    this.datos.idOrganismoTransito = [this.vehiculo.organismoTransito.id];
                    this.devolucion.idOrganismoTransito = [this.vehiculo.organismoTransito.id];
                    this.onInitTable();
                })
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

    onInitTable() {
        if (this.table) {
            this.table.destroy();
        } else {
            this.table = $('#dataTables-propietario').DataTable({
                responsive: true,
                pageLength: 10,
                sPaginationType: 'full_numbers',
                oLanguage: {
                    oPaginate: {
                        sFirst: '<i class="fa fa-step-backward"></i>',
                        sPrevious: '<i class="fa fa-chevron-left"></i>',
                        sNext: '<i class="fa fa-chevron-right"></i>',
                        sLast: '<i class="fa fa-step-forward"></i>'
                    }
                }
            });
        }
    }

    onEnviar() {
        let token = this._LoginService.getToken();

        this.devolucion.idVehiculo = this.vehiculo.id;

        this._VhloDevolucionRadicadoService.register(this.devolucion, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.ready.emit(true);
                    swal({
                        title: response.title,
                        text: response.message,
                        type: response.status,
                        confirmButtonText: 'Aceptar'
                    })
                } else {
                    swal({
                        title: response.title,
                        text: response.message,
                        type: response.status,
                        confirmButtonText: 'Aceptar'
                    })
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
}