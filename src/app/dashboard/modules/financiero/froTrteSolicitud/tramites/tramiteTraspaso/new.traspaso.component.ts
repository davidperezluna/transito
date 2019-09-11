import { Component , OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { FroFacRetefuenteService } from '../../../../../../services/froFacRetefuente.service';
import { UserCiudadanoService } from '../../../../../../services/userCiudadano.service';
import { UserCfgTipoIdentificacionService } from '../../../../../../services/userCfgTipoIdentificacion.service';
import { VhloRestriccionService } from '../../../../../../services/vhloRestriccion.service';
import { LoginService } from '../../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-traspaso',
    templateUrl: './new.traspaso.html', 
})
export class NewTraspasoComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    @Input() funcionario: any = null;
    @Input() tramitesRealizados: any = null;
    public errorMessage; 
    
    public realizado: any = false;
    public tramiteSolicitud: any  = null;
    public limitaciones: any  = null;
    public prohibiciones: any  = null;

    public tiposIdentificacion: any;
    public identificacionOld: any;
    public identificacionNew: any;
    public tipoIdentificacionSelectedOld: any = null;
    public tipoIdentificacionSelectedNew: any = null;

    public tiposPropiedad = [
        {'value':1,'label':"Leasing"},
        {'value':2,'label':"Propio"}
    ];

    public datos = {
        'campos': null,
        'documentacion': true,
        'observacion': null,
        'permiso': false,
        'tipoPropiedad': null,
        'retenciones': null,
        'propietarios': [],
        'idFuncionario': null,
        'idVehiculo': null,
        'idTramiteFactura': null,
    };

    constructor(
        private _RetefuenteService: FroFacRetefuenteService,
        private _CiudadanoService: UserCiudadanoService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _RestriccionService: VhloRestriccionService,
        private _LoginService: LoginService,
        private router: Router,
    ) { }

    ngOnInit() {
        swal({
            title: 'cargando información!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._LoginService.getToken();

        let datosLimitacion = {
            'idVehiculo': this.vehiculo.id,
            'tipo': 'LIMITACION',
        };

        this._RestriccionService.searchByVehiculoAndTipo(datosLimitacion, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.limitaciones = response.data;
                } else {
                    this.limitaciones = null;
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

        /*let datosProhibicion = {
            'idCiudadano': this.solicitante.id,
        };

        this._RestriccionService.searchByVehiculoAndTipo(datos, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.limitaciones = response.data;
                } else {
                    this.limitaciones = null;
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

            let token = this._LoginService.getToken();

            this._RetefuenteService.searchByFactura({ 'idFactura': this.tramiteFactura.factura.id }, token).subscribe(
                response => {
                    if (response.code == 200) {
                        this.datos.retenciones = response.data;
                        
                        swal.close();
                    }else{
                        this.datos.retenciones = null;

                        swal({
                            title: response.title,
                            text: response.message,
                            type: response.status,
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
                        this.datos.propietarios.push(
                            {
                                'id': response.data.ciudadano.id,
                                'identificacion': response.data.ciudadano.identificacion,
                                'nombre': response.data.ciudadano.primerNombre +" "+ response.data.ciudadano.segundoNombre,
                                'permiso': this.datos.permiso,
                                'tipo': 'CIUDADANO',
                            }   
                        );
                
                        swal({
                            title: 'Perfecto!',
                            text: 'Ciudadano agregado con éxito.',
                            type: 'success',
                            confirmButtonText: 'Aceptar'
                        });
                        
                    } else if (response.data.empresa){
                        this.datos.propietarios.push(
                            {
                                'id': response.data.empresa.id,
                                'identificacion': response.data.empresa.identificacion,
                                'nombre': response.data.empresa.nombre,
                                'permiso': this.datos.permiso,
                                'tipo': 'EMPRESA',
                            }   
                        );
                       
                    }

                    swal.close();
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
                        alert('Error en la petición');
                    }
                }
            }
        );
    }

    onDeletePropietario(propietario:any): void {
        this.datos.propietarios =  this.datos.propietarios.filter(h => h !== propietario);
    }

    goEmpresa(){
        this.router.navigate(['/dashboard/empresa']);
    }

    onEnviar() {
        this.datos.campos = ['traspaso'];
        this.datos.idVehiculo = this.vehiculo.id;
        this.datos.idTramiteFactura = this.tramiteFactura.id;

        let resumen = "No. factura: " + this.tramiteFactura.factura.numero +
            ", Traspaso de " + this.datos.retenciones +
            "a " + this.datos.propietarios;

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