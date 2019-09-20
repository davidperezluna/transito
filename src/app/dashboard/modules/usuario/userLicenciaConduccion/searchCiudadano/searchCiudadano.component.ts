import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { UserLicenciaConduccion } from '../userLicenciaConduccion.modelo';
import { UserLicenciaConduccionService } from '../../../../../services/userLicenciaConduccion.service';
import { LoginService } from '../../../../../services/login.service';
import { UserCfgTipoIdentificacionService } from '../../../../../services/userCfgTipoIdentificacion.service';
import { UserCiudadanoService } from '../../../../../services/userCiudadano.service';
import { UserLicenciaConduccionRestriccionService } from '../../../../../services/userLicenciaConduccionRestriccion.service';


import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-searchCiudadano',
    templateUrl: './searchCiudadano.component.html'
})
export class SearchCiudadanoComponent implements OnInit {
    @Input() licenciaConduccion: any = null;
    public errorMessage;
    public licenciasConduccion;

    public identificacion;
    public tiposIdentificacion: any;
    public tipoIdentificacionSelected: any;

    public table: any;
    public datos = {
        'horasComunitarias':null,
        'idLicenciaConduccion':null 
    };

    public formIndex = true;


    public ciudadano = false;

    constructor(
        private _LicenciaConduccionService: UserLicenciaConduccionService,
        private _LoginService: LoginService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _UserCiudadanoService: UserCiudadanoService,
        private _UserLicenciaConduccionRestriccionService: UserLicenciaConduccionRestriccionService,
    ) { }

    ngOnInit() {

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

    }

    onSearchCiudadano() {
        let token = this._LoginService.getToken();

        this._UserCiudadanoService.searchByIdentificacion({ 'idTipoIdentificacion': this.tipoIdentificacionSelected,'identificacion': this.identificacion }, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.ciudadano = response.data.ciudadano;
                    console.log(this.ciudadano);
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
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
    }

    newActa(){
        let token = this._LoginService.getToken();
        this.datos.idLicenciaConduccion = this.licenciaConduccion.id;
        this._UserLicenciaConduccionRestriccionService.pdfGenerarAuto(this.datos, token).subscribe((response)=>{     
            var fileURL = URL.createObjectURL(response);
            var myWindow = window.open(fileURL);
            myWindow.focus();
        });
    }

} 