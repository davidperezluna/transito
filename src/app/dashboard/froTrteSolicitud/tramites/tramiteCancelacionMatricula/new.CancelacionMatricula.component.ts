import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CfgEntidadJudicialService } from "../../../../services/cfgEntidadJudicial.service";
import { VhloCfgMotivoCancelacionService } from "../../../../services/vhloCfgMotivoCancelacion.service";
import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
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
    public motivosCancelacion: any;

    public datos = {
        'documentacion': true,
        'observacion': null,
        'numeroCertificado': null,
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

    constructor(
        private _EntidadJudicialService: CfgEntidadJudicialService,
        private _VhloCfgMotivoCancelacionService: VhloCfgMotivoCancelacionService,
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
            this._VhloCfgMotivoCancelacionService.select().subscribe(
                response => {
                    this.motivosCancelacion = response;
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