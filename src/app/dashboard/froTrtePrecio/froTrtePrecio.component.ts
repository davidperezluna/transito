import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FroTrtePrecioService } from "../../services/froTrtePrecio.service";
import { CfgModuloService } from '../../services/cfgModulo.service';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './froTrtePrecio.component.html'
})

export class FroTrtePrecioComponent implements OnInit {
    public errorMessage;

    public formNew = false;
    public formEdit = false;
    public formIndex = false;
    public formRecord = false;
    public formSearch = true;
    
    public table: any = null;
    public tramitesPrecios;
    public modulos: any;
    public modulo: any = null;
    public tramitePrecio: any = null;
    public disableTextbox = true;
    public dateError = false;

    public search: any = {
        'idModulo': null,
    }


    constructor(
        private _PrecioService: FroTrtePrecioService,
        private _ModuloService: CfgModuloService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() { 
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

    onSearch() {
        this.formIndex = false;
        this.formNew = false;
        this.formEdit = false;
        this.formRecord = false;

        swal({
            title: 'Buscando registros!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._LoginService.getToken();

        this._PrecioService.searchByModulo(this.search, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.tramitesPrecios = response.data.tramitesPrecio;
                    this.modulo = response.data.modulo;
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
                    this.tramitesPrecios = null;
                    this.modulo = response.data.modulo;

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
        if (this.table) {
            this.table.destroy();
        }
        
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

    onToggleDisable() {
        this.disableTextbox = !this.disableTextbox;
    }

    onDisable() {
        this.disableTextbox = true;
    }

    onValidateDate(tramitePrecioChanged) {
        this.disableTextbox = true;

        let token = this._LoginService.getToken();

        this._PrecioService.validateDate({ 'id': tramitePrecioChanged.id, 'date': tramitePrecioChanged.fechaInicio }, token).subscribe(
            response => {
                if (response.status == 'error') {
                    this.dateError = true;

                    swal({
                        title: 'Error!',
                        text: response.message,
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    });

                    tramitePrecioChanged.fechaInicio = response.data;
                } else {
                    this.dateError = false;
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

    onNew() {
        this.formNew = true;
        this.formEdit = false;
        this.formIndex = false;
        this.formRecord = false;
    }

    onRecord() {
        this.formNew = false;
        this.formEdit = false;
        this.formIndex = false;
        this.formSearch = false;
        this.formRecord = true;
    }

    onUpdate() {
        swal({
            title: 'Actualizando registros!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._LoginService.getToken();

        this._PrecioService.update({ 'tramitesPrecios': this.tramitesPrecios}, token).subscribe(
            response => {
                if (response.status == 'success') {
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });

                    this.onSearch();
                } else {
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

    ready(isCreado: any) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formIndex = false;
            this.ngOnInit();
        }
    }

    onEdit(tramitePrecio: any) {
        this.formEdit = true;
        this.formIndex = false;
        this.formNew = false;
        
        this.tramitePrecio = tramitePrecio;
    }

    onDelete(idTramitePrecio: any) {
        this.formEdit = true;
        this.formIndex = false;
        this.formNew = false;
        this.tramitePrecio = idTramitePrecio;
    }
}