import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { LoginService } from '../../../../services/login.service';
import { VehiculoService } from '../../../../services/vehiculo.service';


import swal from 'sweetalert2';

@Component({
    selector: 'appRna-regrabar-motor',
    templateUrl: './newRna.regrabarMotor.html'
})
export class NewRnaRegrabarMotorComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() factura: any = null;
    public errorMessage;
    public tramiteFacturaSelected: any;
    public sustratos: any;
    public sustratoSelected: any;
    public tipoRegrabacionList: string[];
    public tipoRegrabacionSelected: any;
    public motivoList: string[];
    public motivoSelected: any;
    public resumen = {};
    public datos = {
        'tipoRegrabacion': null,
        'motivo': null,
        'nuevoNumero': null,
        'numeroRunt': null,
        'tramiteFormulario': null,
        'idFactura': null,
        'idVehiculo': null,
        'campos': null,
    };

    constructor(
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _VehiculoService: VehiculoService,
    ) { }

    ngOnInit() {
        this.motivoList = ['Pérdida total', 'Deterioro', 'Improntas ilegales', 'Improntas ilegibles', 'Robado'];
    }

    enviarTramite() {
        let token = this._loginService.getToken();

        this.datos.motivo = this.motivoSelected;
        this.datos.idFactura = this.factura.id;
        this.datos.tramiteFormulario = 'rna-regrabarmotor';
        this.datos.idVehiculo = this.vehiculo.id;
        this.datos.campos = ['regrabarmotor'];

        this._VehiculoService.update(this.datos, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': this.resumen });
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