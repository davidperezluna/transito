import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'appRna-prorroga-importacion-temporal',
    templateUrl: './newRna.prorrogaImportacionTemporal.component.html'
})
export class NewRnaProrrogaImportacionTemporalComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    @Input() funcionario: any = null;
    @Input() tramitesRealizados: any = null;
    public errorMessage; 
    
    public realizado: any = false;
    public tramiteSolicitud:any = null;

    public date: any;

    public vehiculoProrroga : any;

    public datos = {
        'documentacion': true,
        'observacion': null,
        'numeroCuotas': null,
        'licenciaTransito': null,
        'fechaSolicitudProrroga': null,
        'idFuncionario': null,
        'idTramiteFactura': null,
        'idVehiculo': null,
    };

    constructor(
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _TramiteFacturaService: FroFacTramiteService,
        private _FuncionarioService: PnalFuncionarioService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        if (this.vehiculo.tipoMatricula == 'IMPORTACION') {
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
                this.date = new Date();
                var datePiper = new DatePipe(this.date);
                this.datos.fechaSolicitudProrroga = datePiper.transform(this.date, 'yyyy-MM-dd');
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
        this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.idVehiculo = this.vehiculo.id;

        let resumen = 'No. factura: ' + this.tramiteFactura.factura.numero +
            'Fecha solicitud prorroga' + this.datos.fechaSolicitudProrroga +
            'No. cuotas' + this.datos.numeroCuotas +
            'No. licencia transito' + this.datos.licenciaTransito;

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