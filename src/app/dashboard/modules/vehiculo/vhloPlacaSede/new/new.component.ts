import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VhloPlacaSede } from '../vhloPlacaSede.modelo';
import { VhloPlacaSedeService } from '../../../../../services/vhloPlacaSede.service';
import { VhloCfgTipoVehiculoService } from "../../../../../services/vhloCfgTipoVehiculo.service";
import { VhloCfgServicioService } from "../../../../../services/vhloCfgServicio.service";
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new-vhloplacasede',
    templateUrl: './new.component.html'
})

export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() organismoTransito: any = null;
    public asignacion: VhloPlacaSede;
    public errorMessage: any;

    public organismosTransito: any;
    public tiposVehiculo: any;
    public servicios: any;
    public modulos: any;

    constructor(
        private _PlacaSedeService: VhloPlacaSedeService,
        private _TipoVehiculoService: VhloCfgTipoVehiculoService,
        private _ServicioService: VhloCfgServicioService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this.asignacion = new VhloPlacaSede(null, null, null, null, null, null);

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

        this._ServicioService.select().subscribe(
            response => {
                this.servicios = response;
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

        let token = this._LoginService.getToken();

        this.asignacion.idOrganismoTransito = this.organismoTransito.id;

        this._PlacaSedeService.register(this.asignacion, token).subscribe(
            response => {
                if (response.code == 200) {
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
}


