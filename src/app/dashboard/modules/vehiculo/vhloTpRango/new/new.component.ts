import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { VhloTpRango } from "../vhloTpRango.modelo";
import { VhloTpRangoService } from "../../../../../services/vhloTpRango.service";
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new-vhlotprango',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() empresaHabilitada: any = null;
    public errorMessage;
    public rango:  VhloTpRango;

    constructor(
        private _LoginService: LoginService,
        private _VhloTpRangoService: VhloTpRangoService,
    ) { }

    ngOnInit() {
        this.rango = new VhloTpRango(null, null, null, null, null, null, null);
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._LoginService.getToken();

        this.rango.idEmpresaTransporte = this.empresaHabilitada.id;
        
        this._VhloTpRangoService.register(this.rango, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.ready.emit(true);
                    swal({
                        title: response.title,
                        text: response.message,
                        type: response.status,
                        confirmButtonText: 'Aceptar'
                    })
                } else {
                    swal({
                        title: response.title,
                        text: response.message,
                        type: response.status,
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

            });
    }
}
