import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCapacitacionService } from '../../../../../services/svCapacitacion.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-edit-svcapacitacion',
    templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() capacitacion: any = null;
    public errorMessage;
    public formReady = false;

    constructor(
        private _SvCapacitacionService: SvCapacitacionService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        console.log(this.capacitacion);
    }

    onCancelar() { this.ready.emit(true); }

    onEnviar() {
        let token = this._LoginService.getToken();
        this._SvCapacitacionService.edit(this.capacitacion, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.ready.emit(true);
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
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