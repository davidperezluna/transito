import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClaseService } from '../../../../services/clase.service';
import { ServicioService } from '../../../../services/servicio.service';
import { CiudadanoService } from '../../../../services/ciudadano.service';
import { MpersonalFuncionarioService } from '../../../../services/mpersonalFuncionario.service';
import { PaisService } from '../../../../services/pais.service';
import { CfgLicenciaConduccionCategoriaService } from '../../../../services/cfgLicenciaConduccionCategoria.service';
import { RncLicenciaConduccionService } from '../../../../services/rncLicenciaConduccion.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnc-expedicion-licencia',
    templateUrl: './newRncExpedicionLicencia.html'
})
export class NewRncExpedicionLicenciaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() solicitante: any = null;
    @Input() tramiteFactura: any = null;
    public errorMessage;
    public respuesta;
    public funcionario: any = null;
    public clases: any;
    public claseSelected: any;
    public servicios: any;
    public servicioSelected: any;
    public paises: any;
    public paisSelected: any;
    public categorias: any;
    public categoriaSelected: any;
    public datos = {
        'numeroLicenciaConduccion': null,
        'numeroRunt': null,
        'fechaExpedicion': null,
        'documentacion': null,
        'tramiteFacturaId': null,
        'categoriaId': null,
        'paisId': null,
        'claseId': null,
        'servicioId': null,
        'sedeOperativaId': null,
        'ciudadanoId': null,
    };

    constructor(
        private _LoginService: LoginService,
        private _ClaseService: ClaseService,
        private _ServicioService: ServicioService,
        private _FuncionarioService: MpersonalFuncionarioService,
        private _CiudadanoService: CiudadanoService,
        private _CategoriaService: CfgLicenciaConduccionCategoriaService,
        private _LicenciaConduccionService: RncLicenciaConduccionService,
        private _PaisService: PaisService,
    ) { }

    ngOnInit() {
        this._CategoriaService.select().subscribe(
            response => {
                this.categorias = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );

        this._ClaseService.getClaseSelect().subscribe(
            response => {
              this.clases = response;
            },
            error => {
              this.errorMessage = <any>error;
      
              if(this.errorMessage != null){
                console.log(this.errorMessage);
                alert('Error en la petición');
              }
            }
        );

        this._ServicioService.getServicioSelect().subscribe(
            response => {
              this.servicios = response;
            },
            error => {
              this.errorMessage = <any>error;
      
              if(this.errorMessage != null){
                console.log(this.errorMessage);
                alert('Error en la petición');
              }
            }
        );

        this._PaisService.select().subscribe(
            response => {
              this.paises = response;
            },
            error => {
              this.errorMessage = <any>error;
      
              if(this.errorMessage != null){
                console.log(this.errorMessage);
                alert('Error en la petición');
              }
            }
        );
    }
    
    enviarTramite() {
        let token = this._LoginService.getToken();
        let identity = this._LoginService.getIdentity();

        this._FuncionarioService.searchLogin(identity, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.funcionario = response.data;

                    //this.datos.tramiteFactura = this.tramiteFactura.id;
                    this.datos.tramiteFacturaId = null;
                    this.datos.claseId = this.claseSelected;
                    this.datos.servicioId = this.servicioSelected;
                    this.datos.paisId = this.paisSelected;
                    this.datos.categoriaId = this.categoriaSelected;
                    this.datos.sedeOperativaId = this.funcionario.sedeOperativa.id;
                    this.datos.ciudadanoId = this.solicitante.id;

                    this._LicenciaConduccionService.register(this.datos, token).subscribe(
                        response => {
                            if (response.status == 'success') {
                                swal({
                                    type: 'info',
                                    title: 'Perfecto',
                                    text: response.message
                                });

                                //Registra en tramite solicitud
                                this.readyTramite.emit(this.datos);
                            } else {
                                swal({
                                    type: 'warning',
                                    title: 'Alerta',
                                    text: response.message
                                });
                            }
                        },
                        error => {
                            this.errorMessage = <any>error;
                            if (this.errorMessage != null) {
                                console.log(this.errorMessage);
                                alert('Error en la petición');
                            }
                        }
                    );
                } else {
                    swal({
                        type: 'warning',
                        title: 'Alerta',
                        text: response.message
                    });
                }
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
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}