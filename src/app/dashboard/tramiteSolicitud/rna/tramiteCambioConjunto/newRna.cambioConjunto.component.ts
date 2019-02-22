import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitud } from '../../tramiteSolicitud.modelo';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { LoginService } from '../../../../services/login.service';
import { VhloCfgCombustibleService } from '../../../../services/vhloCfgCombustible.service';
import {VehiculoService} from '../../../../services/vehiculo.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-cambioConjunto',
    templateUrl: './newRna.cambioConjunto.html'
})
export class NewRnaCambioConjuntoComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() factura: any = null;
    public errorMessage;
    public resumen = {};     public datos = {
        'tramiteFormulario': null,
        'idFactura': null,
        'idVehiculo': null,
        'campos': null,
        'descripcion': null,
        'nuevoModelo': null,
    };
    public tiposPotenciacion = [
        {'value': 'Cambio de motor', 'label': 'Cambio de motor'},
        {'value': 'Reparacion de motor y cambio de conjunto', 'label': 'Reparación de motor y cambio de conjunto'},
        {'value': 'Reparacion de motor', 'label': 'Reparación de motor'},
    ];

    constructor(
        private _CombustibleService: VhloCfgCombustibleService,
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _VehiculoService: VehiculoService,
    ) { }

    ngOnInit() {

    }
    
    enviarTramite(){
        
        let token = this._loginService.getToken();
        /* this.vehiculo.modelo = this.nuevoModelo    
        this.vehiculo.placa = this.vehiculo.cfgPlaca.numero    
        this.vehiculo.municipioId = this.vehiculo.municipio.id   
        this.vehiculo.lineaId = this.vehiculo.linea.id   
        this.vehiculo.colorId = this.vehiculo.color.id   
        this.vehiculo.carroceriaId = this.vehiculo.carroceria.id   
        this.vehiculo.sedeOperativaId = this.vehiculo.sedeOperativa.id   
        this.vehiculo.claseId = this.vehiculo.clase.id   
        this.vehiculo.servicioId = this.vehiculo.servicio.id  */
        
        this.datos.idFactura = this.factura.id;
        this.datos.tramiteFormulario = 'rna-cambioconjunto';
        this.datos.idVehiculo = this.vehiculo.id;
        this.datos.campos = ['conjunto'];
        this._VehiculoService.update(this.datos,token).subscribe(
        response => {
            response = response; 
            if(response.status == 'success'){
                let resumen = {
                    'modelo anterior': this.vehiculo.modelo,
                };
                this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen}); 
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

    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}