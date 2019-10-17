import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VhloPlacaSede } from './vhloPlacaSede.modelo';
import { CfgModuloService } from '../../../../services/cfgModulo.service';
import { CfgOrganismoTransitoService } from '../../../../services/cfgOrganismoTransito.service';7
import { VhloCfgPlacaService } from '../../../../services/vhloCfgPlaca.service';
import { VhloPlacaSedeService } from '../../../../services/vhloPlacaSede.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './vhloPlacaSede.component.html'
})

export class VhloPlacaSedeComponent implements OnInit {
    public errorMessage;

    public asignaciones: any;
    public modulos: any;
    public organismosTransito: any;
    public organismoTransito: any = null;
    public placas: any = null;

    public formSearch: any;
    public formNew: any;
    public formEdit: any;
    public formIndex: any;
    public formRequest: any;
    public formList: any;

    public table: any = null;
    public asignacion: VhloPlacaSede;

    public search: any = {
        'idOrganismoTransito': null,
        'idModulo': null,
    }

    constructor(
        private _ModuloService: CfgModuloService,
        private _OrganismoTransitoService: CfgOrganismoTransitoService,
        private _PlacaSedeService: VhloPlacaSedeService,
        private _PlacaService: VhloCfgPlacaService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this.onInitForms();

        swal({
            title: 'Cargando información!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        this._OrganismoTransitoService.selectSedes().subscribe(
            response => {
                this.organismosTransito = response;
                
                let timeoutId = setTimeout(() => {
                    this.formSearch = true;
                    swal.close();
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

        this._ModuloService.select().subscribe(
            response => {
                this.modulos = response;
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

    onInitForms(){
        this.formSearch = false;
        this.formNew = false;
        this.formEdit = false;
        this.formIndex = false;
        this.formRequest = false;
        this.formList = false;
    }

    onChangedOrganismoTransito(e) {
        if (e) {
            let token = this._LoginService.getToken();

            this._OrganismoTransitoService.show({ 'id': e }, token).subscribe(
                response => {
                    if (response.code == 200) {
                        this.organismoTransito = response.data;
                    } else {
                        this.organismoTransito = null;

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
    }

    onSearch() {
        this.onInitForms();
        this.formSearch = true;

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
                if (response.code == 200) {
                    this.organismoTransito = response.data;

                    this._PlacaSedeService.searchByOrganismoTransitoAndServicio(this.search, token).subscribe(
                        response => {
                            if (response.code == 200) {
                                this.asignaciones = response.data;
                                this.formIndex = true;
                                
                                swal({
                                    title: 'Perfecto!',
                                    text: response.message,
                                    type: 'success',
                                    confirmButtonText: 'Aceptar'
                                });
                                
                                let timeoutId = setTimeout(() => {
                                    this.onInitTable('dataTables-asignacion');
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

    onInitTable(table:any) {
        this.table = $(table).DataTable({
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
        this.onInitForms();
        this.formNew = true;
    }

    onRequest() {
        this.onInitForms();
        this.formRequest = true;
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
    
    onList(id: any) {
        swal({
            title: 'Buscando registros!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._LoginService.getToken();

        this._PlacaService.searchByAsignacion({ 'idAsignacion': id }, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.placas = response.data;
                    this.onInitForms();
                    this.formSearch = true;
                    
                    swal({
                        title: response.title,
                        text: response.message,
                        type: response.status,
                        confirmButtonText: 'Aceptar',
                    });

                    let timeoutId = setTimeout(() => {
                        this.onInitTable('dataTables-placas');
                        this.formList = true;
                        swal.close();
                    }, 100);
                }else{
                    this.placas = null;
                    this.formList = false;

                    swal({
                        title: response.title,
                        text: response.message,
                        type: response.status,
                        confirmButtonText: 'Aceptar',
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

    onCancel(id: any) {
        swal({
            title: '¿Estás seguro?',
            text: "¡La placa pasara a estado CANCELADA!",
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#15d4be',
            cancelButtonColor: '#ff6262',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                let token = this._LoginService.getToken();

                this._PlacaService.state({ 'id': id, 'estado': 'CANCELADA' }, token).subscribe(
                    response => {
                        swal({
                            title: response.title,
                            text: response.message,
                            type: response.status,
                            confirmButtonColor: '#15d4be',
                        });

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
