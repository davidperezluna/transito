import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitud } from '../../tramiteSolicitud.modelo';
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


import swal from 'sweetalert2';

@Component({
    selector: 'appRna-cambio-acreedor-prendario',
    templateUrl: './newRna.CambioAcreedorPrendario.html'
})
export class NewRnaTramiteCambioAcreedorPrendarioComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() banco: any = null;
    @Input() factura: any = null;

    public placa: CfgPlaca = null;;
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
    public enviarEncontrado = 1;
    public empresaEncontrada = 1;
    public nit: any;
    public tipoIdentificacionSelected = null;
    public tipoIdentificacionNuevoAcreedorSelected = null;
    public listaAcreedoresVehiculo = false;
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
    public acreedor: any;
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
    public resumen = {};     
    public datos = {
        'acreedoresVehiculo': [],
        'acreedoresEmpresas': [],
        'acreedoresCiudadanos': [],
        'tipoAlerta': [],
        'gradoAlerta': null,
        'tramiteFormulario': null,
        'facturaId': null,
        'vehiculoPlaca': null,
        'vehiculoId': null,
        'ciudadanoOldId': null,
        'ciudadanoNewId': null,

    };
    public tipoIdentificaciones = [];
    public ciudadanoAcreedorNew:any;
    public identificacionNuevoAcreedor:any;

    constructor(
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
        let placaT = this.vehiculo.placa;
        this.datos.vehiculoPlaca = this.vehiculo.placa.numero;
        let token = this._loginService.getToken();
        
        this.datos.tipoAlerta = this.cfgTipoAlertaSelected;
        this.datos.gradoAlerta = this.gradoSelected;
        this.datos.facturaId = this.factura.id;
        this.datos.tramiteFormulario = 'rna-modificacion-acreedor-prendario-propietario';

        this.datos.ciudadanoNewId = this.ciudadanoAcreedorNew.id;
        this.datos.ciudadanoOldId = this.ciudadano.id;

        console.log(this.datos);
        
        this._VehiculoAcreedorService.deleteAcreedor(this.datos, token).subscribe(
            response => {
                this.respuesta = response;
                if (this.respuesta.status == 'success') {
                    this.ngOnInit();
                    this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
                    this.acreedorNew = false;

                    this.acreedorEncontrado = 2;

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


    onKeyAcreedor() {
        let token = this._loginService.getToken();
        let nombreAcreedor = {
            'nombreAcreedor': this.nombreAcreedor,
        };
    }

    onKeyCiudadano() {
        let token = this._loginService.getToken();
        let identificacion = {
            'numeroIdentificacion': this.identificacion,
        };
        this._CiudadanoService.searchByIdentificacion(identificacion,token).subscribe(
            response => {
                this.respuesta = response;
                if (this.respuesta.status == 'success') {
                    this.ciudadano = this.respuesta.data.ciudadano.id;
                    this.datos.ciudadanoOldId = this.ciudadano;
                    this._VehiculoAcreedorService.showAcreedorCiudadano(token, this.ciudadano).subscribe(
                        response => {
                            this.respuesta = response;
                            if (this.respuesta.status == 'success') {
                                this.acreedor = this.respuesta.data;
                                this.acreedorEncontrado = 2;
                                this.enviarEncontrado = 5;
  
                                    this.datos.acreedoresVehiculo.push(
                                        {
                                            'identificacion': this.acreedor.ciudadano.usuario.identificacion,
                                            'nombre': this.acreedor.ciudadano.usuario.primerNombre + " " + this.acreedor.ciudadano.usuario.segundoNombre,
                                            'ciudadanoId': this.acreedor.ciudadano.id,
                                            'tipoAlerta': this.acreedor.cfgTipoAlerta.nombre,
                                            'gradoAlerta': this.acreedor.gradoAlerta
                                        }
                                    );
                                    this.datos.acreedoresCiudadanos.push(
                                        {
                                            'identificacion': this.acreedor.ciudadano.usuario.identificacion,
                                            'nombre': this.acreedor.ciudadano.usuario.primerNombre + " " + this.acreedor.ciudadano.usuario.segundoNombre,
                                            'ciudadanoId': this.acreedor.ciudadano.id,
                                            'tipoAlerta': this.acreedor.cfgTipoAlerta.nombre,
                                            'gradoAlerta': this.acreedor.gradoAlerta
                                        }
                                    );

                                if (this.propietario) {
                                    this.propietario = false
                                }
                                this.acreedorEncontrado = 1;
                                this.listaAcreedoresVehiculo = true;
                                //this.ciudadanoNew = false;
                            } else {
                                this.acreedorEncontrado = 3;
                                //this.ciudadanoNew = true;
                            }
                            error => {
                                this.errorMessage = <any>error;

                                if (this.errorMessage != null) {
                                    console.log(this.errorMessage);
                                    alert("Error en la petición");
                                }
                            }
                        });

                } else {
                    this.ciudadanoEncontrado = 3;
                    //this.ciudadanoNew = true;
                }
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
            });
            console.log(this.datos);
    }

    onKeyCiudadanoNuevoAcreedor() {
        let token = this._loginService.getToken();
        let identificacionNuevoAcreedor = {
            'numeroIdentificacion': this.identificacionNuevoAcreedor,
        };
        this._CiudadanoService.searchByIdentificacion(identificacionNuevoAcreedor,token).subscribe(
            response => {
                this.respuesta = response;
                if (this.respuesta.status == 'success') {
                    this.ciudadanoAcreedorNew = this.respuesta.data;
                   
                } else {
                    this.ciudadanoEncontrado = 3;
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
                    this.acreedorSelected = this.respuesta.data.empresa.id;
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
        this._EmpresaService.showNit(token, this.nit).subscribe(
            response => {
                this.respuesta = response;
                if (this.respuesta.status == 'success') {
                    this.empresa = this.respuesta.data;
                   // this.empresaEncontrada = 2;
                    this._VehiculoAcreedorService.showAcreedorEmpresa(token, this.empresa).subscribe(
                        response => {
                            this.respuesta = response;
                            if (this.respuesta.status == 'success') {
                                this.acreedor = this.respuesta.data;
                                this.acreedorEncontrado = 2;
                                this.enviarEncontrado = 5;
                                // if (this.acreedor.empresa) {

                                    this.datos.acreedoresVehiculo.push(
                                        {
                                            'identificacion': this.acreedor.empresa.nit,
                                            'nombre': this.acreedor.empresa.nombre,
                                            'tipoAlerta': this.acreedor.cfgTipoAlerta.nombre,
                                            'gradoAlerta': this.acreedor.gradoAlerta,
                                            'empresaId': this.acreedor.empresa.id,
                                        }
                                    );
                                    this.datos.acreedoresEmpresas.push(
                                        {
                                            'identificacion': this.acreedor.empresa.nit,
                                            'nombre': this.acreedor.empresa.nombre,
                                            'tipoAlerta': this.acreedor.cfgTipoAlerta.nombre,
                                            'gradoAlerta': this.acreedor.gradoAlerta,
                                            'empresaId': this.acreedor.empresa.id,
                                        }
                                    );
                                // }

                                if (this.propietario) {
                                    this.propietario = false
                                }
                                this.acreedorEncontrado = 1;
                                this.listaAcreedoresVehiculo = true;
                                //this.ciudadanoNew = false;
                            } else {
                                this.empresaEncontrada = 3;
                                //this.ciudadanoNew = true;
                            }
                            error => {
                                this.errorMessage = <any>error;

                                if (this.errorMessage != null) {
                                    console.log(this.errorMessage);
                                    alert("Error en la petición");
                                }
                            }
                        });
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
        
        console.log(this.datos.acreedoresCiudadanos);
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

    btnCancelarCiudadano() {
        this.ciudadanoEncontrado = 1
    }

    btnCancelarEmpresa() {
        this.empresaEncontrada = 1
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
    changedtipoIdentificacionNuevoAcreedor(e) {
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

}