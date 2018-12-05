import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { RncLicenciaConduccionService } from '../../../../services/rncLicenciaConduccion.service';
import { LoginService } from '../../../../services/login.service';


@Component({
    selector: 'appRna-duplicado-licencia',
    templateUrl: './newRna.duplicadoLicencia.html'
})
export class NewRnaDuplicadoLicenciaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() factura: any = null;
    @Input() solicitanteId: any = null;
    public errorMessage;
    public tramiteFacturaSelected: any;

    public documentacion: any;
    public resumen = {};     
    public datos = {
        'numeroRunt': null,
        'tramiteFormulario': null,
        'idFactura': null,
        'numeroLicenciaActual': null,
        'nuevaLicencia': null,
    };
 
    constructor(
        private _RncLicenciaConduccionService: RncLicenciaConduccionService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        let datos = {
            'idSolicitante': this.solicitanteId
        }
        let token = this._LoginService.getToken();
        this._RncLicenciaConduccionService.searchLicenciaActual(datos,token).subscribe(
            response => {
            if(response.status == 'success'){
                this.datos.numeroLicenciaActual = response.data.numero;
                console.log(response);
            }else{
                
            }
            error => {
                    this.errorMessage = <any>error;
                
                    if(this.errorMessage != null){
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
        }); 
     }
    
    enviarTramite() {
        this.datos.idFactura = this.factura.id;
        this.datos.tramiteFormulario = 'rna-duplicadolicencia';
        this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
        
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}