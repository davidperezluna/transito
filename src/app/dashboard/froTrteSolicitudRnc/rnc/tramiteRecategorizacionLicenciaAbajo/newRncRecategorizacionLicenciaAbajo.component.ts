import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VhloCfgClaseService } from '../../../../services/vhloCfgClase.service';
import { VhloCfgServicioService } from '../../../../services/vhloCfgServicio.service';
import { CfgPaisService } from '../../../../services/cfgPais.service';
import { CfgLicenciaConduccionCategoriaService } from '../../../../services/cfgLicenciaConduccionCategoria.service';
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
    @Input() factura: any = null;
    public errorMessage;

    public clases: any;
    public servicios: any;
    public paises: any;
    public categorias: any;

    public tramiteFacturaSelected: any;

    public resumen = {

    };

    public datos = {
        'tramiteFormulario': null,
        'idFactura': null,
        'numeroLicenciaConduccion': null,
        'numeroRunt': null,
        'vigencia': null,
        'idCategoriaActual': null,
        'idCategoriaNueva': null,
        'idPais': null,
        'idClase': null,
        'idServicio': null,
        'ciudadanoId': null,
    };
    

    constructor(
        private _LoginService: LoginService,
        private _ClaseService: VhloCfgClaseService,
        private _ServicioService: VhloCfgServicioService,
        private _CfgPaisService: CfgPaisService,
        private _CategoriaService: CfgLicenciaConduccionCategoriaService,
    ) { }

    ngOnInit() {
        this.categorias = ['A2'];

        this._ClaseService.getClaseSelect().subscribe(
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

        this._ServicioService.getServicioSelect().subscribe(
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
                //this.datos.idCategoriaActual = [this.tramitePrecio.modulo.id];
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
    
    enviarTramite() {
        let token = this._LoginService.getToken();
        
        this.datos.idFactura = this.factura.id;
        this.datos.tramiteFormulario = 'rnc-recategorizacionabajo';
        this.datos.numeroLicenciaConduccion = this.solicitante.identificacion;
        this.datos.ciudadanoId = this.solicitante.id;

        this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}