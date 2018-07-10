import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitud } from '../../tramiteSolicitud.modelo';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { CiudadanoVehiculoService } from '../../../../services/ciudadanoVehiculo.service';
import { LoginService } from '../../../../services/login.service';
import { ColorService } from '../../../../services/color.service';
import { CfgTipoAlertaService } from '../../../../services/cfgTipoAlerta.service';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { CiudadanoService } from '../../../../services/ciudadano.service';
import { Router } from "@angular/router";
import { EmpresaService } from "../../../../services/empresa.service";
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
    @Input() factura: any = null;
    @Input() tramitesFactura: any = null;

    public errorMessage;
    public respuesta;
    public colores: any;
    public cfgTiposAlerta: any;
    public tramiteFacturaSelected: any;
    public colorSelected: any;
    public tramiteRealizado: any;
    public cfgTipoAlertaSelected: any;
    public gradoSelected: any;
    public ciudadano: any;
    public apoderadoSelected: any;
    public empresa: any;
    public empresaSelected: any;
    public identificacion: any;
    public identificacionApoderado: any;
    public ciudadanoEncontrado = 1;
    public apoderadoEncontrado = 1;
    public empresaEncontrada = 1;
    public nit: any;
    public tipoIdentificacionSelected = null;
    public listaPropietariosCiudadanos = false;
    public listaPropietariosEmpresas = false;
    public ciudadanoNew = false;
    public propietario = true;
    public propietarioPresente = false;
    public ciudadanoSelected: any;
    public apoderado = 'false';
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
        'newData': null,
        'oldData': null,
        'propietariosEmpresas': [],
        'propietariosCiudadanos': [],
        'solidario': false,
        'vehiculo': null,
        'sustrato': null,
        'numeroLicencia': null,
        'tramiteFactura': null,
    };
    public tipoIdentificaciones = [];

    constructor(
        private _ColorService: ColorService,
        private _CfgTipoAlertaService: CfgTipoAlertaService,
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _tramiteFacturaService: TramiteFacturaService,
        private _VehiculoService: VehiculoService,
        private _tipoIdentificacionService: TipoIdentificacionService,
        private _CiudadanoService: CiudadanoService,
        private _CiudadanoVehiculoService: CiudadanoVehiculoService,
        private router: Router,
        private _EmpresaService: EmpresaService,
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
        this._tipoIdentificacionService.getTipoIdentificacionSelect().subscribe(
            response => {
                this.tipoIdentificaciones = response;
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

        
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

    // ready(isCreado: any) {
    //     if (isCreado) {
    //         console.log(isCreado);
    //     } else {
    //         this.ciudadanoNew = false;
    //     }
    // }

    changedtipoIdentificacion(e) {
        this.ciudadanoEncontrado = 1;
        this.empresaEncontrada = 1;
    }

}