import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCapacitacionService } from '../../../services/svCapacitacion.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-show',
    templateUrl: './show.component.html'
})

export class ShowComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() capacitacion: any = null;
    public errorMessage;
    
    public capacitados: any;
    public table: any = null;


    constructor(
        private _LoginService: LoginService,
        private _CapacitacionService: SvCapacitacionService,
    ) { }

    ngOnInit() {
        let token = this._LoginService.getToken();

        this._CapacitacionService.showByCapacitacion(this.capacitacion, token).subscribe(
            response => {
                if (response.status == 'success') {
                    let timeoutId = setTimeout(() => {
                        this.capacitados = response.data;
                        this.onInitTable();
                    }, 100);
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    })
                } else {
                    swal({
                        title: 'Error!',
                        text: response.message,
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    })
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

    onInitTable() {
        if(this.table){
            this.table.destroy();
        }

        this.table = $('#dataTables-example').DataTable({
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
    }

    onCancelar() {
        this.ready.emit(true);
    }
}