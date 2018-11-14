import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';
import { VehiculoService } from 'app/services/vehiculo.service';

@Component({
    selector: 'appRnma-cambio-placa',
    templateUrl: './newRnma.cambioPlaca.html'
})
export class NewRnmaCambioPlacaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() factura: any = null;
    public errorMessage;
    public respuesta;
    public : any;
    public tipoCambioSelected: any;
    public numeroRunt: any;
    public nuevaPlaca: any;
    public documentacion: any;

    public datos = {
        'idFactura': null,
        'campos': null,
        'idVehiculo': null,
        'idTipoCambio': null,
        'idPlaca': null,
        'tramiteFormulario': null,
    };

    public tiposCambio = [
        { value: 'ANTIGUO', label: 'ANTIGUO' },
        { value: 'CLASICO', label: 'CLASICO' },
        { value: 'NORMAL', label: 'NORMAL' },
    ];

    constructor(
        private _loginService: LoginService,
        private _tramiteFacturaService: TramiteFacturaService,
        private _VehiculoService: VehiculoService,
    ) { }

    ngOnInit() { }
    
    enviarTramite() {
        let token = this._loginService.getToken();

        this._VehiculoService.show(token, this.tipoCambioSelected).subscribe(
            placaResponse => {
                this.datos.idFactura = this.factura.id;
                this.datos.tramiteFormulario = 'rnma-cambioplaca';
                this.datos.idVehiculo = this.vehiculo.id;
                this.datos.campos = ['placa'];

                this._VehiculoService.update(this.datos, token).subscribe(
                    response => {
                        if (response.status == 'success') {
                            let resumen = {
                                'placa anterior': this.vehiculo.placa.nombre,
                                'nueva placa': placaResponse.data.nombre,
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
