import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserLicenciaTransitoService } from '../../../../../../services/userLicenciaTransito.service';
import { LoginService } from '../../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-duplicado-licencia',
    templateUrl: './new.duplicadoLicencia.html'
})
export class NewDuplicadoLicenciaComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    @Input() tramiteFactura: any = null;
    @Input() vehiculo: any = null;
    @Input() funcionario: any = null;
    @Input() tramitesRealizados: any = null;
    @Input() idCiudadano: any = null;
    public errorMessage; 
    
    public realizado: any = false;
    public tramiteSolicitud: any = null;

    public datos = {
        'documentacion': true,
        'observacion': null,
        'motivo': null,
        'numeroLicenciaActual': null,
        'nuevaLicencia': null,
        'idVehiculo': null,
        'idFuncionario': null,
        'idTramiteFactura': null,
    };

    public motivos = [
        { 'value': 'Pérdida', 'label': 'Pérdida' },
        { 'value': 'Hurto', 'label': 'Hurto' },
        { 'value': 'Deterioro', 'label': 'Hurto' },
    ];
 
    constructor(
        private _LicenciaTransitoService: UserLicenciaTransitoService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this.datos.idFuncionario  = this.funcionario.id;
        
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
        } else{
            let datos = {
                'idCiudadano': this.idCiudadano,
                'idVehiculo': this.vehiculo.id,
            }

            let token = this._LoginService.getToken();

            this._LicenciaTransitoService.searchActual(datos, token).subscribe(
                response => {
                    if (response.code == 200) {
                        this.datos.numeroLicenciaActual = response.data.numero;
                    } else {
                        this.datos.numeroLicenciaActual = null;
                    }
                    error => {
                        this.errorMessage = <any>error;

                        if (this.errorMessage != null) {
                            console.log(this.errorMessage);
                            alert("Error en la petición");
                        }
                    }
                }
            );
        }
     }
    
    onEnviar() {        
        this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.idVehiculo = this.vehiculo.id;

        let resumen = "Motivo "+ this.datos.motivo;

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