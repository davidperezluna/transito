import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitud } from '../../tramiteSolicitud.modelo';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { LoginService } from '../../../../services/login.service';
import { CombustibleService } from '../../../../services/combustible.service';
import {VehiculoService} from '../../../../services/vehiculo.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-transformacion',
    templateUrl: './newRna.transformacion.html'
})
export class NewRnaTransformacionComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() factura: any = null;
    public errorMessage;
    public respuesta;
    public tipoPotenciacionSelect: any;
    public nuevoModelo: any;
    public resumen = {};     public datos = {
        'newData': null,
        'oldData': null,
        'tipoPotenciacion': null,
        'tramiteFormulario': null,
        'idFactura': null,
    };
    public tiposPotenciacion = [
        {'value': 'Cambio de motor', 'label': 'Cambio de motor'},
        {'value': 'Reparacion de motor y cambio de conjunto', 'label': 'Reparación de motor y cambio de conjunto'},
        {'value': 'Reparacion de motor', 'label': 'Reparación de motor'},
    ];

    constructor(
        private _CombustibleService: CombustibleService,
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _VehiculoService: VehiculoService,
    ) { }

    ngOnInit() {

    }
    
    enviarTramite(){
        let token = this._loginService.getToken();

        /*this.vehiculo.modelo = this.nuevoModelo    
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
            this.respuesta = response; 
            if(this.respuesta.status == 'success'){*/
                this.datos.newData = this.nuevoModelo;
                this.datos.oldData = this.vehiculo.modelo;
                this.datos.tipoPotenciacion = this.tipoPotenciacionSelect;
                this.datos.idFactura = this.factura.id;
                this.datos.tramiteFormulario = 'rna-transformacion';
                this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
            //}
            error => {
                    this.errorMessage = <any>error;

                    if(this.errorMessage != null){
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
        //}); 
    }

    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}