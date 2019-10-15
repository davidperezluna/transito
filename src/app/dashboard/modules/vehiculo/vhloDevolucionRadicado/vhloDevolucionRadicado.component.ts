import { Component, OnInit } from '@angular/core';
import { VhloDevolucionRadicadoService } from '../../../../services/vhloDevolucionRadicado.service';
import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
import { VhloPropietarioService } from '../../../../services/vhloPropietario.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './vhloDevolucionRadicado.component.html'
})
export class VhloDevolucionRadicadoComponent implements OnInit {
    public errorMessage;

    public formSearch = true;
    public formIndex = false;
    public formNew = false;
    public formEdit = false;

    public table: any = null;
    public placa: any;
    public devoluciones: any;
    
    public vehiculo: any;
    public propietarios: any;

    constructor(
        private _VhloDevolucionRadicadoService: VhloDevolucionRadicadoService,
        private _VhloVehiculoService: VhloVehiculoService,
        private _VhloPropietarioService: VhloPropietarioService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this.onInitForms();
        this.formSearch = true;

        swal({
            title: 'Cargando Tabla!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });
        
        let timeoutId = setTimeout(() => {
            this.onInitTable();
        }, 100);
    }

    onInitForms() {
        this.formSearch = false;
        this.formIndex = false;
        this.formNew = false;
        this.formEdit = false;
    }

    onInitTable() {
        if(this.table) {
            this.table.destroy();
        } else {
            this.table = $('#dataTables-example').DataTable({
                responsive: true,
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
        }
    }

    onNew() {
        this.formNew = true;
        this.formSearch = true;

        this.formIndex = false;
        if (this.table) {
            this.table.destroy();
        }
    }

    ready(isCreado: any) {
        if (isCreado) {
            this.ngOnInit();
        }
    }

    onDelete(id: any) {
        swal({
            title: '¿Estás seguro?',
            text: "¡Se eliminara este registro!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15d4be',
            cancelButtonColor: '#ff6262',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                let token = this._LoginService.getToken();
                this._VhloDevolucionRadicadoService.delete(token, id).subscribe(
                    response => {
                        swal({
                            title: 'Eliminado!',
                            text: 'Registro eliminado correctamente.',
                            type: 'success',
                            confirmButtonColor: '#15d4be',
                        })
                        this.table.destroy();

                        this.ngOnInit();
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
        })
    }

    /* onEdit(valor: any) {
        this.formEdit = true;
        this.formIndex = false;
    } */

    onSearchVehiculo() {
        swal({
            title: 'Buscando vehiculo!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });
        let token = this._LoginService.getToken();

        this._VhloVehiculoService.searchByPlaca({ 'numero': this.placa }, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.formIndex = true;

                    this.vehiculo = response.data;

                    this._VhloPropietarioService.searchByVehiculo({ 'idVehiculo': this.vehiculo.id }, token).subscribe(
                        response => {
                            if (response.code == 200) {
                                this.propietarios = response.data;

                                swal.close();
                            } else {
                                this.propietarios = null;

                                swal({
                                    title: 'Atención!',
                                    text: response.message,
                                    type: 'warning',
                                    confirmButtonText: 'Aceptar'
                                });
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
                } else {
                    this.vehiculo = null;

                    swal({
                        title: 'Atención!',
                        text: response.message,
                        type: 'warning',
                        confirmButtonText: 'Aceptar'
                    });
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

    onEnviar() {
    }
}