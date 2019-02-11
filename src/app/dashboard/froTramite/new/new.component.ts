import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FroTramite } from '../froTramite.modelo';
import { FroTramiteService } from '../../../services/froTramite.service';
import { SedeOperativaService } from '../../../services/sedeOperativa.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
import { environment } from 'environments/environment'

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public tramite: FroTramite;
    public errorMessage;

    constructor(
        private _FroTramiteService: FroTramiteService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.tramite = new FroTramite(null , null, null, null);

        swal({
            title: 'Cargando Tabla!',
            text: 'Solo tardara unos segundos por favor espere.',
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
    }

    onCancelar() {
        this.ready.emit(true);
    }


    onEnviar() {
        let token = this._loginService.getToken();
        console.log(this.tramite);
        this._FroTramiteService.register(this.tramite, token).subscribe(
            response => {
                if (response.status == 'success') {
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    })
                } else {
                    this.tramite.id = null;

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
}