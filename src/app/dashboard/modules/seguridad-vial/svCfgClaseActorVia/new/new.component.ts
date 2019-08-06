import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgClaseActorVia } from '../svCfgClaseActorVia.modelo';
import { SvCfgClaseActorViaService } from '../../../../../services/svCfgClaseActorVia.service';
import { LoginService } from '../../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'app-new-svcfgclaseactorvia',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    public claseActorVia: SvCfgClaseActorVia;
    public errorMessage;
    public clasesActoresVia: any;

    constructor(
        private _ClaseActorViaService: SvCfgClaseActorViaService,
        private _loginService: LoginService,

    ) { }

    ngOnInit() {
        this.claseActorVia = new SvCfgClaseActorVia(null, null);
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._loginService.getToken();

        this._ClaseActorViaService.register(this.claseActorVia, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.ready.emit(true);
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
}
