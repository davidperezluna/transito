import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
import { CfgEntidadJudicialService } from "../../../../services/cfgEntidadJudicial.service";
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'app-cancelacion-matricula',
    templateUrl: './new.CancelacionMatricula.html'
})
export class NewCancelacionMatriculaComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    @Input() funcionario: any = null;
    @Input() tramitesRealizados: any = null;
    public errorMessage; 
    
    public realizado: any = false;
    public tramiteSolicitud: any = null;
    public entidadesJudiciales: any;
    public tipoRegrabacionList: string[];
    public tipoRegrabacionSelected: any;
    public motivoSelected: any;

    public datos = {
        'documentacion': true,
        'observacion': null,
        'numeroOficio': null,
        'fechaOficio': null,
        'declaracion':null,  
        'fechaDeclaracion':null,
        'ipat':null,
        'fechaHechos':null,
        'recuperarMotor':null,         
        'observaciones':null,         
        'campos': null,
        'idFuncionario': null,
        'idMotivoCancelacion': null,
        'idEntidadJudicial': null,
        'idVehiculo': null,
        'idTramiteFactura': null,
    };
    
    public motivosCancelacion = [
        { value: 'DESAPARICIÓN DOCUMENTAL', label: 'DESAPARICIÓN DOCUMENTAL' },
        { value: 'EXPORTACIÓN O REEXPORTACIÓN', label: 'EXPORTACIÓN O REEXPORTACIÓN' },
        { value: 'DESTRUCCIÓN O PERDIDA TOTAL', label: 'DESTRUCCIÓN O PERDIDA TOTAL' },
        { value: 'DESINTEGRACIÓN FISICA TOTAL', label: 'DESINTEGRACIÓN FISICA TOTAL' },
        { value: 'DESTRUCCIÓN O PERDIDA TOTAL POR ACCIDENTE DE TRÁNSITO', label: 'DESTRUCCIÓN O PERDIDA TOTAL POR ACCIDENTE DE TRÁNSITO' },
        { value: 'DESTRUCCIÓN O PERDIDA TOTAL POR CASO FORTUITO O FUERZA MAYOR', label: 'DESTRUCCIÓN O PERDIDA TOTAL POR CASO FORTUITO O FUERZA MAYOR' },
        { value: 'HURTO', label: 'HURTO' },
        { value: 'PERDIDA DEFINITIVA', label: 'PERDIDA DEFINITIVA' },
        { value: 'REPOSICIÓN', label: 'REPOSICIÓN' },
        { value: 'RECONOCIMIENTO ECONOMICO', label: 'RECONOCIMIENTO ECONOMICO' },
    ];

    constructor(
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _TramiteFacturaService: FroFacTramiteService,
        private _VehiculoService: VhloVehiculoService,
        private _EntidadJudicialService: CfgEntidadJudicialService,
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
        } else{
            this._EntidadJudicialService.select().subscribe(
                response => {
                    this.entidadesJudiciales = response;
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
    }

    onEnviar() {
        this.datos.campos = ['cancelacionmatricula'];
        this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.idVehiculo = this.vehiculo.id;

        let resumen = "<b>No. factura: </b>" + this.tramiteFactura.factura.numero;

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