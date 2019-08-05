import { Component, OnInit } from '@angular/core';
import { UserEmpresaTransporteService } from '../../../../services/userEmpresaTransporte.service';
import { LoginService } from '../../../../services/login.service';
import { UserEmpresaTransporte } from './userEmpresaTransporte.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './userEmpresaTransporte.component.html'
})
export class UserEmpresaTransporteComponent implements OnInit {
    public errorMessage;
    public table: any;
    public empresasTransporte;
    public habilitacion: UserEmpresaTransporte;

    public nit;
    public empresa = null;
    public habilitaciones;
    
    public formIndex: any;
    public formSearch: any;
    public formNew: any;
    public formEdit: any;

    constructor(
        private _UserEmpresaTransporteService: UserEmpresaTransporteService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this.onInitForms();

        this.formSearch = true;

        swal({
            title: 'Cargando Tabla!',
            text: 'Solo tardará unos segundos, por favor espere.',
            timer: 1500,
            onOpen: () => {
                swal.showLoading();
            }
        }).then((result) => {
            if (
                // Read more about handling dismissals
                result.dismiss === swal.DismissReason.timer
            ) {
            }
        });

        if(this.empresa != null) {
            let token = this._LoginService.getToken();

            this._UserEmpresaTransporteService.searchHabilitacionesByEmpresa({ 'idEmpresa': this.empresa.id }, token).subscribe(
                response => {
                    if (response.code == 200) {
                        this.habilitaciones = response.data;
                        this.formIndex = true;

                        let timeoutId = setTimeout(() => {
                            this.onInitTable();
                        }, 100);
                    } else {
                        swal({
                            title: response.title,
                            text: response.message,
                            type: response.status,
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

    onInitForms() {
        this.formIndex = false;
        this.formSearch = false;
        this.formNew = false;
        this.formEdit = false;

        return true;
    }

    onInitTable() {
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
    }

    onNew(empresa: any) {
        this.empresa = empresa;
        this.onInitForms();
        this.formSearch = true;
        this.formNew = true;
    }

    ready(isCreado: any) {
        if (isCreado) {
            this.ngOnInit();
        }
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

                this._UserEmpresaTransporteService.delete({ 'id': id }, token).subscribe(
                    response => {
                        swal({
                            title: 'Eliminado!',
                            text: response.message,
                            type: 'success',
                            confirmButtonColor: '#15d4be',
                        })
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
        });
    }

    onSearchEmpresa() {
        let token = this._LoginService.getToken();
        this._UserEmpresaTransporteService.searchByNit(this.nit, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.empresa = response.data;
                    console.log(this.empresa.empresaRepresentante.fechaInicial);

                    this._UserEmpresaTransporteService.searchHabilitacionesByEmpresa({'idEmpresa': this.empresa.id}, token).subscribe(
                        response => {
                            if (response.code == 200) {
                                this.habilitaciones = response.data;
                            } else {
                                swal({
                                    title: response.title,
                                    text: response.message,
                                    type: response.status,
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
                    this.onInitForms();
                    this.formIndex = true;
                    this.formSearch = true;
                } else {
                    swal({
                        title: response.title,
                        text: response.message,
                        type: response.status,
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

    onEdit(habilitacion: any) {
        this.habilitacion = habilitacion;
        this.onInitForms();
        this.formEdit = true;
        this.formSearch = true;
    }
}
