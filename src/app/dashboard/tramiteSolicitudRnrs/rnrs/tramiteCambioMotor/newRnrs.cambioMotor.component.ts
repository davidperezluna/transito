import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TipoIdentificacionService } from '../../../../services/tipoIdentificacion.service';
import { CombustibleService } from '../../../../services/combustible.service';
import { LoginService } from '../../../../services/login.service';
import { VehiculoService } from 'app/services/vehiculo.service';

@Component({
    selector: 'appRnrs-cambio-motor',
    templateUrl: './newRnrs.cambioMotor.html'
})
export class NewRnrsCambioMotorComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramitesFactura: any = null;
    @Input() factura: any = null;
    public errorMessage;
    public tramiteFacturaSelected: any;
    public tiposIdentificacion: any;
    public tipoIdentificacionSelected: any;
    public tipoIngresoList: string[];
    public tipoIngresoSelected: any;
    public combustibles: any;
    public combustibleSelected: any;
    public resumen = {};     
    public datos = {
        'numeroMotor': null,
        'numeroAceptacion': null,
        'numeroFactura': null,
        'fecha': null,
        'tipoIdentificacion': null,
        'numeroIdentificacion': null,
        'numeroRunt': null,
        'tramiteFormulario': null,
        'idFactura': null,
        'campos': null,
        'idVehiculo': null,
        'idTipoIngreso': null,
        'idCombustible': null,
    };

    constructor(
        private _CombustibleService: CombustibleService,
        private _loginService: LoginService,
        private _TipoIdentificacionService: TipoIdentificacionService,
        private _VehiculoService: VehiculoService,
    ) { }

    ngOnInit() {
        this.tipoIngresoList = ['Nuevo', 'Usado'];

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
        this.datos.idFactura = this.factura.id;
        this.datos.tramiteFormulario = 'rnrs-cambiomotor';
        this.datos.idTipoIngreso = this.tipoIngresoSelected;
        this.datos.idVehiculo = this.vehiculo.id;
        this.datos.campos = ['motor'];

        this._VehiculoService.update(this.datos, token).subscribe(
            response => {
                if (response.status == 'success') {
                    let resumen = {
                        'motor anterior': this.vehiculo.motor.nombre,
                        'nuevo motor': this.datos.numeroMotor,
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
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}