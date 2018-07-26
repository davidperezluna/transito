import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitud } from '../../tramiteSolicitudRnrs.modelo';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { LoginService } from '../../../../services/login.service';
import { CombustibleService } from '../../../../services/combustible.service';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { RegistroRemolqueService } from '../../../../services/rnrsRegistroRemolque.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnrs-transformacion',
    templateUrl: './newRnrs.transformacion.html'
})
export class NewRnrsTransformacionComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    public errorMessage;
    public respuesta;
    public datos: any;

    constructor(
        private _loginService: LoginService,
        private _VehiculoService: VehiculoService,
        private _RemolqueService: RegistroRemolqueService,
    ) { }

    ngOnInit() {
        this.datos = {
            'nuevoNumeroEjes': null,
            'numeroFTH': null,
            'pesoVacio': null,
            'cargaUtil': null,
            'tipoDocumento': null,
            'numeroDocumento': null,
            'nombreEmpresa': null,
            'fechaFactura': null,
            'tipoDocumentoSoporte': null,
            'numeroFactura': null,
            'tramiteFactura': null,
            'idVehiculo': null,
        };
    }

    enviarTramite() {
        let token = this._loginService.getToken();
        this.datos.idVehiculo = this.vehiculo.id;
        this._RemolqueService.transformacionVehiculoRemolque(this.datos, token).subscribe(
            response => {
                this.respuesta = response;
                if (this.respuesta.status == 'success') {
                    this.datos.tramiteFactura = 10;
                    this.readyTramite.emit(this.datos);
                    this.ngOnInit();
                }
                else if (this.respuesta.status == "error") {
                    swal({
                        type: 'error',
                        title: 'Oops...',
                        text: this.respuesta.msj
                    })
                }
                error => {
                    if (this.errorMessage != null) {
                        alert("Error en la petición");
                    }
                }
            });
    }

    onCancelar() {
        this.cancelarTramite.emit(true);
    }

}