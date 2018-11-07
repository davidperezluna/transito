import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitud } from '../../tramiteSolicitudRnma.modelo';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { LoginService } from '../../../../services/login.service';
import { ColorService } from '../../../../services/color.service';
import {VehiculoService} from '../../../../services/vehiculo.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnma-cambio-color',
    templateUrl: './newRnma.cambioColor.html'
})
export class NewRnmaCambioColorComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramitesFactura: any = null;
    @Input() factura: any = null;
    public errorMessage;
    public respuesta;
    public colores: any;
    public tramiteFacturaSelected: any;
    public colorSelected: any;
    public tramiteRealizado: any;
    
    public datos = {
        'idFactura': null,
        'campos': null,
        'idVehiculo': null,
        'idColor': null,
        'tramiteFormulario': null,
    };

    constructor(
        private _ColorService: ColorService,
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _tramiteFacturaService: TramiteFacturaService,
        private _VehiculoService: VehiculoService,
    ) { }
 
    ngOnInit() {
        this.tramitesFactura.forEach(tramiteFactura => {
            if (tramiteFactura.realizado == 1) {
                if (tramiteFactura.tramitePrecio.tramite.id == 15) {
                    this.tramiteRealizado = tramiteFactura;
                }
            }
        });
        //consultar tramite solicitud con tramiterealizado.id
        let token = this._loginService.getToken();
        if(this.tramiteRealizado){
        this._TramiteSolicitudService.showTramiteSolicitudByTamiteFactura(token,this.tramiteRealizado.id).subscribe(
            response => {
                this.datos = response.data.datos
                console.log(response.data.datos);
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );}

        this._ColorService.select().subscribe(
            response => {
                this.colores = response;
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

        this._ColorService.show(token,this.colorSelected).subscribe(
            colorResponse => {
                this.datos.idFactura = this.factura.id;
                this.datos.tramiteFormulario = 'rnma-cambiocolor';
                this.datos.idColor = this.colorSelected;
                this.datos.idVehiculo = this.vehiculo.id;
                this.datos.campos = ['color'];
                 
                this._VehiculoService.update(this.datos,token).subscribe(
                response => { 
                    if(response.status == 'success'){ 
                        let resumen = {
                            'color anterior': this.vehiculo.color.nombre,
                            'nuevo color': colorResponse.data.nombre,
                        };
                        this.readyTramite.emit({'foraneas':this.datos, 'resumen':resumen});
                    }
                    error => {
                            this.errorMessage = <any>error;

                            if(this.errorMessage != null){
                                console.log(this.errorMessage);
                                alert("Error en la petición");
                            }
                        }
                }); 
                error => {
                        this.errorMessage = <any>error;
    
                        if(this.errorMessage != null){
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