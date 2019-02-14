import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MsvParametro } from '../msvParametro.modelo';
import { MsvParametroService } from '../../../services/msvParametro.service';
import { MsvCategoriaService } from '../../../services/msvCategoria.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public parametro: MsvParametro;
    public errorMessage;
    public respuesta;
    public categorias;
    public categoriaSelected;

    constructor(
        private _ParametroService: MsvParametroService,
        private _CategoriaService: MsvCategoriaService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.parametro = new MsvParametro(null, null, null, null);

        this._CategoriaService.getCategoriaSelect().subscribe(
            response => {
                this.categorias = response;
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
        this.parametro.idCategoria = this.categoriaSelected;

        this._ParametroService.register(this.parametro, token).subscribe(
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
