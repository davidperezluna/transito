import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { UserLicenciaConduccion } from '../userLicenciaConduccion.modelo';
import { UserLicenciaConduccionService } from '../../../../../services/userLicenciaConduccion.service';
import { LoginService } from '../../../../../services/login.service';
import { UserCfgTipoIdentificacionService } from '../../../../../services/userCfgTipoIdentificacion.service';
import { UserCiudadanoService } from '../../../../../services/userCiudadano.service';
import { UserLcRestriccionService } from '../../../../../services/userLcRestriccion.service';


import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
    @Input() licenciaConduccion: any = null;
    public errorMessage;
    public licenciasConduccion;

    public identificacion;
    public tiposIdentificacion: any;
    public tipoIdentificacionSelected: any;

    public table: any;
    public datos = {
        'horasComunitarias': false,
        'idLicenciaConduccion':null, 
    };

    public formIndex = true;
    public formNewLicencia = false;
    public formCancelacion = false;
    public formSuspension = false;
    public formDevolucion = false;

    public ciudadano: any = null;
    public comparendoSelect: any = null;
    public comparendos: any = null;

    constructor(
        private _LicenciaConduccionService: UserLicenciaConduccionService,
        private _LoginService: LoginService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _UserCiudadanoService: UserCiudadanoService,
        private _UserLcRestriccionService: UserLcRestriccionService,
    ) { }

    ngOnInit() {

        this._TipoIdentificacionService.select().subscribe(
            response => {
              this.tiposIdentificacion = response;
              swal.close();
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

    onSearchCiudadano() {
        let token = this._LoginService.getToken();

        this._UserCiudadanoService.searchByIdentificacion({ 'idTipoIdentificacion': this.tipoIdentificacionSelected,'identificacion': this.identificacion }, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.ciudadano = response.data.ciudadano;
                    this._LicenciaConduccionService.searchByCiudadanoId({ 'idCiudadano': this.ciudadano.id }, token).subscribe(
                        response => {
                            if (response.code == 200) {
                                this.licenciasConduccion = response.data.licenciasConduccion;
                                this.comparendos = response.data.comparendos;
                                swal({
                                    title: 'Perfecto!',
                                    text: response.message,
                                    type: 'success',
                                    confirmButtonText: 'Aceptar'
                                });
                                let timeoutId = setTimeout(() => {
                                    this.onInitTable();
                                }, 200);
                            } else {
                                if(response.code == 401){
                                    swal({
                                        title: 'Alerta!',
                                        text: response.message,
                                        type: 'error',
                                        confirmButtonText: 'Aceptar'
                                    });
                                }else{
                                    this.formNewLicencia=true;
                                    this.formIndex=false;
                                    swal({
                                        title: 'Alerta!',
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
                    }
                );
                } else {
                    swal({
                        title: 'Alerta!',
                        text: response.message,
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                    error => {
                        this.errorMessage = <any>error;
                        if (this.errorMessage != null) {
                            console.log(this.errorMessage);
                            alert("Error en la petición");
                        }
                    }
                }
        });       
    }

    onInitTable() {
        this.table = $('#dataTables-example').DataTable({
            responsive: false,
            pageLength: 6,
            sPaginationType: 'full_numbers',
            buttons: 'Excel',
            oLanguage: {
                oPaginate: {
                    sFirst: '<i class="fa fa-step-backward"></i>',
                    sPrevious: '<i class="fa fa-chevron-left"></i>',
                    sNext: '<i class="fa fa-chevron-right"></i>',
                    sLast: '<i class="fa fa-step-forward"></i>'
                }
            }
        });
        this.table = $('#dataTables-example-comparendos').DataTable({
            responsive: false,
            pageLength: 6,
            sPaginationType: 'full_numbers',
            buttons: 'Excel',
            oLanguage: {
                oPaginate: {
                    sFirst: '<i class="fa fa-step-backward"></i>',
                    sPrevious: '<i class="fa fa-chevron-left"></i>',
                    sNext: '<i class="fa fa-chevron-right"></i>',
                    sLast: '<i class="fa fa-step-forward"></i>'
                }
            }
        });
    }

    newActa(){
        let token = this._LoginService.getToken();
        
        this.datos.idLicenciaConduccion = this.licenciaConduccion.id;

        this._UserLcRestriccionService.pdfGenerarAuto(this.datos, token).subscribe((response)=>{     
            var fileURL = URL.createObjectURL(response);
            var myWindow = window.open(fileURL);
            myWindow.focus();
            this.ready(true);
        });
    } 

    ready(isCreado: any) {
        if (isCreado) {
            this.onSearchCiudadano();
            this.formSuspension = false;
            this.formCancelacion = false;
            this.formDevolucion = false;
            this.formNewLicencia = false;
            this.formIndex = true;

        }
    }
    
    newCancelacion(licenciaConduccion: any){
        this.licenciaConduccion = licenciaConduccion;
        this.formIndex = false;
        this.formNewLicencia = false;
        this.formSuspension = false;
        this.formCancelacion = true;
        this.formDevolucion = false;

    }

    newDevolucion(licenciaConduccion: any){
        this.licenciaConduccion = licenciaConduccion;
        this.formIndex = false;
        this.formNewLicencia = false;
        this.formSuspension = false;
        this.formCancelacion = false;
        this.formDevolucion = true;
    }

    onCancelarDevolucion(licenciaConduccion: any){
        this.licenciaConduccion = licenciaConduccion;
        this.formIndex = true;
        this.formNewLicencia = false;
        this.formSuspension = false;
        this.formCancelacion = false;
        this.formDevolucion = false;
    }

    newSuspension(licenciaConduccion: any){
        this.licenciaConduccion = licenciaConduccion;
        this.formIndex = false;
        this.formNewLicencia = false;
        this.formCancelacion = false;
        this.formSuspension = true;
        this.formDevolucion = false;

    }
} 