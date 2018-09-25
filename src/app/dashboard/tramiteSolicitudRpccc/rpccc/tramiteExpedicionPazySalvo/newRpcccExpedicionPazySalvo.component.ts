import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { ServicioService } from '../../../../services/servicio.service';
import { CiudadanoService } from '../../../../services/ciudadano.service';
import { ComparendoService } from '../../../../services/comparendo.service';
import { MpersonalFuncionarioService } from '../../../../services/mpersonalFuncionario.service';
import { PaisService } from '../../../../services/pais.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRpccc-expedicion-pazysalvo',
    templateUrl: './newRpcccExpedicionPazySalvo.html'
})
export class NewRpcccExpedicionPazySalvoComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() solicitante: any = null;
    @Input() factura: any = null;
    public errorMessage;
    public respuesta;
    public clases: any;
    public claseSelected: any;
    public servicios: any;
    public comparendos: any;
    public servicioSelected: any;
    public paises: any;
    public paisSelected: any;
    public tramiteFacturaSelected: any;
    public tipoCambioSelected: any;
    public categorias: string[];
    public categoriaSelected: any;
    public resumen = {};     public datos = {
        'tramiteFactura': null,
    };

    constructor(
        private _LoginService: LoginService,
        private _tramiteFacturaService: TramiteFacturaService,
        private _ServicioService: ServicioService,
        private _CiudadanoService: CiudadanoService,
        private _ComparendoService: ComparendoService,
        private _PaisService: PaisService,
        private _MpersonalFuncionarioService: MpersonalFuncionarioService,
    ) { }

    ngOnInit() {
        let token = this._LoginService.getToken();
        let ciudadano = {
            'ciudadanoId': this.solicitante.id,
        }
        this._ComparendoService.searchComparendosCiudadano(ciudadano, token).subscribe(
            response => {
                this.comparendos = response.data;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
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
    
    onEnviarTramite() {
        let token = this._LoginService.getToken();

        let identity = this._LoginService.getIdentity();
        this.datos.tramiteFactura = 65;
        this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
      
    }

    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}