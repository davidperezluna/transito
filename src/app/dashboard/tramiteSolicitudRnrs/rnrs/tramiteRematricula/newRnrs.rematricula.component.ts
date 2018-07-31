import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { SustratoService } from '../../../../services/sustrato.service';
import { MunicipioService } from '../../../../services/municipio.service';
import { TipoIdentificacionService } from '../../../../services/tipoIdentificacion.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnrs-rematricula',
    templateUrl: './newRnrs.rematricula.html'
})
export class NewRnrsRematriculaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    public errorMessage;
    public respuesta;
    public tramiteFacturaSelected: any;
    public sustratos: any;
    public sustratoSelected: any;
    public entidadList: string[];
    public entidadSelected: any;
    public numeroRunt: any;
    public numeroActa: any;
    public fechaActa: any;
    public municipios: any;
    public municipioActaSelected: any;
    public municipioEntregaSelected: any;
    public fechaEntrega: any;
    public tiposIdentificacion: any;
    public tipoIdentificacionEntregaSelected: any;
    public numeroIdentificacionEntrega: any;
    public nombreEntrega: any;
    public estado: any;
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
        'sustrato': null,
        'tramiteFactura': null,
    };

    constructor(
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _SustratoService: SustratoService,
        private _MunicipioService: MunicipioService,
        private _TipoIdentificacionService: TipoIdentificacionService,
    ) { }

    ngOnInit() {
        this.entidadList = ['Fiscalía,', 'SIJIN', 'DIJIN'];

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

        this._MunicipioService.getMunicipioSelect().subscribe(
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

        this._TipoIdentificacionService.getTipoIdentificacionSelect().subscribe(
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

    
    enviarTramite() {
        this.datos.numeroRunt = this.numeroRunt;
        this.datos.entidad = this.entidadSelected;
        this.datos.numeroActa = this.numeroActa;
        this.datos.fechaActa = this.fechaActa;
        this.datos.municipioActa = this.municipioActaSelected;
        this.datos.municipioEntrega = this.municipioEntregaSelected;
        this.datos.fechaEntrega = this.fechaEntrega;
        this.datos.tipoIdentificacionEntrega = this.tipoIdentificacionEntregaSelected;
        this.datos.numeroIdentificacionEntrega = this.numeroIdentificacionEntrega;
        this.datos.nombreEntrega = this.nombreEntrega;
        this.datos.estado = this.estado;
        this.datos.tramiteFactura = 25;
        this.readyTramite.emit(this.datos);
    }

    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}