import { Component, OnInit } from '@angular/core';
import { FroFacTransferenciaService } from '../../../../services/froFacTransferencia.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './froFacTransferencia.component.html',
})

export class FroFacTransferenciaComponent implements OnInit {
    public errorMessage;
    
    public formSearch: any;
    public formIndex: any;

    public table: any;

    public transferencias: any;

    public search = {
        'fechaInicial': null,
        'fechaFinal': null,
    }

    constructor(
        private _TransferenciaService: FroFacTransferenciaService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this.onInitForms();

        this.formSearch = true;

        swal.close();
    }

    onInitForms() {
        this.formSearch = false;
        this.formIndex = false;
    }

    onInitTable() {
        this.table = $('#dataTables-example').DataTable({
            retrieve: true,
            paging: false,
            responsive: true,
            pageLength: 10,
            sPaginationType: 'full_numbers',
            dom: 'Bfrtip',
            buttons: [
                'excel', 'pdf'
            ],
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

    onSearch() {
        let token = this._LoginService.getToken();

        this._TransferenciaService.reportTransfer(this.search, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.transferencias = response.data;
                    this.formIndex = true;

                    swal({
                        title: response.title,
                        text: response.message,
                        type: response.status,
                        confirmButtonText: 'Aceptar'
                    });

                    let timeoutId = setTimeout(() => {
                        this.onInitTable();
                    }, 100);
                } else {
                    swal({
                        title: response.title,
                        text: response.message,
                        type: response.status,
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
}
