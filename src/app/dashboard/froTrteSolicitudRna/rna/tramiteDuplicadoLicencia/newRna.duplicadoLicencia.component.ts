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
    @Input() tramiteFactura: any = null;
    @Input() idSolicitante: any = null;
    public errorMessage;
    public tramiteFacturaSelected: any;

    public documentacion: any;
    public resumen: any = null;

    public datos = {
        'motivo': null,
        'numeroRunt': null,
        'tramiteFormulario': null,
        'numeroLicenciaActual': null,
        'nuevaLicencia': null,
        'idTramiteFactura': null,
    };

    public motivos = [
        { 'value': 'Pérdida', 'label': 'Pérdida' },
        { 'value': 'Hurto', 'label': 'Hurto' },
        { 'value': 'Deterioro', 'label': 'Hurto' },
    ];
 
    constructor(
        private _RncLicenciaConduccionService: RncLicenciaConduccionService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        let datos = {
            'idSolicitante': this.idSolicitante
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
         this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.tramiteFormulario = 'rna-duplicadolicencia';
        this.resumen = "Motivo "+ this.datos.motivo +"<br/>";
        this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}