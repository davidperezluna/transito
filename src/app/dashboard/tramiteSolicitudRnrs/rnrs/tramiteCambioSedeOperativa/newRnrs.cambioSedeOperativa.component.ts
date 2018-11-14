import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitud } from '../../tramiteSolicitudRnrs.modelo';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { LoginService } from '../../../../services/login.service';
import { SedeOperativaService } from '../../../../services/sedeOperativa.service';
import {VehiculoService} from '../../../../services/vehiculo.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnrs-cambio-sedeOperativa',
    templateUrl: './newRnrs.cambioSedeOperativa.html'
})
export class NewRnrsCambioSedeOperativaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramitesFactura: any = null;
    @Input() factura: any = null;
    public errorMessage;
    public respuesta;
    public sedesOperativas: any;
    public tramiteFacturaSelected: any;
    public sedeOperativaSelected: any;
    
    public datos = {
        'idFactura': null,
        'campos': null,
        'idVehiculo': null,
        'idSedeOperativa': null,
        'tramiteFormulario': null,
    };

    constructor(
        private _SedeOperativaService: SedeOperativaService,
        private _loginService: LoginService,
        private _VehiculoService: VehiculoService,
    ) { }

    ngOnInit() {
        this.vehiculo.sedeOperativaId = 4;
        this._SedeOperativaService.getSedeOperativaSelect().subscribe(
            response => {
                this.sedesOperativas = response;
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

        this._SedeOperativaService.showSedeOperativa(token, this.sedeOperativaSelected).subscribe(
            sedeOperativaResponse => {
                this.datos.idFactura = this.factura.id;
                this.datos.tramiteFormulario = 'rnrs-cambiosedeoperativa';
                this.datos.idSedeOperativa = this.sedeOperativaSelected;
                this.datos.idVehiculo = this.vehiculo.id;
                this.datos.campos = ['sedeOperativa'];

                this._VehiculoService.update(this.datos, token).subscribe(
                    response => {
                        if (response.status == 'success') {
                            let resumen = {
                                'sede anterior': this.vehiculo.sede.nombre,
                                'nuevo sede': sedeOperativaResponse.data.nombre,
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