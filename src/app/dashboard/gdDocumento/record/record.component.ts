import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { GdTrazabilidadService } from '../../../services/gdTrazabilidad.service';
import { LoginService } from '../../../services/login.service';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';

@Component({
    selector: 'app-record',
    templateUrl: './record.component.html',
})
export class RecordComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() documento: any = null;
    public errorMessage;

    public docsUrl = environment.docsUrl;

    public trazabilidades: any = null;

    constructor(
        private _TrazabilidadService: GdTrazabilidadService,
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

        this._TrazabilidadService.recordByDocumento({ 'id':this.documento.id }, token).subscribe(
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