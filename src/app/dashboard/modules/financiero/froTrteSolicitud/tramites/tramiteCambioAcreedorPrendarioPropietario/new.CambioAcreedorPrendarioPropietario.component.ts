import { Component , OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VhloAcreedorService } from '../../../../../../services/vhloAcreedor.service';
import { VhloPropietarioService } from '../../../../../../services/vhloPropietario.service';
import { UserCiudadanoService } from '../../../../../../services/userCiudadano.service';
import { UserCfgTipoIdentificacionService } from '../../../../../../services/userCfgTipoIdentificacion.service';
import { LoginService } from '../../../../../../services/login.service';
import { Router } from "@angular/router";

import swal from 'sweetalert2';

@Component({
    selector: 'app-cambio-acreedor-prendario-propietario',
    templateUrl: './new.CambioAcreedorPrendarioPropietario.html'
})
export class NewTramiteCambioAcreedorPrendarioPropietarioComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    @Input() funcionario: any = null;
    @Input() tramitesRealizados: any = null;
    public errorMessage; 
    
    public realizado: any = false;
    public tramiteSolicitud: any = null;
    public tipoPropiedadSelected:any;

    public ciudadano:any = null;
    public empresa:any = null;
    public acreedoresActuales:any = null;
    public propietarioOld:any = null;
    public propietarioNew:any = null;
   
    public tiposIdentificacion;
    public identificacionOld:any;
    public identificacionNew:any;
    public nit:any;

    public tipoIdentificacionSelectedOld: any;
    public tipoIdentificacionSelectedNew: any;

    public formCiudadano = false;
    
    public datos = {
        'campos': null,
        'documentacion': true,
        'observacion': null,
        'tipo': 'PROPIETARIO',
        'idFuncionario': null,
        'idPropietarioOld': null,
        'idPropietarioNew': null,
        'idAcreedor': null,
        'idVehiculo': null,
        'idTramiteFactura': null,
    };

    constructor(
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _AcreedorService: VhloAcreedorService,
        private _PropietarioService: VhloPropietarioService,
        private _CiudadanoService: UserCiudadanoService,
        private _LoginService: LoginService,
        private router: Router,
    ) { }

    ngOnInit() {
        swal({
            title: 'Buscando acreedores actuales!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

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
        } else {
            let token = this._LoginService.getToken();
            
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

            this._AcreedorService.searchByVehiculo({ 'idVehiculo': this.vehiculo.id }, token).subscribe(
                response => {
                    if (response.code == 200) {
                        this.acreedoresActuales = response.data;

                        swal.close();
                    }else{
                        this.acreedoresActuales = null;

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
            );
        }   
    }
    
    onSearchPropietarioNew(){
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
                        this._PropietarioService.searchByCiudadanoOrEmpresaAndVehiculo({ 'id': response.data.ciudadano.id, 'tipo': 'CIUDADANO', 'idVehiculo': this.vehiculo.id }, token).subscribe(
                            response => {
                                if (response.code == 200) {
                                    this.propietarioNew = response.data;
                                    this.datos.idPropietarioNew = this.propietarioNew.id;

                                    swal.close();
                                } else {
                                    this.propietarioNew = null;
                                    this.datos.idPropietarioNew = null;

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
                                    this.propietarioNew = response.data;
                                    this.datos.idPropietarioNew = this.propietarioNew.id;

                                    swal.close();
                                } else {
                                    this.propietarioNew = null;
                                    this.datos.idPropietarioNew = null;

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
                    this.propietarioNew = null;
                    this.datos.idPropietarioNew = null;

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

    onEnviar() {
        this.datos.campos = ['cambioAcreedor'];
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
    }
}