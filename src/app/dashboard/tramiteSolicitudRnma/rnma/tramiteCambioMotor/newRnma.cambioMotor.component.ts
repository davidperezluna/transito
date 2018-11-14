import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { SustratoService } from '../../../../services/sustrato.service';
import { TipoIdentificacionService } from '../../../../services/tipoIdentificacion.service';
import { CombustibleService } from '../../../../services/combustible.service';
import { VehiculoService } from 'app/services/vehiculo.service';
import { LoginService } from '../../../../services/login.service';


@Component({
    selector: 'appRnma-cambio-motor',
    templateUrl: './newRnma.cambioMotor.html'
})
export class NewRnmaCambioMotorComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramitesFactura: any = null;
    @Input() factura: any = null;
    public errorMessage;
    public respuesta;
    public tramiteFacturaSelected: any;
    public sustratos: any;
    public sustratoSelected: any;
    public tiposIdentificacion: any;
    public tipoIdentificacionSelected: any;
    public tipoIngresoList: string[];
    public tipoIngresoSelected: any;
    public numeroMotor: any;
    public numeroAceptacion: any;
    public numeroFactura: any;
    public numeroRunt: any;
    public fecha: any;
    public tipoIdentificacion: any;
    public numeroIdentificacion: any;
    public documentacion: any;
    public entregada = false;
    public combustibles: any;
    public combustibleSelected: any;

    public datos = {
        'idFactura': null,
        'campos': null,
        'idVehiculo': null,
        'idTipoIngreso': null,
        'idCombustible': null,
        'tramiteFormulario': null,
    };

    public tiposIngreso = [
        { value: 'NUEVO', label: 'NUEVO' },
        { value: 'USADO', label: 'DESBLINDAJE DE UN VEHICULO' },
    ];

    constructor(
        private _CombustibleService: CombustibleService,
        private _loginService: LoginService,
        private _SustratoService: SustratoService,
        private _TipoIdentificacionService: TipoIdentificacionService,
        private _VehiculoService: VehiculoService,
    ) { }

    ngOnInit() {

        this._CombustibleService.getCombustibleSelect().subscribe(
            response => {
                this.combustibles = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );

        this._SustratoService.getSustratoSelect().subscribe(
            response => {
                this.sustratos = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );

        this._TipoIdentificacionService.getTipoIdentificacionSelect().subscribe(
            response => {
                this.tiposIdentificacion = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );
    }

    enviarTramite() {
        let token = this._loginService.getToken();

        this._VehiculoService.show(token, this.tipoIngresoSelected).subscribe(
            motorResponse => {
                this.datos.idFactura = this.factura.id;
                this.datos.tramiteFormulario = 'rnma-cambiomotor';
                this.datos.idTipoIngreso = this.tipoIngresoSelected;
                this.datos.idVehiculo = this.vehiculo.id;
                this.datos.campos = ['motor'];

                this._VehiculoService.update(this.datos, token).subscribe(
                    response => {
                        if (response.status == 'success') {
                            let resumen = {
                                'motor anterior': this.vehiculo.motor.nombre,
                                'nuevo motor': motorResponse.data.nombre,
                            };
                            this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': resumen });
                        }
                        error => {
                            this.errorMessage = <any>error;

                            if (this.errorMessage != null) {
                                console.log(this.errorMessage);
                                alert("Error en la petición");
                            }
                        }
                    });
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
            });
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}