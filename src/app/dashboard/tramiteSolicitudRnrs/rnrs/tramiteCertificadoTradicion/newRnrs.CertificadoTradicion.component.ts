import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { SustratoService } from '../../../../services/sustrato.service';
import { LoginService } from '../../../../services/login.service';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { CiudadanoService } from '../../../../services/ciudadano.service';
import { DefaultService } from '../../../../services/default.service';
import { environment } from 'environments/environment';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnrs-certificadoTradicion',
    templateUrl: './newRnrs.certificadoTradicion.html'
})
export class NewRnrsCertificadoTradicionComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() factura: any = null;
    public apiUrl = environment.apiUrl + 'default';
    public errorMessage;
    public respuesta;
    public tramiteFacturaSelected: any; 
    public sustratos: any;
    public sustratoSelected: any;
    public tipoRegrabacionList: string[];
    public tipoBlindajeList: string[];
    public tipoRegrabacionSelected: any;
    public nivelBlindajeList: string[];
    public motivoSelected: any;
    public nuevoNumero: any;
    public numeroRunt: any;
    public certificadoEntregado: any;
    public documentacion: any;
    public ciudadanoId: any;
    public entregada = false;
    public ciudadanoEncontrado=1;
    public ciudadanoNew = false;
    public ciudadano:any;
    public resumen = {};     
    public datos = {
        'nroRunt': null,
        'observacion': null,                  
        'certificadoEntregada': null,
        'entregado': null,
        'tramiteFormulario': null,
        'facturaId': null,
    };

    constructor(
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _SustratoService: SustratoService,
        private _VehiculoService: VehiculoService,
        private _CiudadanoService: CiudadanoService,
        private _DefaultService: DefaultService,
    ) { }

    ngOnInit() {       
        
    }

    enviarTramite() {
        let token = this._loginService.getToken();
        let datos = {
            'dato1':'k'
        }
        this._DefaultService.pdfLicenciaTransito(token,datos).subscribe( 
            response => {
                // this.respuesta = response; 
                
            error => {
                    this.errorMessage = <any>error;
                
                    if(this.errorMessage != null){
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
        }); 

        this.datos.facturaId = this.factura.id;
        this.datos.tramiteFormulario = 'rnrs-certificadotradicion';
        this.datos.certificadoEntregada = this.certificadoEntregado;
        this.datos.entregado = this.ciudadanoId;
        this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen}); 
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

    onKeyCiudadano(){
        let token = this._loginService.getToken();
        let identificacion = {
			'numeroIdentificacion' : this.ciudadanoId,
        };
        
        this._CiudadanoService.searchByIdentificacion(token,identificacion).subscribe(
            response => {
                this.respuesta = response; 
                if(this.respuesta.status == 'success'){
                    this.ciudadano = this.respuesta.data;
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