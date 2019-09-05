import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { VhloPlacaSedeService } from '../../../../../services/vhloPlacaSede.service';
import { VhloCfgTipoVehiculoService } from "../../../../../services/vhloCfgTipoVehiculo.service";
import { LoginService } from '../../../../../services/login.service';
import { VhloPlacaSede } from '../vhloPlacaSede.modelo';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new-placasede',
    templateUrl: './new.component.html'
})

export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() organismoTransito: any = null;
    public asignacion: VhloPlacaSede;
    public errorMessage: any;

    public organismosTransito: any;
    public tiposVehiculo: any;
    public tipoVehiculo: any;
    public modulos: any;

    constructor(
        private _TipoVehiculoService: VhloCfgTipoVehiculoService,
        private _VhloPlacaSedeService: VhloPlacaSedeService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.asignacion = new VhloPlacaSede(null, null, null, null, null);

        this._TipoVehiculoService.select().subscribe(
            response => {
                this.tiposVehiculo = response;
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
        swal({
            title: 'Un momento!',
            text: 'Generando placas...',
            onOpen: () => {
                swal.showLoading();
            }
        });

        let token = this._loginService.getToken();

        this.asignacion.idOrganismoTransito = this.organismoTransito.id;

        this._VhloPlacaSedeService.register(this.asignacion, token).subscribe(
            response => {
                if (response.status == 'success') {
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                    this.ready.emit(true);
                } else {
                    swal({
                        title: 'Error!',
                        text: response.message,
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                } error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
            }
        );
    }

    onChangedTipoVehiculo(e) {
        if (e) {
            let token = this._loginService.getToken();

            this._TipoVehiculoService.show({'id': e}, token).subscribe(
                response => {
                    if (response.status == 'success') {
                        this.tipoVehiculo = response.data;
                    }
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
    }
}


