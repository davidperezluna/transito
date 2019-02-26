import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { VhloCfgClaseService } from '../../../../services/vhloCfgClase.service';
import { VhloCfgServicioService } from '../../../../services/vhloCfgServicio.service';
import { CfgLicenciaConduccionCategoriaService } from '../../../../services/cfgLicenciaConduccionCategoria.service';
import { CfgPaisService } from '../../../../services/cfgPais.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnc-duplicado-licencia',
    templateUrl: './newRncDuplicadoLicencia.html'
})
export class NewRncDuplicadoLicenciaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() solicitante: any = null;
    @Input() factura: any = null;
    public errorMessage;

    public clases: any;
    public servicios: any;
    public paises: any;
    public categorias: any;

    public resumen = {

    };     
    
    public datos = {
        'tramiteFormulario': null,
        'idFactura': null,
        'categoria': null,
        'numeroLicenciaConduccion': null,
        'numeroRunt': null,
        'vigencia': null,
        'idPais': null,
        'idClase': null,
        'idCategoria': null,
        'idServicio': null,
        'ciudadanoId': null,
    };

    constructor(
        private _LoginService: LoginService,
        private _CategoriaService: CfgLicenciaConduccionCategoriaService,
        private _UserCiudadanoService: UserCiudadanoService,
        private _ClaseService: VhloCfgClaseService,
        private _ServicioService: VhloCfgServicioService,
        private _CfgPaisService: CfgPaisService,
    ) { }

    ngOnInit() {
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
        this.datos.tramiteFormulario = 'rnc-duplicadolicencia';

        this.datos.numeroLicenciaConduccion = this.solicitante.identificacion;
        this.datos.ciudadanoId = this.solicitante.id;

        this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}