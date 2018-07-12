import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitud } from '../../tramiteSolicitud.modelo';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { BancoService } from '../../../../services/banco.service';
import { LoginService } from '../../../../services/login.service';
import { CfgTipoAlertaService } from '../../../../services/cfgTipoAlerta.service';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { VehiculoAcreedorService } from '../../../../services/vehiculoAcreedor.service';
import { Router } from "@angular/router";
import { TipoIdentificacionService } from '../../../../services/tipoIdentificacion.service';


import swal from 'sweetalert2';

@Component({
    selector: 'appRna-inscripcion-alerta-prenda',
    templateUrl: './newRna.inscripcionAlertaPrenda.html'
})
export class NewRnaTramiteInscripcionAlertaPrendaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() banco: any = null;
    @Input() factura: any = null;
    @Input() tramitesFactura: any = null;

    public errorMessage;
    public respuesta;
    public cfgTiposAlerta: any;
    public tramiteFacturaSelected: any;
    public nombreAcreedor: any;
    public tramiteRealizado: any;
    public cfgTipoAlertaSelected: any;
    public gradoSelected: any;
    public acreedorNew = false;
    public acreedorEncontrado = 1;
    public propietario = true;
    public propietarioPresente = false;
    public ciudadanoSelected: any;
    public apoderado = 'false';
    public vehiculosAcreedor;
    public table: any;
    public formIndex = true;
    public vehiculoAcreedor: any; 
    public acreedores:any=[];
    public gradosAlerta = [
        { 'value': 1, 'label': "UNO" },
        { 'value': 2, 'label': "DOS" },
        { 'value': 3, 'label': "TRES" },
        { 'value': 4, 'label': "CUATRO" },
        { 'value': 5, 'label': "CINCO" },
        { 'value': 6, 'label': "SEIS" },
        { 'value': 7, 'label': "SIETE" },
        { 'value': 8, 'label': "OCHO" },
        { 'value': 9, 'label': "NUEVE" }
    ];
    public datos = {
        'tipoAlerta': [],
        'gradoAlerta': null,
        'tramiteFactura': null,
    };
    public datos2 = {
        'vehiculoId': null,
        'bancoId': null,
    }
    public tipoIdentificaciones = [];

    constructor(
        private _CfgTipoAlertaService: CfgTipoAlertaService,
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _BancoService: BancoService,
        private _loginService: LoginService,
        private _tramiteFacturaService: TramiteFacturaService,
        private _VehiculoService: VehiculoService,
        private _VehiculoAcreedorService: VehiculoAcreedorService,
        private _tipoIdentificacionService: TipoIdentificacionService,
        private router: Router,
    ) { }
 
    ngOnInit() {
        this._CfgTipoAlertaService.getAlertaSelect().subscribe(
            response => {
                this.cfgTiposAlerta = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._VehiculoAcreedorService.getAcreedor().subscribe(
            response => {
                this.respuesta = response;
                console.log(response);
                if (this.respuesta.status == 'success') {
                    this.vehiculosAcreedor = this.respuesta.data;
                    
                    // this.acreedorEncontrado = 2;
                    // this.acreedorNew = false;
                } else {
                    this.acreedorEncontrado = 3;
                    this.acreedorNew = true;
                }
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
            }); 
        

    }

    
    
   
    enviarTramite() {
        // this.datos.vehiculo = this.vehiculo.placa;
        //this.datos.banco = this.banco.nombre;

       
        let token = this._loginService.getToken();
        this._VehiculoAcreedorService.register(this.datos2, token).subscribe(
            response => {
                this.respuesta = response;
                if (this.respuesta.status == 'success') {
                    this.vehiculoAcreedor = this.respuesta.data;
                    this.ngOnInit();
                    this.datos.tipoAlerta = this.cfgTipoAlertaSelected;
                    this.datos.gradoAlerta = this.gradoSelected;
                    this.datos.tramiteFactura = 46;
                    this.readyTramite.emit(this.datos);
                    this.acreedorNew = false;

                    this.acreedorEncontrado = 2;
                } else {
                    this.acreedorEncontrado = 3;
                    this.acreedorNew = true;
                }
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
            }
        );

        
      

    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

   

    changedtipoIdentificacion(e) {
        // this.ciudadanoEncontrado = 1;
        // this.empresaEncontrada = 1;
    }

  
    btnNewAcreedor() {
        let token = this._loginService.getToken();
        //this.acreedorNew = true;
        this.acreedores.push(
            {
                'id':this.banco.id,
                'nombre':this.banco.nombre
            }
        )
        
    }

    onKeyAcreedor() {
        let token = this._loginService.getToken();
        let nombreAcreedor = {
            'nombreAcreedor': this.nombreAcreedor,
        };
        this._BancoService.showAcreedorNombre(token, nombreAcreedor).subscribe(
            response => {
                this.respuesta = response;
                if (this.respuesta.status == 'success') {
                    this.banco = this.respuesta.data;
                    this.acreedorEncontrado = 2;
                    this.acreedorNew = false;
                    this.datos2.bancoId = this.banco.nombre;
                    this.datos2.vehiculoId = this.vehiculo.id;
                } else {
                    this.acreedorEncontrado = 3;
                    this.acreedorNew = true;
                }
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
            });
    }

    btnCancelarAcreedor() {
        this.acreedorEncontrado = 1
    }


    delete(acreedor:any): void{
        this.acreedores = this.acreedores.filter(h => h !== acreedor);

    }

    ready(isCreado: any) {
    if (isCreado) {
      console.log(isCreado);
      // this.onKeyCiudadano();
        this.acreedorNew = false;
        // this.acreedorEncontrado = 2;
    } else {
      this.acreedorNew = false;
    }
  }

}