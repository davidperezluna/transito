import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MsvParametroService } from '../../../services/msvParametro.service';
import { MsvCategoriaService } from '../../../services/msvCategoria.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-edit',
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
        private _ParametroService: MsvParametroService,
        private _CategoriaService: MsvCategoriaService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this._CategoriaService.getCategoriaSelect().subscribe(
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
        this._ParametroService.editParametro(this.parametro, token).subscribe(
            response => {
                if (response.status == 'success') {
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