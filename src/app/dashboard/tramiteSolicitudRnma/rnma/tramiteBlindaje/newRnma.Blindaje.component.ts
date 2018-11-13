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
    public tipoBlindajeList: string[];
    public tipoRegrabacionSelected: any;
    public nivelBlindajeList: string[];
    public motivoSelected: any;
    public nuevoNumero: any;
    public numeroRunt: any;
    public documentacion: any;
    public entregada = false;
    
    public datos = {
        'idFactura': null,
        'campos': null,
        'idVehiculo': null,
        'idBlindaje': null,
        'tramiteFormulario': null,
    };

    constructor(
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _VehiculoService: VehiculoService,
    ) { }

    ngOnInit() {
        this.nivelBlindajeList = ['UNO', 'DOS', 'TRES', 'CUATRO', 'CINCO','SEIS','SIETE','OCHO'];
        this.tipoBlindajeList = ['Blindaje de un vehículo', 'Desblindaje de un vehículo'];
    }

    enviarTramite() {
        let token = this._loginService.getToken();

        this._VehiculoService.showVehiculo(token, this.tipoBlindajeList).subscribe(
            blindajeResponse => {
                this.datos.idFactura = this.factura.id;
                this.datos.tramiteFormulario = 'rnma-blindaje';
                this.datos.idBlindaje = this.tipoBlindajeList;
                this.datos.idVehiculo = this.vehiculo.id;
                this.datos.campos = ['blindaje'];

                this._VehiculoService.update(this.datos, token).subscribe(
                    response => {
                        if (response.status == 'success') {
                            let resumen = {
                                'blindaje anterior': this.vehiculo.blindaje.nombre,
                                'nueva blindaje': blindajeResponse.data.nombre,
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
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
            });
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}