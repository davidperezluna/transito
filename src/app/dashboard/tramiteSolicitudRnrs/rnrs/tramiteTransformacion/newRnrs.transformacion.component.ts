import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../../services/login.service';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { UserCfgTipoIdentificacionService } from '../../../../services/userCfgTipoIdentificacion.service';
import { RnrsPreregistroService } from '../../../../services/rnrsPreregistro.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnrs-transformacion',
    templateUrl: './newRnrs.transformacion.html'
})
export class NewRnrsTransformacionComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() factura: any = null; 
    public errorMessage;
    public respuesta;
    public tiposIdentificacion: any;
    public resumen = {};
    public datos = {
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
        'tramiteFormulario': null,
        'idFactura': null,
        'idVehiculo': null,
    };

    public tiposDocumentoSoporte = [
        {'value': 'Factura', 'label': 'factura'},
        {'value': 'Certificacion', 'label': 'Certificación'},   
    ];

    constructor(
        private _loginService: LoginService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _RemolqueService: RnrsPreregistroService,
    ) { }

    ngOnInit() { 
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
     }

    onEnviarTramite() {
        let token = this._loginService.getToken();
        this.datos.idVehiculo = this.vehiculo.id;
        this._RemolqueService.transformacion(this.datos, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.datos.idFactura = this.factura.id;
                    this.datos.tramiteFormulario = 'rnrs-transformacion';
                    this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
                    this.ngOnInit();
                }
                else if (response.status == "error") {
                    swal({
                        type: 'error',
                        title: 'Atención!',
                        text: response.message
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