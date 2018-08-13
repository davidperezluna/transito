import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { SustratoService } from '../../../../services/sustrato.service';
import { LoginService } from '../../../../services/login.service';
import { VehiculoService } from '../../../../services/vehiculo.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnrs-cancelacionMatricula',
    templateUrl: './newRnrs.CancelacionMatricula.html'
})
export class NewRnrsCancelacionMatriculaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    public errorMessage;
    public respuesta;
    public tramiteFacturaSelected: any;
    public sustratos: any;
    public sustratoSelected: any;
    public tipoRegrabacionList: string[];
    public tipoBlindajeList: string[];
    public tipoRegrabacionSelected: any;
    public nivelBlindajeList: string[];
    public motivoSelected: any;
    public nuevoNumero: any;
    public numeroRunt: any;
    public documentacion: any;
    public entregada = false;
    public datos = {
        'motivoCancelacion': null,
        'fechaHechos': null,
        'numeroRunt': null,
        'tipoDocumento': null,
        'numeroDocumento': null,
        'fechaExpedicion': null,
        'entidadExpide': null,
        'fechaDeclaracion': null,
        'numeroDeclaracion': null,
        'numeroDesintegracion': null,
        'nombreDesintegradora': null,
        'fechaHechosDesintegracion': null,
        'tramiteFactura': null,
    };

    constructor(
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _SustratoService: SustratoService,
        private _VehiculoService: VehiculoService,
    ) { }

    ngOnInit() {

        this.nivelBlindajeList = ['UNO', 'DOS', 'TRES', 'CUATRO', 'CINCO','SEIS','SIETE','OCHO'];
        this.tipoBlindajeList = ['Blindaje de un vehículo', 'Desblindaje de un vehículo'];
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
    }

    onEnviarTramite() {
        this.readyTramite.emit(this.datos);
        /*this.vehiculo.servicioId = this.vehiculo.servicio.id
        this.vehiculo.municipioId = this.vehiculo.municipio.id
        this.vehiculo.lineaId = this.vehiculo.linea.id
        this.vehiculo.colorId = this.vehiculo.color.id
        this.vehiculo.combustibleId = this.vehiculo.combustible.id
        this.vehiculo.carroceriaId = this.vehiculo.carroceria.id
        this.vehiculo.sedeOperativaId = this.vehiculo.sedeOperativa.id
        this.vehiculo.claseId = this.vehiculo.clase.id
        this.vehiculo.servicioId = this.vehiculo.servicio.id
        this.vehiculo.cancelado = true
        this.datos.tramiteFactura = 14;

        
        let token = this._loginService.getToken();
        this._VehiculoService.editVehiculo(this.vehiculo, token).subscribe(
            response => {
                this.respuesta = response;
                if (this.respuesta.status == 'success') {
                    this.readyTramite.emit(this.datos);
                }
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
            });*/
    }
    onCancelar() {
        this.cancelarTramite.emit(true);
    }

}