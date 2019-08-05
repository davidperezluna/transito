import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CfgDepartamentoService } from '../../../../../../services/cfgDepartamento.service';
import { CfgMunicipioService } from '../../../../../../services/cfgMunicipio.service';
import { UserCfgTipoIdentificacionService } from '../../../../../../services/userCfgTipoIdentificacion.service';
import { VhloCfgMotivoCancelacionService } from "../../../../../../services/vhloCfgMotivoCancelacion.service";
import { VhloVehiculoService } from '../../../../../../services/vhloVehiculo.service';
import { LoginService } from '../../../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'app-rematricula',
    templateUrl: './new.rematricula.html'
})
export class NewRematriculaComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    @Input() funcionario: any = null;
    @Input() tramitesRealizados: any = null;
    public errorMessage; 
    
    public realizado: any = false;
    public tramiteSolicitud: any = null;
    public departamentos: any;
    public municipiosActa: any;
    public municipiosEntrega: any;
    public tiposIdentificacion: any;
    public matriculaCancelada: any = null;
    public notification = false;

    public datos = {
        'documentacion': true,
        'observacion': null,
        'numeroActa': null,
        'fechaActa': null,
        'campos': null,
        'fechaEntrega': null,
        'numeroIdentificacionEntrega': null,
        'nombreEntrega': null,
        'placaEntrega': null,
        'estadoEntrega': null,
        'idFuncionario': null,
        'idEntidad': null,
        'idDepartamentoActa': null,
        'idMunicipioActa': null,
        'idDepartamentoEntrega': null,
        'idMunicipioEntrega': null,
        'idTipoIdentificacionEntrega': null,
        'idVehiculo': null,
        'idTramiteFactura': null,
    };

    public entidades = [
        { value: 'FISCALIA', label: 'FISCALIA' },
        { value: 'SIJIN', label: 'SIJIN' },
        { value: 'DIJIN', label: 'DIJIN' },
    ];

    constructor(
        private _DepartamentoService: CfgDepartamentoService,
        private _MunicipioService: CfgMunicipioService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _VhloCfgMotivoCancelacionService: VhloCfgMotivoCancelacionService,
        private _VehiculoService: VhloVehiculoService,
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
        }else{
            let token = this._LoginService.getToken();

            this._VehiculoService.validations({ 'id': this.vehiculo.id, 'idTramiteFactura': this.tramiteFactura.id }, token).subscribe(
                response => {
                    if (response.code == 400) {
                        this.notification = true;

                        swal({
                            title: response.title,
                            text: response.message,
                            type: response.status,
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


            this._DepartamentoService.select().subscribe(
                response => {
                    this.departamentos = response;
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
    }

    onChangedDepartamentoActa(id){
        if (id) {
          let token = this._LoginService.getToken();
    
          this._MunicipioService.selectByDepartamento({ 'idDepartamento':id }, token).subscribe(
            response => {
              this.municipiosActa = response;
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
    }

    onChangedDepartamentoEntrega(id){
        if (id) {
          let token = this._LoginService.getToken();
    
          this._MunicipioService.selectByDepartamento({ 'idDepartamento':id }, token).subscribe(
            response => {
              this.municipiosEntrega = response;
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
    }

    onEnviar() {
        let token = this._LoginService.getToken();

        this.datos.campos = ['rematricula'];
        this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.idVehiculo = this.vehiculo.id;

        let resumen = "<b>No. factura: </b>" + this.tramiteFactura.factura.numero;

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