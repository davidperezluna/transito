import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { UserEmpresaSucursal } from '../userEmpresaSucursal.modelo'

import { UserEmpresaSucursalService } from '../../../../../../services/userEmpresaSucursal.service';
import { LoginService } from '../../../../../../services/login.service';
import { CfgMunicipioService } from '../../../../../../services/cfgMunicipio.service';

import swal from 'sweetalert2';

@Component({
    selector: 'app-edit-sucursal',
    templateUrl: './edit.component.html'
})
export class EditSucursalComponent implements OnInit {
    @Output() onReady = new EventEmitter<any>();
    @Input() sucursal: any = null;
    public errorMessage;

    public municipios: any;
    public municipioSelected: any;

    public formEdit: any = true;

    constructor(
        private _SucursalService: UserEmpresaSucursalService,
        private _MunicipioService: CfgMunicipioService,
        private _LoginService: LoginService,

    ) { }

    ngOnInit() {
        this._MunicipioService.select().subscribe(
            response => {
                this.municipios = response;
                
                setTimeout(() => {
                    this.municipioSelected = [this.sucursal.municipio.id];
                });
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

    onCancelar() {
        this.formEdit = false;
    }

    onEnviar() {
        let token = this._LoginService.getToken();

        this.sucursal.municipio.id = this.municipioSelected;

        this._SucursalService.edit(this.sucursal, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.formEdit = false;
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