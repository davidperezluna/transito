import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { UserEmpresaRepresentanteService } from '../../../../services/userEmpresaRepresentante.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'app-edit-representante',
    templateUrl: './edit.component.html'
})

export class EditRepresentanteComponent implements OnInit {
    @Output() onReady = new EventEmitter<any>();
    @Input() representante: any = null;
    public errorMessage;
    
    public ciudadano: any = null;
    public identificacion: any = null;

    public datos = {
        'fechaInicial': null,
        'idCiudadano': null,
        'id': null,
    }

    constructor(
        private _RepresentanteService: UserEmpresaRepresentanteService,
        private _CiudadanoService: UserCiudadanoService,
        private _LoginService: LoginService,

    ) { }

    ngOnInit() { 
        this.datos.id = this.representante.id;
     }

    onCancelar() {
        this.onReady.emit(true);
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
            'idTipoIdentificacion': 1,
            'identificacion': this.identificacion
        }

        this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
            response => {
                if (response.status == 'success') {
                    if (response.data.ciudadano) {
                        this.ciudadano = response.data.ciudadano;
                        this.datos.idCiudadano = this.ciudadano.id;
                    }

                    swal.close();
                } else {
                    this.ciudadano = null;
                    this.datos.idCiudadano = null;

                    swal({
                        title: 'Error!',
                        text: response.message,
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    })
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
        let token = this._LoginService.getToken();

        this._RepresentanteService.edit(this.datos, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.onReady.emit(true);
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    })
                } else {
                    swal({
                        title: 'Error!',
                        text: response.message,
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    })
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
}