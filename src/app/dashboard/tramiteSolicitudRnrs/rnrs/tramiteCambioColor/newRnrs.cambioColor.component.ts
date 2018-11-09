import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitud } from '../../tramiteSolicitudRnrs.modelo';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { LoginService } from '../../../../services/login.service';
import { ColorService } from '../../../../services/color.service';
import {VehiculoService} from '../../../../services/vehiculo.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnrs-cambio-color',
    templateUrl: './newRnrs.cambioColor.html'
})
export class NewRnrsCambioColorComponent implements OnInit {
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
    public resumen = {};     public datos = {
        'newData': null,
        'oldData': null,
        'sustrato': null,
        'tramiteFormulario': null,
        'idFactura': null,
    };

    constructor(
        private _ColorService: ColorService,
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _tramiteFacturaService: TramiteFacturaService,
        private _VehiculoService: VehiculoService,
    ) { }
 
    ngOnInit() {
        let token = this._loginService.getToken();

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
            color => {
                    this.vehiculo.combustibleId = this.vehiculo.combustible.id    
                    this.vehiculo.municipioId = this.vehiculo.municipio.id   
                    this.vehiculo.lineaId = this.vehiculo.linea.id   
                    this.vehiculo.colorId = this.colorSelected   
                    this.vehiculo.carroceriaId = this.vehiculo.carroceria.id   
                    this.vehiculo.sedeOperativaId = this.vehiculo.sedeOperativa.id   
                    this.vehiculo.claseId = this.vehiculo.clase.id   
                    this.vehiculo.servicioId = this.vehiculo.servicio.id 
                    this._VehiculoService.editVehiculoColor(this.vehiculo,token).subscribe(
                    response => {
                        this.respuesta = response; 
                        if(this.respuesta.status == 'success'){
                            this.datos.newData = color.data.nombre;
                            this.datos.oldData = this.vehiculo.color.nombre;
                            this.datos.idFactura = this.factura.id;
                            this.datos.tramiteFormulario = 'rnrs-cambiocolor';
                            this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
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