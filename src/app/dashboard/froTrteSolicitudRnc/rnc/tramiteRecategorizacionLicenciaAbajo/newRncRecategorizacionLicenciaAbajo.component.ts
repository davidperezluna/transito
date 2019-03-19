import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CfgPaisService } from '../../../../services/cfgPais.service';
import { CfgLicenciaConduccionCategoriaService } from '../../../../services/cfgLicenciaConduccionCategoria.service';
import { VhloCfgClaseService } from '../../../../services/vhloCfgClase.service';
import { VhloCfgServicioService } from '../../../../services/vhloCfgServicio.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnc-recategorizacion-licencia-abajo',
    templateUrl: './newRncRecategorizacionLicenciaAbajo.html'
})
export class NewRncRecategorizacionLicenciaAbajoComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() solicitante: any = null;
    @Input() tramiteFactura: any = null;
    public errorMessage;

    public paises: any;
    public clases: any;
    public servicios: any;
    public categorias: any;

    public tramiteFacturaSelected: any;

    public datos = {
        'numeroLicenciaConduccion': null,
        'numeroRunt': null,
        'vigencia': null,
        'idCategoriaActual': null,
        'idCategoriaNueva': null,
        'idPais': null,
        'idClase': null,
        'idServicio': null,
        'idTramiteFactura': null,
        'idSolicitante': null,
    };
    

    constructor(
        private _LoginService: LoginService,
        private _CfgPaisService: CfgPaisService,
        private _ClaseService: VhloCfgClaseService,
        private _ServicioService: VhloCfgServicioService,
        private _CategoriaService: CfgLicenciaConduccionCategoriaService,
    ) { }

    ngOnInit() {
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

        this._ClaseService.getClaseSelect().subscribe(
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
        let token = this._LoginService.getToken();
        
        this.datos.numeroLicenciaConduccion = this.solicitante.identificacion;
        this.datos.idTramiteFactura = this.tramiteFactura.factura
        this.datos.idSolicitante = this.solicitante.id;
        
        let resumen = "<b>No. factura<b>" + this.tramiteFactura.factura.numero;

        this.readyTramite.emit({ 'foraneas':this.datos, 'resumen':resumen });
    }
    
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}