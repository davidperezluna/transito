import { Component, OnInit } from '@angular/core';
import { VhloTpAsignacionService } from '../../services/vhloTpAsignacion.service';
import { LoginService } from '../../services/login.service';
import { VhloTpAsignacion } from './vhloTpAsignacion.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './vhloTpAsignacion.component.html'
})
export class VhloTpAsignacionComponent implements OnInit {
    public errorMessage;
    public table: any;
    
    public nit;
    public empresaHabilitadaRango = null;

    public asignacion: VhloTpAsignacion;

    public asignaciones;

    public formIndex: any;
    public formSearch: any;
    public formNew: any;
    public formEdit: any;

    constructor(
        private _VhloTpAsignacionService: VhloTpAsignacionService,
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

        if(this.empresaHabilitadaRango != null) {
            let token = this._LoginService.getToken();
            
            this._VhloTpAsignacionService.searchCupos({ 'idEmpresa': this.empresaHabilitadaRango.id }, token).subscribe(
                response => {
                    if (response.code == 200) {
                        this.asignaciones = response.data;
                        this.formIndex = true;
                        
                        let timeoutId = setTimeout(() => {
                            this.onInitTable();
                        }, 100);
                        swal({
                            title: response.title,
                            text: response.message,
                            type: response.status,
                            confirmButtonText: 'Aceptar'
                        })
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

    onNew(empresaHabilitada: any) {
        this.empresaHabilitadaRango = empresaHabilitada;
        this.onInitForms();
        this.formSearch = true;
        this.formNew = true;
    }

    ready(isCreado: any) {
        if (isCreado) {
            this.ngOnInit();
        }
    }

    onSearchEmpresa() {
        let token = this._LoginService.getToken();
        this._VhloTpAsignacionService.searchEmpresaTransporte(this.nit, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.empresaHabilitadaRango = response.data;

                    this._VhloTpAsignacionService.searchCupos({ 'idEmpresa': this.empresaHabilitadaRango.id }, token).subscribe(
                        response => {
                            if (response.code == 200) {
                                this.asignaciones = response.data;
                                let timeoutId = setTimeout(() => {
                                    this.onInitTable();
                                }, 100);
                                swal({
                                    title: response.title,
                                    text: response.message,
                                    type: response.status,
                                    confirmButtonText: 'Aceptar'
                                })
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

                this._VhloTpAsignacionService.delete({ 'id': id }, token).subscribe(
                    response => {
                        swal({
                            title: response.title,
                            text: response.message,
                            type: response.status,
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
    onEdit(asignacion: any) {
        this.asignacion = asignacion;
        this.formEdit = true;
        this.formIndex = false;
    }
}
