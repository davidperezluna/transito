import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'appRna-blindaje',
    templateUrl: './newRna.Blindaje.html'
})
export class NewRnaBlindajeComponent implements OnInit {
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
        let token = this._LoginService.getToken();

        let identity = this._LoginService.getIdentity();

        this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.datos.idFuncionario = response.data.id;
                    this.realizado = true;

                    this._TramiteFacturaService.show({ 'id': this.tramiteFactura.id }, token).subscribe(
                        response => {
                            if (response.code == 200) {
                                this.tramiteFactura = response.data;

                                swal.close();
                            } else {
                                this.tramiteFactura = null;

                                swal({
                                    title: 'Error!',
                                    text: response.message,
                                    type: 'error',
                                    confirmButtonText: 'Aceptar'
                                });
                            }
                            error => {
                                this.errorMessage = <any>error;
                                if (this.errorMessage != null) {
                                    console.log(this.errorMessage);
                                    alert("Error en la petición");
                                }
                            }
                        }
                    );

                    if (this.tramiteFactura.realizado) {
                        let token = this._LoginService.getToken();

                        this._TramiteSolicitudService.showByTamiteFactura({ 'idTramiteFactura': this.tramiteFactura.id }, token).subscribe(
                            response => {
                                if (response.code == 200) {
                                    this.tramiteSolicitud = response.data;
                                } else {
                                    this.tramiteSolicitud = null;

                                    swal({
                                        title: 'Error!',
                                        text: response.message,
                                        type: 'error',
                                        confirmButtonText: 'Aceptar'
                                    });
                                }
                                error => {
                                    this.errorMessage = <any>error;
                                    if (this.errorMessage != null) {
                                        console.log(this.errorMessage);
                                        alert("Error en la petición");
                                    }
                                }
                            }
                        );
                    }
                } else {
                    this.realizado = false;

                    swal({
                        title: 'Error!',
                        text: 'Usted no tiene permisos para realizar tramites',
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
                error => {
                    this.errorMessage = <any>error;
                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert('Error en la petición');
                    }
                }
            }
        );
     }

    onEnviar() {
        let token = this._LoginService.getToken();

        this.datos.campos = ['blindaje'];
        this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.idVehiculo = this.vehiculo.id;

        let resumen = "<b>No. factura: </b>" + this.tramiteFactura.factura.numero;
                            
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