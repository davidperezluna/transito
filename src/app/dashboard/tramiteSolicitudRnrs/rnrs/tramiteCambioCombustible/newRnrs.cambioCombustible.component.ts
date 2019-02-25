import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitud } from '../../tramiteSolicitudRnrs.modelo';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { LoginService } from '../../../../services/login.service';
import { VhloCfgCombustibleService } from '../../../../services/vhloCfgCombustible.service';
import {VehiculoService} from '../../../../services/vehiculo.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnrs-cambio-combustible',
    templateUrl: './newRnrs.cambioCombustible.html'
})
export class NewRnrsCambioCombustibleComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() factura: any = null;
    public errorMessage;
    public combustibles: any;
    public tramiteFacturaSelected: any;
    public combustibleSelected: any;
    
    public datos = {
        'idFactura': null,
        'campos': null,
        'idVehiculo': null,
        'idCombustible': null,
        'tramiteFormulario': null,
    };

    constructor(
        private _CombustibleService: VhloCfgCombustibleService,
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _VehiculoService: VehiculoService,
    ) { }

    ngOnInit() {
        this.vehiculo.combustibleId = 4;
        this._CombustibleService.getCombustibleSelect().subscribe(
            response => {
                this.combustibles = response;
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

        this._CombustibleService.showCombustible(token, this.combustibleSelected).subscribe(
            combustibleResponse => {
                this.datos.idFactura = this.factura.id;
                this.datos.tramiteFormulario = 'rnrs-cambiocombustible';
                this.datos.idCombustible = this.combustibleSelected;
                this.datos.idVehiculo = this.vehiculo.id;
                this.datos.campos = ['combustible'];

                this._VehiculoService.update(this.datos, token).subscribe(
                    response => {
                        if (response.status == 'success') {
                            let resumen = {
                                'combustible anterior': this.vehiculo.combustible.nombre,
                                'nuevo combustible': combustibleResponse.data.nombre,
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