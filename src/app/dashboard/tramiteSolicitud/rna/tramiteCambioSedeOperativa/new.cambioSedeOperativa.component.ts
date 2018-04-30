import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitud } from '../../tramiteSolicitud.modelo';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { LoginService } from '../../../../services/login.service';
import { SedeOperativaService } from '../../../../services/sedeOperativa.service';
import {VehiculoService} from '../../../../services/vehiculo.service';

import swal from 'sweetalert2';

@Component({
    selector: 'app-cambio-sedeOperativa',
    templateUrl: './new.cambioSedeOperativa.html'
})
export class NewCambioSedeOperativaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramite: any = null;
    public errorMessage;
    public respuesta;
    public sedesOperativas: any;
    public tramiteFacturaSelected: any;
    public sedeOperativaSelected: any;
    public datos = {
        'newData': null,
        'oldData': null,
        'numeroRunt': null,
        'sustrato': null,
    };

    constructor(
        private _SedeOperativaService: SedeOperativaService,
        private _TramiteSolicitudService: TramiteSolicitudService,
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

        this._SedeOperativaService.showSedeOperativa(token,this.sedeOperativaSelected).subscribe(
            sedeOperativa => {
                    this.vehiculo.sedeOperativaId = this.sedeOperativaSelected    
                    this.vehiculo.municipioId = this.vehiculo.municipio.id   
                    this.vehiculo.lineaId = this.vehiculo.linea.id   
                    this.vehiculo.colorId = this.vehiculo.color.id   
                    this.vehiculo.carroceriaId = this.vehiculo.carroceria.id   
                    this.vehiculo.combustibleId = this.vehiculo.combustible.id   
                    this.vehiculo.claseId = this.vehiculo.clase.id   
                    this.vehiculo.servicioId = this.vehiculo.servicio.id 
                    this._VehiculoService.editVehiculo(this.vehiculo,token).subscribe(
                    response => {
                        this.respuesta = response; 
                        if(this.respuesta.status == 'success'){
                            this.datos.newData = sedeOperativa.data.nombre;
                            this.datos.oldData = this.vehiculo.sedeOperativa.nombre;
                            this.readyTramite.emit(this.datos);
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