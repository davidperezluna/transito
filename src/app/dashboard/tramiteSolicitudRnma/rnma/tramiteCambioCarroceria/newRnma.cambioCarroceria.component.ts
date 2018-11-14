import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitud } from '../../tramiteSolicitudRnma.modelo';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { LoginService } from '../../../../services/login.service';
import { CarroceriaService } from '../../../../services/carroceria.service';
import { VehiculoService } from '../../../../services/vehiculo.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnma-cambio-carroceria',
    templateUrl: './newRnma.cambioCarroceria.html'
})
export class NewRnmaCambioCarroceriaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() factura: any = null;
    public errorMessage;
    public carrocerias: any;
    public tramiteFacturaSelected: any;
    public carroceriaSelected: any;

    public datos = {
        'idFactura': null,
        'campos': null,
        'idVehiculo': null,
        'idCarroceria': null,
        'tramiteFormulario': null,
    };

    constructor(
        private _CarroceriaService: CarroceriaService,
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _VehiculoService: VehiculoService,
    ) { }

    ngOnInit() {
        this.vehiculo.carroceriaId = 4;
        
        this._CarroceriaService.getCarroceriaSelect().subscribe(
            response => {
                this.carrocerias = response;
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
    
   
    enviarTramite(){
        
        let token = this._loginService.getToken();

        this._CarroceriaService.showCarroceria(token,this.carroceriaSelected).subscribe(
            carroceriaResponse => {
                this.datos.idFactura = this.factura.id;
                this.datos.tramiteFormulario = 'rnma-cambiocarroceria';
                this.datos.idCarroceria = this.carroceriaSelected;
                this.datos.idVehiculo = this.vehiculo.id;
                this.datos.campos = ['carroceria'];

                this._VehiculoService.update(this.datos, token).subscribe(
                    response => {
                        if (response.status == 'success') {
                            let resumen = {
                                'carroceria anterior': this.vehiculo.carroceria.nombre,
                                'nueva carroceria': carroceriaResponse.data.nombre,
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