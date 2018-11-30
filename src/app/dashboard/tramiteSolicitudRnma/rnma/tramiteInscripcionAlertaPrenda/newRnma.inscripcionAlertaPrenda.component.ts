import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitud } from '../../tramiteSolicitudRnma.modelo';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { BancoService } from '../../../../services/banco.service';
import { CfgPlaca } from '../../../cfgPlaca/cfgPlaca.modelo';
import { LoginService } from '../../../../services/login.service';
import { CfgTipoAlertaService } from '../../../../services/cfgTipoAlerta.service';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { VehiculoAcreedorService } from '../../../../services/vehiculoAcreedor.service';
import { CiudadanoService } from '../../../../services/ciudadano.service';
import { Router } from "@angular/router";
import { EmpresaService } from "../../../../services/empresa.service";
import { TipoIdentificacionService } from '../../../../services/tipoIdentificacion.service';
import { CfgEntidadJudicialService } from '../../../../services/cfgEntidadJudicial.service';


import swal from 'sweetalert2';

@Component({
    selector: 'appRnma-inscripcion-alerta-prenda',
    templateUrl: './newRnma.inscripcionAlertaPrenda.html'
})
export class NewRnmaTramiteInscripcionAlertaPrendaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() banco: any = null;
    @Input() factura: any = null;
    @Input() tramitesFactura: any = null;

    public placa: CfgPlaca = null;
    public errorMessage;
    public respuesta;
    public cfgTiposAlerta: any;
    public tramiteFacturaSelected: any;
    public ciudadano: any;
    public nombreAcreedor: any;
    public empresa: any;
    public empresaSelected: any;
    public identificacion: any;
    public identificacionAcreedor: any;
    public ciudadanoEncontrado = 1;
    public acreedorEncontrado = 1;
    public empresaEncontrada = 1;
    public nit: any;
    public tipoIdentificacionSelected = null;
    public listaAcreedoresCiudadanos = false;
    public listaAcreedoresEmpresas = false;
    public ciudadanoNew = false;
    public pignorado = false;
    public tramiteRealizado: any;
    public cfgTipoAlertaSelected: any;
    public gradoSelected: any;
    public acreedorSelected: any;
    public acreedorNew = false;
    public propietario = true;
    public propietarioPresente = false;
    public ciudadanoSelected: any;
    public acreedor = 'false';
    public vehiculosAcreedor;
    public cfgEntidadJudiciales: any;
    public cfgEntidadJudicialSelected: any;
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
    public resumen = {};     
    public datos = {
        'acreedoresEmpresas': [],
        'acreedoresCiudadanos': [],
        'tipoAlerta': [],
        'gradoAlerta': null,
        'tramiteFormulario': null,
        'idFactura': null,
        'vehiculoPlaca': null,
        'cfgEntidadJudicial':null
    };
    public datos2 = {
        'vehiculoId': null,
        'bancoId': null,
    }
    public tipoIdentificaciones = [];

    constructor(
        private _CfgEntidadJudicialService: CfgEntidadJudicialService,
        private _CfgTipoAlertaService: CfgTipoAlertaService,
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _BancoService: BancoService,
        private _loginService: LoginService,
        private _tramiteFacturaService: TramiteFacturaService,
        private _VehiculoService: VehiculoService,
        private _VehiculoAcreedorService: VehiculoAcreedorService,
        private _tipoIdentificacionService: TipoIdentificacionService,
        private _CiudadanoService: CiudadanoService,
        private router: Router,
        private _EmpresaService: EmpresaService,
    ) { }
 
    ngOnInit() {

        this._CfgEntidadJudicialService.getEntidadJudicialSelect().subscribe(
            response => {
                this.cfgEntidadJudiciales = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        )

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
        let placaT = this.vehiculo.placa;
        this.datos.vehiculoPlaca = this.vehiculo.placa.numero;
        let token = this._loginService.getToken();
        
        this.datos.tipoAlerta = this.cfgTipoAlertaSelected;
        this.datos.gradoAlerta = this.gradoSelected;
        this.datos.idFactura = this.factura.id;
        this.datos.cfgEntidadJudicial = this.cfgEntidadJudicialSelected;
        this.datos.tramiteFormulario = 'rnma-inscripcionalertaprenda';
               
        this._VehiculoAcreedorService.register(this.datos, token).subscribe(
            response => {
                this.respuesta = response;
                if (this.respuesta.status == 'success') {
                    // this.vehiculoAcreedor = this.respuesta.data;
                    // this.ngOnInit();
                    // this.datos.tipoAlerta = this.cfgTipoAlertaSelected;
                    // this.datos.gradoAlerta = this.gradoSelected;
                    // this.datos.tramiteFactura = 46;
                    // this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
                    // this.acreedorNew = false;
                    this.vehiculo.pignorado = true;

                    this._VehiculoService.editVehiculoPignorado(this.vehiculo, token).subscribe(
                        response => {
                            this.respuesta = response;
                            if (this.respuesta.status == 'success') {
                                // this.vehiculoAcreedor = this.respuesta.data;
                                this.ngOnInit();
                                // this.datos.tipoAlerta = this.cfgTipoAlertaSelected;
                                // this.datos.gradoAlerta = this.gradoSelected;
                                // this.datos.tramiteFactura = 46;
                                this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
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

                    // this.acreedorEncontrado = 2;
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

  
    // btnNewAcreedor() {
    //     let token = this._loginService.getToken();
    //     //this.acreedorNew = true;
    //     this.acreedores.push(
    //         {
    //             'id':this.banco.id,
    //             'nombre':this.banco.nombre
    //         }
    //     )
        
    // }

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
                    // this.datos2.vehiculo = this.vehiculo.id;
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

    onKeyCiudadano() {
        let token = this._loginService.getToken();
        let identificacion = {
            'numeroIdentificacion': this.identificacion,
        };
        this._CiudadanoService.searchByIdentificacion(token, identificacion).subscribe(
            response => {
                this.respuesta = response;
                if (this.respuesta.status == 'success') {
                    this.ciudadano = this.respuesta.data;
                    this.ciudadanoEncontrado = 2;
                    this.ciudadanoNew = false;
                } else {
                    this.ciudadanoEncontrado = 3;
                    this.ciudadanoNew = true;
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

    onKeyApoderado() {
        let token = this._loginService.getToken();
        let identificacion = {
            'numeroIdentificacion': this.identificacionAcreedor,
        };
        this._CiudadanoService.searchByIdentificacion(token, identificacion).subscribe(
            response => {
                this.respuesta = response;
                if (this.respuesta.status == 'success') {
                    this.acreedorSelected = this.respuesta.data;
                    this.acreedorEncontrado = 2;
                    // this.ciudadanoNew = false;
                } else {
                    this.acreedorEncontrado = 3;
                    // this.ciudadanoNew = true;
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

    onKeyEmpresa() {
        let token = this._loginService.getToken();
        let nit = {
            'nit': this.nit,
        };

        this._EmpresaService.showNit(token, nit).subscribe(
            response => {
                this.respuesta = response;
                if (this.respuesta.status == 'success') {
                    this.empresa = this.respuesta.data;
                    this.empresaEncontrada = 2;
                } else {
                    this.empresaEncontrada = 3;
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

    goEmpresa() {
        this.router.navigate(['/dashboard/empresa']);
    }

    btnCancelarAcreedor() {
        this.acreedorEncontrado = 1
    }

    btnNewCiudadano() {
        
            this.datos.acreedoresCiudadanos.push(
                {
                    'identificacion': this.ciudadano.identificacion,
                    'nombre': this.ciudadano.primerNombre + " " + this.ciudadano.segundoNombre
                }
            );
        
            if (this.propietario) {
                this.propietario = false
            }
        
        this.ciudadanoEncontrado = 1;
        this.listaAcreedoresCiudadanos = true;
    }

    btnNewEmpresa() {
            this.datos.acreedoresEmpresas.push(
                {
                    'nit': this.empresa.nit,
                    'nombre': this.empresa.nombre,
                }
            );
        
            if (this.propietario) {
                this.propietario = false
            }
        
        this.empresaEncontrada = 1;
        this.listaAcreedoresEmpresas = true;
    }

    btnNewAcreedor() {
        if (this.acreedor == 'ciudadano') {
            this.datos.acreedoresCiudadanos = this.datos.acreedoresCiudadanos.filter(h => h !== this.ciudadanoSelected[0]);
            this.datos.acreedoresCiudadanos.push(
                {
                    'identificacion': this.ciudadanoSelected[0].identificacion,
                    'nombre': this.ciudadanoSelected[0].nombre,
                    // 'permisoTramite': this.ciudadanoSelected[0].permisoTramite,
                    'identificacionAcreedor': this.acreedorSelected.identificacion,
                    // 'nombreAcreedor': this.acreedorSelected.primerNombre + " " + this.acreedorSelected.segundoNombre,
                }
            )
            this.acreedor = 'false'
            this.tipoIdentificacionSelected = [this.tipoIdentificacionSelected];
            this.listaAcreedoresCiudadanos = true;
        }
        if (this.acreedor == 'empresa') {
            this.datos.acreedoresEmpresas = this.datos.acreedoresEmpresas.filter(h => h !== this.empresaSelected[0]);
            this.datos.acreedoresEmpresas.push(
                {
                    'nit': this.empresaSelected[0].nit,
                    'nombre': this.empresaSelected[0].nombre,
                    'permisoTramite': this.empresaSelected[0].permisoTramite,
                    'identificacionAcreedor': this.acreedorSelected.identificacion,
                    'nombreAcreedor': this.acreedorSelected.primerNombre + " " + this.acreedorSelected.segundoNombre,
                }
            );
            this.acreedor = 'false'
            this.tipoIdentificacionSelected = [this.tipoIdentificacionSelected];
            this.listaAcreedoresEmpresas = true;
        }
    }



    changedtipoIdentificacion(e) {
        this.ciudadanoEncontrado = 1;
        this.empresaEncontrada = 1;
    }


    delete(acreedor:any): void{
        this.datos.acreedoresCiudadanos = this.datos.acreedoresCiudadanos.filter(h => h !== acreedor);
        if (this.datos.acreedoresCiudadanos.length === 0) {
            this.listaAcreedoresCiudadanos = false;
        }
    }
    deleteEmpresa(empresa: any): void {
        this.datos.acreedoresEmpresas = this.datos.acreedoresEmpresas.filter(h => h !== empresa);
        if (this.datos.acreedoresEmpresas.length === 0) {
            this.listaAcreedoresEmpresas = false;
        }
    }

    ready(isCreado: any) {
    if (isCreado) {
      console.log(isCreado);
      // this.onKeyCiudadano();
        this.acreedorNew = false;
        // this.acreedorEncontrado = 2;
    } else {
      this.acreedorNew = false;
      this.ciudadanoNew = false;
    }
  }

    btnCancelarCiudadano() {
        this.ciudadanoEncontrado = 1
    }

    btnCancelarEmpresa() {
        this.empresaEncontrada = 1
    }
}