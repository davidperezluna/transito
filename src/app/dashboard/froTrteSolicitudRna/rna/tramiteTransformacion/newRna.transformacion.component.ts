import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { VhloCfgCombustibleService } from '../../../../services/vhloCfgCombustible.service';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { VhloCfgCarroceriaService } from '../../../../services/vhloCfgCarroceria.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-transformacion',
    templateUrl: './newRna.transformacion.html'
})
export class NewRnaTransformacionComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    public errorMessage;

    public carrocerias: any = null;
    public combustibles: any = null;

    public idCarroceria: any = null;
    public idCombustible: any = null;
    public modelo: any = null;
    public descripcionModelo: any = null;

    public resumen = {};

    public datos = {
        'newData': null,
        'oldData': null,
        'tipoTransformacion': null,
        'tramiteFormulario': null,
        'idTramiteFactura': null,
        'idVehiculo': null,
        'idCarroceria': null,
        'idCombustible': null,
        'modelo': null,
        'fichaTecnica': null,
        'descripcionModelo': null,
        'campos': null,
    };

    public tiposTransformacion = [
        {'value': '1', 'label': 'Cambio de carroceria'},
        {'value': '2', 'label': 'Cambio combustible'},
        {'value': '3', 'label': 'Cambio conjunto'},
        {'value': '4', 'label': 'Repotenciación'},
    ];

    constructor(
        private _CombustibleService: VhloCfgCombustibleService,
        private _CarroceriaService: VhloCfgCarroceriaService,
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _VehiculoService: VehiculoService,
    ) { }

    ngOnInit() {
        this._CarroceriaService.select().subscribe(
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
     }

    onChangedTipoTransformacion() {
        this.datos.campos = null;
    }
    
    onTramite(){
        let token = this._loginService.getToken();

         this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.tramiteFormulario = 'rna-transformacion';
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
                    }
                }
            }
        }     

        this._VehiculoService.update(this.datos, token).subscribe(
            response => {
                if (response.status == 'success') {

                    this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': this.resumen });
                }
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
            });
        error => {
            this.errorMessage = <any>error;

            if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
            }
        }
    }

    onCancelar(){
        this.cancelarTramite.emit(true);
    }

    onClose() {
        this.datos.tipoTransformacion = null;
    }
}