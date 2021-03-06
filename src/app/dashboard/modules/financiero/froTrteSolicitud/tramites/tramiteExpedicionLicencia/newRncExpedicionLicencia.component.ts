import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserCiudadanoService } from '../../../../../../services/userCiudadano.service';
import { UserLcCfgCategoriaService } from '../../../../../../services/userLcCfgCategoria.service';
import { VhloCfgServicioService } from '../../../../../../services/vhloCfgServicio.service';
import { UserLcCfgRestriccionService } from '../../../../../../services/userLcCfgRestriccion.service';
import { VhloCfgClaseService } from '../../../../../../services/vhloCfgClase.service';
import { LoginService } from '../../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'appRnc-expedicion-licencia',
    templateUrl: './newRncExpedicionLicencia.html'
})
export class NewRncExpedicionLicenciaComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    @Input() funcionario: any = null;
    @Input() solicitante: any = null;
    @Input() tramiteFactura: any = null;
    @Input() tramitesRealizados: any = null;
    public errorMessage;

    public realizado: any = false;
    public tramiteSolicitud: any = null;
    public paises: any;
    public servicios: any;
    public clases: any;
    public categorias: any = null;
    public restricciones: any;
    public radio: any;

    public datos = {
        'campos': null,
        'documentacion': true,
        'observacion': null,
        'numero': null,
        'fechaExpedicion': null,
        'idFuncionario': null,
        'idPais': null,
        'idCategoria': null,
        'idServicio': null,
        'idClase': null,
        'idRestriccion': null,
        'idOrganismoTransito': null,
        'idTramiteFactura': null,
        'idSolicitante': null,
    };

    constructor(
        private _CiudadanoService: UserCiudadanoService,
        private _ServicioService: VhloCfgServicioService,
        private _CategoriaService: UserLcCfgCategoriaService,
        private _LcRestriccionService: UserLcCfgRestriccionService,
        private _ClaseService: VhloCfgClaseService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        let token = this._LoginService.getToken();
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
            this._ServicioService.select().subscribe(
                response => {
                    this.servicios = response;
                },
                error => {
                    this.errorMessage = <any>error;
    
                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert('Error en la petición');
                    }
                }
            );

            this._LcRestriccionService.select().subscribe(
                response => {
                    this.restricciones = response;
                },
                error => {
                    this.errorMessage = <any>error;
    
                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert('Error en la petición');
                    }
                }
            );

            this._ClaseService.selectByTipoVehiculo({ 'idTipoVehiculo': this.tramiteFactura.precio.tipoVehiculo.id}, token).subscribe(
                response => {
                    this.clases = response;
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

    onSearchCiudadano(){
        let token = this._LoginService.getToken();

        let datos = {
            'identificacion': this.solicitante.identificacion,
            'idTipoIdentificacion': 1
        }

        if (!this.solicitante.identificacion) {
            swal({
                title: 'Error!',
                text: 'El número de identificación no puede estar vacio.',
                type: 'error',
                confirmButtonText: 'Aceptar'
            });
        }else{
            this._CiudadanoService.searchByIdentificacion(datos,token).subscribe(
                response => {
                    if(response.code == 200){
                        this.solicitante = response.data.ciudadano;
                    }else{
                        swal({
                            title: 'Error!',
                            text: response.message,
                            type: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                    }
                    error => {
                        this.errorMessage = <any>error;
                    
                        if(this.errorMessage != null){
                            console.log(this.errorMessage);
                            alert("Error en la petición");
                        }
                    }
                }
            ); 
        }
    }

    onChangedServicio(id) {
        if (id) {
            let token = this._LoginService.getToken();

            let datos = {
                'idServicio': id,
                'idTipoVehiculo': this.tramiteFactura.precio.tipoVehiculo.id
            }

            this._CategoriaService.selectByServicioAndTipoVehiculo(datos, token).subscribe(
                response => {
                    if (response.code == 200) {
                        setTimeout(() => {
                            this.categorias = response.data;
                        });
                    } else {
                        this.categorias = null;

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

    onEnviar() {
        this.datos.campos = ['expedicionLicenciaConduccion'];
        this.datos.numero = this.solicitante.identificacion;
        this.datos.idOrganismoTransito = this.funcionario.organismoTransito.id;
        this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.idSolicitante = this.solicitante.id;

        let resumen = "<b>No. factura</b>" + this.tramiteFactura.factura.numero;

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