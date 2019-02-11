import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { SustratoService } from '../../../../services/sustrato.service';
import { LoginService } from '../../../../services/login.service';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { CfgEntidadJudicialService } from "../../../../services/cfgEntidadJudicial.service";

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-cancelacionMatricula',
    templateUrl: './newRna.CancelacionMatricula.html'
})
export class NewRnaCancelacionMatriculaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() factura: any = null;
    public errorMessage;
    public entidadesJudiciales: any;
    public tramiteFacturaSelected: any;
    public tipoRegrabacionList: string[];
    public tipoRegrabacionSelected: any;
    public motivoSelected: any;
    public datos = {
        'idMotivoCancelacion': null,
        'idEntidadJudicial': null,
        'numeroOficio': null, 
        'declaracion':null,  
        'fechaDeclaracion':null,
        'ipat':null,
        'fechaHechos':null,
        'recuperarMotor':null,         
        'tramiteFormulario': null,
        'idFactura': null,
        'campos': null,
        'idVehiculo': null,
    };
    public motivosCancelacion = [
        { value: 'DESAPARICIÓN DOCUMENTAL', label: 'DESAPARICIÓN DOCUMENTAL' },
        { value: 'HURTO', label: 'HURTO' },
        { value: 'PERDIDA DEFINITIVA', label: 'PERDIDA DEFINITIVA' },
        { value: 'EXPORTACIÓN O REEXPORTACIÓN', label: 'EXPORTACIÓN O REEXPORTACIÓN' },
        { value: 'DESTRUCCIÓN O PERDIDA TOTAL', label: 'DESTRUCCIÓN O PERDIDA TOTAL' },
    ];

    constructor(
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _SustratoService: SustratoService,
        private _VehiculoService: VehiculoService,
        private _EntidadJudicialService: CfgEntidadJudicialService,
    ) { }

    ngOnInit() { 
        this._EntidadJudicialService.getEntidadJudicialSelect().subscribe(
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

    enviarTramite() {
        
        this.datos.idFactura = this.factura.id;
        this.datos.tramiteFormulario = 'rna-cancelacionmatricula';

        this.datos.idVehiculo = this.vehiculo.id;
        this.datos.campos = ['cancelacionmatricula'];

        let token = this._loginService.getToken();

        this._VehiculoService.update(this.datos, token).subscribe(
            response => {
                if (response.status == 'success') {
                    let resumen = {
                        'id vehiculo': this.vehiculo.nombre,
                        'id factura': this.datos.idFactura,
                        'entidad judicial': this.datos.idEntidadJudicial,
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