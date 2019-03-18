import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { SustratoService } from '../../../../services/sustrato.service';
import { CfgMunicipioService } from '../../../../services/cfgMunicipio.service';
import { UserCfgTipoIdentificacionService } from '../../../../services/userCfgTipoIdentificacion.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-rematricula',
    templateUrl: './newRna.rematricula.html'
})
export class NewRnaRematriculaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() tramiteFactura: any = null;
    @Input() vehiculo: any = null;
    public errorMessage;
    public respuesta;
    public tramiteFacturaSelected: any;
    public sustratos: any;
    public sustratoSelected: any;
    public entidadList: string[];
    public entidadSelected: any;
    public municipios: any;
    public municipioActaSelected: any;
    public municipioEntregaSelected: any;
    public tiposIdentificacion: any;
    public tipoIdentificacionEntregaSelected: any;
    public matriculaCancelada: any = null;
    public resumen: any;     
    public datos = {
        'entidad': null,
        'numeroActa': null,
        'fechaActa': null,
        'municipioActa': null,
        'numeroRunt': null,
        'fechaEntrega': null,
        'municipioEntrega': null,
        'tipoIdentificacionEntrega': null,
        'numeroIdentificacionEntrega': null,
        'nombreEntrega': null,
        'estado': null,
        'tramiteFactura': null,
        'tramiteFormulario': null,
        'idTramiteFactura': null,
        'idVehiculo': null,
    };

    public entidades = [
        { value: 'FISCALIA', label: 'FISCALIA' },
        { value: 'SIJIN', label: 'SIJIN' },
        { value: 'DIJIN', label: 'DIJIN' },
    ];

    constructor(
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _SustratoService: SustratoService,
        private _MunicipioService: CfgMunicipioService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
    ) { }

    ngOnInit() {      
        this._SustratoService.getSustratoSelect().subscribe(
            response => {
                this.sustratos = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );

        this._MunicipioService.select().subscribe(
            response => {
                this.municipios = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );

        this._TipoIdentificacionService.select().subscribe(
            response => {
                this.tiposIdentificacion = response;
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
        let token = this._loginService.getToken();

        this._TramiteSolicitudService.searchMatriculaCancelada({ 'idVehiculo': this.vehiculo.id }, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.matriculaCancelada = response.data;

                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });

                    this.datos.entidad = this.entidadSelected;
                    this.datos.municipioActa = this.municipioActaSelected;
                    this.datos.municipioEntrega = this.municipioEntregaSelected;
                    this.datos.tipoIdentificacionEntrega = this.tipoIdentificacionEntregaSelected;
                    this.datos.tramiteFactura = 25;
                     this.datos.idTramiteFactura = this.tramiteFactura.id;
                    this.datos.idVehiculo = this.vehiculo.id;
                    this.datos.tramiteFormulario = 'rna-rematricula';

                    //this.resumen = '';
                    
                    this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': this.resumen });
                } else {
                    this.matriculaCancelada = null;

                    swal({
                        title: 'Atención!',
                        text: response.message,
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
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

    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}