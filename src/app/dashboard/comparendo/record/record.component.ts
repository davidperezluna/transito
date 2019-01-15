import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ComparendoService } from '../../../services/comparendo.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-record',
    templateUrl: './record.component.html',
})
export class RecordComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() comparendo: any = null;
    public errorMessage;

    public trazabilidades: any = null;

    constructor(
        private _ComparendoService: ComparendoService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        let token = this._loginService.getToken();
        swal({
            title: 'Buscando trazabilidad!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        this._ComparendoService.record({ 'id': this.comparendo.id }, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.trazabilidades = response.data;

                    swal.close();
                } else {
                    swal({
                        title: 'Error!',
                        text: response.message,
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    });

                    this.trazabilidades = null;
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

    onCancelar() {
        this.ready.emit(true);
    }
}