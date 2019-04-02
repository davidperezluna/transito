import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { LoginService } from '../../../../services/login.service';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { DefaultService } from '../../../../services/default.service';
import { environment } from 'environments/environment';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-certificadoTradicion',
    templateUrl: './newRna.certificadoTradicion.html'
})
export class NewRnaCertificadoTradicionComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() factura: any = null;
    public apiUrl = environment.apiUrl + 'default'; 
    public errorMessage;
    public tramiteFacturaSelected: any; 
    public sustratos: any;
    public sustratoSelected: any;
    public motivoSelected: any;
    public certificadoEntregado: any;
    public ciudadanoId: any;
    public ciudadanoEncontrado=1;
    public ciudadanoNew = false;
    public ciudadano:any;
    public resumen = {};     
    public datos = {
        'numeroRunt': null,
        'observacion': null,                  
        'certificadoEntregada': null,
        'tramiteFormulario': null,
        'idFactura': null,
        'campos': null,
        'idVehiculo': null,
    };

    constructor(
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _VehiculoService: VehiculoService,
        private _CiudadanoService: UserCiudadanoService,
        private _DefaultService: DefaultService,
    ) { }

    ngOnInit() {
       
        
    }

    enviarTramite() {
        let token = this._loginService.getToken();
      
        this.datos.idFactura = this.factura.id;
        this.datos.tramiteFormulario = 'rna-certificadotradicion';
        this.datos.certificadoEntregada = this.certificadoEntregado;
        this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

    onKeyCiudadano(){
        let token = this._loginService.getToken();
        let identificacion = {
			'identificacion' : this.ciudadanoId,
        };
        
        this._CiudadanoService.searchByIdentificacion(identificacion, token).subscribe(
            response => {
                if(response.status == 'success'){
                    this.ciudadano = response.data;
                    this.ciudadanoEncontrado= 2;
                    this.ciudadanoNew = false;
            }else{
                this.ciudadanoEncontrado=3;
                this.ciudadanoNew = true; 
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
    ready(){ 
        this.ciudadanoEncontrado = 3;
    }

}