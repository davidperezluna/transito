import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CvCdoComparendoService } from '../../../services/cvCdoComparendo.service';
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
        private _ComparendoService: CvCdoComparendoService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._LoginService.getToken();

        this._ComparendoService.editComparendo(this.comparendo, token).subscribe(
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