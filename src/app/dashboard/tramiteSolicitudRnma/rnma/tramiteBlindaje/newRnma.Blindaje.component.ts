import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { LoginService } from '../../../../services/login.service';
import { VehiculoService } from '../../../../services/vehiculo.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnma-blindaje',
    templateUrl: './newRnma.Blindaje.html'
})
export class NewRnmaBlindajeComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() factura: any = null;
    public errorMessage;
    public respuesta;
    public tramiteFacturaSelected: any;

    public tipoRegrabacionList: string[];
    public tipoRegrabacionSelected: any;
    public motivoSelected: any;
    public nuevoNumero: any;
    public numeroRunt: any;
    public documentacion: any;
    public entregada = false;

<<<<<<< HEAD
    public tipoBlindajeSelected: any;
    public nivelBlindajeSelected: any;

=======
    public resumen = {};
    
>>>>>>> bda1cf361751f6f1a3da640196b1ac46b141c999
    public datos = {
        'campos': null,
        'idVehiculo': null,
        'idTipoBlindaje': null,
        'idNivelBlindaje': null,
        'tramiteFormulario': null,
<<<<<<< HEAD
        'empresaBlindadora': null,
=======
        'idFactura': null,
>>>>>>> bda1cf361751f6f1a3da640196b1ac46b141c999
    };

    public tiposBlindaje = [
        { value: 'BLINDAJE DE UN VEHICULO', label: 'BLINDAJE DE UN VEHICULO' },
        { value: 'DESBLINDAJE DE UN VEHICULO', label: 'DESBLINDAJE DE UN VEHICULO' },
    ];

    public nivelesBlindaje = [
        { value: 'UNO', label: 'UNO' },
        { value: 'DOS', label: 'DOS' },
        { value: 'TRES', label: 'TRES' },
        { value: 'CUATRO', label: 'CUATRO' },
        { value: 'CINCO', label: 'CINCO' },
        { value: 'SEIS', label: 'SEIS' },
        { value: 'SIETE', label: 'SIETE' },
        { value: 'OCHO', label: 'OCHO' },
    ];

    constructor(
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _VehiculoService: VehiculoService,
    ) { }

    ngOnInit() { }

    enviarTramite() {
        let token = this._loginService.getToken();

        this.datos.idFactura = this.factura.id;
        this.datos.tramiteFormulario = 'rnma-blindaje';
        this.datos.idVehiculo = this.vehiculo.id;
        this.datos.campos = ['blindaje'];

        this._VehiculoService.update(this.datos, token).subscribe(
            response => {
                if (response.status == 'success') {
                    let resumen = {
                        'blindaje anterior': this.vehiculo.blindaje.nombre,
                        'nuevo blindaje': this.datos.idTipoBlindaje,
                    };
                    this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': resumen });
                }
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
            });
<<<<<<< HEAD
        error => {
            this.errorMessage = <any>error;

            if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
            }
        }
=======
        this.datos.idFactura = this.factura.id;
        this.datos.tramiteFormulario = 'rnma-blindaje';
        this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
>>>>>>> bda1cf361751f6f1a3da640196b1ac46b141c999
    }
    onCancelar() {
        this.cancelarTramite.emit(true);
    }

}