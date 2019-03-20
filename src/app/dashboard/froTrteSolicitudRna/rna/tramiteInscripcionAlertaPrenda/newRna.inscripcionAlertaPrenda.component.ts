import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { BancoService } from '../../../../services/banco.service';
import { VhloCfgPlaca } from '../../../vhloCfgPlaca/vhloCfgPlaca.modelo';
import { VhloCfgTipoAlertaService } from '../../../../services/vhloCfgTipoAlerta.service';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { VehiculoAcreedorService } from '../../../../services/vehiculoAcreedor.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { UserEmpresaService } from "../../../../services/userEmpresa.service";
import { UserCfgTipoIdentificacionService } from '../../../../services/userCfgTipoIdentificacion.service';
import { CfgEntidadJudicialService } from '../../../../services/cfgEntidadJudicial.service';
import { LoginService } from '../../../../services/login.service';
import { Router } from "@angular/router";
import { DatePipe  } from '@angular/common';


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
    @Input() tramiteFactura: any = null;
    public errorMessage;
 
    public placa: VhloCfgPlaca = null;

    public tramiteSolicitud: any = null;
    public tiposAlerta: any;
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
    public entidadJudiciales: any;
    public acreedor = 'false';
    public vehiculosAcreedor;
    public table: any;
    public formIndex = true;
    public vehiculoAcreedor: any; 
    public acreedores:any=[];
    public date:any;

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
        'acreedoresEmpresas': [],
        'acreedoresCiudadanos': [],
        'gradoAlerta': null,
        'vehiculoPlaca': null,
        'fechaExpedicion':null,
        'idTipoAlerta': null,
        'idEntidadJudicial':null,
        'idTramiteFactura': null,
    };

    public datos2 = {
        'vehiculoId': null,
        'bancoId': null,
    }
    public tiposIdentificacion = [];

    constructor(
        private _EntidadJudicialService: CfgEntidadJudicialService,
        private _TipoAlertaService: VhloCfgTipoAlertaService,
        private _VehiculoService: VehiculoService,
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _TramiteFacturaService: FroFacTramiteService,
        private _BancoService: BancoService,
        private _VehiculoAcreedorService: VehiculoAcreedorService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _UserCiudadanoService: UserCiudadanoService,
        private _EmpresaService: UserEmpresaService,
        private _LoginService: LoginService,
        private router: Router,
    ) { }
 
    ngOnInit() {
        let token = this._LoginService.getToken();

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
            this.date = new Date();
            var datePiper = new DatePipe(this.date);
            this.datos.fechaExpedicion = datePiper.transform(this.date, 'yyyy-MM-dd');

            this._EntidadJudicialService.select().subscribe(
                response => {
                    this.entidadJudiciales = response;
                },
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert('Error en la petición');
                    }
                }
            );

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

            this._TipoAlertaService.select().subscribe(
                response => {
                    this.tiposAlerta = response;
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
                    if (response.status == 'success') {
                        this.vehiculosAcreedor = response.data;

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
                }
            ); 
        }
    }    
    
    onEnviar() {
        // this.datos.vehiculo = this.vehiculo.placa;
        //this.datos.banco = this.banco.nombre;
        let placaT = this.vehiculo.placa;
        this.datos.vehiculoPlaca = this.vehiculo.placa.numero;
        let token = this._LoginService.getToken();

        this.datos.idTramiteFactura = this.tramiteFactura.id;
        
        this._VehiculoAcreedorService.register(this.datos, token).subscribe(
            response => {
                if (response.status == 'success') {
                    // this.vehiculoAcreedor = response.data;
                    // this.ngOnInit();
                    // this.datos.tipoAlerta = this.cfgTipoAlertaSelected;
                    // this.datos.gradoAlerta = this.gradoSelected;
                    // this.datos.tramiteFactura = 46;
                    // this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
                    // this.acreedorNew = false;
                    this.vehiculo.pignorado = true;

                    this._VehiculoService.editVehiculoPignorado(this.vehiculo, token).subscribe(
                        response => {
                            if (response.status == 'success') {
                                // this.vehiculoAcreedor = response.data;
                                this.ngOnInit();
                                
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
    //     let token = this._LoginService.getToken();
    //     //this.acreedorNew = true;
    //     this.acreedores.push(
    //         {
    //             'id':this.banco.id,
    //             'nombre':this.banco.nombre
    //         }
    //     )
        
    // }

    onKeyAcreedor() {
        let token = this._LoginService.getToken();
        let nombreAcreedor = {
            'nombreAcreedor': this.nombreAcreedor,
        };
        this._BancoService.showAcreedorNombre(token, nombreAcreedor).subscribe(
            response => {
                if (response.status == 'success') {
                    this.banco = response.data;
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
        let token = this._LoginService.getToken();
        let identificacion = {
            'numeroIdentificacion': this.identificacion,
        };
        this._UserCiudadanoService.searchByIdentificacion(identificacion,token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.ciudadano = response.data;
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
        let token = this._LoginService.getToken();
        let identificacion = {
            'numeroIdentificacion': this.identificacionAcreedor,
        };
        this._UserCiudadanoService.searchByIdentificacion(token, identificacion).subscribe(
            response => {
                if (response.status == 'success') {
                    this.acreedorSelected = response.data;
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
        let token = this._LoginService.getToken();
        let nit = {
            'nit': this.nit,
        };

        this._EmpresaService.showByNit(token, nit).subscribe(
            response => {
                if (response.status == 'success') {
                    this.empresa = response.data;
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