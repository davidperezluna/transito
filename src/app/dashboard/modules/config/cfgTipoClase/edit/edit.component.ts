import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CfgTipoClaseService } from '../../../../../services/cfgTipoClase.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
import { VhloCfgClaseService } from '../../../../../services/vhloCfgClase.service';
import { VhloCfgTipoVehiculoService } from '../../../../../services/vhloCfgTipoVehiculo.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() tipo: any = null;
    public errorMessage;
    public respuesta;

    public clases: any;
    public tiposVehiculo: any;

    public claseSelected: any;
    public tipoVehiculoSelected: any;

    constructor(
        private _TipoService: CfgTipoClaseService,
        private _loginService: LoginService,
        private _ClaseService: VhloCfgClaseService,
        private _TipoVehiculoService: VhloCfgTipoVehiculoService
    ) { }

    ngOnInit() {
        this._TipoVehiculoService.select().subscribe(
            response => {
                this.tiposVehiculo = response;
                setTimeout(() => {
                    this.tipoVehiculoSelected = [this.tipo.tipoVehiculo.id];
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
        this._ClaseService.select().subscribe(
            response => {
                this.clases = response;
                setTimeout(() => {
                    this.claseSelected = [this.tipo.clase.id];
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
        this.tipo.tipoVehiculo = this.tipoVehiculoSelected;
        this.tipo.clase = this.claseSelected;
        this._TipoService.edit(this.tipo, token).subscribe(
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