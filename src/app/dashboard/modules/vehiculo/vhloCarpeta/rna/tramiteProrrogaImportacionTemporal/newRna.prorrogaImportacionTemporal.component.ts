import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { FroTrteSolicitudService } from '../../../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../../../services/froFacTramite.service';
import { PnalFuncionarioService } from '../../../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'appRna-prorroga-importacion-temporal',
    templateUrl: './newRna.prorrogaImportacionTemporal.component.html'
})
export class NewRnaProrrogaImportacionTemporalComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    public errorMessage; 
    
    public autorizado: any = false;
    public tramiteSolicitud:any = null;

    public date: any;

    public vehiculoProrroga : any;

    public datos = {
        'numeroRunt': null,
        'numeroCuotas': null,
        'licenciaTransito': null,
        'fechaSolicitudProrroga': null,
        'idFuncionario': null,
        'idTramiteFactura': null,
        'idVehiculo': null,
    };

    constructor(
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _TramiteFacturaService: FroFacTramiteService,
        private _FuncionarioService: PnalFuncionarioService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        if (this.vehiculo.tipoMatricula == 'IMPORTACION') {
            let token = this._LoginService.getToken();
            
            let identity = this._LoginService.getIdentity();
    
            this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
                response => {
                    if (response.code == 200) {
                        this.datos.idFuncionario = response.data.id;
                        this.autorizado = true;
    
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
                        } else {
                            this.date = new Date();
                            var datePiper = new DatePipe(this.date);
                            this.datos.fechaSolicitudProrroga = datePiper.transform(this.date, 'yyyy-MM-dd');
                        }
                    } else {
                        this.autorizado = false;
    
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
        }else{
            this.autorizado = false;

            swal({
                title: 'Error!',
                text: 'El vehiculo no se registro para importación temporal.',
                type: 'error',
                confirmButtonText: 'Aceptar'
            });
        }  
    }

    onEnviar() {
        let token = this._LoginService.getToken();

        this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.idVehiculo = this.vehiculo.id;

        this._TramiteSolicitudService.validations(this.datos, token).subscribe(
            response => {
              if (response.code == 200) {
                let resumen = 'No. factura: ' + this.tramiteFactura.factura.numero +
                    'Fecha solicitud prorroga' + this.datos.fechaSolicitudProrroga +
                    'No. RUNT' + this.datos.numeroRunt +
                    'No. cuotas' + this.datos.numeroCuotas +
                    'No. licencia transito' + this.datos.licenciaTransito;

                this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': resumen });
              }else{
                swal({
                  title: 'Error!',
                  text: response.message,
                  type: 'error',
                  confirmButtonText: 'Aceptar'
                });
              }
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la peticiĂ³n');
                }
            }
        );
    }
}