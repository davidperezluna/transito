import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VhloSoat } from '../vhloSoat.modelo';
import { VhloSoatService } from '../../../../../services/vhloSoat.service';
import { UserEmpresaService } from "../../../../../services/userEmpresa.service";
import { LoginService } from '../../../../../services/login.service';

import { CfgMunicipioService } from '../../../../../services/cfgMunicipio.service';

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
    
    public fecha= false;
    
    public soats: any;
    public municipios: any;
    public municipioSelected: any;
    public empresas: any;
    public empresaSelected: any;
    public estadoSelected: any;
    public estados = [
        { value: 'VIGENTE', label: 'VIGENTE' },
        { value: 'VENCIDO', label: 'VENCIDO' },
    ];

    constructor(
        private _SoatService: VhloSoatService,
        private _MunicipioService: CfgMunicipioService,
        private _EmpresaService : UserEmpresaService,
        private _LoginService: LoginService,

    ) { }

    ngOnInit() {
        this.soat = new VhloSoat(null, null, null, null, null, null, null, null, null);

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
        this._EmpresaService.getAseguradoras().subscribe(
            response => {
                this.empresas = response;
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
        this.soat.estado = this.estadoSelected;
        if(this.vehiculo == null) {
            swal({
                title: 'Error!',
                text: 'No se ha digitado el número de la placa del vehículo',
                type: 'error',
                confirmButtonText: 'Aceptar'
            });
        } else {
            this.soat.idVehiculo = this.vehiculo.id;
        }
        this.soat.idEmpresa = this.empresaSelected;

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
                        if (response.code == 200) {
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
            this._SoatService.getFechaVencimiento({ 'idVehiculo': this.vehiculo.id, 'fechaExpedicion': this.soat.fechaExpedicion }, token).subscribe(
                response => {
                    if (response.code == 200) {
                        this.soat.fechaVencimiento = response.fechaVencimiento;
                        this.soat.fechaVigencia = response.fechaVigencia;
                        this.fecha = true;
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