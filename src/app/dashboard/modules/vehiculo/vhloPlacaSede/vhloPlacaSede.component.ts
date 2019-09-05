import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CfgOrganismoTransitoService } from '../../../../services/cfgOrganismoTransito.service';
import { VhloPlacaSedeService } from '../../../../services/vhloPlacaSede.service';
import { LoginService } from '../../../../services/login.service';
import { VhloPlacaSede } from './vhloPlacaSede.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './vhloPlacaSede.component.html'
})

export class VhloPlacaSedeComponent implements OnInit {
    public errorMessage;
    public id;

    public asignaciones: any;
    public organismosTransito: any;
    public organismoTransito: any = null;
    public formNew = false;
    public formEdit = false;
    public formIndex = false;
    public formSearch = true;
    public table: any = null;
    public asignacion: VhloPlacaSede;

    public search: any = {
        'idOrganismoTransito': null,
    }

    constructor(
        private _OrganismoTransitoService: CfgOrganismoTransitoService,
        private _PlacaSedeService: VhloPlacaSedeService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this._OrganismoTransitoService.selectSedes().subscribe(
            response => {
                this.organismosTransito = response;
                
                let timeoutId = setTimeout(() => {
                    this.onInitTable();
                }, 100);
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

    onSearch() {
        this.formIndex = false;
        this.formNew = false;
        this.formEdit = false;

        swal({
            title: 'Buscando registros!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._LoginService.getToken();

        this._OrganismoTransitoService.show({ 'id': this.search.idOrganismoTransito }, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.organismoTransito = response.data;

                    this._PlacaSedeService.searchByOrganismoTransito(this.search, token).subscribe(
                        response => {
                            if (response.status == 'success') {
                                this.asignaciones = response.data;
                                this.formIndex = true;
                                
                                swal({
                                    title: 'Perfecto!',
                                    text: response.message,
                                    type: 'success',
                                    confirmButtonText: 'Aceptar'
                                });
                                
                                let timeoutId = setTimeout(() => {
                                    this.onInitTable();
                                }, 100);
                            } else {
                                this.asignaciones = null;

                                swal({
                                    title: 'Atención!',
                                    text: response.message,
                                    type: 'warning',
                                    confirmButtonText: 'Aceptar'
                                });
                            }

                        },
                        error => {
                            this.errorMessage = <any>error;

                            if (this.errorMessage != null) {
                                console.log(this.errorMessage);
                                alert("Error en la petición");
                            }
                        }
                    );
                }else{
                    this.organismosTransito = null; 

                    swal({
                        title: 'Atención!',
                        text: response.message,
                        type: 'warning',
                        confirmButtonText: 'Aceptar'
                    });
                }
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

    onInitTable() {
        this.table = $('#dataTables-example').DataTable({
            responsive: true,
            pageLength: 8,
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

    onNew() {
        this.formEdit = false;
        this.formIndex = false;

        let token = this._LoginService.getToken();

        this._OrganismoTransitoService.show({ 'id': this.search.idOrganismoTransito }, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.organismoTransito = response.data;
                    this.formNew = true;
                } else {
                    this.organismosTransito = null;
                    swal({
                        title: 'Atención!',
                        text: response.message,
                        type: 'warning',
                        confirmButtonText: 'Aceptar'
                    });
                }
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

    ready(isCreado: any) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formIndex = false;
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
                this._PlacaSedeService.delete({ 'id': id }, token).subscribe(
                    response => {
                        swal({
                            title: response.title,
                            text: response.message,
                            type: response.status,
                            confirmButtonColor: '#15d4be',
                        });
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
        });
    }
    
    onEdit(asignacion: any) {
        this.asignacion = asignacion;
        this.formEdit = true;
        this.formNew = false;
        this.formIndex = false;
    }
}
