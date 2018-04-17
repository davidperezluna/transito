import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'app-cambio-placa',
    templateUrl: './new.cambioPlaca.html'
})
export class NewCambioPlacaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Input() tramiteSolicitud: any = null;
    public errorMessage;
    public respuesta;
    public tramiteFacturaSelected: any;
    public tipoCambioList: string[];
    public tipoCambioSelected: any;
    public numeroRunt: any;
    public nuevaPlaca: any;
    public documentacion: any;
    public datos = {
        'tipoCambio': null,
        'numeroRunt': null,
        'nuevaPlaca': null,
        'documentacion': null,
    };

    constructor(
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _tramiteFacturaService: TramiteFacturaService,
    ) { }

    ngOnInit() {
        console.log(this.tramiteSolicitud);
        this.tipoCambioList = ['Antiguo', 'Clasico', 'Normal'];
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
        this.datos.tipoCambio = this.tipoCambioSelected;
        this.datos.numeroRunt = this.numeroRunt;
        this.datos.nuevaPlaca = this.nuevaPlaca;
        this.datos.documentacion = this.documentacion;
        this.readyTramite.emit(this.datos);
    }

}