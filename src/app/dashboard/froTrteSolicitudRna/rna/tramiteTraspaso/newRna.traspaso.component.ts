import { Component , OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { VhloPropietarioService } from '../../../../services/vhloPropietario.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { UserCfgTipoIdentificacionService } from '../../../../services/userCfgTipoIdentificacion.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';

@Component({ 
    selector: 'appRna-traspaso',
    templateUrl: './newRna.traspaso.html', 
})
export class NewRnaTraspasoComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    @Input() funcionario: any = null;
    @Input() tramitesRealizados: any = null;
    public errorMessage; 
    
    public realizado: any = false;
    public tramiteSolicitud: any  = null;

    public tiposIdentificacion: any;
    public identificacionOld: any;
    public identificacionNew: any;
    public tipoIdentificacionSelectedOld: any = null;
    public tipoIdentificacionSelectedNew: any = null;

    public ciudadano: any = null;
    public empresa: any = null;
    public propietario: any = null;

    public tiposPropiedad = [
        {'value':1,'label':"Leasing"},
        {'value':2,'label':"Propio"}
    ];

    public datos = {
        'documentacion': true,
        'observacion': null,
        'permiso': false,
        'tipoPropiedad': null,
        'idFuncionario': null,
        'idVehiculo': null,
        'idPropietario': null,
        'idCiudadano': null,
        'idEmpresa': null,
        'idTramiteFactura': null,
    };

    constructor(
        private _PropietarioService: VhloPropietarioService,
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _TramiteFacturaService: FroFacTramiteService,
        private _CiudadanoService: UserCiudadanoService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _FuncionarioService: PnalFuncionarioService,
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
        }else{
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
        }       
    }
    
    onSearchPropietarioOld() {
        swal({
            title: 'Buscando propietario actual!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._LoginService.getToken();

        let datos = {
            'identificacion': this.identificacionOld,
            'idTipoIdentificacion': this.tipoIdentificacionSelectedOld,
        }

        this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
            response => {
                if (response.code == 200) {
                    if (response.data.ciudadano) {
                        this._PropietarioService.searchByCiudadanoOrEmpresaAndVehiculo({ 'id': response.data.ciudadano.id, 'tipo': 'CIUDADANO', 'idVehiculo': this.vehiculo.id }, token).subscribe(
                            response => {
                                if (response.code == 200) {
                                    this.propietario = response.data;
                                    this.datos.idPropietario = this.propietario.id;

                                    swal.close();
                                } else {
                                    this.propietario = null;
                                    this.datos.idPropietario = null;

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
                    } else if (response.data.empresa){
                        this._PropietarioService.searchByCiudadanoOrEmpresaAndVehiculo({ 'id': response.data.empresa.id, 'tipo': 'EMPRESA', 'idVehiculo': this.vehiculo.id }, token).subscribe(
                            response => {
                                if (response.code == 200) {
                                    this.propietario = response.data;
                                    this.datos.idPropietario = this.propietario.id;

                                    swal.close();
                                } else {
                                    this.propietario = null;
                                    this.datos.idPropietario = null;

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

                    swal.close();
                } else {
                    this.propietario = null;
                    this.datos.idPropietario = null;

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

    onSearchPropietarioNew() {
        swal({
            title: 'Buscando propietario nuevo!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._LoginService.getToken();

        let datos = {
            'identificacion': this.identificacionNew,
            'idTipoIdentificacion': this.tipoIdentificacionSelectedNew,
        }

        this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
            response => {
                if (response.code == 200) {
                    if (response.data.ciudadano) {
                        this.ciudadano = response.data.ciudadano;
                        this.datos.idCiudadano = this.ciudadano.id;
                        this.empresa = null;
                        this.datos.idEmpresa = null;
                    } else if (response.data.empresa){
                        this.empresa = response.data.empresa;
                        this.datos.idEmpresa = this.empresa.id;
                        this.ciudadano = null;
                        this.datos.idCiudadano = null;
                    }

                    swal.close();
                } else {
                    this.datos.idCiudadano = null;
                    this.datos.idEmpresa = null;

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

    goEmpresa(){
        this.router.navigate(['/dashboard/empresa']);
    }

    onEnviar() {
        this.datos.idVehiculo = this.vehiculo.id;
        this.datos.idTramiteFactura = this.tramiteFactura.id;

        let propietarioActual = null;
        if (this.propietario.ciudadano) {
            propietarioActual = this.propietario.ciudadano.primerNombre + ' '+ this.propietario.ciudadano.primerApellido;
        }else if (this.propietario.empresa) {
            propietarioActual = this.propietario.empresa.nombre;
        }

        let propietarioNuevo = null;
        if (this.ciudadano) {
            propietarioNuevo = this.ciudadano.primerNombre + ' '+ this.ciudadano.primerApellido;
        }else if (this.empresa) {
            propietarioNuevo = this.empresa.nombre;
        }

        let resumen = "No. factura: " + this.tramiteFactura.factura.numero +
                    ", Traspaso de " + propietarioActual +
                    "a " + propietarioNuevo;

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
                

                this._PropietarioService.update(this.datos, token).subscribe(
                    response => {
                    },
                    error => {
                        this.errorMessage = <any>error;

                        if (this.errorMessage != null) {
                            console.log(this.errorMessage);
                            alert('Error en la petición');
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