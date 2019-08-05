import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../services/login.service';
import { environment } from 'environments/environment';

import swal from 'sweetalert2';

@Component({
    selector: 'app-certificado-tradicion',
    templateUrl: './new.certificadoTradicion.html'
})
export class NewCertificadoTradicionComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    @Input() funcionario: any = null;
    @Input() tramitesRealizados: any = null;
    public errorMessage; 
    
    public realizado: any = false;
    public apiUrl = environment.apiUrl + 'financiero/frotrtesolicitud';
    public tramiteSolicitud: any = null;
    public identificacion: any;
 
    public ciudadano:any = null;
    public entregado:any = false;
   
    public datos = {
        'documentacion': true,
        'observacion': null,
        'observaciones': null,                  
        'campos': null,
        'idFuncionario': null,
        'idCiudadano': null,
        'idVehiculo': null,
        'idTramiteFactura': null,
    };

    constructor(
        private _TramiteFacturaService: FroFacTramiteService,
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _CiudadanoService: UserCiudadanoService,
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

    onSearchCiudadano() {
        swal({
            title: 'Buscando ciudadano!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        if (!this.identificacion) {
            swal({
                title: 'Error!',
                text: 'El número de identificación no puede estar vacia.',
                type: 'error',
                confirmButtonText: 'Aceptar'
            });
        }else{
            let token = this._LoginService.getToken();
    
            let datos = {
                'identificacion': this.identificacion,
                'idTipoIdentificacion': 1,
            }
    
            this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
                response => {
                    if (response.code == 200) {
                        if (response.data.ciudadano) {
                            this.ciudadano = response.data.ciudadano;
    
                            swal({
                                title: 'Perfecto!',
                                text: response.message,
                                type: 'success',
                                confirmButtonText: 'Aceptar'
                            });
                        }
                    } else {
                        this.ciudadano = null;
    
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
                            alert('Error en la petición');
                        }
                    }
                }
            );
        }

    }

    onEnviar() {
        this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.idVehiculo = this.vehiculo.id;
        this.datos.idCiudadano = this.ciudadano.id;

        let resumen = "No. factura: " + this.tramiteFactura.factura.numero + 
                ", Ciudadano que recibe: " + this.ciudadano.primerNombre + " " + this.ciudadano.primerApellido;

        this.entregado = true;
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