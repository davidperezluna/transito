import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { SustratoService } from '../../../../services/sustrato.service';
import { TipoIdentificacionService } from '../../../../services/tipoIdentificacion.service';
import { CombustibleService } from '../../../../services/combustible.service';


@Component({
    selector: 'appRnma-cambio-motor',
    templateUrl: './newRnma.cambioMotor.html'
})
export class NewRnmaCambioMotorComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
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
    public resumen = {};     public datos = {
        'tipoIngreso': null,
        'numeroMotor': null,
        'numeroAceptacion': null,
        'numeroFactura': null,
        'fecha': null,
        'tipoIdentificacion': null,
        'numeroIdentificacion': null,
        'numeroRunt': null,
        'documentacion': null,
        'entregada': null,
        'sustrato': null,
        'tramiteFormulario': null,
        'combustibleId': null,
        'facturaId': null,
    };

    constructor(
        private _CombustibleService: CombustibleService,
        private _SustratoService: SustratoService,
        private _TipoIdentificacionService: TipoIdentificacionService,
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
        this.datos.tipoIngreso = this.tipoIngresoSelected;
        this.datos.numeroMotor = this.numeroMotor;
        this.datos.numeroAceptacion = this.numeroAceptacion;
        this.datos.numeroFactura = this.numeroFactura;
        this.datos.fecha = this.fecha;
        this.datos.tipoIdentificacion = this.tipoIdentificacionSelected;
        this.datos.numeroIdentificacion = this.numeroIdentificacion;
        this.datos.numeroRunt = this.numeroRunt;
        this.datos.documentacion = this.documentacion;
        this.datos.entregada = this.entregada;
        this.datos.facturaId = this.factura.id;
        this.datos.combustibleId = this.combustibleSelected;
        this.datos.tramiteFormulario = 'rnma-cambiomotor';
        this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}