import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitud } from '../../tramiteSolicitudRnma.modelo';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { LoginService } from '../../../../services/login.service';
import { VhloCfgCombustibleService } from '../../../../services/vhloCfgCombustible.service';
import {VehiculoService} from '../../../../services/vehiculo.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnma-transformacion',
    templateUrl: './newRnma.transformacion.html'
})
export class NewRnmaTransformacionComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() factura: any = null;
    public errorMessage;

    public nuevoRegistro: any;
    public tipoTransformacionSelect: any;
    public resumen = {};     
    
    public datos = {
        'oldData': null,
        'newData': null,
        'tipoTransformacion': null,
        'tramiteFormulario': null,
        'idFactura': null,
        'idVehiculo': null,
        'campos': null,
        'nuevoRegistro': null,
    };

    public tiposTransformacion = [
        {'value': 'Cambio de motor', 'label': 'Cambio de motor'},
        {'value': 'Reparacion de motor y cambio de conjunto', 'label': 'Reparación de motor y cambio de conjunto'},
        {'value': 'Reparacion de motor', 'label': 'Reparación de motor'},
    ];

    constructor(
        private _LoginService: LoginService,
        private _VehiculoService: VehiculoService,
    ) { }

    ngOnInit() { }
    
    enviarTramite(){
        
        let token = this._LoginService.getToken();

        this.vehiculo.modelo = this.nuevoRegistro    
        this.vehiculo.placa = this.vehiculo.cfgPlaca.numero    
        this.vehiculo.municipioId = this.vehiculo.municipio.id   
        this.vehiculo.lineaId = this.vehiculo.linea.id   
        this.vehiculo.colorId = this.vehiculo.color.id   
        this.vehiculo.carroceriaId = this.vehiculo.carroceria.id   
        this.vehiculo.sedeOperativaId = this.vehiculo.sedeOperativa.id   
        this.vehiculo.claseId = this.vehiculo.clase.id   
        this.vehiculo.servicioId = this.vehiculo.servicio.id 
        this._VehiculoService.editVehiculo(this.vehiculo,token).subscribe(
            response => {
                if(response.status == 'success'){
                    this.datos.newData = this.nuevoRegistro;
                    this.datos.oldData = this.vehiculo.modelo;
                    this.datos.tipoTransformacion = this.tipoTransformacionSelect;
                    this.datos.idFactura = this.factura.id;
                    this.datos.tramiteFormulario = 'rnma-tranformacion';
                    this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
                }
                error => {
                        this.errorMessage = <any>error;

                        if(this.errorMessage != null){
                            console.log(this.errorMessage);
                            alert("Error en la petición");
                        }
                    }
            }
        ); 
    }

    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}