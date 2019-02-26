import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { VhloCfgServicioService } from '../../../../services/vhloCfgServicio.service';
import { ComparendoService } from '../../../../services/comparendo.service';
import { CfgPaisService } from '../../../../services/cfgPais.service';
import { LoginService } from '../../../../services/login.service';
import { environment } from 'environments/environment'
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
        'tramiteFormulario': null,
        'ciudadanoId': null,
        'idFactura': null,
    };

    public apiUrl = environment.apiUrl + 'comparendo';

    constructor(
        private _LoginService: LoginService,
        private _tramiteFacturaService: TramiteFacturaService,
        private _ServicioService: VhloCfgServicioService,
        private _ComparendoService: ComparendoService,
        private _CfgPaisService: CfgPaisService,
    ) { }

    ngOnInit() {
        let token = this._LoginService.getToken();
        
        this._ComparendoService.searchByInfractor({ 'infractorIdentificacion': this.solicitante.identificacion}, token).subscribe(
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
    }
    
    onEnviarTramite() {

        this.datos.idFactura = this.factura.id;
        this.datos.tramiteFormulario = 'rpccc-expedicionpazysalvo';
        this.datos.ciudadanoId = this.solicitante.id;

        this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
    }

    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}