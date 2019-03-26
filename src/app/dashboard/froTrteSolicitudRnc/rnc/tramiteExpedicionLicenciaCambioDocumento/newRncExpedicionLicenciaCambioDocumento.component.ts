import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { VhloCfgClaseService } from '../../../../services/vhloCfgClase.service';
import { VhloCfgServicioService } from '../../../../services/vhloCfgServicio.service';
import { CfgPaisService } from '../../../../services/cfgPais.service';
import { UserLcCfgCategoriaService } from '../../../../services/userLcCfgCategoria.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnc-expedicion-licencia-cambio-documento',
    templateUrl: './newRncExpedicionLicenciaCambioDocumento.html'
})
export class NewRncExpedicionLicenciaCambioDocumentoComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() solicitante: any = null;
    @Input() tramiteFactura: any = null;
    public errorMessage;

    public clases: any;
    public servicios: any;
    public paises: any;
    public categorias: any;

    public tramiteFacturaSelected: any;

    public datos = {
        'numeroLicenciaConduccion': null,
        'identificacionAnterior': null,
        'identificacionActual': null,
        'numeroRunt': null,
        'vigencia': null,
        'idPais': null,
        'idClase': null,
        'idServicio': null,
        'idCategoria': null,
        'idTramiteFactura': null,
        'idSolicitante': null,
    };

    constructor(
        private _ClaseService: VhloCfgClaseService,
        private _ServicioService: VhloCfgServicioService,
        private _CfgPaisService: CfgPaisService,
        private _CategoriaService: UserLcCfgCategoriaService,
    ) { }

    ngOnInit() {
        this.datos.identificacionAnterior = this.solicitante.identificacion;

        this._ClaseService.select().subscribe(
            response => {
              this.clases = response;
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
      
              if(this.errorMessage != null){
                console.log(this.errorMessage);
                alert('Error en la petición');
              }
            }
        );

        this._CfgPaisService.select().subscribe(
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

        this._CategoriaService.select().subscribe(
            response => {
                this.categorias = response;
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
    
    onEnviar() {
        this.datos.numeroLicenciaConduccion = this.datos.identificacionActual;
        this.datos.idTramiteFactura = this.tramiteFactura.factura.id;
        this.datos.idSolicitante = this.solicitante.id;

        let resumen = "<b>No. factura</b>" + this.tramiteFactura.factura.numero;
        
        this.readyTramite.emit({'foraneas':this.datos, 'resumen':resumen});
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}