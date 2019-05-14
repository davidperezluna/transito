import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VhloSoat } from '../vhloSoat.modelo';
import { VhloSoatService } from '../../../services/vhloSoat.service';
import { LoginService } from '../../../services/login.service';

import { CfgMunicipioService } from '../../../services/cfgMunicipio.service';

import swal from 'sweetalert2';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    public soat: VhloSoat;
    public errorMessage;
    
    public soats: any;
    public municipios: any;
    public municipioSelected: any;

    constructor(
        private _SoatService: VhloSoatService,
        private _MunicipioService: CfgMunicipioService,
        private _LoginService: LoginService,

    ) { }

    ngOnInit() {
        this.soat = new VhloSoat(null, null, null, null, null, null, null, null);

        this._MunicipioService.select().subscribe(
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
        let token = this._LoginService.getToken();

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
        let token = this._LoginService.getToken();

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