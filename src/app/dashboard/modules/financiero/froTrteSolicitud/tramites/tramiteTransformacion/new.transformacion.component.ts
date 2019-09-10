import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { VhloCfgCombustibleService } from '../../../../../../services/vhloCfgCombustible.service';
import { VhloCfgCarroceriaService } from '../../../../../../services/vhloCfgCarroceria.service';
import { LoginService } from '../../../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'app-transformacion',
    templateUrl: './new.transformacion.html'
})
export class NewTransformacionComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    @Input() funcionario: any = null;
    @Input() tramitesRealizados: any = null;
    public errorMessage; 
    
    public realizado: any = false;
    public tramiteSolicitud: any = null;
    public carrocerias: any = null;
    public combustibles: any = null;

    public cambiosEje = [
        {'value': 1, 'label': 'Agregar'},
        {'value': 2, 'label': 'Restar'},
    ];

    public datos = {
        'documentacion': true,
        'observacion': null,
        'tipoTransformacion': null,
        'modelo': null,
        'ejesActuales': null,
        'ejesTipoCambio': null,
        'ejesCantidad': 0,
        'ejesTotal': 0,
        'decripcionModelo': null,
        'tallerRepotenciacion': null,
        'fechaRepotenciacion': null,
        'fichaTecnica': null,
        'numeroFactura': null,
        'fechaFactura': null,
        'campos': null,
        'idFuncionario': null,
        'idVehiculo': null,
        'idCarroceria': null,
        'idCombustible': null,
        'idTramiteFactura': null,
    };

    public tiposTransformacion = [
        {'value': 1, 'label': 'Cambio de carroceria'},
        {'value': 2, 'label': 'Cambio combustible'},
        {'value': 3, 'label': 'Cambio conjunto'},
        {'value': 4, 'label': 'Repotenciación'},
        {'value': 5, 'label': 'Cambio de ejes'},
    ];

    constructor(
        private _CombustibleService: VhloCfgCombustibleService,
        private _CarroceriaService: VhloCfgCarroceriaService,
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

            this._CarroceriaService.selectByClase({ 'idCLase': this.vehiculo.clase.id }, token ).subscribe(
                response => {
                    this.carrocerias = response;
                },
                error => { 
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert('Error en la petición');
                    }
                }
            );

            this._CombustibleService.select().subscribe(
                response => {
                    this.combustibles = response;
                },
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert('Error en la petición');
                    }
                }
            );

            this.datos.ejesActuales = this.vehiculo.numeroEjes;
            this.datos.ejesTotal = this.vehiculo.numeroEjes;
        }
    }

    onChangedTipoTransformacion() {
        this.datos.campos = null;
    }

    onCalcularTotal() {   
        if (this.datos.ejesCantidad > 0) {
          if (this.datos.ejesTipoCambio == 1) {
            this.datos.ejesTotal = Number(this.datos.ejesActuales) + Number(this.datos.ejesCantidad);
          }else if(this.datos.ejesTipoCambio == 2){
            if (this.datos.ejesCantidad <= this.datos.ejesActuales) {
                this.datos.ejesTotal = Number(this.datos.ejesActuales) - Number(this.datos.ejesCantidad);
            }else{
                swal({
                    title: 'Error!',
                    text: 'La cantidad de ejes a restar no puede ser mayor a la cantidad de ejes actuales.',
                    type: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
          }
        }else{
          swal({
            title: 'Error!',
            text: 'El la cantidad e ejes no puede ser igual o menor a 0.',
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      }
    
    onEnviar(){
        let token = this._LoginService.getToken();

        this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.idVehiculo = this.vehiculo.id;
        
        if (this.datos.tipoTransformacion == 1) {
            this.datos.campos = ['carroceria'];
        }else{
            if (this.datos.tipoTransformacion == 2) {
                this.datos.campos = ['combustible'];
            }else{
                if (this.datos.tipoTransformacion == 3) {
                    this.datos.campos = ['conjunto'];
                }else{
                    if (this.datos.tipoTransformacion == 4) {
                        this.datos.campos = ['repotenciacion'];
                    }else{
                        if (this.datos.tipoTransformacion == 5) {
                            this.datos.campos = ['ejes'];
                        }
                    }
                }
            }
        }

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

    onClose() {
        this.datos.tipoTransformacion = null;
    }
}