import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { SustratoService } from '../../../../services/sustrato.service';
import { LoginService } from '../../../../services/login.service';
import { VehiculoService } from '../../../../services/vehiculo.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-blindaje',
    templateUrl: './newRna.Blindaje.html'
})
export class NewRnaBlindajeComponent implements OnInit {
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
        'tipoBlindaje': null,
        'nivelBlindaje': null,
        'empresaBlindadora': null,
        'numeroRunt': null,
        'sustrato': null
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

    enviarTramite() {
       this.readyTramite.emit(this.datos);
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}