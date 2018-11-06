import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../../services/login.service';
import { ServicioService } from '../../../../services/servicio.service';
import { VehiculoService } from '../../../../services/vehiculo.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnrs-cambio-servicio',
    templateUrl: './newRnrs.cambioServicio.html'
})
export class NewRnrsCambioServicioComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() factura: any = null;
    public errorMessage;
    public respuesta;
    public servicios: any;
    public tramiteFacturaSelected: any;
    public servicioSelected: any;
    public resumen = {};     
    public datos = {
        'newData': null,
        'oldData': null,
        'tramiteFormulario': null,
        'facturaId': null,
    };

    constructor(
        private _ServicioService: ServicioService,
        private _loginService: LoginService,
        private _VehiculoService: VehiculoService,
    ) { }

    ngOnInit() {
        this.vehiculo.servicioId = 4;

        this._ServicioService.getServicioSelect().subscribe(
            response => {
                this.servicios = response;
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

        this._ServicioService.showServicio(token,this.servicioSelected).subscribe(
            servicio => {
                    this.vehiculo.servicioId = this.servicioSelected    
                    this.vehiculo.municipioId = this.vehiculo.municipio.id   
                    this.vehiculo.lineaId = this.vehiculo.linea.id   
                    this.vehiculo.colorId = this.vehiculo.color.id   
                    this.vehiculo.combustibleId = this.vehiculo.combustible.id   
                    this.vehiculo.carroceriaId = this.vehiculo.carroceria.id   
                    this.vehiculo.sedeOperativaId = this.vehiculo.sedeOperativa.id   
                    this.vehiculo.claseId = this.vehiculo.clase.id   
                    this.vehiculo.servicioId = this.vehiculo.servicio.id 
                    this.datos.facturaId = this.factura.id;
                    this.datos.tramiteFormulario = 'rnrs-cambioservicio';
                    this._VehiculoService.editVehiculo(this.vehiculo,token).subscribe(
                    response => {
                        this.respuesta = response; 
                        if(this.respuesta.status == 'success'){
                            this.datos.newData = servicio.data.nombre;
                            this.datos.oldData = this.vehiculo.servicio.nombre;
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