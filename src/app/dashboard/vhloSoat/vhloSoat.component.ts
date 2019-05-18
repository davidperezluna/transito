import { Component, OnInit } from '@angular/core';
import { VhloSoat } from "./vhloSoat.modelo";
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
    public soat: VhloSoat;
    public table: any;

    constructor(
        private _SoatService: VhloSoatService,
        private _VehiculoService: VhloVehiculoService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() { }

    /* onInitTable() {
        if (this.table) {
            this.table.destroy();
        }

        this.table = $('#dataTables-example').DataTable({
            responsive: false,
            pageLength: 10,
            sPaginationType: 'full_numbers',
            oLanguage: {
                oPaginate: {
                    sFirst: '<i class="fa fa-step-backward"></i>',
                    sPrevious: '<i class="fa fa-chevron-left"></i>',
                    sNext: '<i class="fa fa-chevron-right"></i>',
                    sLast: '<i class="fa fa-step-forward"></i>'
                }
            }
        });
    } */

    onNew() {
        this.formNew = true;
        this.formIndex = false;
        this.formHistorial = false;
    }
    
    onEdit(soat: any) {
        this.soat = soat;
        this.formEdit = true;
        this.formNew = false;
        this.formIndex = false;
        this.formHistorial = false;
    }

    ready(isCreado: any) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formHistorial = false;
            this.formIndex = true;
            this.onSearch();
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

        
        this._VehiculoService.searchByPlaca({'numero': this.placa}, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.vehiculo = response.data;
                    this.formHistorial = true;
                    this._SoatService.index({ 'idVehiculo': this.vehiculo.id }, token).subscribe(
                        response => {
                            if (response.status == 'success') {
                                this.soats = response.data;
                                swal.close();

                                /* let timeoutId = setTimeout(() => {
                                    this.onInitTable();
                                }, 200); */

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

    onDelete(id: any) {
        swal({
            title: '¿Estás seguro?',
            text: "¡Se eliminará este registro!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15d4be',
            cancelButtonColor: '#ff6262',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                let token = this._LoginService.getToken();

                this._SoatService.delete({ 'id': id }, token).subscribe(
                    response => {
                        swal({
                            title: 'Eliminado!',
                            text: response.message,
                            type: 'success',
                            confirmButtonColor: '#15d4be',
                        })
                        this.onSearch();
                        /* this.table.destroy(); */
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
        });
    }
}