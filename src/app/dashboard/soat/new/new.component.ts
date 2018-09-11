import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Soat } from '../soat.modelo';
import { SoatService } from '../../../services/soat.service';
import { LoginService } from '../../../services/login.service';

import { MunicipioService } from '../../../services/municipio.service';

import swal from 'sweetalert2';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    public soat: Soat;
    public errorMessage;
    public soats: any;

    public municipios: any;
    public municipioSelected: any;

    constructor(
        private _SoatService: SoatService,
        private _loginService: LoginService,
        private _Municipioervice: MunicipioService,

    ) { }

    ngOnInit() {
        this.soat = new Soat(null, null, null, null, null, null, null, null);

        this._Municipioervice.getMunicipioSelect().subscribe(
            response => {
                this.municipios = response;
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

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._loginService.getToken();

        this.soat.idMunicipio = this.municipioSelected;
        this.soat.idVehiculo = this.vehiculo.id;

        swal({
            title: '¿Está seguro?',
            text: "¿Desea guardar la información?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15d4be',
            cancelButtonColor: '#ff6262',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                this._SoatService.register(this.soat, token).subscribe(                    
                    response => {
                        if (response.status == 'success') {
                            this.ready.emit(true);
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
                                alert("Error en la petición");
                            }
                        }
                    }
                );
            }
        });


    }

    onCalcularVencimiento() {
        let token = this._loginService.getToken();

        if (this.soat.fechaExpedicion) {
            this._SoatService.getFechaVencimiento({ 'fechaExpedicion': this.soat.fechaExpedicion }, token).subscribe(
                response => {
                    if (response.status == 'success') {
                        this.soat.fechaVencimiento = response.fechaVencimiento;
                        this.soat.fechaVigencia = response.fechaVigencia;
                        //swal.close();
                    } else {
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
                            alert('Error en la petición');
                        }
                    }
                }
            );
        }

    }
}