import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvIpatConsecutivoService } from '../../../services/svIpatConsecutivo.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-show',
    templateUrl: './show.component.html'
})

export class ShowComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() consecutivo: any = null;
    public consecutivos: any = null ;
    public errorMessage;
    public table: any = null;


    constructor(
        private _LoginService: LoginService,
        private _ConsecutivoService: SvIpatConsecutivoService,
    ) { }

    ngOnInit() {
        let token = this._LoginService.getToken();
        let identity = this._LoginService.getIdentity();
        let datos = {
            'identificacionUsuario': identity.identificacion,
        };
        this._ConsecutivoService.showBySede(token, datos).subscribe(
            response => {
                this.consecutivos = response.data;
                let timeoutId = setTimeout(() => {
                    this.onInitTable();
                }, 100);
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
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

    onCancelar() {
        this.ready.emit(true);
    }
}