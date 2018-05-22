import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../services/tramiteFactura.service';
import { LoginService } from '../../../services/login.service';
import { SustratoService } from '../../../services/sustrato.service';
import {VehiculoService} from '../../../services/vehiculo.service';
import { CiudadanoService } from '../../../services/ciudadano.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-sustrato',
    templateUrl: './newRnaSustrato.html'
})
export class NewRnaSustratoComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() factura: any = null;
    public errorMessage;
    public respuesta;
    public sustratos: any;
    public sustratoSelected: any;
    public colorSelected: any;
    public identificacion: any;
    public ciudadano:any;
    public estadoImpresion=true;
    public tarjetaEntregada=true;
    public ciudadanoNew = false;
    public ciudadanoEncontrado=1;
    public facturaSustrato = {
        'facturaId': null,
        'ciudadanoId': null,
        'sustratoId': null,
        'descripcion': null,
    };

    constructor(
        private _SustratoService: SustratoService,
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _tramiteFacturaService: TramiteFacturaService,
        private _VehiculoService: VehiculoService,
        private _CiudadanoService: CiudadanoService,
    ) { } 

    ngOnInit() {
        console.log(this.factura);
        this._SustratoService.getSustratoSelect().subscribe(
            response => {
                this.sustratos = response;
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
   
    enviarTramite(){
        this.facturaSustrato.sustratoId = this.sustratoSelected;

    }

    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}