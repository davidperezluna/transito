import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Comparendo } from '../comparendo.modelo';
import { ComparendoService } from '../../../services/comparendo.service';
import { BancoService } from '../../../services/banco.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-show',
    templateUrl: './show.component.html'
})
export class ShowComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() comparendo: any = null;
    public errorMessage;

    constructor(
        private _comparendoService: ComparendoService,
        private _loginService: LoginService,
        private _bancoService: BancoService,
    ) { }

    ngOnInit() {
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._loginService.getToken();

        this._comparendoService.editComparendo(this.comparendo, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.ready.emit(true);
                    swal({
                        title: 'Perfecto!',
                        text: 'El registro se ha modificado con exito',
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