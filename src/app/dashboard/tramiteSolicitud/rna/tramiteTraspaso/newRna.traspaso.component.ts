import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitud } from '../../tramiteSolicitud.modelo';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { LoginService } from '../../../../services/login.service';
import { ColorService } from '../../../../services/color.service';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { CiudadanoService } from '../../../../services/ciudadano.service';
import { TipoIdentificacionService } from '../../../../services/tipoIdentificacion.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-traspaso',
    templateUrl: './newRna.traspaso.html'
})
export class NewRnaTraspasoComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() tramite: any = null;
    @Input() vehiculo: any = null;
    public errorMessage;
    public respuesta;
    public colores: any;
    public tramiteFacturaSelected: any;
    public tipoPropiedadSelected:any;
    public ciudadano:any;
    public identificacion:any;
    public ciudadanoEncontrado=1;
    public empresaEncontrada=1;
    public nit:any;
    public tipoIdentificacionSelected=[1];
    public tipoPropiedades= [
        {'value':1,'label':"Leasing"},
        {'value':2,'label':"Propio"}
    ];
    public tipoIdentificaciones= [ ];
    public datos = {
        'newData': null,
        'oldData': null,
        'sustrato': null,
    };

    constructor(
        private _ColorService: ColorService,
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _tramiteFacturaService: TramiteFacturaService,
        private _VehiculoService: VehiculoService,
        private _tipoIdentificacionService: TipoIdentificacionService,
        private _CiudadanoService: CiudadanoService,
    ) { }

    ngOnInit() {

        this._tipoIdentificacionService.getTipoIdentificacionSelect().subscribe(
            response => {
              this.tipoIdentificaciones = response;
            },
            error => {
              this.errorMessage = <any>error;
    
              if(this.errorMessage != null){
                console.log(this.errorMessage);
                alert('Error en la petición');
              }
            }
          );
        
        this._ColorService.getColorSelect().subscribe(
            response => {
                this.colores = response;
                console.log(this.colores);
                console.log(this.tipoPropiedades);
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

        this.vehiculo.combustibleId = this.vehiculo.combustible.id    
        this.vehiculo.municipioId = this.vehiculo.municipio.id   
        this.vehiculo.lineaId = this.vehiculo.linea.id   
        this.vehiculo.colorId = this.vehiculo.color.id   
        this.vehiculo.carroceriaId = this.vehiculo.carroceria.id   
        this.vehiculo.sedeOperativaId = this.vehiculo.sedeOperativa.id   
        this.vehiculo.claseId = this.vehiculo.clase.id   
        this.vehiculo.servicioId = this.vehiculo.servicio.id 
        this._VehiculoService.editVehiculo(this.vehiculo,token).subscribe(
        response => {
            this.respuesta = response; 
            if(this.respuesta.status == 'success'){
                this.datos.oldData = this.vehiculo.color.nombre;
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
        
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }
    
    onKeyCiudadano(){
        let token = this._loginService.getToken();
        let identificacion = {
			'numeroIdentificacion' : this.identificacion,
        };
        this._CiudadanoService.showCiudadanoCedula(token,identificacion).subscribe(
            response => {
                this.respuesta = response; 
                if(this.respuesta.status == 'success'){
                    this.ciudadano = this.respuesta.data;
                    console.log(this.ciudadano);
                    this.ciudadanoEncontrado= 2;
            }else{
                this.ciudadanoEncontrado=3;
            }
            error => {
                    this.errorMessage = <any>error;
                
                    if(this.errorMessage != null){
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
        }); 
    }

}