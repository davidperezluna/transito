import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MsvConsecutivoService } from '../../../services/msvConsecutivo.service';
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
        private _loginService: LoginService,
        private _ConsecutivoService: MsvConsecutivoService,
    ) { }

    ngOnInit() {
        let token = this._loginService.getToken();
        let identity = this._loginService.getIdentity();
        let datos = {
            'identificacionUsuario': identity.identificacion,
        };
        this._ConsecutivoService.showBySede(token, datos).subscribe(
            response => {
                this.consecutivos = response.data;
                let timeoutId = setTimeout(() => {
                    this.iniciarTabla();
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

    iniciarTabla() {
        $('#dataTables-example').DataTable({
            responsive: true,
            pageLength: 8,
            sPaginationType: 'full_numbers',
            oLanguage: {
                oPaginate: {
                    sFirst: '<<',
                    sPrevious: '<',
                    sNext: '>',
                    sLast: '>>'
                }
            }
        });
        this.table = $('#dataTables-example').DataTable();
    }

    onCancelar() {
        this.ready.emit(true);
    }
}