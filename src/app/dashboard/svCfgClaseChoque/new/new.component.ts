import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgClaseChoque } from '../svCfgClaseChoque.modelo';
import { SvCfgClaseChoqueService } from '../../../services/svCfgClaseChoque.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
import { SvCfgClaseAccidenteService } from '../../../services/svCfgClaseAccidente.service';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public claseChoque: SvCfgClaseChoque;
    public errorMessage;
    public respuesta;

    public clasesAccidente: any;
    public claseAccidenteSelected: any;

    constructor(
        private _ClaseChoqueService: SvCfgClaseChoqueService,
        private _loginService: LoginService,
        private _ClaseAccidenteService: SvCfgClaseAccidenteService,
    ) { }

    ngOnInit() {
        this.claseChoque = new SvCfgClaseChoque(null, null, null);
        this._ClaseAccidenteService.select().subscribe(
            response => {
                this.clasesAccidente = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._loginService.getToken();
        this.claseChoque.claseAccidente = this.claseAccidenteSelected;
        this._ClaseChoqueService.register(this.claseChoque, token).subscribe(
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

            });
    }
}
