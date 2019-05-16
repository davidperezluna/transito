import { Component, OnInit } from '@angular/core';
import { VhloSoatService } from '../../services/vhloSoat.service';
import { VhloVehiculoService } from '../../services/vhloVehiculo.service';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './vhloSoat.component.html'
})

export class VhloSoatComponent implements OnInit {
    public errorMessage;

    public placa: any;
    public vehiculo: any = null;
    public soats: any = null;
    public formNew = false;
    public formEdit = false;
    public formHistorial = false;
    public formIndex = true;

    constructor(
        private _SoatService: VhloSoatService,
        private _VehiculoService: VhloVehiculoService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() { }

    /* onInitForms() {
        this.formIndex = false;
        this.formNew = false;
        this.formEdit = false;

        return true;
    } */

    onNew() {
        /* this.onInitForms(); */
        this.formNew = true;
        this.formIndex = false;
        this.formHistorial = false;
    }

    ready(isCreado: any) {
        if (isCreado) {
            this.formNew = false;
            this.formHistorial = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    }

    onSearch() {
        let token = this._LoginService.getToken();

        swal({
            title: 'Buscando vehículo',
            text: 'Solo tardará unos segundos, por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let datos = {
            'numero': this.placa
        };
        
        this._VehiculoService.searchByPlaca(datos, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.vehiculo = response.data;
                    this._SoatService.index({ 'idVehiculo': this.vehiculo.id }, token).subscribe(
                        response => {
                            if (response.status == 'success') {
                                this.soats = response.data;
                                this.formHistorial = true;
                                swal.close();
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
                    swal.close();
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