import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../../../services/froFacTramite.service';
import { VhloVehiculoService } from '../../../../../../services/vhloVehiculo.service';
import { PnalFuncionarioService } from '../../../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-blindaje',
    templateUrl: './new.Blindaje.html'
})
export class NewBlindajeComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    @Input() funcionario: any = null;
    @Input() tramitesRealizados: any = null;
    public errorMessage; 

    public realizado: any = false;
    public tramiteSolicitud: any = null;
    public tipoRegrabacionList: string[];
    public tipoRegrabacionSelected: any;
    public motivoSelected: any;
    public nuevoNumero: any;
    public tramitesFactura: any = null;
    public tipoBlindajeSelected: any;
    public nivelBlindajeSelected: any;
    

    public datos = {
        'documentacion': true,
        'observacion': null,
        'campos': null,
        'empresaBlindadora': null,
        'nivelBlindaje': null,
        'tipoBlindaje': null,
        'idFuncionario': null,
        'idVehiculo': null,
        'idTramiteFactura': null,
    };

    public tiposBlindaje = [
        { value: 'BLINDAJE DE UN VEHICULO', label: 'BLINDAJE DE UN VEHICULO' },
        { value: 'DESBLINDAJE DE UN VEHICULO', label: 'DESBLINDAJE DE UN VEHICULO' },
    ];

    public nivelesBlindaje = [
        { value: 'UNO', label: 'UNO' },
        { value: 'DOS', label: 'DOS' },
        { value: 'TRES', label: 'TRES' },
        { value: 'CUATRO', label: 'CUATRO' },
        { value: 'CINCO', label: 'CINCO' },
        { value: 'SEIS', label: 'SEIS' },
        { value: 'SIETE', label: 'SIETE' },
        { value: 'OCHO', label: 'OCHO' },
        { value: 'SIN BLINDAJE', label: 'SIN BLINDAJE' },
    ];

    constructor(
        private _TramiteFacturaService: FroFacTramiteService,
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _VehiculoService: VhloVehiculoService,
        private _FuncionarioService: PnalFuncionarioService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this.datos.idFuncionario  = this.funcionario.id;
        
        if ( this.tramitesRealizados.length > 0) {
            this.tramitesRealizados.forEach(tramiteRealizado => {
                tramiteRealizado = Object.keys(tramiteRealizado).map(function(key) {
                    return tramiteRealizado[key];
                });
                
                if (tramiteRealizado.includes(this.tramiteFactura.id, 2)) {
                    this.realizado = true;
                }
            });
        }

        if (this.realizado) {
            swal({
                title: 'Atención!',
                text: 'El trámite seleccionado ya fue realizado.',
                type: 'warning',
                confirmButtonText: 'Aceptar'
            });
        }
     }

    onEnviar() {
        this.datos.campos = ['blindaje'];
        this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.idVehiculo = this.vehiculo.id;

        let resumen = "No. factura: " + this.tramiteFactura.factura.numero;

        this.realizado = true;
                            
        this.onReadyTramite.emit(
            {
                'documentacion':this.datos.documentacion, 
                'observacion':this.datos.observacion, 
                'foraneas':this.datos, 
                'resumen':resumen,
                'idTramiteFactura': this.tramiteFactura.id,
            }
        );
    }
}