import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { VhloPlacaSedeService } from '../../../../../services/vhloPlacaSede.service';
import { CfgOrganismoTransitoService } from '../../../../../services/cfgOrganismoTransito.service';
import { VhloCfgTipoVehiculoService } from '../../../../../services/vhloCfgTipoVehiculo.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';


@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() asignacion: any = null;
    public errorMessage;

    public organismosTransito: any;
    public tiposVehiculos: any;

    public sedeOperativaSelected: any;
    public tipoVehiculoSelected: any;
    public moduloSelected: any;

    constructor(
        private _PlacaSedeService: VhloPlacaSedeService,
        private _OrganismoTransitoService: CfgOrganismoTransitoService,
        private _TipoVehiculo: VhloCfgTipoVehiculoService,
        private _loginService: LoginService,

    ) { }

    ngOnInit() { 
        this._OrganismoTransitoService.selectSedes().subscribe(
            response => {
                this.organismosTransito = response;

                setTimeout(() => {
                    this.sedeOperativaSelected = [this.asignacion.organismoTransito.id];
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

        this._TipoVehiculo.select().subscribe(
            response => {
                this.tiposVehiculos = response;
                setTimeout(() => {
                    this.tipoVehiculoSelected = [this.asignacion.tipoVehiculo.id];
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
        this.asignacion.sedeOperativa = this.sedeOperativaSelected;
        this.asignacion.modulo = this.moduloSelected;
        this.asignacion.tipoVehiculo = this.tipoVehiculoSelected;
        
        this._PlacaSedeService.edit(this.asignacion, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.ready.emit(true);
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                }
                error => {
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
