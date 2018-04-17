import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { SustratoService } from '../../../../services/sustrato.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'app-duplicado-licencia',
    templateUrl: './new.duplicadoLicencia.html'
})
export class NewDuplicadoLicenciaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Input() tramiteSolicitud: any = null;
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
        'entregada': null
    };

    constructor(
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _SustratoService: SustratoService,
    ) { }

    ngOnInit() {
        console.log(this.tramiteSolicitud);
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

    onEnviar() {
        let token = this._loginService.getToken();

        console.log(this.tramiteSolicitud);
        this._TramiteSolicitudService.register(this.tramiteSolicitud, token).subscribe(
            response => {
                this.respuesta = response;
                console.log(this.respuesta);
                if (this.respuesta.status == 'success') {
                    swal({
                        title: 'Pefecto!',
                        text: 'El registro se ha registrado con exito',
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    })
                } else {
                    swal({
                        title: 'Error!',
                        text: 'El tramiteSolicitud ' + +' ya se encuentra registrada',
                        type: 'error',
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
            });
    }
    
    enviarTramite() {
        this.datos.sustrato = this.sustratoSelected;
        this.datos.numeroRunt = this.numeroRunt;
        this.datos.documentacion = this.documentacion;
        this.datos.entregada = this.entregada;
        this.readyTramite.emit(this.datos);
    }

}