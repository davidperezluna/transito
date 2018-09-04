import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClaseService } from '../../../../services/clase.service';
import { ServicioService } from '../../../../services/servicio.service';
import { PaisService } from '../../../../services/pais.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnc-recategorizacion-licencia-arriba',
    templateUrl: './newRncRecategorizacionLicenciaArriba.html'
})

export class NewRncRecategorizacionLicenciaArribaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() solicitante: any = null;
    @Input() factura: any = null;
    public errorMessage;
    public respuesta;
    public clases: any;
    public claseSelected: any;
    public servicios: any;
    public servicioSelected: any;
    public paises: any;
    public paisSelected: any;
    public tramiteFacturaSelected: any;
    public tipoCambioSelected: any;
    public categorias: string[];
    public datos = {
        'tramiteFormulario': null,
        'facturaId': null,
        'categoriaActual': null,
        'categoriaNueva': null,
        'numeroLicenciaConduccion': null,
        'numeroRunt': null,
        'vigencia': null,
        'documentacion': null,
        'paisId': null,
        'claseId': null,
        'servicioId': null,
        'ciudadanoId': null,
    };

    constructor(
        private _LoginService: LoginService,
        private _ClaseService: ClaseService,
        private _ServicioService: ServicioService,
        private _PaisService: PaisService,
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
    }
    
    enviarTramite() {
        let token = this._LoginService.getToken();
        
        this.datos.facturaId = this.factura.id;
        this.datos.tramiteFormulario = 'rnc-recategorizacionarriba';
        this.datos.numeroLicenciaConduccion = this.solicitante.identificacion;
        this.datos.claseId = this.claseSelected;
        this.datos.servicioId = this.servicioSelected;
        this.datos.paisId = this.paisSelected;
        this.datos.ciudadanoId = this.solicitante.id;

        this.readyTramite.emit(this.datos);
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}