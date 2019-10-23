import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgParametroService } from '../../../../../services/svCfgParametro.service';
import { SvCfgCategoriaService } from '../../../../../services/svCfgCategoria.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-edit-svcfgparametro',
    templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() parametro: any = null;

    public errorMessage;
    public categorias;
    public categoriaSelected;

    public formReady = false;

    constructor(
        private _ParametroService: SvCfgParametroService,
        private _CategoriaService: SvCfgCategoriaService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this._CategoriaService.select().subscribe(
            response => {
                this.categorias = response;
                setTimeout(() => {
                    this.categoriaSelected = [this.parametro.categoria.id];
                });
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

    onCancelar() { this.ready.emit(true); }

    onEnviar() {
        let token = this._loginService.getToken();
        this.parametro.idCategoria = this.categoriaSelected;
        this._ParametroService.edit(this.parametro, token).subscribe(
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