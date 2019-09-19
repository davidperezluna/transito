import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CfgPaisService } from '../../../../../../services/cfgPais.service';
import { UserLcCfgCategoriaService } from '../../../../../../services/userLcCfgCategoria.service';
import { VhloCfgServicioService } from '../../../../../../services/vhloCfgServicio.service';
import { LoginService } from '../../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'appRnc-recategorizacion-licencia-arriba',
    templateUrl: './newRncRecategorizacionLicenciaArriba.html'
})

export class NewRncRecategorizacionLicenciaArribaComponent implements OnInit {
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
    public categorias: any = null;
    
    public datos = {
        'campos': null,
        'documentacion': true,
        'observacion': null,
        'numeroLicencia': null,
        'numero': null,
        'vigencia': null,
        'idFuncionario': null,
        'idOrganismoTransito': null,
        'idCategoriaActual': null,
        'idCategoriaNueva': null,
        'idPais': null,
        'idServicio': null,
        'idTramiteFactura': null,
        'idSolicitante': null,
    };

    constructor(
        private _PaisService: CfgPaisService,
        private _ServicioService: VhloCfgServicioService,
        private _CategoriaService: UserLcCfgCategoriaService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this.datos.idFuncionario  = this.funcionario.id;
        this.datos.numeroLicencia = this.solicitante.identificacion;
        
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
            this._PaisService.select().subscribe(
                response => {
                    this.paises = response;
                },
                error => {
                    this.errorMessage = <any>error;
            
                    if(this.errorMessage != null){
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                    }
                }
            );
    
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
                        this.categorias = response.data;
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
        this.datos.campos = ['recategorizacionArriba'];     
        this.datos.numero = this.solicitante.identificacion;
        this.datos.idOrganismoTransito = this.funcionario.organismoTransito.id;
        this.datos.idTramiteFactura = this.tramiteFactura.factura.id;
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