import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClaseService } from '../../../../services/clase.service';
import { ServicioService } from '../../../../services/servicio.service';
import { CiudadanoService } from '../../../../services/ciudadano.service';
import { MpersonalFuncionarioService } from '../../../../services/mpersonalFuncionario.service';
import { CfgLicenciaConduccionCategoriaService } from '../../../../services/cfgLicenciaConduccionCategoria.service';
import { RncLicenciaConduccionService } from '../../../../services/rncLicenciaConduccion.service';
import { PaisService } from '../../../../services/pais.service';
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
    @Input() factura: any = null;
    public errorMessage;
    public respuesta;
    public clases: any;
    public claseSelected: any;
    public servicios: any;
    public servicioSelected: any;
    public paises: any;
    public paisSelected: any;
    public tramiteFacturaSelected: any;
    public ciudadanoEncontrado=1;
    public tipoCambioSelected: any;
    public identificacion: any;
    public categorias: string[];
    public categoriaSelected: any;
    public datos = {
        'tramiteFormulario': null,
        'facturaId': null,
        'numeroLicenciaConduccion': null,
        'numeroRunt': null,
        'fechaExpedicion': null,
        'documentacion': null,
        'paisId': null,
        'categoriaId': null,
        'claseId': null,
        'servicioId': null,
        'ciudadanoId': null,
        'sedeOperativaId': null,
    };

    constructor(
        private _LoginService: LoginService,
        private _ClaseService: ClaseService,
        private _ServicioService: ServicioService,
        private _CiudadanoService: CiudadanoService,
        private _PaisService: PaisService,
        private _MpersonalFuncionarioService: MpersonalFuncionarioService,
        private _CfgLicenciaConduccionCategoriaService: CfgLicenciaConduccionCategoriaService,
        private _RncLicenciaConduccionService: RncLicenciaConduccionService,
    ) { }

    ngOnInit() {
        this._CfgLicenciaConduccionCategoriaService.select().subscribe(
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
    
    onEnviarTramite() {
        let token = this._LoginService.getToken();

        let identity = this._LoginService.getIdentity();

        this._MpersonalFuncionarioService.searchLogin(identity, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.datos.sedeOperativaId = response.data.sedeOperativa.id;
                    //Verificar la posibilidad de insertar solo la factura y/o el tramite
                    this.datos.facturaId = this.factura.id;
                    this.datos.tramiteFormulario = 'rnc-expedicionlicencia';
                    this.datos.numeroLicenciaConduccion = this.solicitante.identificacion;
                    this.datos.categoriaId = this.categoriaSelected;
                    this.datos.claseId = this.claseSelected;
                    this.datos.servicioId = this.servicioSelected;
                    this.datos.paisId = this.paisSelected;
                    this.datos.ciudadanoId = this.solicitante.id;

                    this._RncLicenciaConduccionService.register(this.datos, token).subscribe(
                        response => {
                            if (response.status == 'success') {
                                this.readyTramite.emit(this.datos);
                            } else {
                                swal({
                                    type: 'warning',
                                    title: 'Alerta!',
                                    text: "No se registro el trámite."
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
                }else{
                    swal({
                        type: 'warning',
                        title: 'Alerta!',
                        text: "Usted no tiene permisos para este trámite."
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

    onCancelar(){
        this.cancelarTramite.emit(true);
    }

    onKeyCiudadano(){
        let token = this._LoginService.getToken();
        this._CiudadanoService.searchByIdentificacion({'numeroIdentificacion':this.solicitante.identificacion},token).subscribe(
            response => {
                this.respuesta = response; 
                if(this.respuesta.status == 'success'){
                    this.solicitante = this.respuesta.data;
                    console.log(this.respuesta.data);
                    this.ciudadanoEncontrado= 2;
                }else{
                    this.ciudadanoEncontrado=3;
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

}