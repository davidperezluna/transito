import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VhloSoatService } from '../../../services/vhloSoat.service';
import { UserEmpresaService } from "../../../services/userEmpresa.service";
import { CfgMunicipioService } from "../../../services/cfgMunicipio.service";
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html'
})

export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() soat: any = null;
    public errorMessage;
    public formReady = false;
    public empresaSelected;
    public empresas;
    
    public municipioSelected;
    public municipios;
    
    public estadoSelected;
    public estados = [
        { value: 'UTILIZADO', label: 'UTILIZADO' },
        { value: 'VENCIDO', label: 'VENCIDO' },
    ];

    constructor(
        private _SoatService: VhloSoatService,
        private _EmpresaService: UserEmpresaService,
        private _CfgMunicipioService: CfgMunicipioService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        console.log(this.soat);
        this.estadoSelected = this.soat.estado;

        this._EmpresaService.getEmpresasAseguradoras().subscribe(
            response => {
                this.empresas = response;
                setTimeout(() => {
                    this.empresaSelected = [this.soat.empresa.id];
                });
            },
            error => {
                this.errorMessage = <any>error;
                
                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        
        this._CfgMunicipioService.select().subscribe(
            response => {
                this.municipios = response;
                setTimeout(() => {
                    this.municipioSelected = [this.soat.municipio.id];
                });
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

    onCancelar() { this.ready.emit(true); }

    onEnviar() {
        let token = this._LoginService.getToken();

        this.soat.idMunicipio = this.municipioSelected;
        this.soat.estado = this.estadoSelected;
        this.soat.idEmpresa = this.empresaSelected;

        this._SoatService.edit(this.soat, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.ready.emit(true);
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
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