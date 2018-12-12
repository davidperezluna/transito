import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { SustratoService } from '../../../../services/sustrato.service';
import { LoginService } from '../../../../services/login.service';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-blindaje',
    templateUrl: './newRna.Blindaje.html'
})
export class NewRnaBlindajeComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() factura: any = null;
    public errorMessage;
    public tramiteFacturaSelected: any;
    public tipoRegrabacionList: string[];
    public tipoRegrabacionSelected: any;
    public motivoSelected: any;
    public nuevoNumero: any;
    public tramitesFactura: any = null;
    public tipoBlindajeSelected: any;
    public nivelBlindajeSelected: any;
    public resumen: any ;
    public tramiteRealizado: any=false;

    public datos = {
        'idFactura': null,
        'campos': null,
        'idVehiculo': null,
        'idTipoBlindaje': null,
        'idNivelBlindaje': null,
        'empresaBlindadora': null,
        'tramiteFormulario': null,
        'numeroRunt': null,
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
        private _TramiteFacturaService: TramiteFacturaService,
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _VehiculoService: VehiculoService,
    ) { }
    // showTramiteSolicitudByTamiteFactura
    ngOnInit() {
        let token = this._loginService.getToken();
        let datos = {
            'idFactura':this.factura.id,
            'idFormulario':'rna-blindaje'
        }

        this._TramiteSolicitudService.showTramiteSolicitudByTamiteFacturaFormulario(datos,token).subscribe(
            response => {
                if (response.status == 'success') {
                    //this.resumen = JSON.stringify(response.data.resumen);
                    this.resumen = response.data.resumen;
                    this.tramiteRealizado = true;
                }else{
                    this.tramiteRealizado = false;
                } 
            },
            error => {
                this.errorMessage = <any>error;
                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
     }

    enviarTramite() {
        let token = this._loginService.getToken();

        this.datos.idFactura = this.factura.id;
        this.datos.tramiteFormulario = 'rna-blindaje';
        this.datos.idVehiculo = this.vehiculo.id;
        this.datos.campos = ['blindaje'];

        this._VehiculoService.update(this.datos, token).subscribe(
            response => {
                if (response.status == 'success') {
                    let resumen = {
                        'tipoBlindaje': this.datos.idTipoBlindaje, 
                        'nivelBlindaje': this.datos.idNivelBlindaje,
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