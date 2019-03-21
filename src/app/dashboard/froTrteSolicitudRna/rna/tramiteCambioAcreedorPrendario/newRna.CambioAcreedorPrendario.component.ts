import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { VhloCfgPlaca } from '../../../vhloCfgPlaca/vhloCfgPlaca.modelo';
import { LoginService } from '../../../../services/login.service';
import { CfgTipoAlertaService } from '../../../../services/cfgTipoAlerta.service';
import { VhloAcreedorService } from '../../../../services/vhloAcreedor.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { UserEmpresaService } from "../../../../services/userEmpresa.service";
import { UserCfgTipoIdentificacionService } from '../../../../services/userCfgTipoIdentificacion.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { Router } from "@angular/router";


import swal from 'sweetalert2';

@Component({
    selector: 'appRna-cambio-acreedor-prendario',
    templateUrl: './newRna.CambioAcreedorPrendario.html'
})
export class NewRnaTramiteCambioAcreedorPrendarioComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    public errorMessage; public autorizado: any = true;

    public placa: VhloCfgPlaca = null;;
    public cfgTiposAlerta: any;
    public tramiteSolicitud: any = null;
    public ciudadano: any = null;
    public nombreAcreedor: any;
    public empresa: any = null;
    public empresaSelected: any;
    public identificacion: any;
    public identificacionAcreedor: any;

    public acreedorEncontrado = 1;
    public enviarEncontrado = 1;
    public empresaEncontrada = 1;
    public nit: any;
    public nitnewAcredor: any;
    public tipoIdentificacionSelected = null;
    public tipoIdentificacionNuevoAcreedorSelected = null;
    public listaAcreedoresVehiculo = false;
    public listaAcreedoresCiudadanos = false;
    public listaAcreedoresEmpresas = false;
    public ciudadanoNew = false;
    public pignorado = false;

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
    
    public datos = {
        'acreedores': [],
        'tipoAlerta': [],
        'gradoAlerta': null,
        'vehiculoPlaca': null,
        'idCiudadanoOld': null,
        'idCiudadanoNew': null,
        'idEmpresaNew': null,
        'idFuncionario': null,
        'idVehiculo': null,
        'idTramiteFactura': null,

    };
    public tiposIdentificacion: any;
    public ciudadanoAcreedorNew:any;
    public empresaAcreedorNew:any;
    public identificacionNuevoAcreedor:any;

    constructor(
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _TramiteFacturaService: FroFacTramiteService,
        private _CfgTipoAlertaService: CfgTipoAlertaService,
        private _VehiculoAcreedorService: VhloAcreedorService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _CiudadanoService: UserCiudadanoService,
        private _EmpresaService: UserEmpresaService,
        private _FuncionarioService: PnalFuncionarioService,
        private _LoginService: LoginService,
        private router: Router,
    ) { }
 
    ngOnInit() {
        let token = this._LoginService.getToken();

        let identity = this._LoginService.getIdentity();

        this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.datos.idFuncionario = response.data.id;
                    this.autorizado = true;

                    this._TramiteFacturaService.show({ 'id': this.tramiteFactura.id }, token).subscribe(
                        response => {
                            if (response.code == 200) {
                                this.tramiteFactura = response.data;

                                swal.close();
                            } else {
                                this.tramiteFactura = null;

                                swal({
                                    title: 'Error!',
                                    text: response.message,
                                    type: 'error',
                                    confirmButtonText: 'Aceptar'
                                });
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

                    if (this.tramiteFactura.realizado) {
                        this._TramiteSolicitudService.showByTamiteFactura({ 'idTramiteFactura': this.tramiteFactura.id }, token).subscribe(
                            response => {
                                if (response.code == 200) {
                                    this.tramiteSolicitud = response.data;
                                } else {
                                    this.tramiteSolicitud = null;

                                    swal({
                                        title: 'Error!',
                                        text: response.message,
                                        type: 'error',
                                        confirmButtonText: 'Aceptar'
                                    });
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
                    } else {
                        this._TipoIdentificacionService.select().subscribe(
                            response => {
                                this.tiposIdentificacion = response;
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

                        this._VehiculoAcreedorService.index().subscribe(
                            response => {
                                if (response.status == 'success') {
                                    this.vehiculosAcreedor = response.data;
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
                } else {
                    this.autorizado = false;

                    swal({
                        title: 'Error!',
                        text: 'Usted no tiene permisos para realizar tramites',
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
                error => {
                    this.errorMessage = <any>error;
                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert('Error en la petición');
                    }
                }
            }
        );
    }    
    
    onEnviar() {
        let placaT = this.vehiculo.placa;
        this.datos.vehiculoPlaca = this.vehiculo.placa.numero;
        let token = this._LoginService.getToken();
        
        this.datos.tipoAlerta = this.cfgTipoAlertaSelected;
        this.datos.gradoAlerta = this.gradoSelected;
        this.datos.idVehiculo = this.vehiculo.id;
        this.datos.idTramiteFactura = this.tramiteFactura.id;

        if (this.ciudadanoAcreedorNew) {
            this.datos.idCiudadanoNew = this.ciudadanoAcreedorNew.id;
        }else{
            this.datos.idEmpresaNew = this.empresaAcreedorNew.id;
        }

        this._VehiculoAcreedorService.delete(this.datos, token).subscribe(
            response => {
                response = response;
                if (response.status == 'success') {
                    let resumen = "<b>No. factura: </b>" + this.tramiteFactura.factura.numero;

                    this.readyTramite.emit({'foraneas':this.datos, 'resumen': resumen});
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

    onKeyAcreedor() {
        let token = this._LoginService.getToken();
        let nombreAcreedor = {
            'nombreAcreedor': this.nombreAcreedor,
        };
    }

    onSearchCiudadano() {
        swal({
            title: 'Buscando ciudadano!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._LoginService.getToken();

        let datos = {
            'identificacion': this.identificacion,
            'idTipoIdentificacion': this.tipoIdentificacionSelected,
        }

        this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
            response => {
                if (response.code == 200) {
                    if (response.data.ciudadano) {
                        this.ciudadano = response.data.ciudadano;
                        this.datos.idCiudadanoOld = this.ciudadano;

                        this._VehiculoAcreedorService.searchByCiudadanoOrEmpresa({ 'idCiudadano': this.ciudadano.id, 'tipo': 'CIUDADANO' },token).subscribe(
                            response => {
                                if (response.status == 'success') {
                                    this.acreedor = response.data;
                                   
                                    this.datos.acreedores.push(
                                        {
                                            'idAcreedor': this.acreedor.id,
                                            'identificacion': this.acreedor.ciudadano.identificacion,
                                            'nombre': this.acreedor.ciudadano.primerNombre + " " + this.acreedor.ciudadano.segundoNombre,
                                            'tipoAlerta': this.acreedor.cfgTipoAlerta.nombre,
                                            'gradoAlerta': this.acreedor.gradoAlerta,
                                            'tipo': 'CIUDADANO'
                                        }
                                    );
                                } else {
                                    this.acreedor = null;
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
                } else {
                    this.ciudadano = null;

                    swal({
                        title: 'Error!',
                        text: response.message,
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
                error => {
                    this.errorMessage = <any>error;
                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert('Error en la petición');
                    }
                }
            }
        );
    }

    onKeyCiudadanoNuevoAcreedor() {
        let token = this._LoginService.getToken();
        let identificacionNuevoAcreedor = {
            'numeroIdentificacion': this.identificacionNuevoAcreedor,
        };
        this._CiudadanoService.searchByIdentificacion(identificacionNuevoAcreedor,token).subscribe(
            response => {
                response = response;
                if (response.status == 'success') {
                    this.ciudadanoAcreedorNew = response.data;
                   
                } else {
                    //this.ciudadanoEncontrado = 3;
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
        let token = this._LoginService.getToken();
        let nit = {
            'nit': this.nit,
        };
        
        this._EmpresaService.showByNit(token, nit).subscribe(
            response => {
                response = response;
                if (response.status == 'success') {
                    this.empresa = response.data;
                   // this.empresaEncontrada = 2;
                    this._VehiculoAcreedorService.showAcreedorEmpresa(token, this.empresa).subscribe(
                        response => {
                            response = response;
                            if (response.status == 'success') {
                                this.acreedor = response.data;
                                this.acreedorEncontrado = 2;
                                this.enviarEncontrado = 5;
                                // if (this.acreedor.empresa) {
                                    this.datos.acreedores.push(
                                        {
                                            'identificacion': this.acreedor.empresa.nit,
                                            'nombre': this.acreedor.empresa.nombre,
                                            'tipoAlerta': this.acreedor.cfgTipoAlerta.nombre,
                                            'gradoAlerta': this.acreedor.gradoAlerta,
                                            'empresaId': this.acreedor.empresa.id,
                                        }
                                    );
                                    this.datos.acreedores.push(
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

    onKeyEmpresaNuevoAcreedor() {
        let token = this._LoginService.getToken();
        let nit = {
            'nit': this.nitnewAcredor,
        };
        
        this._EmpresaService.showByNit(token, nit).subscribe(
            response => {
                response = response;
                if (response.status == 'success') {
                    this.empresaAcreedorNew = response.data;
                    console.log(this.empresaAcreedorNew);
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
        
            this.datos.acreedores.push(
                {
                    'identificacion': this.ciudadano.identificacion,
                    'nombre': this.ciudadano.primerNombre + " " + this.ciudadano.segundoNombre
                }
            );
        
            if (this.propietario) {
                this.propietario = false
            }
        
        console.log(this.datos.acreedores);
        //this.ciudadanoEncontrado = 1;
        this.listaAcreedoresCiudadanos = true;
    }

    btnNewEmpresa() {
            this.datos.acreedores.push(
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
        //this.ciudadanoEncontrado = 1
    }

    btnCancelarEmpresa() {
        this.empresaEncontrada = 1
    }

    btnNewAcreedor() {
        if (this.acreedor == 'ciudadano') {
            this.datos.acreedores = this.datos.acreedores.filter(h => h !== this.ciudadanoSelected[0]);
            this.datos.acreedores.push(
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
            this.datos.acreedores = this.datos.acreedores.filter(h => h !== this.empresaSelected[0]);
            this.datos.acreedores.push(
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
       // this.ciudadanoEncontrado = 1;
        this.empresaEncontrada = 1;
    }

    changedtipoIdentificacionNuevoAcreedor(e) {
       // this.ciudadanoEncontrado = 1;
        this.empresaEncontrada = 1;
    }

    delete(acreedor:any): void{
        this.datos.acreedores = this.datos.acreedores.filter(h => h !== acreedor);
        if (this.datos.acreedores.length === 0) {
            this.listaAcreedoresCiudadanos = false;
        }
    }
    
    deleteEmpresa(empresa: any): void {
        this.datos.acreedores = this.datos.acreedores.filter(h => h !== empresa);
        if (this.datos.acreedores.length === 0) {
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