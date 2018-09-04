import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { SustratoService } from '../../../../services/sustrato.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-duplicado-licencia',
    templateUrl: './newRna.duplicadoLicencia.html'
})
export class NewRnaDuplicadoLicenciaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() factura: any = null;
    public errorMessage;
    public respuesta;
    public tramiteFacturaSelected: any;
    public sustratos: any;
    public sustratoSelected: any;
    public numeroRunt: any;
    public documentacion: any;
    public entregada = false;
    public datos = {
        'sustrato': null,
        'numeroRunt': null,
        'documentacion': null,
        'entregada': null,
        'tramiteFormulario': null,
        'facturaId': null,
    };

    constructor(
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _SustratoService: SustratoService,
    ) { }

    ngOnInit() {
        this._SustratoService.getSustratoSelect().subscribe(
            response => {
                this.sustratos = response;
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

   
    
    enviarTramite() {
        this.datos.sustrato = this.sustratoSelected;
        this.datos.numeroRunt = this.numeroRunt;
        this.datos.documentacion = this.documentacion;
        this.datos.entregada = this.entregada;
        this.datos.facturaId = this.factura.id;
        this.datos.tramiteFormulario = 'rna-duplicadolicencia';
        this.readyTramite.emit(this.datos);
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}