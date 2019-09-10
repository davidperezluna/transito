import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { CfgPaisService } from "../../../../../../services/cfgPais.service";
import { UserCfgTipoIdentificacionService } from "../../../../../../services/userCfgTipoIdentificacion.service";
import { LoginService } from '../../../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'app-importacion-temporal',
    templateUrl: './new.importacionTemporal.component.html',
    providers: [DatePipe]
})
export class NewImportacionTemporalComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    @Input() funcionario: any = null;
    @Input() tramitesRealizados: any = null;
    public errorMessage; 
    
    public realizado: any = false;
    public tramiteSolicitud: any;
    public tramitesFactura: any = null;

    public identificacion: any;
    public tiposIdentificacion: any;
    public tipoIdentificacionSelected;
    

    public ciudadano: any;
    public empresa: any;
    public propietario: any;
    public vehiculoImportacion: any;
    public vehiculoEncontrado: any;


    public date: any;
    public paises: any;
    public paisSelected: any;

    public numeroRunt: any;
    public numeroCuotas: any;

    public datos = {
        'documentacion': true,
        'observacion': null,
        'propietarios': null,
        'fechaSolicitud': null,
        'numeroRegistro': null,
        'numeroCuotas': null,
        'idFuncionario': null,
        'idPais': null,
        'idVehiculo': null,
        'idTramiteFactura': null,
    };

    constructor(
        private _CfgPaisService: CfgPaisService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _LoginService: LoginService,

    ) { }

    ngOnInit() {
        if (this.vehiculo.tipoMatricula == 'IMPORTACION') {
            this.date = new Date;
            var datePiper = new DatePipe(this.date);
            this.datos.fechaSolicitud = datePiper.transform(this.date, 'yyyy-MM-dd');


            this.datos.idFuncionario  = this.funcionario.id;
        
            if ( this.tramitesRealizados.length > 0) {
                this.tramitesRealizados.forEach(tramiteRealizado => {
                    tramiteRealizado = Object.keys(tramiteRealizado).map(function(key) {
                        return tramiteRealizado[key];
                    });
                    
                    if (tramiteRealizado.includes(this.tramiteFactura.id, 2)) {
                        this.realizado = true;
                    }
                });
            }

            if (this.realizado) {
                swal({
                    title: 'Atención!',
                    text: 'El trámite seleccionado ya fue realizado.',
                    type: 'warning',
                    confirmButtonText: 'Aceptar'
                });
            } else{
                this._TipoIdentificacionService.select().subscribe(
                    response => {
                        this.tiposIdentificacion = response;
                    },
                    error => {
                        this.errorMessage = <any>error;

                        if (this.errorMessage != null) {
                            console.log(this.errorMessage);
                            alert('Error en la petición');
                        }
                    }
                );

                this._CfgPaisService.select().subscribe(
                    response => {
                        this.paises = response;
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
        }else{
            swal({
                title: 'Error!',
                text: 'El vehiculo no se registro para importación temporal.',
                type: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    }

    onEnviar() {        
        this.datos.idVehiculo = this.vehiculo.id;
        this.datos.idTramiteFactura = this.tramiteFactura.id;

        let resumen = "No. factura: " + this.tramiteFactura.factura.numero +
                'No. solicitud RUNT' + this.numeroRunt +
                'No. cuotas' + this.numeroCuotas +
                'Fecha solicitud' + this.datos.fechaSolicitud;

        this.realizado = true;

        this.onReadyTramite.emit(
            {
                'documentacion':this.datos.documentacion, 
                'observacion':this.datos.observacion, 
                'foraneas':this.datos, 
                'resumen':resumen,
                'idTramiteFactura': this.tramiteFactura.id,
            }
        );
    }
}