import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { SustratoService } from '../../../../services/sustrato.service';
import { MunicipioService } from '../../../../services/municipio.service';
import { TipoIdentificacionService } from '../../../../services/tipoIdentificacion.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnma-rematricula',
    templateUrl: './newRnma.rematricula.html'
})
export class NewRnmaRematriculaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() factura: any = null;
    @Input() vehiculo: any = null;
    public errorMessage;
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
    public resumen = {};     
    public matriculaCancelada = false;
    public entidades = [
        { value: 'FISCALIA', label: 'FISCALIA' },
        { value: 'SIJIN', label: 'SIJIN' },
        { value: 'DIJIN', label: 'DIJIN' },
    ];
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
        'tramiteFormulario': null,
        'idFactura': null,
        'idVehiculo': null,
    };

    constructor(
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _SustratoService: SustratoService,
        private _MunicipioService: MunicipioService,
        private _TipoIdentificacionService: TipoIdentificacionService,
    ) { }

    ngOnInit() {
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

    
    enviarTramite()
    {
        let token = this._loginService.getToken();
        this._TramiteSolicitudService.buscarMatriculaCancelada({ 'idFactura': this.factura.id, 'idVehiculo': this.vehiculo.id }, token).subscribe(
            response => {
                if (response) {
                    this.matriculaCancelada = response.data;
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    })
                } else {
                    this.matriculaCancelada = false;
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
        this.datos.entidad = this.entidadSelected;
        this.datos.municipioActa = this.municipioActaSelected;
        this.datos.municipioEntrega = this.municipioEntregaSelected;
        this.datos.tipoIdentificacionEntrega = this.tipoIdentificacionEntregaSelected;
        this.datos.idFactura = this.factura.id;
        this.datos.idVehiculo = this.vehiculo.id;
        this.datos.tramiteFormulario = 'rnma-rematricula';
        this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
    }

    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}