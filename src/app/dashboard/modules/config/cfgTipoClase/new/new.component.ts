import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CfgTipoClase } from '../cfgTipoClase.modelo';
import { CfgTipoClaseService } from '../../../../../services/cfgTipoClase.service';
import { VhloCfgTipoVehiculoService } from "../../../../../services/vhloCfgTipoVehiculo.service";
import { VhloCfgClaseService } from '../../../../../services/vhloCfgClase.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';


@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public tipo: CfgTipoClase;
    public errorMessage;
    public respuesta;

    public tipos: any;
    public clases: any;

    public tipoSelected: any;
    public claseSelected: any;

    constructor(
        private _TipoClaseService: CfgTipoClaseService,
        private _loginService: LoginService,
        private _ClaseService: VhloCfgClaseService,
        private _TipoService: VhloCfgTipoVehiculoService,
    ) { }

    ngOnInit() {
        this.tipo = new CfgTipoClase(null, null, null);

        this._TipoService.select().subscribe(
            response => {
                this.tipos = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._ClaseService.select().subscribe(
            response => {
                this.clases = response;
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

        this.tipo.tipoId = this.tipoSelected;
        this.tipo.claseId = this.claseSelected;

        this._TipoClaseService.register(this.tipo, token).subscribe(
            response => {
                if (response.code == 200) {
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