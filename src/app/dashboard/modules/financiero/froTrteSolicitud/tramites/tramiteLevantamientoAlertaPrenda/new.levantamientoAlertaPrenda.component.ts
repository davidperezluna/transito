import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { VhloAcreedorService } from '../../../../../../services/vhloAcreedor.service';
import { VhloCfgTipoAlertaService } from '../../../../../../services/vhloCfgTipoAlerta.service';
import { UserCfgTipoIdentificacionService } from '../../../../../../services/userCfgTipoIdentificacion.service';
import { LoginService } from '../../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-levantamiento-alerta-prenda',
    templateUrl: './new.levantamientoAlertaPrenda.html'
})
export class NewTramiteLevantamientoAlertaPrendaComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    @Input() funcionario: any = null;
    @Input() tramitesRealizados: any = null;
    public errorMessage; 
    
    public realizado: any = false;
    public tramiteSolicitud: any;
    public tiposAlerta: any;
    public tiposIdentificacion: any;

    public ciudadano: any;
    public empresa: any;
    public acreedor: any;

    public identificacion: any;
    public identificacionAcreedor: any;
    public tipoIdentificacionSelected = null;

    public table: any;

    public formCiudadano = false;
    public formIndex = true;

    public gradosAlerta = [
        { 'value': 1, 'label': "UNO" },
        { 'value': 2, 'label': "DOS" },
        { 'value': 3, 'label': "TRES" },
        { 'value': 4, 'label': "CUATRO" },
        { 'value': 5, 'label': "CINCO" },
        { 'value': 6, 'label': "SEIS" },
        { 'value': 7, 'label': "SIETE" },
        { 'value': 8, 'label': "OCHO" },
        { 'value': 9, 'label': "NUEVE" }
    ];
    
    public datos = {
        'documentacion': true,
        'observacion': null,
        'campos': null,
        'acreedores': [],
        'idAcreedor': null,
        'idFuncionario': null,
        'idTipoAlerta': null,
        'idVehiculo': null,
        'idTramiteFactura': null,
    };
    

    constructor(
        private _VehiculoAcreedorService: VhloAcreedorService,
        private _TipoAlertaService: VhloCfgTipoAlertaService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _LoginService: LoginService,
        private router: Router,
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
            this._TipoIdentificacionService.select().subscribe(
                response => {
                    this.tiposIdentificacion = response;
                },
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert('Error en la petición');
                    }
                }
            );

            this._TipoAlertaService.select().subscribe(
                response => {
                    this.tiposAlerta = response;
                },
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
            );

            let token = this._LoginService.getToken();

            this._VehiculoAcreedorService.searchByVehiculo({ 'idVehiculo': this.vehiculo.id }, token).subscribe(
                response => {
                    if (response.status == 'success') {
                        this.datos.acreedores = response.data;
                    } else {
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
    }
      
    onEnviar() {
        this.datos.campos = ['eliminarPignorado'];
        this.datos.idVehiculo = this.vehiculo.id;
        this.datos.idTramiteFactura = this.tramiteFactura.id;

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

        /*this._TramiteSolicitudService.validations(this.datos, token).subscribe(
            response => {
              if (response.code == 200) {
                this._VehiculoAcreedorService.delete({ 'id': this.datos.idAcreedor }, token).subscribe(
                    response => {
                        if (response.status == 'success') {
                            
                        } else {
        
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
                    alert('Error en la petición');
                }
            }
        );*/
    }

}