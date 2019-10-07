import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { UserLcProhibicionService } from '../../../../../services/userLcProhibicion.service';
import { LoginService } from '../../../../../services/login.service';
import { UserCiudadanoService } from '../../../../../services/userCiudadano.service';
import { environment } from 'environments/environment';

import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-reporteProhibicion',
    templateUrl: './reporteProhibicion.component.html'
})
export class reporteProhibicionComponent implements OnInit {
    public errorMessage;
    public docsUrl = environment.docsUrl;

    public entidadesJudiciales: any;

    public table: any;
    public archivo: any = null;

    public formIndex = true;


    public ciudadano:any = false;
    data = {
        'fechaInicio':null,
        'fechaFin':null,
     
    };

    constructor(
        private _LoginService: LoginService,
        private _UserCiudadanoService: UserCiudadanoService,
        private _UserLcProhibicionService: UserLcProhibicionService,
    ) { }

    ngOnInit() {

    }

    onSearchCiudadano() {
      
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

    onEnviar(){
        let token = this._LoginService.getToken();
        this._UserLcProhibicionService.reporte(this.data,token).subscribe( 
            response => {
                if(response.code == 200){
                    this.archivo = response.data;
                    console.log(response);
                    console.log(this.archivo);
                    swal({
                        title: 'Perfecto!',
                        text: 'Registro exitoso!',
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                }else{
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
            },
            error => {
                this.errorMessage = <any>error;
        
                if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
                }
            }
        );
    }
} 