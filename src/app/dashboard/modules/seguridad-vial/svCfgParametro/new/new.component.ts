import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgParametro } from '../svCfgParametro.modelo';
import { SvCfgParametroService } from '../../../../../services/svCfgParametro.service';
import { SvCfgCategoriaService } from '../../../../../services/svCfgCategoria.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new-svcfgparametro',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public parametro: SvCfgParametro;

    public errorMessage;

    public categorias;
    public categoriaSelected;

    constructor(
        private _ParametroService: SvCfgParametroService,
        private _CategoriaService: SvCfgCategoriaService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.parametro = new SvCfgParametro(null, null, null, null, null);

        this._CategoriaService.select().subscribe(
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
